import express from "express";
import protect from "../../middlewares/auth.middleware.js";
import allowRole from "../../middlewares/role.middleware.js";
import { uploadQr } from "../../config/cloudinary.js";
import {
  getMyBankDetail,
  upsertBankDetail,
  getUserBankDetail,
  getAdminBankDetail,
} from "./bankDetail.controller.js";
import { upsertBankDetailSchema } from "./bankDetail.validation.js";

const router = express.Router();

const validate = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (err) {
    next(err);
  }
};

router.post(
  "/my-bank",
  protect,
  allowRole("user", "admin"),
  uploadQr.single("qr"),
  validate(upsertBankDetailSchema),
  upsertBankDetail,
);

router.get("/my-bank", protect, allowRole("user", "admin"), getMyBankDetail);

router.get(
  "/admin",
  protect,
  allowRole("user", "seller", "admin"),
  getAdminBankDetail,
);

router.get("/:userId", protect, allowRole("admin"), getUserBankDetail);

export default router;
