import User from "../auth/auth.model.js";
import UserWithdrawal from "../userFund/userFund.model.js";

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

  const usersWithWithdrawalTotal = await Promise.all(
    users.map(async (user) => {
      const withdrawalStats = await UserWithdrawal.aggregate([
        { $match: { user: user._id } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]);

      return {
        ...user,
        needToPay: withdrawalStats[0]?.total ?? 0,
      };
    }),
  );

  return usersWithWithdrawalTotal;
};
