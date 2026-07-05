import User from "../auth/auth.model.js";
import Order from "../order/order.model.js";

const REFERRAL_COMMISSION_RATE = 0.1; // 10%

export const getMyReferralsService = async (userId) => {
  const referrals = await User.find({ referredBy: userId })
    .select("-password")
    .sort({ createdAt: -1 })
    .lean();

  const referralsWithStats = await Promise.all(
    referrals.map(async (user) => {
      const   matchField = user.role === "seller" ? "seller" : "customer";

      const stats = await Order.aggregate([
        { $match: { [matchField]: user._id } },
        {
          $group: {
            _id: null,
            totalSales: { $sum: "$grandTotal" },
            totalCommission: { $sum: "$totalCommission" },
          },
        },
      ]);

      const totalSales = stats[0]?.totalSales ?? 0;
      const totalCommission = stats[0]?.totalCommission ?? 0;

      const earnCommission = parseFloat(
        (totalCommission * REFERRAL_COMMISSION_RATE).toFixed(2),
      );

      return {
        ...user,
        totalSales,
        earnCommission,
      };
    }),
  );

  return referralsWithStats;
};
