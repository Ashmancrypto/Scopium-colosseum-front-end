import axios from "axios";

// Get environment variables
const isTestMode = import.meta.env.VITE_TEST_MODE === 'true';
const baseURL = isTestMode 
  ? import.meta.env.VITE_API_BASE_URL_DEV 
  : import.meta.env.VITE_API_BASE_URL_PROD;

export const axiosPublic = axios.create({
  baseURL: `${baseURL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});
