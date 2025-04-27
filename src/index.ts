import express from "express";
import { AppDataSource } from "./config/data-source";
import authRoutes from "./routes/auth/auth.routes";
import userRoutes from "./routes/user/user.routes";
import { envs } from "./config/env.config";
import path from "path";

// Creating app with express
const app = express();
// Using app as json
app.use(express.json());
// Routes
// Auth Routes
app.use("/api/auth", authRoutes);
// User Routes
app.use("/api/user", userRoutes);
// Default Route
app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

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
