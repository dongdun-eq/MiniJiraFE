// Base Axios Config
export const API_URL_ENV_KEY = "API_URL";
export const API_DEFAULT_BASE_URL = "http://localhost:3000";
export const API_HEADER_CONTENT_TYPE = "Content-Type";
export const API_HEADER_APPLICATION_JSON = "application/json";
export const API_HEADER_AUTHORIZATION = "Authorization";
export const AUTH_BEARER_PREFIX = "Bearer ";

// Endpoints
export const API_ENDPOINT_AUTH_BASE = "/api/auth";
export const API_ENDPOINT_AUTH_REGISTER = "/register";
export const API_ENDPOINT_AUTH_LOGIN = "/login";
export const API_ENDPOINT_AUTH_PROFILE = "/profile";

export const API_ENDPOINT_TASKS_BASE = "/api/tasks";
export const API_ENDPOINT_TASKS_STATUS_SUFFIX = "/status";

export const API_ENDPOINT_USERS_BASE = "/api/users";

// React Query Keys
export const QUERY_KEY_TASKS = "tasks";
export const QUERY_KEY_TASK = "task";
export const QUERY_KEY_USERS = "users";