import React from "react";
import styles from "./TaskCard.module.css";

const TaskCardSkeleton: React.FC = () => {
  return (
    <div className={`${styles.card} ${styles.skeletonCard}`} aria-hidden="true">
      <div className={styles.topRow}>
        <div className={`${styles.skeleton} ${styles.skeletonId}`} />
      </div>

      <div className={styles.skeletonTitleGroup}>
        <div className={`${styles.skeleton} ${styles.skeletonTitle}`} />
        <div className={`${styles.skeleton} ${styles.skeletonTitleShort}`} />
      </div>

      <div className={styles.bottomRow}>
        <div className={`${styles.skeleton} ${styles.skeletonPriority}`} />
        <div className={styles.meta}>
          <div className={`${styles.skeleton} ${styles.skeletonAvatar}`} />
        </div>
      </div>
    </div>
  );
};

export default TaskCardSkeleton;
