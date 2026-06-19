export interface SingleResponse<T> {
  data: T;
}

export interface PaginationType {
  total: number;
  limit: number;
  page: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationType;
}

export interface AsynceState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  isEmpty: boolean;
  pagination?: PaginationType;
}
