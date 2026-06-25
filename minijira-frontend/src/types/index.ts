import type { DetailTaskType } from "./task.type";
import {
  PRIORITY_HIGH,
  PRIORITY_MEDIUM,
  PRIORITY_LOW,
  PRIORITY_CRITICAL,
  STATUS_BACKLOG,
  STATUS_TODO,
  STATUS_IN_PROGRESS,
  STATUS_DONE,
} from "../constants";

export const PRIORITY_ARRAY = [
  PRIORITY_HIGH,
  PRIORITY_MEDIUM,
  PRIORITY_LOW,
  PRIORITY_CRITICAL,
] as const;

export type Priority = (typeof PRIORITY_ARRAY)[number];

export const STATUS_ARRAY = [
  STATUS_BACKLOG,
  STATUS_TODO,
  STATUS_IN_PROGRESS,
  STATUS_DONE,
] as const;

export type Status = (typeof STATUS_ARRAY)[number];

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
