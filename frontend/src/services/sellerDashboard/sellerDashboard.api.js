import apiClient from "../api/apiClient";

export const getSellerDashboardStatsAPI = async () => {
  const response = await apiClient.get("/seller/dashboard/stats");
  return response.data;
};
