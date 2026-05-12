import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./modules/auth/auth.routes.js";

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://192.168.1.13:5173",
  "https://smartshop.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use(express.json());

app.use("/api/auth", authRoutes);

export default app;
