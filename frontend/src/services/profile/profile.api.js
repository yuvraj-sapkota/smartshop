import apiClient from "../api/apiClient";

export const getMyProfileAPI = async () => {
  const response = await apiClient.get("/profile");
  return response.data;
};

export const updateMyProfileAPI = async (data) => {
  const response = await apiClient.put("/profile", data);
  return response.data;
};

export const changePasswordAPI = async (data) => {
  const response = await apiClient.put("/profile/password", data);
  return response.data;
};
