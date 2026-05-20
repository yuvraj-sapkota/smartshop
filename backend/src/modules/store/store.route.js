import express from "express";
import { getStoresWithProducts } from "./store.controller.js";
const router = express.Router();


/* =========================
   GET STORES WITH PRODUCTS
========================= */
router.get("/all-store", getStoresWithProducts);


export default router;
