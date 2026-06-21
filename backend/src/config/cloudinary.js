import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// Storage specifically for seller payment screenshots
const paymentScreenshotStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "seller-payments", // Cloudinary folder
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 1000, crop: "limit" }], // cap large images
  },
});

export const uploadScreenshot = multer({
  storage: paymentScreenshotStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (_req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPG, PNG, and WEBP images are allowed"), false);
    }
  },
});

export default cloudinary;
