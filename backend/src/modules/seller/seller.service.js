import AppError from "../../utils/AppError.js";
import User from "../auth/auth.model.js";

export const getAllSellersService = async () => {
  const sellers = await User.find({ role: "seller" }).select("-password");

  return sellers;
};

export const getSellerByIdService = async (id) => {
  const seller = await User.findOne({
    _id: id,
    role: "seller",
  })
    .select("-password")
    .populate("referredBy", "username");

  if (!seller) {
    throw new AppError("Seller not found", 404);
  }

  return seller;
};
