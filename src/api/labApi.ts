import { apiRequest, ApiResponse } from './apiClient';
import { LabData } from '../types';

export const labApi = {
  getLabs: async (studentEmail?: string): Promise<ApiResponse<LabData[]>> => {
    return apiRequest<LabData[]>('getLabs', { studentEmail }, 'GET');
  },

  startLab: async (labId: number, studentEmail: string): Promise<ApiResponse> => {
    return apiRequest('startLab', { labId, studentEmail });
  },

  completeLab: async (payload: {
    labId: number;
    title?: string;
    studentEmail: string;
    studentName: string;
    attachedFiles?: string;
    submissionStatus?: string;
    score?: number;
    mentorFeedback?: string;
  }): Promise<ApiResponse> => {
    return apiRequest('submitLab', {
      ...payload,
      referenceId: `LAB_COMPLETED:${payload.studentEmail}:${payload.labId}`,
    });
  },

  reviewLab: async (
    labId: number,
    studentEmail: string,
    status: string,
    score: number,
    feedback: string,
    adminEmail?: string
  ): Promise<ApiResponse> => {
    return apiRequest('reviewLab', {
      labId,
      studentEmail,
      status,
      score,
      feedback,
      adminEmail,
    });
  },
};
