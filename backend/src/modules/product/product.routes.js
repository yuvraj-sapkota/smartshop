import express from "express";

import allowRole from "../../middlewares/role.middleware.js";
import checkSellerApproved from "../../middlewares/checkSellerApproved.js";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getMyProducts,
} from "./product.controller.js";
import protect from "../../middlewares/auth.middleware.js";
import Product from "./product.model.js";
import AppError from "../../utils/AppError.js";
import { createProductSchema } from "./product.validation.js";
import validate from "../../middlewares/validate.middleware.js";

const router = express.Router();

router.post(
  "/create",
  protect,
  allowRole("seller"),
  checkSellerApproved,
  validate(createProductSchema),
  createProduct,
);

// get all products routes
router.get("/all", protect, allowRole("admin"), getAllProducts);

// individual seller ko products
router.get("/my-products", protect, checkSellerApproved, getMyProducts);

// delete product
router.delete(
  "/delete/:productId",
  protect,
  checkSellerApproved,
  deleteProduct,
);

export default router;
