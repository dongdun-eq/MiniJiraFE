import { createContext } from "react";

export type ToastType = "success" | "error" | "info";

export interface ToastState {
  id: string;
  message: string;
  type: ToastType;
}

export const DURATION_MS: Record<ToastType, number> = {
  success: 3000,
  info: 3500,
  error: 5000,
};

export interface ToastContextValue {
  toasts: ToastState[];
  showToast: (message: string, type?: ToastType) => void;
  dismissToast: (id: string) => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);
