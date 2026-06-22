import { loginThunk } from "../store/authThunk";
import { selectAuthError, selectAuthLoading, selectIsLoggedIn, selectUser } from "../store/selector";
import { logout } from "../store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "./useRedux";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  return {
    user,
    isLoggedIn,
    loading,
    error,
    login: (email: string, password: string) =>
      dispatch(loginThunk({ email, password })).unwrap(),
    logout: () => dispatch(logout()),
  };
};
