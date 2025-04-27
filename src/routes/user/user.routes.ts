import { Router } from "express";
import { verifyToken } from "../../middlewares/auth.middleware";
import { AuthRequest } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/me", verifyToken, (req: AuthRequest, res) => {
  res.json({ user: req.user });
});

export default router;
