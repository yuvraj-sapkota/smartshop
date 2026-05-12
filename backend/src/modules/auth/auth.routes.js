import express from "express";

import { loginUser, registerSeller, registerUser } from "./auth.controller.js";

const router = express.Router();

router.post("/register-user", registerUser);

router.post("/register-seller", registerSeller);

router.post("/login", loginUser);

export default router;
