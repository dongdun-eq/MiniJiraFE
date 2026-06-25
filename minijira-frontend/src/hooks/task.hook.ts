import {
  useMutation,
  useQuery,
  useQueryClient,
  type QueryClient,
} from "@tanstack/react-query";
import type {
  CreateTaskDto,
  DetailTaskType,
  TaskQueryParam,
  UpdateTaskDto,
  UpdateTaskStatusDto,
} from "../types/task.type";
import taskService from "../service/task.service";
import type { ListResponse } from "../types/api.type";
import { useToast } from "./useToast";
import {
  QUERY_KEY_TASKS,
  QUERY_KEY_TASK,
  TOAST_TYPE_SUCCESS,
  TOAST_TYPE_ERROR,
  TOAST_SUCCESS_TASK_CREATED,
  TOAST_SUCCESS_TASK_UPDATED,
  TOAST_SUCCESS_TASK_DELETED,
  TOAST_ERROR_TASK_CREATE_FAILED,
  TOAST_ERROR_TASK_UPDATE_FAILED,
  TOAST_ERROR_STATUS_UPDATE_FAILED,
  TOAST_ERROR_TASK_DELETE_FAILED,
} from "../constants";
import { getErrorMessage } from "../utils/errorUtils";

export const useTasks = (params: TaskQueryParam) => {
  return useQuery({
    queryKey: [QUERY_KEY_TASKS, params], 
    queryFn: ({ signal }) => taskService.getAll(params, signal),
    staleTime: 5 * 60 * 1000,
  });
};

export const useTask = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY_TASK, id],
    queryFn: ({ signal }) => taskService.getById(id, signal),
  });
};

function buildOptimisticMutationOptions<TVariables>(
  queryClient: QueryClient,
  queryKey: unknown[],
  applyOptimisticUpdate: (
    oldData: ListResponse<DetailTaskType>,
    variables: TVariables,
  ) => ListResponse<DetailTaskType>,
  onRollback?: (error: unknown) => void,
) {
  return {
    onMutate: async (variables: TVariables) => {
      await queryClient.cancelQueries({ queryKey });
      const previousTasks =
        queryClient.getQueryData<ListResponse<DetailTaskType>>(queryKey);

      queryClient.setQueryData(
        queryKey,
        (oldData: ListResponse<DetailTaskType> | undefined) => {
          if (!oldData) return oldData;
          return applyOptimisticUpdate(oldData, variables);
        },
      );

      return { previousTasks };
    },

    onError: (
      _err: unknown,
      _variables: TVariables,
      context?: { previousTasks?: ListResponse<DetailTaskType> },
    ) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(queryKey, context.previousTasks);
      }
      onRollback?.(_err);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_TASKS] });
    },
  };
}

export const useTaskMutations = (params: TaskQueryParam) => {
  const queryClient = useQueryClient();
  const queryKey = [QUERY_KEY_TASKS, params]; 

  const { showToast } = useToast();

  const createMutation = useMutation({
    mutationFn: (dto: CreateTaskDto) => taskService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      showToast(TOAST_SUCCESS_TASK_CREATED, TOAST_TYPE_SUCCESS); 
    },
    onError: (err) => {
      showToast(
        getErrorMessage(err, TOAST_ERROR_TASK_CREATE_FAILED),
        TOAST_TYPE_ERROR,
      ); 
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateTaskDto }) =>
      taskService.update(id, dto),

    onSuccess: () => {
      showToast(TOAST_SUCCESS_TASK_UPDATED, TOAST_TYPE_SUCCESS); 
    },

    ...buildOptimisticMutationOptions<{ id: string; dto: UpdateTaskDto }>(
      queryClient,
      queryKey,
      (oldData, { id, dto }) => ({
        ...oldData,
        data: oldData.data.map((task) =>
          task.id === id ? { ...task, ...dto } : task,
        ),
      }),
      (err) =>
        showToast(
          getErrorMessage(err, TOAST_ERROR_TASK_UPDATE_FAILED),
          TOAST_TYPE_ERROR,
        ), 
    ),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateTaskStatusDto }) =>
      taskService.updateStatus(id, dto),

    ...buildOptimisticMutationOptions<{ id: string; dto: UpdateTaskStatusDto }>(
      queryClient,
      queryKey,
      (oldData, { id, dto }) => ({
        ...oldData,
        data: oldData.data.map((task) =>
          task.id === id
            ? { ...task, status: dto.status, position: dto.position }
            : task,
        ),
      }),
      (err) =>
        showToast(
          getErrorMessage(err, TOAST_ERROR_STATUS_UPDATE_FAILED),
          TOAST_TYPE_ERROR,
        ),
    ),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => taskService.delete(id),

    ...buildOptimisticMutationOptions<string>(
      queryClient,
      queryKey,
      (oldData, id) => ({
        ...oldData,
        data: oldData.data.filter((task) => task.id !== id),
      }),
      (err) =>
        showToast(
          getErrorMessage(err, TOAST_ERROR_TASK_DELETE_FAILED),
          TOAST_TYPE_ERROR,
        ),
    ),

    onSuccess: () => {
      showToast(TOAST_SUCCESS_TASK_DELETED, TOAST_TYPE_SUCCESS);
    },
  });

  return {
    createTask: createMutation.mutateAsync,
    isCreating: createMutation.isPending,

    updateTask: updateMutation.mutate,
    isUpdating: updateMutation.isPending,

    updateTaskStatus: updateStatusMutation.mutate,
    isUpdatingStatus: updateStatusMutation.isPending,

    deleteTask: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
};
