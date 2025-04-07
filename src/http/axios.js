import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;
const key = import.meta.env.VITE_API_KEY;
const token = import.meta.env.VITE_API_TOKEN;

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.request.use((config) => {
  // Ensure params object exists
  config.params = config.params || {};

  // Append authentication parameters
  config.params["key"] = key;
  config.params["token"] = token;

  return config;
});

export default axiosInstance;
