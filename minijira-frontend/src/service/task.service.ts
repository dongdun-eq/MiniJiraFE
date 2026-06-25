import type { ListResponse, SingleResponse } from "../types/api.type";
import type {
  CreateTaskDto,
  DetailTaskType,
  TaskQueryParam,
  TaskType,
  UpdateTaskDto,
  UpdateTaskStatusDto,
} from "../types/task.type";
import api from "./api";
import {
  API_ENDPOINT_TASKS_BASE,
  API_ENDPOINT_TASKS_STATUS_SUFFIX,
} from "../constants";

const taskService = {
  getAll: async (
    queryParam: TaskQueryParam,
    signal?: AbortSignal,
  ): Promise<ListResponse<DetailTaskType>> => {
    const res = await api.get<ListResponse<DetailTaskType>>(
      API_ENDPOINT_TASKS_BASE,
      {
        params: { ...queryParam },
        signal,
      },
    );

    return res.data;
  },

  getById: async (
    id: string,
    signal?: AbortSignal,
  ): Promise<SingleResponse<TaskType>> => {
    const res = await api.get<SingleResponse<TaskType>>(
      `${API_ENDPOINT_TASKS_BASE}/${id}`,
      {
        signal,
      },
    );

    return res.data;
  },

  create: async (dto: CreateTaskDto) => {
    const res = await api.post<SingleResponse<TaskType>>(
      API_ENDPOINT_TASKS_BASE,
      dto,
    );

    return res.data;
  },

  update: async (id: string, dto: UpdateTaskDto) => {
    const res = await api.put<SingleResponse<TaskType>>(
      `${API_ENDPOINT_TASKS_BASE}/${id}`,
      dto,
    );

    return res.data;
  },

  updateStatus: async (id: string, dto: UpdateTaskStatusDto) => {
    const res = await api.patch<SingleResponse<TaskType>>(
      `${API_ENDPOINT_TASKS_BASE}/${id}${API_ENDPOINT_TASKS_STATUS_SUFFIX}`,
      dto,
    );
    return res.data;
  },

  delete: async (id: string) => {
    await api.delete(`${API_ENDPOINT_TASKS_BASE}/${id}`);
  },
};

export default taskService;
