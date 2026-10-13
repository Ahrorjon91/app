import { apiRequest, ApiResponse } from './apiClient';
import { UserAccount } from '../types';

export interface LoginResult {
  student: UserAccount;
  token?: string;
}

export const authApi = {
  login: async (login: string, password: string): Promise<ApiResponse<LoginResult>> => {
    return apiRequest<LoginResult>('login', { login, password });
  },

  getCurrentUser: async (email: string): Promise<ApiResponse<UserAccount>> => {
    return apiRequest<UserAccount>('getCurrentUser', { email }, 'GET');
  },

  logout: async (email?: string): Promise<ApiResponse> => {
    return apiRequest('logout', { email });
  },
};
