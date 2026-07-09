import mongoose from "mongoose";

const userWithdrawalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: [1, "Amount must be at least 1"],
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

const UserWithdrawal = mongoose.model("UserWithdrawal", userWithdrawalSchema);
export default UserWithdrawal;
