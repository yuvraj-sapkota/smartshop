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
  const referredUsers = await User.find({ referredBy: userId }).select(
    "_id role",
  );

  const referredSellerIds = referredUsers
    .filter((u) => u.role === "seller")
    .map((u) => u._id.toString());
  const referredCustomerIds = referredUsers
    .filter((u) => u.role === "user")
    .map((u) => u._id.toString());

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

  const rewards = [];

  orders.forEach((order) => {
    const isReferredSeller = referredSellerIds.includes(
      order.seller._id.toString(),
    );
    const isReferredBuyer = referredCustomerIds.includes(
      order.customer._id.toString(),
    );

    order.items.forEach((item) => {
      const itemReward = parseFloat(
        (item.commission * item.qty * REFERRAL_COMMISSION_RATE).toFixed(2),
      );

      // Reward for referring the seller
      if (isReferredSeller) {
        rewards.push({
          _id: `${item._id}-seller`,
          product: item.product?.name || item.productName,
          quantity: item.qty,
          mrp: item.price,
          totalPrice: item.price * item.qty,
          reward: itemReward,
          seller: order.seller.username,
          buyer: order.customer.username,
          datetime: order.createdAt,
        });
      }

      // Reward for referring the buyer — separate entry, even if same order
      if (isReferredBuyer) {
        rewards.push({
          _id: `${item._id}-buyer`,
          product: item.product?.name || item.productName,
          quantity: item.qty,
          mrp: item.price,
          totalPrice: item.price * item.qty,
          reward: itemReward,
          seller: order.seller.username,
          buyer: order.customer.username,
          datetime: order.createdAt,
        });
      }
    });
  });

  return rewards;
};
