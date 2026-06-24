import { getSellerDashboardStatsService } from "./sellerDashboard.service.js";

// GET /api/seller/dashboard/stats
export const getSellerDashboardStats = async (req, res, next) => {
  try {
    const stats = await getSellerDashboardStatsService(req.user._id);
    res.status(200).json({ success: true, stats });
  } catch (error) {
    next(error);
  }
};
