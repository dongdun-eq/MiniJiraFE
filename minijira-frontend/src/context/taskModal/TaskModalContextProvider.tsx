import { useCallback, useMemo, useReducer, type ReactNode } from "react";
import { TaskModalContext } from "./taskModalContext";
import {
  initialTaskModalState,
  taskModalReducer,
  type TaskModalData,
} from "./taskModalReducer";
import {
  TASK_MODAL_ACTION_OPEN_CREATE,
  TASK_MODAL_ACTION_OPEN_EDIT,
  TASK_MODAL_ACTION_CLOSE,
} from "../../constants";

const TaskModalContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(taskModalReducer, initialTaskModalState);

  const openCreate = useCallback(() => {
    dispatch({ type: TASK_MODAL_ACTION_OPEN_CREATE });
  }, []);

  const openEdit = useCallback((data: TaskModalData & { id: string }) => {
    dispatch({ type: TASK_MODAL_ACTION_OPEN_EDIT, payload: data });
  }, []);

  const close = useCallback(() => {
    dispatch({ type: TASK_MODAL_ACTION_CLOSE });
  }, []);

  const value = useMemo(
    () => ({ state, openCreate, openEdit, close }),
    [state, openCreate, openEdit, close],
  );

  return (
    <TaskModalContext.Provider value={value}>
      {children}
    </TaskModalContext.Provider>
  );
};

export default TaskModalContextProvider;
