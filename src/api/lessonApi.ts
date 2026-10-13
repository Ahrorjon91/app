import { apiRequest, ApiResponse } from './apiClient';
import { LessonData } from '../types';

export const lessonApi = {
  getLessons: async (studentEmail?: string): Promise<ApiResponse<LessonData[]>> => {
    return apiRequest<LessonData[]>('getLessons', { studentEmail }, 'GET');
  },

  startLesson: async (lessonId: number, studentEmail: string): Promise<ApiResponse> => {
    return apiRequest('startLesson', { lessonId, studentEmail });
  },

  completeLesson: async (
    lessonId: number,
    studentEmail: string,
    studentName: string,
    expAward: number = 50
  ): Promise<ApiResponse<{ expAwarded: number; totalExp: number }>> => {
    return apiRequest<{ expAwarded: number; totalExp: number }>('completeLesson', {
      lessonId,
      studentEmail,
      studentName,
      expAward,
      referenceId: `LESSON_COMPLETED:${studentEmail}:${lessonId}`,
    });
  },
};
