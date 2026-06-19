import { useCallback, useEffect, useRef } from "react";
import styles from "./TaskModal.module.css";
import { useFormContext } from "react-hook-form";
import type { TaskFormData } from "./TaskModal";

interface Props {
  isOpen: boolean;
}

const TaskModalTitleField = ({ isOpen }: Props) => {
  const titleRef = useRef<HTMLTextAreaElement>(null);

  /* Auto-resize textarea */
  const resizeTitle = useCallback(() => {
    const el = titleRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, []);

  useEffect(() => {
    setTimeout(() => {
      titleRef.current?.focus();
      resizeTitle();
    }, 80);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const {
    register,
    formState: { errors },
  } = useFormContext<TaskFormData>();

  const titleField = register("title", {
    required: "Title is required",
  });

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor="task-title">
        Title<span className={styles.required}>*</span>
      </label>
      <textarea
        id="task-title"
        className={`${styles.titleInput} ${errors.title ? styles.error : ""}`}
        placeholder="What needs to be done?"
        rows={2}
        maxLength={200}
        aria-invalid={!!errors.title}
        aria-describedby={errors.title ? "title-error" : undefined}
        {...titleField}
        onChange={(e) => {
          titleField.onChange(e);
          resizeTitle();
        }}
        ref={(el) => {
          titleField.ref(el);
          titleRef.current = el;
        }}
      />
      {errors && errors && (
        <span className={styles.errorMsg} id="title-error" role="alert">
          {errors.title?.message}
        </span>
      )}
    </div>
  );
};

export default TaskModalTitleField;
