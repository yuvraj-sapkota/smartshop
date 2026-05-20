import apiClient from "../api/apiClient";

export const getAllStoreAPI = async () => {
  const response = await apiClient.get("/stores/all-store");
  return response.data;
  
};
