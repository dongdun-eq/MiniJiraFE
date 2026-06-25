import type { ToastState as ToastT } from "../../context/toast/toastContext";
import { useToast } from "../../hooks/useToast";
import { IconClose, IconError, IconInfo, IconSuccess } from "../Icons/Icons";
import styles from "./ToastContainer.module.css";
import {
  TOAST_TYPE_SUCCESS,
  TOAST_TYPE_ERROR,
  TOAST_TYPE_INFO,
  TOAST_CONTAINER_ARIA_ROLE,
  TOAST_ARIA_ROLE_ALERT,
  TOAST_ARIA_ROLE_STATUS,
  TOAST_CONTAINER_ARIA_LABEL,
  TOAST_BTN_ARIA_LABEL_DISMISS,
} from "../../constants";

const ICON_MAP: Record<ToastT["type"], React.ReactNode> = {
  [TOAST_TYPE_SUCCESS]: <IconSuccess />,
  [TOAST_TYPE_ERROR]: <IconError />,
  [TOAST_TYPE_INFO]: <IconInfo />,
};

const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div
      className={styles.container}
      role={TOAST_CONTAINER_ARIA_ROLE}
      aria-live="polite"
      aria-label={TOAST_CONTAINER_ARIA_LABEL} 
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${styles.toast} ${styles[toast.type]}`}
          role={
            toast.type === TOAST_TYPE_ERROR
              ? TOAST_ARIA_ROLE_ALERT
              : TOAST_ARIA_ROLE_STATUS
          }
        >
          <span className={styles.icon}>{ICON_MAP[toast.type]}</span>
          <span className={styles.message}>{toast.message}</span>
          <button
            className={styles.closeBtn}
            onClick={() => dismissToast(toast.id)}
            aria-label={TOAST_BTN_ARIA_LABEL_DISMISS}
          >
            <IconClose />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
