import Product from "./product.model.js";
import AppError from "../../utils/AppError.js";

// CREATE PRODUCT (SELLER)
export const createProductService = async (data, sellerId) => {
  const product = await Product.create({
    name: data.product,
    price: data.price,
    commission: data.commission,
    measure: data.measure,
    seller: sellerId,
    status: "pending",
  });

  return product;
};