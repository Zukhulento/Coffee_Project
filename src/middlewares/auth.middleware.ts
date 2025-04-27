// src/auth/auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../entities/User";
import { envs } from "../config/env.config";

// Extendemos el Request para incluir el usuario
export interface AuthRequest extends Request {
  user?: User;
}
// Middleware to verify JWT token
export const verifyToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  // Obtaining the token from the request header
  const authHeader = req.headers.authorization;

  // If nor defined return error
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  // Separating the token from bearer
  const token = authHeader.split(" ")[1];

  try {
    const secret = envs.JWT_SECRET;
    const decoded = jwt.verify(token, secret) as User;
    // returning the user decoded
    req.user = decoded;
    // If the token is valid it proceeds to the next middleware or route handler
    next();
  } catch (err) {
    // If the token is invalid return error
    res.status(401).json({ message: "Invalid token" });
  }
};
