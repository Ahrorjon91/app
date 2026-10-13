import { apiRequest, ApiResponse } from './apiClient';
import { QuizSubmissionResult } from '../types';

export const testApi = {
  getTests: async (): Promise<ApiResponse> => {
    return apiRequest('getTests', {}, 'GET');
  },

  submitTest: async (
    studentId: string,
    studentEmail: string,
    studentName: string,
    quizId: string,
    quizTitle: string,
    scorePct: number,
    passed: boolean,
    totalQuestions: number,
    correctCount: number,
    details?: any[]
  ): Promise<ApiResponse<QuizSubmissionResult & { expAwarded?: number }>> => {
    return apiRequest<QuizSubmissionResult & { expAwarded?: number }>('submitTest', {
      studentId,
      studentEmail,
      studentName,
      quizId,
      quizTitle,
      scorePct,
      passed,
      totalQuestions,
      correctCount,
      details,
      referenceId: `TEST_SUBMITTED:${studentEmail}:${quizId}`,
    });
  },

  getTestResults: async (studentEmail: string): Promise<ApiResponse<QuizSubmissionResult[]>> => {
    return apiRequest<QuizSubmissionResult[]>('getTestResults', { studentEmail }, 'GET');
  },
};
