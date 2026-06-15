import express from "express";
import protect from "../../middlewares/auth.middleware.js";
import allowRole from "../../middlewares/role.middleware.js";
import checkSellerApproved from "../../middlewares/checkSellerApproved.js";
import { createOrder, getAllOrders, getMyOrders } from "./order.controller.js";
import { createOrderSchema } from "./order.validation.js";

const router = express.Router();

// Validate body before hitting the controller
const validate = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (err) {
    next(err);
  }
};

router.post(
  "/create",
  protect,
  allowRole("seller"),
  checkSellerApproved,
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

export default router;
