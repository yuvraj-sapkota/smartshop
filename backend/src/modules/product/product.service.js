import Product from "./product.model.js";
import AppError from "../../utils/AppError.js";
import User from "../auth/auth.model.js";

// CREATE PRODUCT (SELLER)
export const createProductService = async (data, sellerId) => {
  const product = await Product.create({
    name: data.name,
    price: data.price,
    commission: data.commission,
    measure: data.measure,
    seller: sellerId,
    status: "pending",
  });

  return product;
};

// get all product
export const getAllProductService = async () => {
  const products = await Product.find().populate("seller", "storeName");
  return products;
};

// individual seller ko products
export const getMyProductsService = async (sellerId) => {
  const products = await Product.find({ seller: sellerId });
  return products;
};

// delete product
export const deleteProductService = async (productId, sellerId) => {
  const deletedProduct = await Product.findOneAndDelete({
    _id: productId,
    seller: sellerId,
  });
  if (!deletedProduct) {
    throw new AppError("Product not found ", 404);
  }
};
