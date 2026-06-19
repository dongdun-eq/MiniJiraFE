import { createContext } from "react";
import type { TaskModalData, TaskModalState } from "./taskModalReducer";

interface ModalContextValue {
  state: TaskModalState;
  openCreate: () => void;
  openEdit: (data: TaskModalData & { id: string }) => void;
  close: () => void;
}

export const TaskModalContext = createContext<ModalContextValue | null>(null);
