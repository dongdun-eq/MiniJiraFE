import { useContext } from "react";
import { TaskModalContext } from "../context/taskModal/taskModalContext";
import { ERROR_TASK_MODAL_CONTEXT_OUTSIDE_PROVIDER } from "../constants";

export function useTaskModalContext() {
  const ctx = useContext(TaskModalContext);

  if (!ctx) {
    throw new Error(ERROR_TASK_MODAL_CONTEXT_OUTSIDE_PROVIDER);
  }
  return ctx;
}
