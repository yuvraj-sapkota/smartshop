import express from "express";
import { getMyReferrals, getMyRewards } from "./referral.controller.js";
import protect from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/my-referrals", protect, getMyReferrals);
router.get("/my-rewards", protect, getMyRewards);

export default router;
