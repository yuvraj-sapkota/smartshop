import express from "express";
import { getMyReferrals } from "./referral.controller.js";
import protect from "../../middlewares/auth.middleware.js";


const router = express.Router();

router.get("/my-referrals", protect, getMyReferrals);

export default router;
