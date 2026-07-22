export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export interface ApiError {
  error: string;
  status?: number;
}
