import { useFormContext, useWatch } from "react-hook-form";
import { PRIORITY_OPTIONS } from "../../data/taskModalStaticData";

import styles from "./TaskModal.module.css";
import { IconChevron } from "../Icons/Icons";
import type { TaskFormData } from "./TaskModal";

const TaskModalPriorityField = () => {
  const { register, control } = useFormContext<TaskFormData>();

  const priorityValue = useWatch({
    control,
    name: "priority",
  });

  const priorityMeta = PRIORITY_OPTIONS.find((p) => p.value === priorityValue)!;

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor="task-priority">
        Priority
      </label>
      <div className={styles.priorityDisplay}>
        <select
          id="task-priority"
          className={styles.prioritySelect}
          {...register("priority", {})}
          aria-label="Priority"
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
