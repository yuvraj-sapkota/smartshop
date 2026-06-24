import express from "express";
import protect from "../../middlewares/auth.middleware.js";
import allowRole from "../../middlewares/role.middleware.js";
import checkSellerApproved from "../../middlewares/checkSellerApproved.js";
import { getSellerDashboardStats } from "./sellerDashboard.controller.js";

const router = express.Router();

// GET /api/seller/dashboard/stats
router.get(
  "/stats",
  protect,
  allowRole("seller"),
  checkSellerApproved,
  getSellerDashboardStats,
);

export default router;
