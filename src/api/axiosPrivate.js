import axios from "axios";

// Get environment variables
const isTestMode = import.meta.env.VITE_TEST_MODE === 'true';
const baseURL = isTestMode 
  ? import.meta.env.VITE_API_BASE_URL_DEV 
  : import.meta.env.VITE_API_BASE_URL_PROD;

const axiosPrivate = axios.create({
  baseURL: `${baseURL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});
const STORAGE_KEY = "token";
axiosPrivate.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
export { axiosPrivate };
