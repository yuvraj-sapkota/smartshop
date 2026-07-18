import mongoose from "mongoose";

const rewardConfigSchema = new mongoose.Schema(
  {
    cashbackRate: {
      type: Number,
      required: true,
      default: 0.25,
      min: 0,
      max: 1,
    },
    userReferralRate: {
      type: Number,
      required: true,
      default: 0.1,
      min: 0,
      max: 1,
    },
    sellerReferralRate: {
      type: Number,
      required: true,
      default: 0.1,
      min: 0,
      max: 1,
    },
  },
  { timestamps: true },
);

const RewardConfig = mongoose.model("RewardConfig", rewardConfigSchema);
export default RewardConfig;
