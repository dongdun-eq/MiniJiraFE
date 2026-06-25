import { createContext } from "react";

export interface ConfirmOptions {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "primary";
}

export interface ConfirmDialogContextValue {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
  dialogState: {
    isOpen: boolean;
    options: ConfirmOptions | null;
  };
  handleConfirm: () => void;
  handleCancel: () => void;
}

export const ConfirmDialogContext = createContext<ConfirmDialogContextValue | null>(
  null,
);
