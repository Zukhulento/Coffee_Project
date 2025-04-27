import { Request, Response } from "express";
import { AppDataSource } from "../../config/data-source";
import { Purchase } from "../../entities/Purchase";
import { User } from "../../entities/User";
import { Debt } from "../../entities/Debt";

const purchaseRepo = AppDataSource.getRepository(Purchase);
const userRepo = AppDataSource.getRepository(User);
const debtRepo = AppDataSource.getRepository(Debt);

export const createPurchase = async (req: Request, res: Response) => {
  try {
    const { description, totalAmount, participantIds } = req.body;

    if (
      !description ||
      !totalAmount ||
      !participantIds ||
      !Array.isArray(participantIds)
    ) {
      res.status(400).json({ message: "Missing or invalid data" });
      return;
    }

    // Crear la compra
    const purchase = purchaseRepo.create({
      description,
      totalAmount,
    });
    await purchaseRepo.save(purchase);

    // Calcular monto por usuario
    const individualAmount = Number(totalAmount) / participantIds.length;

    // Verificar usuarios válidos
    const users = await userRepo.findByIds(participantIds);
    if (users.length !== participantIds.length) {
      res.status(404).json({ message: "One or more users not found" });
      return;
    }

    // Crear deudas
    const debts = users.map((user) => {
      return debtRepo.create({
        userId: user.id,
        purchaseId: purchase.id,
        amount: individualAmount,
      });
    });

    await debtRepo.save(debts);

    res
      .status(201)
      .json({ message: "Purchase and debts created successfully" });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

// src/purchase/purchase.controller.ts
export const getAllPurchases = async (req: Request, res: Response) => {
  try {
    const purchases = await purchaseRepo.find({
      relations: ["debts"], // opcional, si quieres ver las deudas asociadas
    });

    res.json(purchases);
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};
