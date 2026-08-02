import AppError from "../../utils/AppError.js";
import User from "../auth/auth.model.js";
import Order from "../order/order.model.js";
import SellerPayment from "../sellerPayment/sellerPayment.model.js";

export const getAllSellersService = async () => {
  const sellers = await User.find({ role: "seller" })
    .select("-password")
    .populate("referredBy", "username")
    .sort({ createdAt: -1 })
    .lean();

  const sellersWithStats = await Promise.all(
    sellers.map(async (seller) => {
      const [salesStats, approvedDeposits] = await Promise.all([
        Order.aggregate([
          { $match: { seller: seller._id } },
          {
            $group: {
              _id: null,
              totalSales: { $sum: "$grandTotal" },
              totalCommission: { $sum: "$totalCommission" },
            },
          },
        ]),
        SellerPayment.aggregate([
          { $match: { seller: seller._id, status: "approved" } },
          { $group: { _id: null, total: { $sum: "$amount" } } },
        ]),
      ]);

      const totalSales = salesStats[0]?.totalSales ?? 0;
      const totalCommission = salesStats[0]?.totalCommission ?? 0;
      const completedDeposit = approvedDeposits[0]?.total ?? 0;
      const needToPay = parseFloat(
        (totalCommission - completedDeposit).toFixed(2),
      );

      return {
        ...seller,
        totalSales,
        // totalCommission,
        needToPay,
      };
    }),
  );

  return sellersWithStats;
};

export const getSellerByIdService = async (id) => {
  const seller = await User.findOne({
    _id: id,
    role: "seller",
  })
    .select("-password")
    .populate("referredBy", "username");

  if (!seller) {
    throw new AppError("Seller not found", 404);
  }

  return seller;
};
