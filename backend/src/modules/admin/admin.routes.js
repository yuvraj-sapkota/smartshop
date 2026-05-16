import express from "express";

import { updateProductStatus, updateSellerStatus } from "./admin.controller.js";
import allowRole from "../../middlewares/role.middleware.js";
import protect from "../../middlewares/auth.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import {
  updateProductStatusSchema,
  updateSellerStatusSchema,
} from "./admin.validation.js";

const router = express.Router();

router.put(
  "/status/:id",
  protect,
  allowRole("admin"),
  validate(updateSellerStatusSchema),
  updateSellerStatus,
);

router.put(
  "/products/:id",
  protect,
  allowRole("admin"),
  validate(updateProductStatusSchema),
  updateProductStatus,
);

// yeslai yaha ekxin lai lekheko chu
// admin.routes.js
// router.get("/sellers/:id", getSeller);

export default router;
