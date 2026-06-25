import React from "react";
import styles from "./NotFound.module.css";

export const NotFound: React.FC = () => {
  // Hàm xử lý quay lại trang trước đó bằng lịch sử trình duyệt
  const handleGoBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.history.back();
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.errorCode}>404</div>

        <h1 className={styles.title}>Không tìm thấy trang</h1>
        <p className={styles.description}>
          Yêu cầu của bạn không tồn tại hoặc bo mạch công việc (Board) này đã bị
          xóa hoặc di chuyển sang một dự án khác.
        </p>

        {/* Các nút điều hướng nhanh */}
        <div className={styles.actions}>
          <a href="/" className={styles.buttonPrimary}>
            Về trang chủ
          </a>
          <a
            href="#back"
            onClick={handleGoBack}
            className={styles.buttonSecondary}
          >
            Quay lại
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
