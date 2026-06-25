import { useContext } from "react";
import {
  ToastContext,
  type ToastContextValue,
} from "../context/toast/toastContext";
import { ERROR_TOAST_CONTEXT_OUTSIDE_PROVIDER } from "../constants";

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error(ERROR_TOAST_CONTEXT_OUTSIDE_PROVIDER);
  }
  return ctx;
}
