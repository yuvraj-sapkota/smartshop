import AppError from "../../utils/AppError.js";
import User from "../auth/auth.model.js";
import Order from "../order/order.model.js";
import { getDueAmountService } from "../sellerPayment/sellerPayment.service.js";

export const getAllSellersService = async () => {
  const sellers = await User.find({ role: "seller" })
    .select("-password")
    .populate("referredBy", "username")
    .sort({ createdAt: -1 })
    .lean();

  const sellersWithStats = await Promise.all(
    sellers.map(async (seller) => {
      const [salesStats, dueInfo] = await Promise.all([
        Order.aggregate([
          { $match: { seller: seller._id } },
          { $group: { _id: null, totalSales: { $sum: "$grandTotal" } } },
        ]),
        getDueAmountService(seller._id),
      ]);

      const totalSales = salesStats[0]?.totalSales ?? 0;

      return {
        ...seller,
        totalSales,
        needToPay: dueInfo.due,
        prepaidAmount: dueInfo.prepaidAmount,
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
