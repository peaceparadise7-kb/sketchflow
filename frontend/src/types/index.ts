export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: {
    message: string;
    statusCode: number;
    stack?: string;
  };
  requestId?: string;
  timestamp?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt?: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}
