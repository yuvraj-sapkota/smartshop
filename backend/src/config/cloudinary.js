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

// ── Reusable factory ──────────────────────────────────────────────────────────
const makeUploader = (folder) =>
  multer({
    storage: new CloudinaryStorage({
      cloudinary,
      params: {
        folder,
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
        transformation: [{ width: 1000, crop: "limit" }],
      },
    }),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
    fileFilter: (_req, file, cb) => {
      const allowed = ["image/jpeg", "image/png", "image/webp"];
      allowed.includes(file.mimetype)
        ? cb(null, true)
        : cb(new Error("Only JPG, PNG, and WEBP images are allowed"), false);
    },
  });

export const uploadScreenshot = makeUploader("seller-payments");
export const uploadQr = makeUploader("user-qr-codes");

export default cloudinary;
