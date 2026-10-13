import { apiRequest, ApiResponse } from './apiClient';

export interface ExpTransaction {
  transactionId: string;
  studentId: string;
  studentEmail: string;
  type: string;
  referenceId: string;
  amount: number;
  description: string;
  createdAt: string;
  createdBy?: string;
}

export const expApi = {
  getExpHistory: async (studentEmail: string): Promise<ApiResponse<ExpTransaction[]>> => {
    return apiRequest<ExpTransaction[]>('getExpHistory', { studentEmail }, 'GET');
  },

  awardExp: async (
    studentEmail: string,
    amount: number,
    type: string,
    description: string,
    referenceId: string
  ): Promise<ApiResponse<{ totalExp: number; added: boolean }>> => {
    return apiRequest<{ totalExp: number; added: boolean }>('awardExp', {
      studentEmail,
      amount,
      type,
      description,
      referenceId,
    });
  },

  getLeaderboard: async (): Promise<ApiResponse> => {
    return apiRequest('getLeaderboard', {}, 'GET');
  },
};
