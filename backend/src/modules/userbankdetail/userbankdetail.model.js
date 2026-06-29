import mongoose from "mongoose";

const userBankDetailSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one bank detail per user
    },
    bankName: {
      type: String,
      required: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    accountNumber: {
      type: String,
      required: true,
      trim: true,
    },
    qrUrl: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const UserBankDetail = mongoose.model("UserBankDetail", userBankDetailSchema);

export default UserBankDetail;