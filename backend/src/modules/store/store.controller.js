import { getStoresWithProductsService } from "./store.service.js";

// store ra product group gareko
export const getStoresWithProducts = async (req, res, next) => {
  try {
    const stores = await getStoresWithProductsService();

    res.status(200).json({
      success: true,
      stores,
    });
  } catch (error) {
    next(error);
  }
};
