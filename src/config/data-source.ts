import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Purchase } from "../entities/Purchase";
import { Payment } from "../entities/Payment";

export const AppDataSource = new DataSource({
  type: "mssql",
  host: "localhost",
  port: 1433,
  username: "sa",
  password: "123",
  database: "coffee_db",
  synchronize: true,
  logging: true,
  entities: [User, Purchase, Payment],
  options: {
    enableArithAbort: true,
    encrypt: true, // Encripta la conexión
    trustServerCertificate: true, // Deshabilita la verificación del certificado
  },
});
