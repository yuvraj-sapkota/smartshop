import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import errorMiddleware from "./middlewares/error.middleware.js";
import authRoutes from "./modules/auth/auth.routes.js";
import adminRoutes from "./modules/admin/admin.routes.js";
import productRoutes from "./modules/product/product.routes.js";
import sellerRoutes from "./modules/seller/seller.routes.js";
import storeRoutes from "./modules/store/store.route.js";
import orderRoutes from "./modules/order/order.route.js";

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://192.168.1.4:5173",
  // "http://10.104.97.161:5173",
  "https://smartshop108.vercel.app",
];

// app.options("*", cors());
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
app.use("/api/admin", adminRoutes);
app.use("/api/product", productRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/orders", orderRoutes);

app.use(errorMiddleware);

export default app;

// 1. seller register huda admin page ma dekhini
// 2. admin le seller lai accept wa reject garna milni
