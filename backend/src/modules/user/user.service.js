import User from "../auth/auth.model.js";
import Order from "../order/order.model.js";
import UserWithdrawal from "../userFund/userFund.model.js";
import { getAvailableBalanceService } from "../userFund/userFund.service.js";

export const getCustomersService = async () => {
  const customers = await User.find({ role: "user" }).select(
    "_id username email",
  );
  return customers;
};

export const getAllUsersService = async () => {
  const users = await User.find({ role: "user" })
    .select("_id username email referredBy createdAt")
    .populate("referredBy", "username")
    .sort({ createdAt: -1 })
    .lean();

  const usersWithStats = await Promise.all(
    users.map(async (user) => {
      const [withdrawalStats, purchaseStats, balance] = await Promise.all([
        UserWithdrawal.aggregate([
          { $match: { user: user._id } },
          { $group: { _id: null, total: { $sum: "$amount" } } },
        ]),
        Order.aggregate([
          { $match: { customer: user._id } },
          { $group: { _id: null, total: { $sum: "$grandTotal" } } },
        ]),
        getAvailableBalanceService(user._id),
      ]);

      return {
        ...user,
        needToPay: withdrawalStats[0]?.total ?? 0,
        totalPurchase: purchaseStats[0]?.total ?? 0,
        totalEarn: balance.totalEarned,
      };
    }),
  );

  return usersWithStats;
};
