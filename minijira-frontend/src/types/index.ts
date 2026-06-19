import type { DetailTaskType } from "./task.type";

export type Priority = "high" | "medium" | "low" | "critical";

export type Status = "backlog" | "todo" | "in-progress" | "done";

export interface ColumnType {
  id: Status;
  title: string;
  tasks: DetailTaskType[];
  limit?: number;
}

export interface BoardState {
  columns: ColumnType[];
  isLoading: boolean;
  error: string | null;
}


