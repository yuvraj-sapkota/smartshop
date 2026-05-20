import {
  createProductService,
  getMyProductsService,
  deleteProductService,
  getAllProductService,
} from "./product.service.js";

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

// get all product
export const getAllProducts = async (req, res, next) => {
  try {
    const products = await getAllProductService();
    res.status(200).json({
      success: true,
      message: "All products fetched successfully",
      products,
    });
  } catch (error) {
    next(error);
  }
};

// individual seller ko products
export const getMyProducts = async (req, res, next) => {
  try {
    const sellerId = req.user._id;
    const products = await getMyProductsService(sellerId);
    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    next(error);
  }
};

// delete product
export const deleteProduct = async (req, res, next) => {
  try {
    const sellerId = req.user._id;
    const { productId } = req.params;
    await deleteProductService(productId, sellerId);

    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};
