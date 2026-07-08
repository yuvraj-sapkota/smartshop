import apiClient from "../api/apiClient";

export const getMyReferralsAPI = async () => {
  const response = await apiClient.get("/referrals/my-referrals");
  return response.data;
};

export const getMyRewardsAPI = async () => {
  const response = await apiClient.get("/referrals/my-rewards");
  return response.data;
};
