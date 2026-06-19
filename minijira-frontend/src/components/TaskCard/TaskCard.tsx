import React from "react";
import styles from "./TaskCard.module.css";
import { getInitials } from "../../utils/nameUtils";
import { checkIsOverdue } from "../../helpers/task.helper";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IconDragHandle } from "../Icons/Icons";
import type { DetailTaskType } from "../../types/task.type";

interface TaskCardProps {
  task: DetailTaskType;
  onClick?: (task: DetailTaskType) => void;
  dragOverlay?: boolean;
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

const TaskCard: React.FC<TaskCardProps> = ({ task, onClick, dragOverlay }) => {
  const { id, title, priority, assignee, dueDate, status } = task;

  const isOverdue = dueDate && status !== "done" && checkIsOverdue(dueDate);

  const shortId = id.split("-").slice(-1)[0];

  const sortable = useSortable({ id, disabled: dragOverlay });

  const style = dragOverlay
    ? undefined
    : {
        transform: CSS.Transform.toString(sortable.transform),
        transition: sortable.transition,
        opacity: sortable.isDragging ? 0.4 : 1,
      };

  return (
    <div
      ref={dragOverlay ? undefined : sortable.setNodeRef}
      style={style}
      className={`${styles.card} ${dragOverlay ? styles.dragOverlay : ""} ${isOverdue ? styles.overdue : ""}`}
      role="listitem"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick?.(task)}
      aria-label={title}
      {...(dragOverlay ? {} : sortable.attributes)}
      onClick={() => onClick?.(task)}
    >
      {!dragOverlay && (
        <div
          className={styles.dragHandle}
          {...sortable.listeners}
          aria-label="Drag to move task"
        >
          <IconDragHandle />
        </div>
      )}

      {/* Top row: type + id */}
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
          {/* {assignee && (
            <div className={styles.avatar} title={assignee.name}>
              {assignee.avatarUrl ? (
                <img src={assignee.avatarUrl} alt={assignee.name} />
              ) : (
                getInitials(assignee.name)
              )}
            </div>
          )} */}
          {assignee && (
            <div className={styles.avatar} title={assignee.name}>
              {getInitials(assignee.name)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
