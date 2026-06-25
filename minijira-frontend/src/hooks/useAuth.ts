import { fetchProfileThunk, loginThunk } from "../store/authThunk";
import {
  selectAuthError,
  selectAuthLoading,
  selectIsLoggedIn,
  selectUser,
} from "../store/selector";
import { logout } from "../store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "./useRedux";
import { getErrorMessage } from "../utils/errorUtils";
import { useToast } from "./useToast";
import {
  TOAST_TYPE_SUCCESS,
  TOAST_TYPE_ERROR,
  TOAST_TYPE_INFO,
  TOAST_SUCCESS_LOGIN,
  TOAST_SUCCESS_LOGOUT,
  TOAST_ERROR_LOGIN_FAILED,
  TOAST_ERROR_LOAD_PROFILE_FAILED,
} from "../constants";
import type { ToastType } from "../context/toast/toastContext";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);
  const { showToast } = useToast();

  const login = async (email: string, password: string) => {
    try {
      const result = await dispatch(loginThunk({ email, password })).unwrap();
      showToast(TOAST_SUCCESS_LOGIN, TOAST_TYPE_SUCCESS as ToastType);
      return result;
    } catch (err) {
      showToast(
        getErrorMessage(err, TOAST_ERROR_LOGIN_FAILED),
        TOAST_TYPE_ERROR as ToastType,
      );
      throw err;
    }
  };

  const loadProfile = async () => {
    try {
      const result = await dispatch(fetchProfileThunk()).unwrap();
      return result;
    } catch (err) {
      showToast(
        getErrorMessage(err, TOAST_ERROR_LOAD_PROFILE_FAILED),
        TOAST_TYPE_ERROR as ToastType,
      );
      throw err;
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    showToast(TOAST_SUCCESS_LOGOUT, TOAST_TYPE_INFO as ToastType);
  };

  return {
    user,
    isLoggedIn,
    loading,
    error,
    login,
    logout: handleLogout,
    loadProfile,
  };
};
