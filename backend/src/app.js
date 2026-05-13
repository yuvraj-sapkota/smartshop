import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./modules/auth/auth.routes.js";

dotenv.config();

const app = express();

const allowedOrigins = [
  // "http://192.168.1.13:5173",
  "http://10.104.97.161:5173",
  "https://smartshop108.vercel.app",
];

app.options("*", cors());
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
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin) return callback(null, true);

//       const allowed = [
//         "localhost",
//         "127.0.0.1",
//         "smartshop108.vercel.app",
//         "vercel.app",
//       ];

//       if (allowed.some((o) => origin.includes(o))) {
//         return callback(null, true);
//       }

//       console.log("❌ Blocked origin:", origin);
//       return callback(new Error("Not allowed by CORS"));
//     },
//     credentials: true,
//   }),
// );

app.use(express.json());

app.use("/api/auth", authRoutes);

export default app;
