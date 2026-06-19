import { useFormContext } from "react-hook-form";
import styles from "./TaskModal.module.css";

const TaskModalDueDateField = () => {
  const { register } = useFormContext();

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor="task-due">
        Due Date
      </label>
      <input
        id="task-due"
        type="date"
        className={styles.dateInput}
        {...register("dueDate", {})}
      />
    </div>
  );
};

export default TaskModalDueDateField;
