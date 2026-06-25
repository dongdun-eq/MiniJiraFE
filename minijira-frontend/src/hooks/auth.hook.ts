import { useMutation } from "@tanstack/react-query";
import type { LoginDto, RegisterDto } from "../types/auth.type";
import authService from "../service/auth.service";
import { useToast } from "./useToast";
import {
  TOAST_TYPE_SUCCESS,
  TOAST_TYPE_ERROR,
  TOAST_SUCCESS_REGISTER,
  TOAST_ERROR_REGISTER_FAILED,
  TOAST_SUCCESS_LOGIN,
  TOAST_ERROR_LOGIN_FAILED,
} from "../constants";
import { getErrorMessage } from "../utils/errorUtils";

export const useAuthMutations = () => {
  const { showToast } = useToast();

  const registerMutation = useMutation({
    mutationFn: (dto: RegisterDto) => authService.register(dto),
    onSuccess: () => {
      showToast(TOAST_SUCCESS_REGISTER, TOAST_TYPE_SUCCESS);
    },
    onError: (err) => {
      showToast(
        getErrorMessage(err, TOAST_ERROR_REGISTER_FAILED),
        TOAST_TYPE_ERROR,
      );
    },
  });

  const loginMutation = useMutation({
    mutationFn: (dto: LoginDto) => authService.login(dto),
    onSuccess: () => {
      showToast(TOAST_SUCCESS_LOGIN, TOAST_TYPE_SUCCESS);
    },
    onError: (err) => {
      showToast(
        getErrorMessage(err, TOAST_ERROR_LOGIN_FAILED),
        TOAST_TYPE_ERROR,
      );
    },
  });

  return {
    register: registerMutation.mutateAsync, // dùng mutateAsync để Register.tsx await được
    isRegistering: registerMutation.isPending,

    login: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
  };
};
