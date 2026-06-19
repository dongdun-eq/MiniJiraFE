import axios from "axios";
import { DEFAULT_API_TIMEOUT_MS } from "../constants";

const BASE_URL = import.meta.env.API_URL ?? "http://localhost:3000";
const api = axios.create({
  baseURL: BASE_URL,
  timeout: DEFAULT_API_TIMEOUT_MS,
  headers: {
    "Content-Type": "application/json",
  },
});
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("accessToken");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error),
// );
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       localStorage.removeItem("access_token");

//       const currentPath = window.location.pathname;

//       window.location.href = `/login?from=${encodeURIComponent(currentPath)}`;
//     }

//     return Promise.reject(error);
//   },
// );
export default api;
