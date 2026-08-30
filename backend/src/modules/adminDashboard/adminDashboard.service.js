import User from "../auth/auth.model.js";
import Order from "../order/order.model.js";
import Product from "../product/product.model.js";
import SellerPayment from "../sellerPayment/sellerPayment.model.js";
import UserWithdrawal from "../userFund/userFund.model.js";
import { getDueAmountService } from "../sellerPayment/sellerPayment.service.js";
import {
  rewardAggregationExpr,
  DEFAULT_CASHBACK_RATE,
  DEFAULT_REFERRAL_RATE,
} from "../../utils/rewardMath.js";

const sumAmount = (result) => result[0]?.total ?? 0;

// Check every seller individually, then add up their real "still owed" and
// "prepaid credit" amounts — never subtract two grand totals from each
// other, since one seller's credit can't cover another seller's debt.
const getSellerDueTotals = async () => {
  const sellers = await User.find({ role: "seller" }).select("_id");
  const dueInfos = await Promise.all(
    sellers.map((seller) => getDueAmountService(seller._id)),
  );

  return dueInfos.reduce(
    (totals, info) => ({
      totalOutstanding: totals.totalOutstanding + info.due,
      totalPrepaid: totals.totalPrepaid + info.prepaidAmount,
    }),
    { totalOutstanding: 0, totalPrepaid: 0 },
  );
};

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
    sellerDueTotals,
  ] = await Promise.all([
    Order.aggregate([
      {
        $group: {
          _id: null,
          totalCommission: { $sum: "$totalCommission" },
          totalSales: { $sum: "$grandTotal" },
          totalCashback: {
            $sum: rewardAggregationExpr(
              "$totalCommission",
              "$cashbackRate",
              DEFAULT_CASHBACK_RATE,
            ),
          },
        },
      },
    ]),

    Order.aggregate([
      { $match: { seller: { $in: referredSellerIds } } },
      {
        $group: {
          _id: null,
          total: {
            $sum: rewardAggregationExpr(
              "$totalCommission",
              "$sellerReferralRate",
              DEFAULT_REFERRAL_RATE,
            ),
          },
        },
      },
    ]),

    Order.aggregate([
      { $match: { customer: { $in: referredCustomerIds } } },
      {
        $group: {
          _id: null,
          total: {
            $sum: rewardAggregationExpr(
              "$totalCommission",
              "$userReferralRate",
              DEFAULT_REFERRAL_RATE,
            ),
          },
        },
      },
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
    getSellerDueTotals(),
  ]);

  const totalCommission = orderTotals[0]?.totalCommission ?? 0;
  const totalSales = orderTotals[0]?.totalSales ?? 0;

  const totalCashback = parseFloat(
    (orderTotals[0]?.totalCashback ?? 0).toFixed(2),
  );
  const totalReferralReward = parseFloat(
    (sumAmount(sellerRefStats) + sumAmount(buyerRefStats)).toFixed(2),
  );

  const grossProfit = totalCommission;
  const netProfit = parseFloat(
    (grossProfit - totalCashback - totalReferralReward).toFixed(2),
  );

  const sellerCompletedDeposit = sumAmount(approvedSellerPayments);
  const sellerPendingDeposit = sumAmount(pendingSellerPayments);

  const sellerOutstandingDeposit = parseFloat(
    sellerDueTotals.totalOutstanding.toFixed(2),
  );
  const sellerPrepaidAmount = parseFloat(
    sellerDueTotals.totalPrepaid.toFixed(2),
  );

  const userTotalCommission = parseFloat(
    (totalCashback + totalReferralReward).toFixed(2),
  );
  const userCompletedWithdrawal = sumAmount(approvedWithdrawals);

  const cashInHand = parseFloat(
    (sellerCompletedDeposit - userCompletedWithdrawal).toFixed(2),
  );


  const userPendingWithdrawal = sumAmount(pendingWithdrawals);
  const userOutstandingWithdrawal = parseFloat(
    (userTotalCommission - userCompletedWithdrawal).toFixed(2),
  );

  return {
    highlights: {
      grossProfit,
      netProfit,
      cashInHand,
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
      prepaidAmount: sellerPrepaidAmount,
    },
    userOverview: {
      totalCommission: userTotalCommission,
      completedWithdrawal: userCompletedWithdrawal,
      pendingWithdrawal: userPendingWithdrawal,
      outstandingWithdrawal: userOutstandingWithdrawal,
    },
  };
};
