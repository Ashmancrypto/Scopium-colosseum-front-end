import axios from "axios";

export const axiosPublic = axios.create({
  baseURL: "https://launch.scopium.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});