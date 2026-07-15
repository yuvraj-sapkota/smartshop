import express from "express";
import protect from "../../middlewares/auth.middleware.js";
import allowRole from "../../middlewares/role.middleware.js";
import { getUserDashboardStats } from "./userDashboard.controller.js";

const router = express.Router();

// GET /api/user/dashboard/stats
router.get("/stats", protect, allowRole("user"), getUserDashboardStats);

export default router;
