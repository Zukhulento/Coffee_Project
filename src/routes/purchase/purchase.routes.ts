import { Router } from "express";
import {
  createPurchase,
  getAllPurchases,
} from "../../controllers/purchase/purchase.controller";
import { verifyToken } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/", createPurchase);
router.get("/", verifyToken, getAllPurchases);

export default router;
