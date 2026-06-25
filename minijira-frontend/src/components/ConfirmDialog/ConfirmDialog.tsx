import React, { useEffect, useRef } from "react";
import styles from "./ConfirmDialog.module.css";
import {
  CONFIRM_DIALOG_DEFAULT_CONFIRM_LABEL,
  CONFIRM_DIALOG_DEFAULT_CANCEL_LABEL,
  KEYBOARD_KEY_ESCAPE,
  KEYBOARD_KEY_TAB,
  DIALOG_VARIANT_DANGER,
  DIALOG_VARIANT_PRIMARY,
  BODY_OVERFLOW_HIDDEN,
  BODY_OVERFLOW_UNSET,
} from "../../constants";

interface ConfirmDialogProps {
  isOpen: boolean;
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "primary";
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = CONFIRM_DIALOG_DEFAULT_CONFIRM_LABEL,
  cancelLabel = CONFIRM_DIALOG_DEFAULT_CANCEL_LABEL, 
  variant = DIALOG_VARIANT_PRIMARY,
  onConfirm,
  onCancel,
}) => {
  const cancelBtnRef = useRef<HTMLButtonElement>(null);
  const confirmBtnRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;

      const timer = setTimeout(() => {
        cancelBtnRef.current?.focus();
      }, 50);

      document.body.style.overflow = BODY_OVERFLOW_HIDDEN; 

      return () => {
        clearTimeout(timer);
        previousFocusRef.current?.focus();
        document.body.style.overflow = BODY_OVERFLOW_UNSET;
      };
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === KEYBOARD_KEY_ESCAPE) {
      onCancel();
      return;
    }

    if (e.key === KEYBOARD_KEY_TAB) {
      const cancelBtn = cancelBtnRef.current;
      const confirmBtn = confirmBtnRef.current;

      if (!cancelBtn || !confirmBtn) return;

      if (e.shiftKey && document.activeElement === cancelBtn) {
        confirmBtn.focus();
        e.preventDefault();
      } else if (!e.shiftKey && document.activeElement === confirmBtn) {
        cancelBtn.focus();
        e.preventDefault();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      onClick={onCancel}
      onKeyDown={handleKeyDown}
      tabIndex={-1} 
    >
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-message"
      >
        <h3 id="dialog-title" className={styles.title}>
          {title}
        </h3>
        <p id="dialog-message" className={styles.message}>
          {message}
        </p>

        <div className={styles.actions}>
          <button
            ref={cancelBtnRef}
            className={styles.cancelBtn}
            onClick={onCancel}
          >
            {cancelLabel}
          </button>
          <button
            ref={confirmBtnRef}
            className={`${styles.confirmBtn} ${
              variant === DIALOG_VARIANT_DANGER 
                ? styles.danger
                : styles.primary
            }`}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
