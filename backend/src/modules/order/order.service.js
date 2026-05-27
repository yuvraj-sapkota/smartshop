import Order from "./order.model.js";
import Product from "../product/product.model.js";
import AppError from "../../utils/AppError.js";

export const createOrderService = async (data, sellerId) => {
  const { customer, items } = data;
 
  // Resolve prices from DB — never trust client prices
  const productIds = items.map((i) => i.productId);
  
  const products = await Product.find({
    _id: { $in: productIds },
    seller: sellerId, // seller can only sell their own products
    status: "approved", // only approved products can be sold
  });

  if (products.length !== productIds.length) {
    throw new AppError(
      "One or more products not found, not approved, or don't belong to you",
      400,
    );
  }

  const productMap = Object.fromEntries(
    products.map((p) => [p._id.toString(), p]),
  );

  const resolvedItems = items.map((item) => {
    const product = productMap[item.productId];
    return {
      product: product._id,
      qty: item.qty,
      price: product.price, // server-resolved price
    };
  });

  const grandTotal = resolvedItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0,
  );

  const order = await Order.create({
    seller: sellerId,
    customer,
    items: resolvedItems,
    grandTotal,
  });

  return order.populate("items.product", "name price measure");
};

export const getMyOrdersService = async (sellerId) => {
  return Order.find({ seller: sellerId })
    .populate("items.product", "name price measure")
    .sort({ createdAt: -1 });
};
