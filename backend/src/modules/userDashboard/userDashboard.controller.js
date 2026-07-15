import { getUserDashboardStatsService } from "./userDashboard.service.js";

// GET /api/user/dashboard/stats
export const getUserDashboardStats = async (req, res, next) => {
  try {
    const stats = await getUserDashboardStatsService(req.user._id);
    res.status(200).json({ success: true, stats });
  } catch (error) {
    next(error);
  }
};
