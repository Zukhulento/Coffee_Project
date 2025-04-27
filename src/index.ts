import express from "express";
import { AppDataSource } from "./config/data-source";
import authRoutes from "./routes/auth/auth.routes";
import userRoutes from "./routes/user/user.routes";
import purchaseRoutes from "./routes/purchase/purchase.routes";
import debtRoutes from "./routes/debt/debt.routes";
import { home } from "./controllers/home/home.controller";
import { envs } from "./config/env.config";

// Creating app with express
const app = express();
// Using app as json
app.use(express.json());
// Routes
// Auth Routes
app.use("/api/auth", authRoutes);
// User Routes
app.use("/api/user", userRoutes);
// Purchase Routes
app.use("/api/purchase", purchaseRoutes);
// Debts Routes
app.use("/api/debt", debtRoutes);
// Default Route
app.use("/", home);

// Initializing data instance
AppDataSource.initialize()
  .then(() => {
    // Debugging
    console.log("DB connected");
    // If conection was success starting app
    app.listen(envs.APP_PORT, () => {
      console.log(`Server running on http://localhost:${envs.APP_PORT}`);
    });
  })
  .catch((err) => {
    // In case of error notifying the user
    console.error("Error during Data Source initialization:", err);
  });
