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
      const matchField = user.role === "seller" ? "seller" : "customer";

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

export const getMyRewardsService = async (userId) => {
  // 1. Find everyone referred by this user
  const referredUsers = await User.find({ referredBy: userId }).select(
    "_id role",
  );

  console.log(referredUsers);

  const referredSellerIds = referredUsers
    .filter((u) => u.role === "seller")
    .map((u) => u._id);
  const referredCustomerIds = referredUsers
    .filter((u) => u.role === "user")
    .map((u) => u._id);

  console.log(referredSellerIds);
  console.log(referredCustomerIds);

  // 2. Find orders where a referred seller sold, OR a referred user bought
  const orders = await Order.find({
     $or: [
      { seller: { $in: referredSellerIds } },
      { customer: { $in: referredCustomerIds } },
    ],
  })
    .populate("seller", "username")
    .populate("customer", "username")
    .populate("items.product", "name")
    .sort({ createdAt: -1 });

  // 3. Break each order into reward rows (10% of commission per item)
  const rewards = [];
  orders.forEach((order) => {
    order.items.forEach((item) => {
      rewards.push({
        _id: item._id,
        product: item.product?.name || item.productName,
        quantity: item.qty,
        mrp: item.price,
        totalPrice: item.price * item.qty,
        reward: parseFloat(
          (item.commission * item.qty * REFERRAL_COMMISSION_RATE).toFixed(2),
        ),
        seller: order.seller.username,
        buyer: order.customer.username,
        datetime: order.createdAt,
      });
    });
  });

  return rewards;
};
