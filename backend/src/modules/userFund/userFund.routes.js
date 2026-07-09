import express from "express";
import protect from "../../middlewares/auth.middleware.js";
import allowRole from "../../middlewares/role.middleware.js";
import {
  getAvailableBalance,
  submitWithdrawal,
  getMyWithdrawals,
  getAllWithdrawals,
  updateWithdrawalStatus,
} from "./userFund.controller.js";

const router = express.Router();

// ── User routes ──────────────────────────────────────────────
router.get(
  "/available-balance",
  protect,
  allowRole("user"),
  getAvailableBalance,
);
router.post("/submit-withdrawal", protect, allowRole("user"), submitWithdrawal);
router.get("/my-withdrawals", protect, allowRole("user"), getMyWithdrawals);

// ── Admin routes ─────────────────────────────────────────────
router.get("/all-withdrawals", protect, allowRole("admin"), getAllWithdrawals);
router.patch(
  "/:id/status",
  protect,
  allowRole("admin"),
  updateWithdrawalStatus,
);

export default router;
