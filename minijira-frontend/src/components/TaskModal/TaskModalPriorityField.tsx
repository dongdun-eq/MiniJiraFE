import { useFormContext, useWatch } from "react-hook-form";
import { PRIORITY_OPTIONS } from "../../data/taskModalStaticData";

import styles from "./TaskModal.module.css";
import { IconChevron } from "../Icons/Icons";
import type { TaskFormData } from "./TaskModal";
import {
  FORM_FIELD_PRIORITY,
  HTML_ID_TASK_PRIORITY,
  PRIORITY_FIELD_LABEL,
} from "../../constants";

const TaskModalPriorityField = () => {
  const { register, control } = useFormContext<TaskFormData>();

  const priorityValue = useWatch({
    control,
    name: FORM_FIELD_PRIORITY,
  });

  const priorityMeta = PRIORITY_OPTIONS.find((p) => p.value === priorityValue)!;

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={HTML_ID_TASK_PRIORITY}>
        {PRIORITY_FIELD_LABEL}
      </label>
      <div className={styles.priorityDisplay}>
        <select
          id={HTML_ID_TASK_PRIORITY} 
          className={styles.prioritySelect}
          {...register(FORM_FIELD_PRIORITY, {})} 
          aria-label={PRIORITY_FIELD_LABEL} 
        >
          {PRIORITY_OPTIONS.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
        <span className={`${styles.priorityDot} ${priorityMeta.dotClass}`} />
        <span className={`${styles.priorityLabel} ${priorityMeta.labelClass}`}>
          {priorityMeta.label}
        </span>
        <IconChevron />
      </div>
    </div>
  );
};

export default TaskModalPriorityField;
