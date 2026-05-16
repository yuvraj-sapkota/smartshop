import User from "../auth/auth.model.js";
import AppError from "../../utils/AppError.js";

export const updateSellerStatusService = async (sellerId, sellerStatus) => {
  const seller = await User.findById(sellerId);

  if (!seller) {
    throw new AppError("Seller not found", 404);
  }

  if (seller.role !== "seller") {
    throw new AppError("User is not a seller", 400);
  }

  seller.sellerStatus = sellerStatus;
  const updatedSeller = await seller.save();
  return updatedSeller;
};

// product

export const updateProductStatusService = async (productId, status) => {
  const product = await Product.findById(productId);

  if (!product) throw new AppError("Product not found", 404);

  if (product.status === status) {
    throw new AppError(`Product is already ${status}`, 400);
  }

  product.status = status;
  return await product.save();
};
