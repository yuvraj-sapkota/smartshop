import express from "express";

import allowRole from "../../middlewares/role.middleware.js";
import checkSellerApproved from "../../middlewares/checkSellerApproved.js";
import { createProduct } from "./product.controller.js";
import protect from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/create",
  protect,
  allowRole("seller"),
  checkSellerApproved,
  createProduct,
);

export default router;
