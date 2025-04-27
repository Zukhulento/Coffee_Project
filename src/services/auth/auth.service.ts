import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../../entities/User";
import { envs } from "../../config/env.config";

// Función para encriptar contraseña
export const hashPassword = (password: string) => {
  return bcrypt.hashSync(password, 10);
};

// Función para comparar contraseñas
export const comparePasswords = (raw: string, hashed: string) => {
  return bcrypt.compareSync(raw, hashed);
};

// Función para generar token JWT (El token lleva id el email)
export const generateToken = (user: User) => {
  return jwt.sign({ id: user.id, email: user.email }, envs.JWT_SECRET, {
    expiresIn: "7d",
  });
};
