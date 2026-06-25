import { useFormContext } from "react-hook-form";
import styles from "./TaskModal.module.css";
import {
  FORM_FIELD_DUE_DATE,
  HTML_ID_TASK_DUE,
  DUE_DATE_FIELD_LABEL,
} from "../../constants";

const TaskModalDueDateField = () => {
  const { register } = useFormContext();

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={HTML_ID_TASK_DUE}>
        {DUE_DATE_FIELD_LABEL}
      </label>
      <input
        id={HTML_ID_TASK_DUE} 
        type="date"
        className={styles.dateInput}
        {...register(FORM_FIELD_DUE_DATE, {})} 
      />
    </div>
  );
};

export default TaskModalDueDateField;
