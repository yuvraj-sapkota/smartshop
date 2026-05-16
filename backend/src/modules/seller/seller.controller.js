import { getAllSellersService, getSellerByIdService } from "./seller.service.js";

export const getAllSellers = async (req, res, next) => {
  try {
    const sellers = await getAllSellersService();

    res.status(200).json({
      success: true,
      sellers,
    });
  } catch (error) {
    next(error);
  }
};

export const getSellerById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const seller = await getSellerByIdService(id);

    res.status(200).json({
      success: true,
      seller,
    });
  } catch (error) {
    next(error);
  }
};
