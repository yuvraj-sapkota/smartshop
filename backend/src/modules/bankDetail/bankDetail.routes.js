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
import validate from "../../middlewares/validate.middleware.js";

const router = express.Router();



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
