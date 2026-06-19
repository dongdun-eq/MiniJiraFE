import { useContext } from "react";
import { TaskModalContext } from "../context/taskModal/taskModalContext";

export function useTaskModalContext() {
  const ctx = useContext(TaskModalContext);

  if (!ctx) {
    throw new Error("useModal must be used inside <ModalProvider>");
  }
  return ctx;
}
