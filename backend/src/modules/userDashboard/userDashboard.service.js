import User from "../auth/auth.model.js";
import Order from "../order/order.model.js";
import UserWithdrawal from "../userFund/userFund.model.js";
import { getAvailableBalanceService } from "../userFund/userFund.service.js";

export const getUserDashboardStatsService = async (userId) => {
  const [
    balance,
    pendingWithdrawStats,
    completedWithdrawStats,
    purchaseStats,
    affiliateUsers,
  ] = await Promise.all([
    getAvailableBalanceService(userId),

    UserWithdrawal.aggregate([
      { $match: { user: userId, status: "pending" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]),

    UserWithdrawal.aggregate([
      { $match: { user: userId, status: "approved" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]),

    Order.aggregate([
      { $match: { customer: userId } },
      { $group: { _id: null, total: { $sum: "$grandTotal" } } },
    ]),

    User.countDocuments({ referredBy: userId }),
  ]);

  return {
    availableBalance: balance.availableBalance,
    pendingWithdraw: pendingWithdrawStats[0]?.total ?? 0,
    completedWithdraw: completedWithdrawStats[0]?.total ?? 0,
    totalEarned: balance.totalEarned,
    totalPurchase: purchaseStats[0]?.total ?? 0,
    totalCashback: balance.totalCashback,
    affiliateRewards: balance.totalReferralReward,
    affiliateUsers,
  };
};
