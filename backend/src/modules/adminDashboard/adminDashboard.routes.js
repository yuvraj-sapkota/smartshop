import express from "express";
import protect from "../../middlewares/auth.middleware.js";
import allowRole from "../../middlewares/role.middleware.js";
import { getAdminDashboardStats } from "./adminDashboard.controller.js";

const router = express.Router();

router.get("/stats", protect, allowRole("admin"), getAdminDashboardStats);

export default router;
