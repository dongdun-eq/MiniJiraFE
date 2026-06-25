import { useCallback, useEffect, useRef } from "react";
import styles from "./TaskModal.module.css";
import { useFormContext } from "react-hook-form";
import type { TaskFormData } from "./TaskModal";
import {
  FORM_FIELD_TITLE,
  HTML_ID_TASK_TITLE,
  HTML_ID_TITLE_ERROR,
  TITLE_FIELD_LABEL,
  TITLE_FIELD_PLACEHOLDER,
  TITLE_VALIDATION_REQUIRED,
} from "../../constants";

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
    const timer = setTimeout(() => {
      titleRef.current?.focus();
      resizeTitle();
    }, 80);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const {
    register,
    formState: { errors },
  } = useFormContext<TaskFormData>();

  const titleField = register(FORM_FIELD_TITLE, {
    required: TITLE_VALIDATION_REQUIRED,
  });

  return (
    <div className={styles.field}>
    
      <label className={styles.label} htmlFor={HTML_ID_TASK_TITLE}>
        {TITLE_FIELD_LABEL}
        <span className={styles.required}>*</span>
      </label>
      <textarea
        id={HTML_ID_TASK_TITLE} 
        className={`${styles.titleInput} ${errors.title ? styles.error : ""}`}
        placeholder={TITLE_FIELD_PLACEHOLDER} 
        rows={2}
        maxLength={200}
        aria-invalid={!!errors.title}
        aria-describedby={errors.title ? HTML_ID_TITLE_ERROR : undefined} 
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
      {errors.title && (
        <span className={styles.errorMsg} id={HTML_ID_TITLE_ERROR} role="alert">
          {errors.title.message}
        </span>
      )}
    </div>
  );
};

export default TaskModalTitleField;
