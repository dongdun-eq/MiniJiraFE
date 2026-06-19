import type { Dispatch, SetStateAction } from "react";
import styles from "./TaskModal.module.css";

interface Props {
  isEdit: boolean;
  loading: boolean;
  onDelete?: (id: string) => void;
  handleDelete: () => void;
  confirmDelete: boolean;
  setConfirmDelete: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
}

const TaskModalFooter = ({
  isEdit,
  loading,
  onDelete,
  handleDelete,
  confirmDelete,
  setConfirmDelete,
  onClose,
}: Props) => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerLeft}>
        {isEdit && onDelete && (
          <button
          type="button"
            className={styles.btnDanger}
            onClick={handleDelete}
            onBlur={() => setConfirmDelete(false)}
          >
            {confirmDelete ? "Confirm delete?" : "Delete"}
          </button>
        )}
      </div>

      <div className={styles.footerRight}>
        <button type="button" className={styles.btnGhost} onClick={onClose}>
          Cancel
        </button>
        <button
          type="submit"
          className={styles.btnPrimary}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className={styles.spinner} /> Saving…
            </>
          ) : isEdit ? (
            "Save changes"
          ) : (
            "Create task"
          )}
        </button>
      </div>
    </div>
  );
};

export default TaskModalFooter;
