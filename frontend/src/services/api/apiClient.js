import axios from "axios";

const apiClient = axios.create({
  // baseURL: "https://smartshop-mh7v.onrender.com/api",
  // baseURL: "http://10.104.97.161:8000/api",
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default apiClient;
