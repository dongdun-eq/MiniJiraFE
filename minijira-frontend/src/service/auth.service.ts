import type { SingleResponse } from "../types/api.type";
import type {
  AuthenticationType,
  LoginDto,
  RegisterDto,
  UserType,
} from "../types/auth.type";
import api from "./api";
import {
  API_ENDPOINT_AUTH_BASE,
  API_ENDPOINT_AUTH_REGISTER,
  API_ENDPOINT_AUTH_LOGIN,
  API_ENDPOINT_AUTH_PROFILE,
} from "../constants";

const authService = {
  register: async (
    registerDto: RegisterDto,
  ): Promise<SingleResponse<UserType>> => {
    const res = await api.post<SingleResponse<UserType>>(
      `${API_ENDPOINT_AUTH_BASE}${API_ENDPOINT_AUTH_REGISTER}`,
      registerDto,
    );
    return res.data;
  },

  login: async (
    loginDto: LoginDto,
  ): Promise<SingleResponse<AuthenticationType>> => {
    const res = await api.post<SingleResponse<AuthenticationType>>(
      `${API_ENDPOINT_AUTH_BASE}${API_ENDPOINT_AUTH_LOGIN}`,
      loginDto,
    );
    return res.data;
  },

  getProfile: async (): Promise<SingleResponse<UserType>> => {
    const res = await api.get<SingleResponse<UserType>>(
      `${API_ENDPOINT_AUTH_BASE}${API_ENDPOINT_AUTH_PROFILE}`,
    );
    return res.data;
  },
};

export default authService;
