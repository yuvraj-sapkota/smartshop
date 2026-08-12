import mongoose from "mongoose";

const sellerPaymentSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: [1, "Amount must be at least 1"],
    },
    bankName: {
      type: String,
      required: true,
      trim: true,
    },
    accountName: {
      type: String,
      required: true,
      trim: true,
    }, 
    accountNumber: {
      type: String,
      required: true,
      trim: true,
    },
    screenshotUrl: {
      type: String,
      required: true,
    },
    screenshotTime: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    // Admin can add a note on rejection
    adminNote: {
      type: String,
      default: null,
      trim: true,
    },
  },
  { timestamps: true },
);

const SellerPayment = mongoose.model("SellerPayment", sellerPaymentSchema);
export default SellerPayment;
