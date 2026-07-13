import { getStoresWithProductsService } from "./store.service.js";

// store ra product group gareko
export const getStoresWithProducts = async (req, res, next) => {
  try {
    const { lat, lng } = req.query;

    const parsedLat = lat !== undefined ? Number(lat) : undefined;
    const parsedLng = lng !== undefined ? Number(lng) : undefined;

    const hasValidLocation =
      parsedLat !== undefined &&
      parsedLng !== undefined &&
      !Number.isNaN(parsedLat) &&
      !Number.isNaN(parsedLng);

    const stores = await getStoresWithProductsService(
      hasValidLocation ? { lat: parsedLat, lng: parsedLng } : {},
    );

    res.status(200).json({ success: true, stores });
  } catch (error) {
    next(error);
  }
};