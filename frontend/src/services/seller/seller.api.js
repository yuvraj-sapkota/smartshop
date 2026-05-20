import apiClient from "../api/apiClient";

export const getAllSellers = async () => {
  const response = await apiClient.get("/seller");
  return response.data;
};

export const getSingleSeller = async (id) => {
  const response = await apiClient.get(`/seller/${id}`);
  return response.data;
};

export const updateSellerStatus = async (id, status) => {
  const response = await apiClient.put(`/admin/status/${id}/status`, {
    sellerStatus: status,
  });
  return response.data;
};
