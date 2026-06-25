import type { Priority, Status } from ".";

export interface TaskQueryParam {
  search?: string;
  minDueDate?: string;
  maxDueDate?: string;
  status?: string;
  priority?: string;
  assigneeId?: string;
  page?: number;
  limit?: number;
}

export interface TaskAssigneeType {
  id: string;
  name: string;
}

export interface TaskCreatorType {
  id: string;
  name: string;
}

export interface TaskType {
  id: string;
  title: string;
  priority: Priority;
  assignee?: TaskAssigneeType;
  status: Status;
  createdAt: string;
}

export interface DetailTaskType extends TaskType {
  description: string;
  position: string;
  creator: TaskCreatorType;
  dueDate?: string;
  updatedAt: string;
}

export type CreateTaskDto = {
  title: string;
  priority: Priority;
  assigneeId: string | null;
  dueDate: string;
  status: Status;
};

export type UpdateTaskDto = Partial<CreateTaskDto>;

export type UpdateTaskStatusDto = {
  position: string;
  status: Status;
};
