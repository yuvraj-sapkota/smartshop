import Order from "../order/order.model.js";
import User from "../auth/auth.model.js";
import UserWithdrawal from "./userFund.model.js";
import AppError from "../../utils/AppError.js";

// Helper: total cashback earned from the user's own purchases
const getTotalCashback = async (userId) => {
  const result = await Order.aggregate([
    { $match: { customer: userId } },
    {
      $group: {
        _id: null,
        total: {
          $sum: {
            $multiply: [
              "$totalCommission",
              { $ifNull: ["$cashbackRate", 0.25] },
            ],
          },
        },
      },
    },
  ]);
  return result[0]?.total ?? 0;
};

// Helper: total referral reward earned from referred sellers + referred buyers
const getTotalReferralReward = async (userId) => {
  const referredUsers = await User.find({ referredBy: userId }).select(
    "_id role",
  );

  const referredSellerIds = referredUsers
    .filter((u) => u.role === "seller")
    .map((u) => u._id);
  const referredCustomerIds = referredUsers
    .filter((u) => u.role === "user")
    .map((u) => u._id);

  const [sellerRefStats, buyerRefStats] = await Promise.all([
    Order.aggregate([
      { $match: { seller: { $in: referredSellerIds } } },
      {
        $group: {
          _id: null,
          total: {
            $sum: {
              $multiply: [
                "$totalCommission",
                { $ifNull: ["$sellerReferralRate", 0.1] },
              ],
            },
          },
        },
      },
    ]),
    Order.aggregate([
      { $match: { customer: { $in: referredCustomerIds } } },
      {
        $group: {
          _id: null,
          total: {
            $sum: {
              $multiply: [
                "$totalCommission",
                { $ifNull: ["$userReferralRate", 0.1] },
              ],
            },
          },
        },
      },
    ]),
  ]);

  const sellerRefReward = sellerRefStats[0]?.total ?? 0;
  const buyerRefReward = buyerRefStats[0]?.total ?? 0;

  return sellerRefReward + buyerRefReward;
};

// Helper: money that's no longer available to request — either already paid
// out (approved) or waiting on your decision (pending). Rejected withdrawals
// are excluded, since that money was never actually taken from the user.
const getTotalReservedWithdrawals = async (userId) => {
  const result = await UserWithdrawal.aggregate([
    { $match: { user: userId, status: { $in: ["approved", "pending"] } } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);
  return result[0]?.total ?? 0;
};

// Helper: withdrawal requests still awaiting your decision (for display only,
// e.g. the "Pending Withdraw" stat on the user dashboard)
const getTotalPendingWithdrawals = async (userId) => {
  const result = await UserWithdrawal.aggregate([
    { $match: { user: userId, status: "pending" } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);
  return result[0]?.total ?? 0;
};

// ─────────────────────────────────────────────
// GET /available-balance
// ─────────────────────────────────────────────
export const getAvailableBalanceService = async (userId) => {
  const [
    totalCashback,
    totalReferralReward,
    totalWithdrawn,
  ] = await Promise.all([
    getTotalCashback(userId),
    getTotalReferralReward(userId),
    getTotalReservedWithdrawals(userId),
  ]);

  const totalEarned = parseFloat(
    (totalCashback + totalReferralReward).toFixed(2),
  );
  const availableBalance = parseFloat(
    (totalEarned - totalWithdrawn).toFixed(2),
  );

  return {
    totalCashback: parseFloat(totalCashback.toFixed(2)),
    totalReferralReward: parseFloat(totalReferralReward.toFixed(2)),
    totalEarned,
    totalWithdrawn,
    availableBalance,
  };
};

// ─────────────────────────────────────────────
// POST /submit-withdrawal
// ─────────────────────────────────────────────
export const submitWithdrawalService = async (userId, data) => {
  const { amount } = data;

  const { availableBalance } = await getAvailableBalanceService(userId);

  if (amount > availableBalance) {
    throw new AppError(
      `Withdraw amount (Rs ${amount}) exceeds available balance (Rs ${availableBalance})`,
      400,
    );
  }

  const withdrawal = await UserWithdrawal.create({
    user: userId,
    amount,
  });

  return withdrawal;
};

// ─────────────────────────────────────────────
// GET /my-withdrawals  — withdrawal history for Fund.jsx
// ─────────────────────────────────────────────
export const getMyWithdrawalsService = async (userId) => {
  return UserWithdrawal.find({ user: userId }).sort({ createdAt: -1 });
};

// ─────────────────────────────────────────────
// GET /all-withdrawals  (admin)
// ─────────────────────────────────────────────
export const getAllWithdrawalsService = async () => {
  return UserWithdrawal.find()
    .populate("user", "username email")
    .sort({ createdAt: -1 });
};

// ─────────────────────────────────────────────
// PATCH /:id/status  (admin) — approve or reject
// ─────────────────────────────────────────────
export const updateWithdrawalStatusService = async (withdrawalId, data) => {
  const { status, adminNote } = data;

  const withdrawal = await UserWithdrawal.findById(withdrawalId);
  if (!withdrawal) throw new AppError("Withdrawal record not found", 404);

  if (withdrawal.status !== "pending") {
    throw new AppError(
      `Withdrawal is already ${withdrawal.status}. Cannot update again.`,
      400,
    );
  }

  withdrawal.status = status;
  if (adminNote) withdrawal.adminNote = adminNote;
  await withdrawal.save();

  return withdrawal;
};
