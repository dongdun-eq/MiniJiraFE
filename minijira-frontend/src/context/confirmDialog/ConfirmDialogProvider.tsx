import { useRef, useState, type ReactNode } from "react";
import { ConfirmDialogContext, type ConfirmOptions } from "./confirmDialogContext";

interface Props {
  children: ReactNode;
}

export const ConfirmDialogProvider = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions | null>(null);
  const resolver = useRef<((value: boolean) => void) | null>(null);
  const confirm = (uOptions: ConfirmOptions) => {
    setOptions(uOptions);
    setIsOpen(true);
    return new Promise<boolean>((resolve) => {
      resolver.current = resolve;
    });
  };
  const handleConfirm = () => {
    setIsOpen(false);
    resolver.current?.(true);
  };
  const handleCancel = () => {
    setIsOpen(false);
    resolver.current?.(false);
  };
  return (
    <ConfirmDialogContext.Provider
      value={{
        confirm,
        dialogState: { isOpen, options },
        handleConfirm,
        handleCancel,
      }}
    >
      {children}
    </ConfirmDialogContext.Provider>
  );
};
