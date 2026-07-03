import apiClient from "../api/apiClient";

export const getMyReferralsAPI = async () => {
  const response = await apiClient.get("/referrals/my-referrals");
  return response.data;
};
