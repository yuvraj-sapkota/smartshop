import Order from "./order.model.js";
import Product from "../product/product.model.js";
import User from "../auth/auth.model.js";
import AppError from "../../utils/AppError.js";
import { getRewardConfigService } from "../rewardConfig/rewardConfig.service.js";

const CUSTOM_PRODUCT_COMMISSION_RATE = 0.1; // 10%

export const createOrderService = async (data, sellerId) => {
  const { customerId, items } = data;

  const {
    cashbackRate,
    userReferralRate,
    sellerReferralRate,
  } = await getRewardConfigService();

  // 1. Verify customer exists and is a regular user
  const customer = await User.findOne({ _id: customerId, role: "user" });
  if (!customer) {
    throw new AppError("Customer not found or is not a registered user", 400);
  }

  // 2. Separate registered products from custom products
  const registeredItems = items.filter((i) => i.productId);
  const customItems = items.filter((i) => !i.productId);

  // 3. Validate registered products — must belong to seller and be approved
  let productMap = {};
  if (registeredItems.length > 0) {
    const productIds = registeredItems.map((i) => i.productId);
    const products = await Product.find({
      _id: { $in: productIds },
      seller: sellerId,
      status: "approved",
    });

    if (products.length !== productIds.length) {
      throw new AppError(
        "One or more products not found, not approved, or don't belong to you",
        400,
      );
    }

    productMap = Object.fromEntries(products.map((p) => [p._id.toString(), p]));
  }

  // 4. Build resolved items with commission
  const resolvedItems = [
    // Registered products — price + commission from DB
    ...registeredItems.map((item) => {
      const product = productMap[item.productId];
      return {
        product: product._id,
        productName: null,
        qty: item.qty,
        price: product.price,
        commission: product.commission,
      };
    }),
    // Custom products — price from client, 10% commission
    ...customItems.map((item) => ({
      product: null,
      productName: item.productName,
      qty: item.qty,
      price: item.price,
      commission: parseFloat(
        (item.price * CUSTOM_PRODUCT_COMMISSION_RATE).toFixed(2),
      ),
    })),
  ];

  // 5. Calculate grand total and total commission
  const grandTotal = resolvedItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0,
  );

  const totalCommission = resolvedItems.reduce(
    (acc, item) => acc + item.qty * item.commission,
    0,
  );

  // 6. Create order
  const order = await Order.create({
    seller: sellerId,
    customer: customer._id,
    items: resolvedItems,
    grandTotal,
    totalCommission,
    cashbackRate,
    userReferralRate,
    sellerReferralRate,
  });

  return order.populate([
    { path: "items.product", select: "name price commission" },
    { path: "customer", select: "username email" },
  ]);
};

// for user side sales history
export const getMyOrdersService = async (sellerId) => {
  return Order.find({ seller: sellerId })
    .populate("items.product", "name price commission")
    .populate("customer", "username email")
    .sort({ createdAt: -1 });
};

// for admin side
export const getAllOrdersService = async () => {
  return Order.find()
    .populate("items.product", "name price commission")
    .populate({
      path: "customer",
      select: "username email referredBy",
      populate: { path: "referredBy", select: "username" },
    })
    .populate({
      path: "seller",
      select: "username email referredBy",
      populate: { path: "referredBy", select: "username" },
    })
    .sort({ createdAt: -1 });
};

// for admin side — reward/cashback breakdown, one row per item per reward type
export const getUserCommissionService = async () => {
  const orders = await Order.find()
    .populate({
      path: "customer",
      select: "username referredBy",
      populate: { path: "referredBy", select: "username" },
    })
    .populate({
      path: "seller",
      select: "username referredBy",
      populate: { path: "referredBy", select: "username" },
    })
    .populate("items.product", "name")
    .sort({ createdAt: -1 });

  const rewardData = [];

  orders.forEach((order) => {
    const cashbackRate = order.cashbackRate ?? 0.25;
    const sellerReferralRate = order.sellerReferralRate ?? 0.1;
    const userReferralRate = order.userReferralRate ?? 0.1;

    order.items.forEach((item) => {
      const product = item.product?.name || item.productName;
      const itemCommission = item.commission * item.qty;
      const base = {
        product,
        quantity: item.qty,
        price: item.price,
        totalPrice: item.price * item.qty,
        seller: order.seller.username,
        buyer: order.customer.username,
        datetime: order.createdAt,
      };

      // Cashback — buyer earns from their own purchase
      rewardData.push({
        _id: `${item._id}-cashback`,
        ...base,
        reward: parseFloat((itemCommission * cashbackRate).toFixed(2)),
        earnBy: order.customer.username,
        type: "cashback",
      });

      // Referral reward — whoever referred the seller
      if (order.seller.referredBy) {
        rewardData.push({
          _id: `${item._id}-sellerRef`,
          ...base,
          reward: parseFloat((itemCommission * sellerReferralRate).toFixed(2)),
          earnBy: order.seller.referredBy.username,
          type: "reward",
        });
      }

      // Referral reward — whoever referred the buyer
      if (order.customer.referredBy) {
        rewardData.push({
          _id: `${item._id}-buyerRef`,
          ...base,
          reward: parseFloat((itemCommission * userReferralRate).toFixed(2)),
          earnBy: order.customer.referredBy.username,
          type: "reward",
        });
      }
    });
  });

  return rewardData;
};

// for user side, purchase
export const getMyPurchasesService = async (customerId) => {
  const orders = await Order.find({ customer: customerId })
    .populate("seller", "username")
    .populate("items.product", "name")
    .sort({ createdAt: -1 });

  const purchases = [];

  orders.forEach((order) => {
    // Legacy orders placed before this feature existed have no stored
    // rate — 0.25 was the original hardcoded cashback rate, so it's the
    // correct fallback for them.
    const rate = order.cashbackRate ?? 0.25;

    order.items.forEach((item) => {
      purchases.push({
        _id: item._id,
        product: item.product?.name || item.productName,
        quantity: item.qty,
        mrp: item.price,
        totalPrice: item.price * item.qty,
        cashback: parseFloat((item.commission * item.qty * rate).toFixed(2)),
        seller: order.seller.username,
        datetime: order.createdAt,
      });
    });
  });
  return purchases;
};
