import Order from "../order/order.model.js";
import Product from "../product/product.model.js";
import { getDueAmountService } from "../sellerPayment/sellerPayment.service.js";

export const getSellerDashboardStatsService = async (sellerId) => {
  const [
    orderStats,
    dueInfo,
    totalProducts,
    pendingProducts,
  ] = await Promise.all([
    // Total sales only — commission/paid/due now come from getDueAmountService
    Order.aggregate([
      { $match: { seller: sellerId } },
      { $group: { _id: null, totalSales: { $sum: "$grandTotal" } } },
    ]),

    getDueAmountService(sellerId),

    // All products count
    Product.countDocuments({ seller: sellerId }),

    // Pending products count
    Product.countDocuments({ seller: sellerId, status: "pending" }),
  ]);

  const totalSales = orderStats[0]?.totalSales ?? 0;

  return {
    prepaidAmount: dueInfo.prepaidAmount,
    dueCommission: dueInfo.due,
    pendingDeposit: dueInfo.totalPending,
    totalCommission: dueInfo.totalCommission,
    totalCommissionPaid: dueInfo.totalPaid,
    totalSales,
    totalProducts,
    pendingProducts,
  };
};
