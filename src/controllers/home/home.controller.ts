// src/home.controller.ts
import { Request, Response } from "express";
import path from "path";

export const home = (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../index.html"));
};
