import type { ListResponse } from "../types/api.type";
import type { UserType } from "../types/user.type";
import api from "./api";

const BASE = "/api/users";

const userService = {
  getAll: async (signal?: AbortSignal): Promise<ListResponse<UserType>> => {
    const res = await api.get<ListResponse<UserType>>(BASE, {
      signal,
    });
    return res.data;
  },
};

export default userService;
