import apiClient from "../api/apiClient";


// show now page ma dekhauna all store with their products 
export const getAllStoreAPI = async () => {
  const response = await apiClient.get("/stores/all-store");
  return response.data;
  
};
