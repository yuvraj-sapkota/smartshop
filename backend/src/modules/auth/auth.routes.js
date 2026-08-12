import express from "express";
import { authLimiter } from "../../middlewares/rateLimit.middleware.js";

import { loginUser, registerSeller, registerUser } from "./auth.controller.js";

const router = express.Router();

router.post("/register-user", authLimiter, registerUser);

router.post("/register-seller", authLimiter, registerSeller);

router.post("/login", authLimiter, loginUser);

export default router;
