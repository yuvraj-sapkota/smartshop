import { updateSellerStatusService } from "./admin.service.js";

export const updateSellerStatus = async (req, res, next) => {
  try {
    const { sellerStatus } = req.body;

    const seller = await updateSellerStatusService(req.params.id, sellerStatus);

    res.status(200).json({
      success: true,
      message: `Seller ${sellerStatus} successfully`,
      seller,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProductStatus = async (req, res, next) => {
  console.log("update route hitted");
  try {
    const { status } = req.body;

    const product = await updateProductStatusService(req.params.id, status);

    res.status(200).json({
      success: true,
      message: `Product ${status} successfully`,
      product,
    });
  } catch (error) {
    next(error);
  }
};

// yeslai yaha ekxin lai lekheko chu
// admin.controller.js
// export const getSeller = async (req, res, next) => {
//   try {
//     const seller = await User.findById(req.params.id)
//       .select("-password -refreshToken")
//       .populate("referredBy", "name email phone") // User model मा referredBy field छ भने
//       .lean();

//     if (!seller) return next(new AppError("Seller not found", 404));
//     res.status(200).json({ success: true, seller });
//   } catch (err) {
//     next(err);
//   }
// };
