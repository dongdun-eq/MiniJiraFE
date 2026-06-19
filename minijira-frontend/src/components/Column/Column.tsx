import React from "react";
import styles from "./Column.module.css";
import TaskCard from "../TaskCard/TaskCard";
import { IconInbox, IconPlus } from "../Icons/Icons";
import { useTaskModalContext } from "../../hooks/useTaskModalContext";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { ColumnType } from "../../types";
import type { DetailTaskType } from "../../types/task.type";

interface ColumnProps {
  column: ColumnType;
}

const COLUMN_LABELS: Record<string, string> = {
  backlog: "Backlog",
  todo: "To Do",
  inprogress: "In Progress",
  done: "Done",
};

const Column: React.FC<ColumnProps> = ({ column }) => {
  const { id, tasks, limit } = column;
  const count = tasks.length;
  const title = COLUMN_LABELS[id] ?? column.title;

  const limitPct = limit ? Math.min((count / limit) * 100, 100) : 0;
  const isWarning = limit ? count >= limit * 0.8 : false;
  const isOver = limit ? count >= limit : false;

  const { openCreate, openEdit } = useTaskModalContext();

  const { setNodeRef, isOver: isDropTarget } = useDroppable({ id });

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

      {/* Task list */}
      <div
        ref={setNodeRef}
        className={`${styles.taskList} ${isDropTarget ? styles.dropActive : ""}`}
        role="list"
        aria-label={`${title} tasks`}
      >
        <SortableContext
          items={tasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
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
            tasks.map((task: DetailTaskType) => (
              <TaskCard
                key={task.id}
                task={task}
                onClick={() =>
                  openEdit({
                    id: task.id,
                    assigneeId: task.assignee?.id,
                    dueDate: task.dueDate,
                    priority: task.priority,
                    title: task.title,
                    status: task.status,
                  })
                }
              />
            ))
          )}
        </SortableContext>
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
