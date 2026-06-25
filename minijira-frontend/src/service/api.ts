import axios from "axios";
import {
  DEFAULT_API_TIMEOUT_MS,
  API_DEFAULT_BASE_URL,
  API_HEADER_CONTENT_TYPE,
  API_HEADER_APPLICATION_JSON,
  API_HEADER_AUTHORIZATION,
  LOCAL_STORAGE_KEY_ACCESS_TOKEN,
  AUTH_BEARER_PREFIX,
} from "../constants";

const BASE_URL = import.meta.env.API_URL ?? API_DEFAULT_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  timeout: DEFAULT_API_TIMEOUT_MS,
  headers: {
    [API_HEADER_CONTENT_TYPE]: API_HEADER_APPLICATION_JSON,
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN);
    if (token && config.headers) {
      config.headers[API_HEADER_AUTHORIZATION] =
        `${AUTH_BEARER_PREFIX}${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
