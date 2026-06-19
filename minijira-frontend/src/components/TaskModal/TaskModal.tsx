import React, { useEffect, useRef, useState } from "react";
import styles from "./TaskModal.module.css";
import TaskModalTitleField from "./TaskModalTitleField";
import TaskModalStatusField from "./TaskModalStatusField";
import TaskModalFooter from "./TaskModalFooter";
import TaskModalAssigneeField from "./TaskModalAssigneeField";
import TaskModelHeader from "./TaskModalHeader";
import TaskModalDueDateField from "./TaskModalDueDateField";
import TaskModalPriorityField from "./TaskModalPriorityField";
import { FormProvider, useForm } from "react-hook-form";
import type { Priority, Status } from "../../types";

/* ---- Types ---- */
export interface TaskFormData {
  title: string;
  priority: Priority;
  assigneeId: string | null;
  dueDate: string; // ISO date string "YYYY-MM-DD"
  status: Status;
}

export interface TaskModalProps {
  /** Pass a task to open in edit mode; undefined = create mode */
  initialData?: Partial<TaskFormData> & { id?: string };
  onDelete?: (id: string) => void;
  onClose: () => void;
  isOpen: boolean;
}

/* ---- Default state ---- */
const DEFAULT_FORM: TaskFormData = {
  title: "",
  priority: "medium",
  assigneeId: null,
  dueDate: "",
  status: "todo",
};

/* ============================================================
   TaskModal
   ============================================================ */
const TaskModal: React.FC<TaskModalProps> = ({
  initialData,
  onDelete,
  onClose,
  isOpen,
}) => {
  const isEdit = Boolean(initialData?.id);

  const [loading, setLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const dialogRef = useRef<HTMLDivElement>(null);

  const methods = useForm<TaskFormData>({
    defaultValues: DEFAULT_FORM,
    mode: "onTouched",
  });

  const { handleSubmit, reset } = methods;

  /* Focus title on open */
  useEffect(() => {
    if (!isOpen) return;
    reset({ ...DEFAULT_FORM, ...initialData });
  }, [initialData, isOpen, reset]);

  /* Close on Escape */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  /* Trap focus */
  useEffect(() => {
    if (!isOpen || !dialogRef.current) return;
    const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
      'button, input, textarea, select, [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const handler = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen]);

  if (!isOpen) return null;

  const onSubmit = async () => {
    setLoading(true);
    try {
      console.log("Successfully");
      console.log(methods.formState);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    onDelete?.(initialData!.id!);
    onClose();
  };

  /* ---- Render ---- */
  return (
    <div
      className={styles.backdrop}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={isEdit ? "Edit task" : "Create task"}
    >
      <div className={styles.dialog} ref={dialogRef}>
        <TaskModelHeader isEdit={isEdit} onClose={onClose} />

        <FormProvider {...methods}>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            {/* Body */}
            <div className={styles.body}>
              <TaskModalTitleField isOpen={isOpen} />

              {/* Status */}
              <TaskModalStatusField />

              {/* Priority + Due date */}
              <div className={styles.row}>
                <TaskModalPriorityField />

                <TaskModalDueDateField />
              </div>

              {/* Assignee */}
              <TaskModalAssigneeField />
            </div>

            {/* Footer */}
            <TaskModalFooter
              confirmDelete={confirmDelete}
              setConfirmDelete={setConfirmDelete}
              handleDelete={handleDelete}
              isEdit={isEdit}
              loading={loading}
              onClose={onClose}
              onDelete={onDelete}
            />
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default TaskModal;
