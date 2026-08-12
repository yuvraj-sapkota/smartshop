import express from "express";
import protect from "../../middlewares/auth.middleware.js";
import allowRole from "../../middlewares/role.middleware.js";
import checkSellerApproved from "../../middlewares/checkSellerApproved.js";
import {
  createOrder,
  getAllOrders,
  getMyOrders,
  getMyPurchase,
  getUserCommission,
} from "./order.controller.js";
import { createOrderSchema } from "./order.validation.js";
import validate from "../../middlewares/validate.middleware.js";
import {orderCreateLimiter} from "../../middlewares/rateLimit.middleware.js"

const router = express.Router();



router.post(
  "/create",
  protect,
  allowRole("seller"),
  checkSellerApproved,
  orderCreateLimiter,
  validate(createOrderSchema),
  createOrder,
);
router.get(
  "/my-orders",
  protect,
  allowRole("seller"),
  checkSellerApproved,
  getMyOrders,
);
router.get("/all-orders", protect, allowRole("admin"), getAllOrders);
router.get("/user-commission", protect, allowRole("admin"), getUserCommission);
router.get("/my-purchases", protect, allowRole("user"), getMyPurchase);

export default router;
