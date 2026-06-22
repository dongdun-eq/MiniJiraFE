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

const BASE = "/api/tasks";

const taskService = {
  getAll: async (
    queryParam: TaskQueryParam,
    signal?: AbortSignal,
  ): Promise<ListResponse<DetailTaskType>> => {
    const res = await api.get<ListResponse<DetailTaskType>>(BASE, {
      params: { ...queryParam },
      signal,
    });

    return res.data;
  },

  getById: async (
    id: string,
    signal?: AbortSignal,
  ): Promise<SingleResponse<TaskType>> => {
    const res = await api.get<SingleResponse<TaskType>>(`${BASE}/${id}`, {
      signal,
    });

    return res.data;
  },

  create: async (dto: CreateTaskDto) => {
    const res = await api.post<SingleResponse<TaskType>>(BASE, dto);

    return res.data;
  },

  update: async (id: string, dto: UpdateTaskDto) => {
    const res = await api.put<SingleResponse<TaskType>>(`${BASE}/${id}`, dto);

    return res.data;
  },

  updateStatus: async (id: string, dto: UpdateTaskStatusDto) => {
    const res = await api.patch<SingleResponse<TaskType>>(
      `${BASE}/${id}/status`,
      dto,
    );
    return res.data;
  },

  delete: async (id: string) => {
    await api.delete(`${BASE}/${id}`);
  },
};

export default taskService;
