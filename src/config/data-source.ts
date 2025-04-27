import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Purchase } from "../entities/Purchase";
import { Payment } from "../entities/Payment";
import { envs } from "./env.config";
import { Debt } from "../entities/Debt";

// DataSource 
export const AppDataSource = new DataSource({
  type: "mssql",
  host: envs.DB_HOST,
  port: envs.DB_PORT,
  username: envs.DB_USERNAME,
  password: envs.DB_PASSWORD,
  database: envs.DB_DATABASE,
  synchronize: true,
  logging: true,
  entities: [User, Purchase, Payment, Debt],
  options: {
    enableArithAbort: true,
    encrypt: true, // Encripta la conexión
    trustServerCertificate: true, // Deshabilita la verificación del certificado
  },
});
