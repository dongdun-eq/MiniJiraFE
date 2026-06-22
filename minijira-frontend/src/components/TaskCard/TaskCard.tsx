import React from "react";
import type { DetailTaskType } from "../../types/task.type";
import styles from "./TaskCard.module.css";
import { checkIsOverdue } from "../../helpers/task.helper";
import { getInitials } from "../../utils/nameUtils";

interface TaskCardProps {
  task: DetailTaskType;
  onClick?: (task: DetailTaskType) => void;
}

const PRIORITY_STYLE: Record<string, string> = {
  critical: styles.priorityCritical,
  high: styles.priorityHigh,
  medium: styles.priorityMedium,
  low: styles.priorityLow,
};

const PRIORITY_LABEL: Record<string, string> = {
  critical: "Critical",
  high: "High",
  medium: "Medium",
  low: "Low",
};

/*
 * ĐƠN GIẢN HÓA NHỜ @hello-pangea/dnd: không còn cần useSortable,
 * CSS.Transform, hay tự viết onPointerDown/onPointerUp để phân biệt
 * click vs kéo nữa. @hello-pangea/dnd's Draggable (ở Board.tsx) tự
 * gắn ref + draggableProps + dragHandleProps vào div BỌC NGOÀI
 * component này — toàn bộ logic kéo nằm ở tầng đó, TaskCard chỉ cần
 * render nội dung thuần + xử lý onClick bình thường, không xung đột
 * gì với việc kéo cả (vì dragHandleProps đã tách biệt rõ vùng nào
 * kích hoạt kéo, mặc định là TOÀN BỘ phần tử bọc ngoài — nếu muốn
 * giới hạn vùng kéo chỉ còn 1 handle nhỏ, xem ghi chú dưới).
 */
const TaskCard: React.FC<TaskCardProps> = ({ task, onClick }) => {
  const { id, title, priority, assignee, dueDate, status } = task;

  const isOverdue =
    dueDate && status !== "done" && checkIsOverdue(dueDate, status);

  const shortId = id.split("-").slice(-1)[0];

  return (
    <div
      className={`${styles.card} ${isOverdue ? styles.overdue : ""}`}
      role="listitem"
      tabIndex={0}
      onClick={() => onClick?.(task)}
      onKeyDown={(e) => e.key === "Enter" && onClick?.(task)}
      aria-label={title}
    >
      {/* Top row: id */}
      <div className={styles.topRow}>
        <span className={styles.taskId}>{shortId}</span>
        {isOverdue && <span className={styles.overdueBadge}>Overdue</span>}
      </div>

      {/* Title */}
      <p className={styles.title}>{title}</p>

      {/* Bottom row: priority + meta */}
      <div className={styles.bottomRow}>
        <span
          className={`${styles.priority} ${PRIORITY_STYLE[priority] ?? ""}`}
        >
          <span className={styles.priorityDot} />
          {PRIORITY_LABEL[priority]}
        </span>

        <div className={styles.meta}>
          {assignee && (
            <div className={styles.avatar} title={assignee.name}>
              {/* {assignee.avatarUrl ? (
                <img src={assignee.avatarUrl} alt={assignee.name} />
              ) : ( */}
              {getInitials(assignee.name)}
              {/* )} */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
