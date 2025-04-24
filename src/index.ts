import express from "express";
import { AppDataSource } from "./config/data-source";
import authRoutes from "./auth/auth.routes";
import userRoutes from "./user/user.routes";


const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

AppDataSource.initialize().then(() => {
  console.log("DB connected");

  app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
  });
}).catch((err) => {
  console.error("Error during Data Source initialization:", err);
});
