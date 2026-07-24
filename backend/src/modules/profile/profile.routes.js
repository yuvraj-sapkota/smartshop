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

const router = express.Router();

const validate = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (err) {
    next(err);
  }
};

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
