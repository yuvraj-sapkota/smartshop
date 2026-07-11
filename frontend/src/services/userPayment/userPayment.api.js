import apiClient from "../api/apiClient";

export const upsertBankDetailAPI = async (formData) => {
  const response = await apiClient.post("/user/bank/my-bank", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const getMyBankDetailAPI = async () => {
  const response = await apiClient.get("/user/bank/my-bank");
  return response.data;
};

// admin side ko lagi — view a specific user's bank detail
export const getUserBankDetailAPI = async (userId) => {
  const response = await apiClient.get(`/user/bank/${userId}`);
  return response.data;
};
