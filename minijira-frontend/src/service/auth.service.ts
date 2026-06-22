import type { SingleResponse } from "../types/api.type";
import type {
  AuthenticationType,
  LoginDto,
  RegisterDto,
  UserType,
} from "../types/auth.type";
import api from "./api";

const BASE = "/api/auth";

const authService = {
  register: async (
    registerDto: RegisterDto,
  ): Promise<SingleResponse<UserType>> => {
    const res = await api.post<SingleResponse<UserType>>(
      `${BASE}/register`,
      registerDto,
    );
    return res.data;
  },

  login: async (
    loginDto: LoginDto,
  ): Promise<SingleResponse<AuthenticationType>> => {
    const res = await api.post<SingleResponse<AuthenticationType>>(
      `${BASE}/login`,
      loginDto,
    );
    return res.data;
  },

};

export default authService;
