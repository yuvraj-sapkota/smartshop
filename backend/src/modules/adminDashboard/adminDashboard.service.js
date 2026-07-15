import User from "../auth/auth.model.js";
import Order from "../order/order.model.js";
import Product from "../product/product.model.js";
import SellerPayment from "../sellerPayment/sellerPayment.model.js";
import UserWithdrawal from "../userFund/userFund.model.js";

const REFERRAL_COMMISSION_RATE = 0.1; // 10%
const CASHBACK_RATE = 0.25; // 25%

const sumAmount = (result) => result[0]?.total ?? 0;

export const getAdminDashboardStatsService = async () => {
  // Users referred by someone, needed to total up referral rewards paid out
  const referredUsers = await User.find({ referredBy: { $ne: null } }).select(
    "_id role",
  );
  const referredSellerIds = referredUsers
    .filter((u) => u.role === "seller")
    .map((u) => u._id);
  const referredCustomerIds = referredUsers
    .filter((u) => u.role === "user")
    .map((u) => u._id);

  const [
    orderTotals,
    sellerRefStats,
    buyerRefStats,
    approvedSellerPayments,
    pendingSellerPayments,
    approvedWithdrawals,
    pendingWithdrawals,
    totalProducts,
    pendingProducts,
    totalUsers,
    totalSellers,
  ] = await Promise.all([
    Order.aggregate([
      {
        $group: {
          _id: null,
          totalCommission: { $sum: "$totalCommission" },
          totalSales: { $sum: "$grandTotal" },
        },
      },
    ]),

    Order.aggregate([
      { $match: { seller: { $in: referredSellerIds } } },
      { $group: { _id: null, total: { $sum: "$totalCommission" } } },
    ]),

    Order.aggregate([
      { $match: { customer: { $in: referredCustomerIds } } },
      { $group: { _id: null, total: { $sum: "$totalCommission" } } },
    ]),

    SellerPayment.aggregate([
      { $match: { status: "approved" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]),

    SellerPayment.aggregate([
      { $match: { status: "pending" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]),

    UserWithdrawal.aggregate([
      { $match: { status: "approved" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]),

    UserWithdrawal.aggregate([
      { $match: { status: "pending" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]),

    Product.countDocuments({}),
    Product.countDocuments({ status: "pending" }),
    User.countDocuments({ role: "user" }),
    User.countDocuments({ role: "seller" }),
  ]);

  const totalCommission = orderTotals[0]?.totalCommission ?? 0;
  const totalSales = orderTotals[0]?.totalSales ?? 0;

  const totalCashback = parseFloat(
    (totalCommission * CASHBACK_RATE).toFixed(2),
  );
  const totalReferralReward = parseFloat(
    (
      (sumAmount(sellerRefStats) + sumAmount(buyerRefStats)) *
      REFERRAL_COMMISSION_RATE
    ).toFixed(2),
  );

  const grossProfit = totalCommission;
  const netProfit = parseFloat(
    (grossProfit - totalCashback - totalReferralReward).toFixed(2),
  );

  const sellerCompletedDeposit = sumAmount(approvedSellerPayments);
  const sellerPendingDeposit = sumAmount(pendingSellerPayments);
  const sellerOutstandingDeposit = parseFloat(
    (totalCommission - sellerCompletedDeposit).toFixed(2),
  );

  const userTotalCommission = parseFloat(
    (totalCashback + totalReferralReward).toFixed(2),
  );
  const userCompletedWithdrawal = sumAmount(approvedWithdrawals);
  const userPendingWithdrawal = sumAmount(pendingWithdrawals);
  const userOutstandingWithdrawal = parseFloat(
    (userTotalCommission - userCompletedWithdrawal).toFixed(2),
  );

  console.log({
    totalCommission,
    totalCashback,
    totalReferralReward,
    netProfit,
  });

  return {
    highlights: {
      grossProfit,
      netProfit,
      totalSales,
      totalProducts,
      pendingProducts,
      totalUsers,
      totalSellers,
    },
    sellerOverview: {
      totalCommission,
      completedDeposit: sellerCompletedDeposit,
      pendingDeposit: sellerPendingDeposit,
      outstandingDeposit: sellerOutstandingDeposit,
    },
    userOverview: {
      totalCommission: userTotalCommission,
      completedWithdrawal: userCompletedWithdrawal,
      pendingWithdrawal: userPendingWithdrawal,
      outstandingWithdrawal: userOutstandingWithdrawal,
    },
  };
};
