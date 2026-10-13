import { apiRequest, ApiResponse } from './apiClient';

export interface StudentProgressData {
  studentId: string;
  completedLessons: number[];
  completedLabs: number[];
  passedTests: string[];
  totalExp: number;
  level: number;
  progressPercent: number;
}

export const progressApi = {
  getProgress: async (studentEmail: string): Promise<ApiResponse<StudentProgressData>> => {
    return apiRequest<StudentProgressData>('getProgress', { studentEmail }, 'GET');
  },

  syncProgress: async (studentEmail: string, progress: Partial<StudentProgressData>): Promise<ApiResponse> => {
    return apiRequest('syncProgress', { studentEmail, ...progress });
  },
};
