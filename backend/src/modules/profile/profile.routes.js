import express from "express";
import protect from "../../middlewares/auth.middleware.js";
import {
  getMyProfile,
  updateMyProfile,
  changePassword,
  addReferral,
} from "./profile.controller.js";
import {
  updateProfileSchema,
  changePasswordSchema,
  addReferralSchema,
} from "./profile.validation.js";
import validate from "../../middlewares/validate.middleware.js";

const router = express.Router();

router.get("/", protect, getMyProfile);
router.put("/", protect, validate(updateProfileSchema), updateMyProfile);
router.put(
  "/password",
  protect,
  validate(changePasswordSchema),
  changePassword,
);
router.put("/referral", protect, validate(addReferralSchema), addReferral);

export default router;
