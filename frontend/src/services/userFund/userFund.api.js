import apiClient from "../api/apiClient";

export const getAvailableBalanceAPI = async () => {
  const response = await apiClient.get("/user-fund/available-balance");
  return response.data;
};

export const submitWithdrawalAPI = async (amount) => {
  const response = await apiClient.post("/user-fund/submit-withdrawal", { amount });
  return response.data;
};

export const getMyWithdrawalsAPI = async () => {
  const response = await apiClient.get("/user-fund/my-withdrawals");
  return response.data;
};