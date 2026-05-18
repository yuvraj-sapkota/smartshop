import { createProductService } from "./product.service.js";

export const createProduct = async (req, res, next) => {
  try {
    const sellerId = req.user._id;
    const product = await createProductService(req.body, sellerId);
    res.status(201).json({
      success: true,
      message: "product sent for approval",
      product,
    });
  } catch (error) {
    next(error);
  }
};
