import React from "react";
import type { DetailTaskType } from "../../types/task.type";
import styles from "./TaskCard.module.css";
import { checkIsOverdue } from "../../helpers/task.helper";
import { getInitials } from "../../utils/nameUtils";
import {
  KEYBOARD_KEY_ENTER,
  TASK_STATUS_DONE,
  TASK_CARD_ARIA_PREFIX,
  TASK_CARD_ARIA_OVERDUE,
  TASK_CARD_ARIA_TITLE_LABEL,
  TASK_CARD_ARIA_PRIORITY_LABEL,
  TASK_CARD_ARIA_ASSIGNED_TO,
  TASK_CARD_ARIA_UNASSIGNED,
  TASK_CARD_ARIA_SHORTCUT_HINT,
  TASK_PRIORITY_CRITICAL,
  TASK_PRIORITY_HIGH,
  TASK_PRIORITY_MEDIUM,
  TASK_PRIORITY_LOW,
  TASK_PRIORITY_NONE,
} from "../../constants";

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
  critical: TASK_PRIORITY_CRITICAL,
  high: TASK_PRIORITY_HIGH,
  medium: TASK_PRIORITY_MEDIUM,
  low: TASK_PRIORITY_LOW,
};

const TaskCard: React.FC<TaskCardProps> = ({ task, onClick }) => {
  const { id, title, priority, assignee, dueDate, status } = task;

  const isOverdue =
    dueDate && status !== TASK_STATUS_DONE && checkIsOverdue(dueDate, status);

  const shortId = id.split("-").slice(-1)[0];

  const ariaDescription = [
    `${TASK_CARD_ARIA_PREFIX} ${shortId}`,
    isOverdue ? TASK_CARD_ARIA_OVERDUE : "",
    `${TASK_CARD_ARIA_TITLE_LABEL} ${title}`,
    `${TASK_CARD_ARIA_PRIORITY_LABEL} ${PRIORITY_LABEL[priority] ?? TASK_PRIORITY_NONE}`,
    assignee
      ? `${TASK_CARD_ARIA_ASSIGNED_TO} ${assignee.name}`
      : TASK_CARD_ARIA_UNASSIGNED,
    TASK_CARD_ARIA_SHORTCUT_HINT,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div
      className={`${styles.card} ${isOverdue ? styles.overdue : ""}`}
      role="button"
      tabIndex={0}
      onClick={() => onClick?.(task)}
      onKeyDown={(e) => e.key === KEYBOARD_KEY_ENTER && onClick?.(task)}
      aria-label={ariaDescription}
    >
      <div aria-hidden="true" className={styles.topRow}>
        <span className={styles.taskId}>{shortId}</span>
        {isOverdue && (
          <span className={styles.overdueBadge}>{TASK_CARD_ARIA_OVERDUE}</span>
        )}
      </div>

      <p aria-hidden="true" className={styles.title}>
        {title}
      </p>

      <div aria-hidden="true" className={styles.bottomRow}>
        <span
          className={`${styles.priority} ${PRIORITY_STYLE[priority] ?? ""}`}
        >
          <span className={styles.priorityDot} />
          {PRIORITY_LABEL[priority]}
        </span>

        <div className={styles.meta}>
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

export default React.memo(TaskCard);
