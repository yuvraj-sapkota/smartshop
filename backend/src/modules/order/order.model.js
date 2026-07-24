import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  // Registered product — ObjectId reference (optional)
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    default: null,
  },
  // Custom product — plain name string (optional)
  productName: {
    type: String,
    default: null,
    trim: true,
  },
  qty: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true }, // snapshot at time of order
  commission: { type: Number, required: true }, // per unit commission
});

const orderSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [orderItemSchema],
    grandTotal: { type: Number, required: true },
    totalCommission: { type: Number, required: true },
    cashbackRate: { type: Number },
    userReferralRate: { type: Number },
    sellerReferralRate: { type: Number },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true },
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
