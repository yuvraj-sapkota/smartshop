import mongoose from "mongoose";

const bankDetailSchema = new mongoose.Schema(
  {
    // null = the platform's own (admin) bank detail; set = a specific user's bank detail
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      unique: true,
    },
    bankName: { type: String, required: true, trim: true },
    fullName: { type: String, required: true, trim: true },
    accountNumber: { type: String, required: true, trim: true },
    qrUrl: { type: String, default: null },
  },
  { timestamps: true },
);

// Third arg keeps writing to the existing "userbankdetails" collection — no data migration needed
const BankDetail = mongoose.model(
  "BankDetail",
  bankDetailSchema,
  "userbankdetails",
);

export default BankDetail;
