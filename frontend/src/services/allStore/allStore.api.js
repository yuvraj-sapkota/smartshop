import apiClient from "../api/apiClient";

// show now page ma dekhauna all store with their products
export const getAllStoreAPI = async (coords) => {
  const params = {};
  if (coords?.lat != null && coords?.lng != null) {
    params.lat = coords.lat;
    params.lng = coords.lng;
  }

  const response = await apiClient.get("/stores/all-store", { params });
  return response.data;
};
