import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  CreateTaskDto,
  DetailTaskType,
  TaskQueryParam,
  UpdateTaskDto,
  UpdateTaskStatusDto,
} from "../types/task.type";
import taskService from "../service/task.service";
import type { ListResponse } from "../types/api.type";

export const useTasks = (params: TaskQueryParam) => {
  return useQuery({
    queryKey: ["tasks", params],
    queryFn: ({ signal }) => taskService.getAll(params, signal),
    staleTime: 5 * 60 * 1000,
  });
};

export const useTask = (id: string) => {
  return useQuery({
    queryKey: ["task", id],
    queryFn: ({ signal }) => taskService.getById(id, signal),
  });
};

export const useTaskMutations = (params: TaskQueryParam) => {
  const queryClient = useQueryClient();
  const queryKey = ["tasks", params];

  const createMutation = useMutation({
    mutationFn: (dto: CreateTaskDto) => taskService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateTaskDto }) =>
      taskService.update(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateTaskStatusDto }) => {
      console.log(dto);
      return taskService.updateStatus(id, dto);
    },

    onMutate: async ({ id, dto }) => {
      await queryClient.cancelQueries({ queryKey });
      const previousTasks = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(
        queryKey,
        (oldData: ListResponse<DetailTaskType>) => {
          const newArray = oldData.data.map((task) =>
            task.id === id
              ? { ...task, status: dto.status, position: dto.position }
              : task,
          );

          return {
            ...oldData,
            data: newArray,
          };
        },
      );
      return { previousTasks };
    },

    onError: (_err, _newVariables, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(queryKey, context?.previousTasks);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return {
    createTask: createMutation.mutate,
    isCreating: createMutation.isPending,

    updateTask: updateMutation.mutate,
    isUpdating: updateMutation.isPending,

    updateTaskStatus: updateStatusMutation.mutate,
    isUpdatingStatus: updateStatusMutation.isPending,
  };
};
