import { useCallback, useMemo, useRef, useState } from "react";
import {
  DURATION_MS,
  ToastContext,
  type ToastState,
  type ToastType,
} from "./toastContext";

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastState[]>([]);
  const timeoutsRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map(),
  );
  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timeout = timeoutsRef.current.get(id);
    if (timeout) {
      clearTimeout(timeout);
      timeoutsRef.current.delete(id);
    }
  }, []);
  const showToast = useCallback(
    (message: string, type: ToastType = "info") => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      const toast: ToastState = { id, message, type };

      setToasts((prev) => [...prev, toast]);

      const timeout = setTimeout(() => {
        dismissToast(id);
      }, DURATION_MS[type]);

      timeoutsRef.current.set(id, timeout);
    },
    [dismissToast],
  );
  const value = useMemo(
    () => ({ toasts, showToast, dismissToast }),
    [toasts, showToast, dismissToast],
  );
  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}
