import React from "react";
import type { ColumnType as ColumnTypeT } from "../../types";
import type { DroppableProvidedProps } from "@hello-pangea/dnd";
import styles from "./Column.module.css";
import { IconInbox, IconPlus } from "../Icons/Icons";
import { useTaskModalContext } from "../../hooks/useTaskModalContext";

interface ColumnProps {
  column: ColumnTypeT;
  children?: React.ReactNode;
  droppableRef?: (element: HTMLElement | null) => void;
  /*
   * SỬA: dùng đúng type DroppableProvidedProps từ @hello-pangea/dnd
   * thay vì Record<string, unknown> tự định nghĩa. DroppableProvidedProps
   * là 1 interface có field cụ thể (không có index signature), nên
   * Record<string, unknown> (yêu cầu mọi key đều khớp) không tương
   * thích — TypeScript báo lỗi đúng vì 2 kiểu này không assignable
   * cho nhau.
   */
  droppableProps?: DroppableProvidedProps;
  placeholder?: React.ReactNode;
  isDraggingOver?: boolean;
}

const COLUMN_LABELS: Record<string, string> = {
  backlog: "Backlog",
  todo: "To Do",
  "in-progress": "In Progress",
  done: "Done",
};

const Column: React.FC<ColumnProps> = ({
  column,
  children,
  droppableRef,
  droppableProps,
  placeholder,
  isDraggingOver,
}) => {
  const { id, tasks, limit } = column;
  const count = tasks.length;
  const title = COLUMN_LABELS[id] ?? column.title;

  const limitPct = limit ? Math.min((count / limit) * 100, 100) : 0;
  const isWarning = limit ? count >= limit * 0.8 : false;
  const isOver = limit ? count >= limit : false;

  const { openCreate } = useTaskModalContext();

  return (
    <div className={styles.column} data-col={id}>
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.dot} aria-hidden="true" />
        <span className={styles.title}>{title}</span>
        <span className={styles.badge}>{count}</span>
        <button
          className={styles.addBtn}
          onClick={openCreate}
          aria-label={`Add task to ${title}`}
        >
          <IconPlus />
        </button>
      </div>

      {/* Task list — đây CHÍNH XÁC là DOM node Droppable cần quản
          lý, nên ref/props của nó phải gắn đúng vào div này. */}
      <div
        ref={droppableRef}
        {...droppableProps}
        className={`${styles.taskList} ${isDraggingOver ? styles.dropActive : ""}`}
        role="list"
        aria-label={`${title} tasks`}
      >
        {count === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>
              <IconInbox />
            </div>
            <span className={styles.emptyText}>No tasks yet</span>
            <span className={styles.emptyHint}>Click + to add one</span>
          </div>
        ) : (
          children
        )}
        {/* placeholder của @hello-pangea/dnd PHẢI nằm trong cùng
            container với các Draggable -> giữ đúng chiều cao list
            lúc kéo, tránh layout bị "nhảy" */}
        {placeholder}
      </div>

      {/* WIP limit bar */}
      {limit && (
        <div className={styles.limitBar}>
          <div
            className={`${styles.limitFill} ${isOver ? styles.over : isWarning ? styles.warning : ""}`}
            style={{ width: `${limitPct}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default Column;
