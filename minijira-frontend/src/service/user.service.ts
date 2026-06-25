import type { ListResponse } from "../types/api.type";
import type { UserType } from "../types/user.type";
import api from "./api";
import { API_ENDPOINT_USERS_BASE } from "../constants";

const userService = {
  getAll: async (signal?: AbortSignal): Promise<ListResponse<UserType>> => {
    const res = await api.get<ListResponse<UserType>>(API_ENDPOINT_USERS_BASE, {
      signal,
    });
    return res.data;
  },
};

export default userService;
