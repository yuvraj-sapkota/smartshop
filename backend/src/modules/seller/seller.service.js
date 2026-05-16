import User from "../auth/auth.model.js";

export const getAllSellersService = async () => {
  const sellers = await User.find({ role: "seller" }).select("-password");

  return sellers;
};

export const getSellerByIdService = async (id) => {
  const seller = await User.findOne({
    _id: id,
    role: "seller",
  }).select("-password");

  if (!seller) {
    throw new Error("Seller not found");
  }

  return seller;
};
