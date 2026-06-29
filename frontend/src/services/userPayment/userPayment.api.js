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
