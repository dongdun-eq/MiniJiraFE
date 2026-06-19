import { IconFilter, IconGrid, IconList } from "../Icons/Icons";
import styles from "./BoardToolBar.module.css"

const BoardToolBar = () => {
  return (
    <div className={styles.toolbar}>
      <div className={styles.filterGroup}>
        <button className={styles.filterBtn}>
          <IconFilter />
          Filter
        </button>
        <button className={styles.filterBtn}>Priority</button>
        <button className={styles.filterBtn}>Assignee</button>
      </div>
      <div className={styles.toolbarSpacer} />
      <div className={styles.viewToggle}>
        <button className={`${styles.viewBtn} ${styles.active}`}>
          <IconGrid />
        </button>
        <button className={styles.viewBtn}>
          <IconList />
        </button>
      </div>
    </div>
  );
};

export default BoardToolBar;
