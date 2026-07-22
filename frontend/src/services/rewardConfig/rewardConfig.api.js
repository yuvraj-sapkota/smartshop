import apiClient from "../api/apiClient";

export const getRewardConfigAPI = async () => {
  const response = await apiClient.get("/reward-config");
  console.log(response);
  return response.data;
};

export const updateRewardConfigAPI = async (data) => {
  const response = await apiClient.put("/reward-config", data);
  return response.data;
};
