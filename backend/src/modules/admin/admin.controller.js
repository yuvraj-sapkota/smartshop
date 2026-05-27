import { updateProductStatusService, updateSellerStatusService } from "./admin.service.js";

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
  // console.log("backend route hitted");
  try {
    const { productId } = req.params;
    const { status } = req.body;

    const product = await updateProductStatusService(productId, status);

    res.status(200).json({
      success: true,
      message: `Product ${status} successfully`,
      product,
    });
  } catch (error) {
    next(error);
  }
};
