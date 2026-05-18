import AppError from "../utils/AppError.js";

const checkSellerApproved = (req, res, next) => {
  if (req.user.role === "seller" && req.user.sellerStatus !== "approved") {
    return next(new AppError("Seller is not approved by admin", 403));
  }

  next();
};

export default checkSellerApproved;
