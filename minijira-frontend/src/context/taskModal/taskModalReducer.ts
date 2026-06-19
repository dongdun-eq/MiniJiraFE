import type { TaskFormData } from "../../components/TaskModal/TaskModal";

export type TaskModalData = Partial<TaskFormData> & { id?: string };

export interface TaskModalState {
  isOpen: boolean;
  data: TaskModalData | null;
}

export type TaskModalAction =
  | { type: "OPEN_CREATE" }
  | { type: "OPEN_EDIT"; payload: TaskModalData & { id: string } }
  | { type: "CLOSE" };

export const initialTaskModalState: TaskModalState = {
  isOpen: false,
  data: null,
};

export const taskModalReducer = (
  state: TaskModalState,
  action: TaskModalAction,
) => {
  switch (action.type) {
    case "OPEN_CREATE":
      return { isOpen: true, data: null };
    case "OPEN_EDIT":
      return { isOpen: true, data: action.payload };
    case "CLOSE":
      return { ...state, isOpen: false };
    default:
      return state;
  }
};
