import express from "express";
import protect from "../../middlewares/auth.middleware.js";
import allowRole from "../../middlewares/role.middleware.js";
import checkSellerApproved from "../../middlewares/checkSellerApproved.js";
import { uploadScreenshot } from "../../config/cloudinary.js";
import {
  getDueAmount,
  submitPayment,
  getMyPayments,
  getAllPayments,
  updatePaymentStatus,
} from "./sellerPayment.controller.js";
import {
  submitPaymentSchema,
  updatePaymentStatusSchema,
} from "./sellerPayment.validation.js";
import validate from "../../middlewares/validate.middleware.js";
import { fundActionLimiter } from "../../middlewares/rateLimit.middleware.js";

const router = express.Router();

// ── Seller routes ─────────────────────────────────────────────────────────────

// GET  /api/seller-payments/due-amount
router.get(
  "/due-amount",
  protect,
  allowRole("seller"),
  checkSellerApproved,
  getDueAmount,
);

// POST /api/seller-payments/submit    (1)
router.post(
  "/submit",
  protect,
  allowRole("seller"),
  checkSellerApproved,
  fundActionLimiter,
  uploadScreenshot.single("screenshot"),
  validate(submitPaymentSchema),
  submitPayment,
);

// GET  /api/seller-payments/my-payments
router.get(
  "/my-payments",
  protect,
  allowRole("seller"),
  checkSellerApproved,
  getMyPayments,
);

// ── Admin routes ──────────────────────────────────────────────────────────────

// GET  /api/seller-payments/all   (2)
router.get("/all", protect, allowRole("admin"), getAllPayments);

// PATCH /api/seller-payments/:id/status
router.patch(
  "/:id/status",
  protect,
  allowRole("admin"),
  validate(updatePaymentStatusSchema),
  updatePaymentStatus,
);

export default router;
