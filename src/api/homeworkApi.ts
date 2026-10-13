import { apiRequest, ApiResponse } from './apiClient';
import { HomeworkSubmission } from '../types';

export const homeworkApi = {
  getHomework: async (studentEmail?: string): Promise<ApiResponse<HomeworkSubmission[]>> => {
    return apiRequest<HomeworkSubmission[]>('getHomework', { studentEmail }, 'GET');
  },

  submitHomework: async (payload: {
    lessonId: number;
    lessonTitle?: string;
    studentName: string;
    studentEmail: string;
    fileUrl?: string;
    studentNotes?: string;
  }): Promise<ApiResponse> => {
    return apiRequest('submitHomework', {
      ...payload,
      referenceId: `HOMEWORK_SUBMITTED:${payload.studentEmail}:${payload.lessonId}`,
    });
  },

  reviewHomework: async (
    lessonId: number,
    studentEmail: string,
    status: string,
    score: number,
    feedback: string,
    adminEmail?: string
  ): Promise<ApiResponse> => {
    return apiRequest('reviewHomework', {
      lessonId,
      studentEmail,
      status,
      score,
      feedback,
      adminEmail,
    });
  },
};
