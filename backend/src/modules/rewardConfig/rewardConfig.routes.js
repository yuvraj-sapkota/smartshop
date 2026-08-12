import express from "express";
import protect from "../../middlewares/auth.middleware.js";
import allowRole from "../../middlewares/role.middleware.js";
import {
  getRewardConfig,
  updateRewardConfig,
} from "./rewardConfig.controller.js";
import { updateRewardConfigSchema } from "./rewardConfig.validation.js";
import validate from "../../middlewares/validate.middleware.js";

const router = express.Router();



// Anyone logged in can read current rates (needed wherever commission is calculated)
router.get("/", protect, getRewardConfig);

// Only admin can change them
router.put(
  "/",
  protect,
  allowRole("admin"),
  validate(updateRewardConfigSchema),
  updateRewardConfig,
);

export default router;
