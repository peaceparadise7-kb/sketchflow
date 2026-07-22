import { apiClient } from '@/api';
import { RegisterPayload, ApiResponse } from '@/types';

export const registerUserApi = async (payload: RegisterPayload): Promise<ApiResponse> => {
  const response = await apiClient.post<ApiResponse>('/auth/register', payload);
  return response.data;
};
