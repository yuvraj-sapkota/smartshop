import mongoose from "mongoose";

const sellerFundSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    totalCommission: {         //yo modal ma data kaha bata aako cha vane, order create garda total commission aako thiyo 
      type: Number,
      default: 0,
    },
    paidAmount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

// data base ma save hudaina, just calculate garera frontend ma dekhauni matra ho
sellerFundSchema.virtual("dueAmount").get(function () {
  return this.totalCommission - this.paidAmount;
});

export default mongoose.model("SellerFund", sellerFundSchema);
