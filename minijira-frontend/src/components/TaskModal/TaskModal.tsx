import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./TaskModal.module.css";
import TaskModalTitleField from "./TaskModalTitleField";
import TaskModalStatusField from "./TaskModalStatusField";
import TaskModalFooter from "./TaskModalFooter";
import TaskModalAssigneeField from "./TaskModalAssigneeField";
import TaskModalHeader from "./TaskModalHeader";
import TaskModalDueDateField from "./TaskModalDueDateField";
import TaskModalPriorityField from "./TaskModalPriorityField";
import { FormProvider, useForm } from "react-hook-form";
import type { Priority, Status } from "../../types";
import { useUsers } from "../../hooks/user.hook";
import { useTaskMutations } from "../../hooks/task.hook";
import { useConfirmDialog } from "../../hooks/useConfirmDialog";
import { useToast } from "../../hooks/useToast";
import {
  KEYBOARD_KEY_ESCAPE,
  KEYBOARD_KEY_TAB,
  TASK_FORM_DEFAULT_PRIORITY,
  TASK_FORM_DEFAULT_STATUS,
  TASK_FORM_DEFAULT_TITLE,
  TASK_FORM_DEFAULT_DUE_DATE,
  MODAL_CONFIRM_SAVE_TITLE,
  MODAL_CONFIRM_SAVE_MESSAGE,
  MODAL_CONFIRM_UPDATE_TITLE,
  MODAL_CONFIRM_UPDATE_MESSAGE,
  MODAL_CONFIRM_DELETE_TITLE,
  MODAL_CONFIRM_DELETE_MESSAGE,
  MODAL_CONFIRM_LABEL_CANCEL,
  MODAL_CONFIRM_LABEL_CONFIRM,
  DIALOG_VARIANT_DANGER,
  DIALOG_VARIANT_PRIMARY,
  TOAST_INFO_NO_CHANGES,
  TOAST_TYPE_INFO,
  TASK_MODAL_ARIA_ROLE,
  TASK_MODAL_ARIA_EDIT,
  TASK_MODAL_ARIA_CREATE,
  LOG_ERROR_PREFIX,
  LOG_ERROR_UPDATING,
  LOG_ERROR_CREATING,
} from "../../constants";

/* ---- Types ---- */
export interface TaskFormData {
  title: string;
  priority: Priority;
  assigneeId: string | null;
  dueDate: string;
  status: Status;
}

export interface TaskModalProps {
  initialData?: Partial<TaskFormData> & { id?: string };
  onClose: () => void;
  isOpen: boolean;
}

/* ---- Default state ---- */
const DEFAULT_FORM: TaskFormData = {
  title: TASK_FORM_DEFAULT_TITLE,
  priority: TASK_FORM_DEFAULT_PRIORITY as Priority,
  assigneeId: null,
  dueDate: TASK_FORM_DEFAULT_DUE_DATE,
  status: TASK_FORM_DEFAULT_STATUS as Status,
};

/* ============================================================
   TaskModal
   ============================================================ */
const TaskModal: React.FC<TaskModalProps> = ({
  initialData,
  onClose,
  isOpen,
}) => {
  let isEdit = false;
  let initialDataWithoutId: Partial<TaskFormData>;
  if (initialData) {
    const { id, ...rest } = initialData;
    isEdit = Boolean(id);
    initialDataWithoutId = { ...rest };
  }

  const [confirmDelete, setConfirmDelete] = useState(false);

  const { data: users } = useUsers();
  const { confirm } = useConfirmDialog();
  const { showToast } = useToast();

  const previousFocusRef = useRef<HTMLElement | null>(null);

  const {
    createTask,
    isCreating,
    updateTask,
    isUpdating,
    deleteTask,
    isDeleting,
  } = useTaskMutations({});

  const dialogRef = useRef<HTMLDivElement>(null);

  const methods = useForm<TaskFormData>({
    defaultValues: DEFAULT_FORM,
    mode: "onTouched",
  });

  const {
    handleSubmit,
    reset,
    formState: { isDirty },
  } = methods;

  const handleClose = useCallback(async () => {
    if (isDirty) {
      const uChoice = await confirm({
        title: MODAL_CONFIRM_SAVE_TITLE,
        message: MODAL_CONFIRM_SAVE_MESSAGE,
        cancelLabel: MODAL_CONFIRM_LABEL_CANCEL,
        confirmLabel: MODAL_CONFIRM_LABEL_CONFIRM,
        variant: DIALOG_VARIANT_DANGER,
      });
      if (!uChoice) return;
    }
    onClose();
  }, [confirm, isDirty, onClose]);

  /* Focus title on open */
  useEffect(() => {
    if (!isOpen) return;

    reset({
      ...DEFAULT_FORM,
      ...initialDataWithoutId,
      dueDate: initialData?.dueDate ? initialData.dueDate.slice(0, 10) : "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData, isOpen, reset]);

  /* Close on Escape */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === KEYBOARD_KEY_ESCAPE) {
        handleClose();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [handleClose, isOpen]);

  /* Trap focus */
  useEffect(() => {
    if (!isOpen || !dialogRef.current) return;
    previousFocusRef.current = document.activeElement as HTMLElement;
    const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
      'button, input, textarea, select, [tabindex]:not([tabindex="-1"])',
    );

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const handler = (e: KeyboardEvent) => {
      // 🌟 Thay thế magic string "Tab"
      if (e.key !== KEYBOARD_KEY_TAB) return;
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
    return () => {
      document.removeEventListener("keydown", handler);
      previousFocusRef.current?.focus();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const onSubmit = async (data: TaskFormData) => {
    try {
      if (!isEdit) {
        await createTask({ ...data });
        onClose();
      } else {
        if (isDirty) {
          const uChoice = await confirm({
            title: MODAL_CONFIRM_UPDATE_TITLE,
            message: MODAL_CONFIRM_UPDATE_MESSAGE,
            cancelLabel: MODAL_CONFIRM_LABEL_CANCEL,
            confirmLabel: MODAL_CONFIRM_LABEL_CONFIRM,
            variant: DIALOG_VARIANT_PRIMARY,
          });

          if (uChoice) {
            updateTask({ id: initialData?.id ?? "", dto: { ...data } });
            onClose();
          }
        } else {
          showToast(TOAST_INFO_NO_CHANGES, TOAST_TYPE_INFO);
        }
      }
    } catch {
      console.log(
        `${LOG_ERROR_PREFIX}${isEdit ? LOG_ERROR_UPDATING : LOG_ERROR_CREATING}`,
      );
    }
  };

  const handleDelete = async () => {
    const uChoice = await confirm({
      title: MODAL_CONFIRM_DELETE_TITLE,
      message: MODAL_CONFIRM_DELETE_MESSAGE,
      cancelLabel: MODAL_CONFIRM_LABEL_CANCEL,
      confirmLabel: MODAL_CONFIRM_LABEL_CONFIRM,
      variant: DIALOG_VARIANT_DANGER,
    });

    if (uChoice) {
      deleteTask(initialData?.id || "");
      onClose();
    }
  };

  /* ---- Render ---- */
  return (
    <div
      className={styles.backdrop}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      role={TASK_MODAL_ARIA_ROLE}
      aria-modal="true"
      aria-label={isEdit ? TASK_MODAL_ARIA_EDIT : TASK_MODAL_ARIA_CREATE} // 🌟 Thay thế nhãn ARIA
    >
      <div className={styles.dialog} ref={dialogRef}>
        <TaskModalHeader isEdit={isEdit} onClose={handleClose} />

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
              <TaskModalAssigneeField users={users?.data ?? null} />
            </div>

            {/* Footer */}
            <TaskModalFooter
              confirmDelete={confirmDelete}
              setConfirmDelete={setConfirmDelete}
              handleDelete={handleDelete}
              isEdit={isEdit}
              loading={isCreating || isUpdating || isDeleting}
              onClose={handleClose}
            />
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default TaskModal;
