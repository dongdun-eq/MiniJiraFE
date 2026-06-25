import { IconClose, IconEdit, IconTask } from "../Icons/Icons";
import styles from "./TaskModal.module.css";
import {
  HEADER_TEXT_EDIT_TASK,
  HEADER_TEXT_CREATE_TASK,
  HEADER_ARIA_LABEL_CLOSE,
} from "../../constants";

interface Props {
  onClose: () => void;
  isEdit: boolean;
}

const TaskModalHeader = ({ onClose, isEdit }: Props) => {
  return (
    <div className={styles.header}>
      <div className={styles.headerIcon}>
        {isEdit ? <IconEdit /> : <IconTask />}
      </div>
      <h2 className={styles.headerTitle}>
        {isEdit ? HEADER_TEXT_EDIT_TASK : HEADER_TEXT_CREATE_TASK}
      </h2>
      <button
        className={styles.closeBtn}
        onClick={onClose}
        aria-label={HEADER_ARIA_LABEL_CLOSE}
      >
        <IconClose />
      </button>
    </div>
  );
};

export default TaskModalHeader;
