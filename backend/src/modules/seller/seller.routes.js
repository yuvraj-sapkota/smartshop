import express from "express";
import protect from "../../middlewares/auth.middleware.js";
import allowRole from "../../middlewares/role.middleware.js";
import { getAllSellers, getSellerById } from "./seller.controller.js";
const router = express.Router();

router.get("/", protect, allowRole("admin"), getAllSellers);

router.get("/:id", protect, allowRole("admin"), getSellerById);

export default router;
