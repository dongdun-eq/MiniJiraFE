import { createSlice } from "@reduxjs/toolkit";
import type { UserType } from "../../types/user.type";
import { fetchProfileThunk, loginThunk } from "../authThunk";
import { REDUX_SLICE_AUTH, LOCAL_STORAGE_KEY_TOKEN } from "../../constants";

interface AuthState {
  user: UserType | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: REDUX_SLICE_AUTH,
  initialState: initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      localStorage.removeItem(LOCAL_STORAGE_KEY_TOKEN);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchProfileThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.loading = false;
      })
      .addCase(fetchProfileThunk.rejected, (state) => {
        state.user = null;
        state.isLoggedIn = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
