import Order from "../order/order.model.js";
import Product from "../product/product.model.js";
import SellerPayment from "../sellerPayment/sellerPayment.model.js";

export const getSellerDashboardStatsService = async (sellerId) => {
  const [
    orderStats,
    paymentStats,
    totalProducts,
    pendingProducts,
  ] = await Promise.all([
    // Total commission + total sales from orders
    Order.aggregate([
      { $match: { seller: sellerId } },
      {
        $group: {
          _id: null,
          totalCommission: { $sum: "$totalCommission" },
          totalSales: { $sum: "$grandTotal" },
        },
      },
    ]),

    // Approved payments only
    SellerPayment.aggregate([
      { $match: { seller: sellerId, status: "approved" } },
      { $group: { _id: null, totalPaid: { $sum: "$amount" } } },
    ]),

    // All products count
    Product.countDocuments({ seller: sellerId }),

    // Pending products count
    Product.countDocuments({ seller: sellerId, status: "pending" }),
  ]);

  const totalCommission = orderStats[0]?.totalCommission ?? 0;
  const totalSales = orderStats[0]?.totalSales ?? 0;
  const totalPaid = paymentStats[0]?.totalPaid ?? 0;
  const dueCommission = parseFloat((totalCommission - totalPaid).toFixed(2));

  return {
    availableBalance: 0, // future feature
    dueCommission,
    totalCommission,
    totalCommissionPaid: totalPaid,
    totalSales,
    totalProducts,
    pendingProducts,
  };
};
