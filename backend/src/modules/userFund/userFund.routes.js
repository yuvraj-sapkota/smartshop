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
import { fundActionLimiter } from "../../middlewares/rateLimit.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import { updateWithdrawalStatusSchema } from "./userFund.validation.js";

const router = express.Router();

// ── User routes ──────────────────────────────────────────────
router.get(
  "/available-balance",
  protect,
  allowRole("user"),
  getAvailableBalance,
);
router.post(
  "/submit-withdrawal",
  protect,
  fundActionLimiter,
  allowRole("user"),
  submitWithdrawal,
);
router.get("/my-withdrawals", protect, allowRole("user"), getMyWithdrawals);

// ── Admin routes ─────────────────────────────────────────────
router.get("/all-withdrawals", protect, allowRole("admin"), getAllWithdrawals);
router.patch(
  "/:id/status",
  protect,
  allowRole("admin"),
  validate(updateWithdrawalStatusSchema),
  updateWithdrawalStatus,
);

export default router;
