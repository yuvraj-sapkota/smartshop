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

const router = express.Router();

// ── Validation middleware (same pattern as order routes) ──────────────────────
const validate = (schema) => (req, res, next) => {
  try {
    // zod parse — coerce number fields that come as strings from multipart
    req.body = schema.parse({
      ...req.body,
      amount: req.body.amount ? Number(req.body.amount) : undefined,
    });
    next();
  } catch (err) {
    next(err);
  }
};

// ── Seller routes ─────────────────────────────────────────────────────────────

// GET  /api/seller-payments/due-amount
router.get(
  "/due-amount",
  protect,
  allowRole("seller"),
  checkSellerApproved,
  getDueAmount
);

// POST /api/seller-payments/submit    (1)
router.post(
  "/submit",
  protect,
  allowRole("seller"),
  checkSellerApproved,
  uploadScreenshot.single("screenshot"), 
  validate(submitPaymentSchema), 
  submitPayment
);

// GET  /api/seller-payments/my-payments
router.get(
  "/my-payments",
  protect,
  allowRole("seller"),
  checkSellerApproved,
  getMyPayments
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
  updatePaymentStatus
);

export default router;