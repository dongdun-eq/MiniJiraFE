import { createAsyncThunk } from "@reduxjs/toolkit";
import type { LoginDto } from "../types/auth.type";
import authService from "../service/auth.service";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (dto: LoginDto, { rejectWithValue }) => {
    try {
      const { data } = await authService.login(dto);
       localStorage.setItem("accessToken", data.accessToken)
       const user = data.user;
      return { user };
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Undefined error",
      );
    }
  },
);
