import Order from "./order.model.js";
import Product from "../product/product.model.js";
import User from "../auth/auth.model.js";
import AppError from "../../utils/AppError.js";

const CUSTOM_PRODUCT_COMMISSION_RATE = 0.1; // 10%

export const createOrderService = async (data, sellerId) => {
  const { customerId, items } = data;

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
  });

  return order.populate([
    { path: "items.product", select: "name price commission" },
    { path: "customer", select: "username email" },
  ]);
};

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
    .populate("customer", "username email")
    .populate("seller", "username email")
    .sort({ createdAt: -1 });
};
