import { useContext } from "react";
import { ConfirmDialogContext } from "../context/confirmDialog/confirmDialogContext";
import { ERROR_CONFIRM_DIALOG_CONTEXT_OUTSIDE_PROVIDER } from "../constants";

export const useConfirmDialog = () => {
  const context = useContext(ConfirmDialogContext);
  if (!context) throw new Error(ERROR_CONFIRM_DIALOG_CONTEXT_OUTSIDE_PROVIDER);
  return context;
};