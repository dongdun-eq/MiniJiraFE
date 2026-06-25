import { createAsyncThunk } from "@reduxjs/toolkit";
import type { LoginDto } from "../types/auth.type";
import authService from "../service/auth.service";
import {
  THUNK_TYPE_AUTH_LOGIN,
  THUNK_TYPE_AUTH_PROFILE,
  LOCAL_STORAGE_KEY_ACCESS_TOKEN,
  ERROR_UNDEFINED,
  ERROR_SESSION_EXPIRED,
} from "../constants";

export const loginThunk = createAsyncThunk(
  THUNK_TYPE_AUTH_LOGIN,
  async (dto: LoginDto, { rejectWithValue }) => {
    try {
      const { data } = await authService.login(dto);
      localStorage.setItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN, data.accessToken);
      const user = data.user;
      return { user };
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : ERROR_UNDEFINED,
      );
    }
  },
);

export const fetchProfileThunk = createAsyncThunk(
  THUNK_TYPE_AUTH_PROFILE,
  async (_, { rejectWithValue }) => {
    try {
      const { data: user } = await authService.getProfile();
      return { user };
    } catch {
      localStorage.removeItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN);
      return rejectWithValue(ERROR_SESSION_EXPIRED);
    }
  },
);
