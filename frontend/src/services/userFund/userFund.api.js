import apiClient from "../api/apiClient";

// user fund page ma available balance show gareko cha
export const getAvailableBalanceAPI = async () => {
  const response = await apiClient.get("/user-fund/available-balance");
  return response.data;
};

// user fund page ma withdraw button ma click garera withdraw garni
export const submitWithdrawalAPI = async (amount) => {
  const response = await apiClient.post("/user-fund/submit-withdrawal", {
    amount,
  });
  return response.data;
};

// user fund page ma withdrawal history dekhauna
export const getMyWithdrawalsAPI = async () => {
  const response = await apiClient.get("/user-fund/my-withdrawals");
  return response.data;
};

// admin fund page ko lagi
export const getAllWithdrawalsAPI = async () => {
  const response = await apiClient.get("/user-fund/all-withdrawals");
  return response.data;
};

// admin le status approved/reject garna
export const updateWithdrawalStatusAPI = async (id, newStatus) => {
  const response = await apiClient.patch(`/user-fund/${id}/status`, {
    status: newStatus,
  });
  return response.data;
};
