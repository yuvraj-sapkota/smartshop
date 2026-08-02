import Order from "../order/order.model.js";
import SellerPayment from "./sellerPayment.model.js";
import AppError from "../../utils/AppError.js";

// ─────────────────────────────────────────────
// Helper: calculate total commission earned by seller across all orders
// ─────────────────────────────────────────────
const getTotalCommission = async (sellerId) => {
  const result = await Order.aggregate([
    { $match: { seller: sellerId } },
    { $group: { _id: null, total: { $sum: "$totalCommission" } } },
  ]);
  return result[0]?.total ?? 0;
};

// Helper: calculate total approved payments made by seller
const getTotalApprovedPayments = async (sellerId) => {
  const result = await SellerPayment.aggregate([
    { $match: { seller: sellerId, status: "approved" } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);
  return result[0]?.total ?? 0;
};

// Helper: calculate total pending payments (submitted but not yet approved)
const getTotalPendingPayments = async (sellerId) => {
  const result = await SellerPayment.aggregate([
    { $match: { seller: sellerId, status: "pending" } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);
  return result[0]?.total ?? 0;
};

// ─────────────────────────────────────────────
// GET /due-amount  — seller's current due
// ─────────────────────────────────────────────
export const getDueAmountService = async (sellerId) => {
  const [totalCommission, totalPaid, totalPending] = await Promise.all([
    getTotalCommission(sellerId),
    getTotalApprovedPayments(sellerId),
    getTotalPendingPayments(sellerId),
  ]);

  const balance = parseFloat((totalCommission - totalPaid).toFixed(2));

  // balance > 0 means they still owe money; balance < 0 means they've
  // overpaid and that extra is sitting as credit toward future commission
  const due = balance > 0 ? balance : 0;
  const prepaidAmount = balance < 0 ? Math.abs(balance) : 0;

  return { totalCommission, totalPaid, totalPending, due, prepaidAmount };
};

// ─────────────────────────────────────────────
// POST /submit-payment  — seller submits payment proof
// ─────────────────────────────────────────────
export const submitPaymentService = async (sellerId, data, screenshotUrl) => {
  const { amount, bankName, accountName, accountNumber, screenshotTime } = data;

  // No upper limit anymore — sellers may pay more than they currently owe;
  // the excess becomes prepaid credit that offsets future commission.

  const payment = await SellerPayment.create({
    seller: sellerId,
    amount,
    bankName,
    accountName,
    accountNumber,
    screenshotUrl,
    screenshotTime,
  });

  return payment;
};

// ─────────────────────────────────────────────
// GET /my-payments  — seller's payment history
// ─────────────────────────────────────────────
export const getMyPaymentsService = async (sellerId) => {
  return SellerPayment.find({ seller: sellerId }).sort({ createdAt: -1 });
};

// ─────────────────────────────────────────────
// GET /all-payments  (admin) — all seller payments
// ─────────────────────────────────────────────
export const getAllPaymentsService = async () => {
  return SellerPayment.find()
    .populate("seller", "storeName email")
    .sort({ createdAt: -1 });
};

// ─────────────────────────────────────────────
// PATCH /:id/status  (admin) — approve or reject
// ─────────────────────────────────────────────
export const updatePaymentStatusService = async (paymentId, data) => {
  const { status, adminNote } = data;

  const payment = await SellerPayment.findById(paymentId);
  if (!payment) throw new AppError("Payment record not found", 404);

  if (payment.status !== "pending") {
    throw new AppError(
      `Payment is already ${payment.status}. Cannot update again.`,
      400,
    );
  }

  payment.status = status;
  if (adminNote) payment.adminNote = adminNote;
  await payment.save();

  return payment;
};
