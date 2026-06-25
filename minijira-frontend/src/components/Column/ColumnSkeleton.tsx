import React, { type ReactNode } from "react";
import styles from "./Column.module.css";

interface ColumnSkeletonProps {
  children: ReactNode;
}

const ColumnSkeleton: React.FC<ColumnSkeletonProps> = ({
  children,
}) => {
  return (
    <div className={styles.column}>
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.dot} aria-hidden="true" />
        <span className={styles.title}></span>
        <span className={styles.badge} style={{ opacity: 0 }} />
      </div>

      <div className={styles.taskList} role="presentation">
        {children}
      </div>
    </div>
  );
};

export default ColumnSkeleton;
