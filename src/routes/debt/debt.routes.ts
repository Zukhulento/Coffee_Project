import { Router } from "express";
import { verifyToken } from "../../middlewares/auth.middleware";
import { getMyDebts, payDebt } from "../../controllers/debt/debt.controller";
 
// Debt Routes
const router = Router()

router.post("/my",verifyToken, getMyDebts);
router.patch("/:id/pay",verifyToken, payDebt);

export default router;