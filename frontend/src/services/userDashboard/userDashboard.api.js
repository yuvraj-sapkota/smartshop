import apiClient from "../api/apiClient";

export const getUserDashboardStatsAPI = async () => {
  const response = await apiClient.get("/user/dashboard/stats");
  return response.data;
};
