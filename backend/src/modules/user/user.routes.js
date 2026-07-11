import express from "express";
import { getAllUsers, getCustomers } from "./user.controller.js";

import protect from "../../middlewares/auth.middleware.js";
import allowRole from "../../middlewares/role.middleware.js";

const router = express.Router();

// Only logged-in sellers can fetch customers
router.get("/customers", protect, allowRole("seller"), getCustomers);

// admin pannel's users
router.get("/all-users", protect, allowRole("admin"), getAllUsers);

export default router;
