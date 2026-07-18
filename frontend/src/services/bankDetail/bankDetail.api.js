import apiClient from "../api/apiClient";

export const upsertBankDetailAPI = async (formData) => {
  const response = await apiClient.post("/bank/my-bank", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const getMyBankDetailAPI = async () => {
  const response = await apiClient.get("/bank/my-bank");
  return response.data;
};

// admin viewing a specific user's bank detail
export const getUserBankDetailAPI = async (userId) => {
  const response = await apiClient.get(`/bank/${userId}`);
  return response.data;
};

// seller/user viewing the platform's admin bank detail
export const getAdminBankDetailAPI = async () => {
  const response = await apiClient.get("/bank/admin");
  return response.data;
};
