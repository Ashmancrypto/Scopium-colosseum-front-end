import axios from "axios";

const axiosPrivate = axios.create({
  baseURL: "https://launch.scopium.com/api",
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