import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import dotenv from "dotenv";
import User from "../modules/auth/auth.model.js";
dotenv.config();

const createAdmin = async () => {
  try {
    if (
      !process.env.MONGO_URI ||
      !process.env.ADMIN_EMAIL ||
      !process.env.ADMIN_PASSWORD ||
      !process.env.ADMIN_USERNAME
    ) {
      throw new Error("Missing environment variables");
    }

    await mongoose.connect(process.env.MONGO_URI);

    const existingAdmin = await User.findOne({
      email: process.env.ADMIN_EMAIL,
    });
    if (existingAdmin) {
      console.log("Admin already exists");

      await mongoose.connection.close();

      return;
    }

    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD,
      Number(process.env.BCRYPT_SALT) || 10,
    );

    await User.create({
      username: process.env.ADMIN_USERNAME,
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: "admin",
    });

    console.log("✅ Admin created successfully");

    await mongoose.connection.close();
  } catch (error) {
    console.error("❌ Failed to create admin:", error.message);

    await mongoose.connection.close();

    process.exit(1);
  }
};

createAdmin();
