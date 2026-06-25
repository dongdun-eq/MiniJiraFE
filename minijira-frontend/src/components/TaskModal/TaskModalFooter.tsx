import type { Dispatch, SetStateAction } from "react";
import styles from "./TaskModal.module.css";
import {
  FOOTER_BTN_TEXT_DELETE,
  FOOTER_BTN_TEXT_CANCEL,
  FOOTER_BTN_TEXT_SAVING,
  FOOTER_BTN_TEXT_SAVE_CHANGES,
  FOOTER_BTN_TEXT_CREATE_TASK,
} from "../../constants";

interface Props {
  isEdit: boolean;
  loading: boolean;
  handleDelete: () => void;
  confirmDelete: boolean;
  setConfirmDelete: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
}

const TaskModalFooter = ({ isEdit, loading, handleDelete, onClose }: Props) => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerLeft}>
        {isEdit && (
          <button
            type="button"
            className={styles.btnDanger}
            onClick={handleDelete}
          >
            {FOOTER_BTN_TEXT_DELETE} 
          </button>
        )}
      </div>

      <div className={styles.footerRight}>
        <button type="button" className={styles.btnGhost} onClick={onClose}>
          {FOOTER_BTN_TEXT_CANCEL} 
        </button>
        <button type="submit" className={styles.btnPrimary} disabled={loading}>
          {loading ? (
            <>
              <span className={styles.spinner} /> {FOOTER_BTN_TEXT_SAVING}{" "}
            </>
          ) : isEdit ? (
            FOOTER_BTN_TEXT_SAVE_CHANGES 
          ) : (
            FOOTER_BTN_TEXT_CREATE_TASK 
          )}
        </button>
      </div>
    </div>
  );
};

export default TaskModalFooter;
