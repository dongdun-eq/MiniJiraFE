import React from "react";
import styles from "./LoadingFallback.module.css";

export const LoadingFallback: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.spinnerWrapper}>
        <div className={styles.spinnerOuter}></div>
        <div className={styles.spinnerInner}></div>
      </div>
      <h2 className={styles.title}>Đang tải dữ liệu...</h2>
      <p className={styles.subtitle}>Vui lòng đợi trong giây lát</p>
    </div>
  );
};

export default LoadingFallback;
