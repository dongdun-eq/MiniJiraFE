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
  const { id, tasks } = column;
  const count = tasks.length;
  const title = COLUMN_LABELS[id] ?? column.title;

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
        {placeholder}
      </div>
    </div>
  );
};

export default Column;
