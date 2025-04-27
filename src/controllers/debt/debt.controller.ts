// src/debt/debt.controller.ts
import { Request, Response } from "express";
import { AppDataSource } from "../../config/data-source";
import { Debt } from "../../entities/Debt";
import { AuthRequest } from "../../middlewares/auth.middleware";
import { version } from "os";

const debtRepo = AppDataSource.getRepository(Debt);

export const getMyDebts = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }
    const { id } = req.user; // Assuming the user ID is in the request object
    if (!id) {
      res.status(400).json({ message: "User ID not found" });
      return;
    }

    const debts = await debtRepo.find({
      where: { id },
      relations: ["purchase"], // traer la información de la compra asociada
    });
    res.json(debts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// src/debt/debt.controller.ts
export const payDebt = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }
    const userId = req.user.id;
    const { id } = req.params;

    const debt = await debtRepo.findOneBy({ id: parseInt(id), userId });
    if (!debt) {
        res.status(404).json({ message: "Debt not found" });
        return
    }

    debt.paid = true;
    debt.paidAt = new Date(); // Set the paidAt date to the current date
    await debtRepo.save(debt);

    res.json({ message: "Debt marked as paid" });
    return
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
    return
  }
};
