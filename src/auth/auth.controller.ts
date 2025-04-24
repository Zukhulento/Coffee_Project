import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import { hashPassword, comparePasswords, generateToken } from "./auth.service";

const userRepo = AppDataSource.getRepository(User);

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const exists = await userRepo.findOneBy({ email });
  if (exists) {
    res.status(400).json({ message: "User already exists" });
    return;
  } else {
    const user = userRepo.create({
      name,
      email,
      password: hashPassword(password),
    });
    await userRepo.save(user);

    res.status(201).json({ message: "User created" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await userRepo.findOneBy({ email });
  if (!user || !comparePasswords(password, user.password)) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  } else {
    const token = generateToken(user);
    res.json({ token });
  }
};
