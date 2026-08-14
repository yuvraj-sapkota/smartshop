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
import userRoutes from "./modules/user/user.routes.js";
import sellerPaymentRoutes from "./modules/sellerPayment/sellerPayment.routes.js";
import sellerDashboardRoutes from "./modules/sellerDashboard/sellerDashboard.routes.js";

import referralRoutes from "./modules/referral/referral.route.js";
import userFundRoutes from "./modules/userFund/userFund.routes.js";
import userDashboardRoutes from "./modules/userDashboard/userDashboard.routes.js";
import adminDashboardRoutes from "./modules/adminDashboard/adminDashboard.routes.js";
import bankDetailRoutes from "./modules/bankDetail/bankDetail.routes.js";
import rewardConfigRoutes from "./modules/rewardConfig/rewardConfig.routes.js";
import profileRoutes from "./modules/profile/profile.routes.js";

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://192.168.1.100:5173",
  "https://smartshop108.vercel.app",
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
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/product", productRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/seller-payments", sellerPaymentRoutes);
app.use("/api/seller/dashboard", sellerDashboardRoutes);
app.use("/api/referrals", referralRoutes);
app.use("/api/user-fund", userFundRoutes);
app.use("/api/user/dashboard", userDashboardRoutes);
app.use("/api/admin/dashboard", adminDashboardRoutes);
app.use("/api/bank", bankDetailRoutes);
app.use("/api/reward-config", rewardConfigRoutes);
app.use("/api/profile", profileRoutes);

app.use(errorMiddleware);

export default app;
