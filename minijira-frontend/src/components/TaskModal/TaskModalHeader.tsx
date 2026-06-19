import { IconClose, IconEdit, IconTask } from "../Icons/Icons";
import styles from "./TaskModal.module.css";

interface Props {
  onClose: () => void;
  isEdit: boolean;
}

const TaskModelHeader = ({ onClose, isEdit }: Props) => {
  return (
    <div className={styles.header}>
      <div className={styles.headerIcon}>
        {isEdit ? <IconEdit /> : <IconTask />}
      </div>
      <h2 className={styles.headerTitle}>
        {isEdit ? "Edit Task" : "Create Task"}
      </h2>
      <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
        <IconClose />
      </button>
    </div>
  );
};

export default TaskModelHeader;
