import { getAdminDashboardStatsService } from "./adminDashboard.service.js";

// GET /api/admin/dashboard/stats
export const getAdminDashboardStats = async (req, res, next) => {
  try {
    const stats = await getAdminDashboardStatsService();
    res.status(200).json({ success: true, stats });
  } catch (error) {
    next(error);
  }
};
