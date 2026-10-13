import { apiRequest, ApiResponse } from './apiClient';
import { StudentProfileData } from '../types';

export const studentApi = {
  getStudentProfile: async (email: string): Promise<ApiResponse<StudentProfileData>> => {
    return apiRequest<StudentProfileData>('getStudentProfile', { email }, 'GET');
  },

  updateProfile: async (studentId: string, profileData: Partial<StudentProfileData>): Promise<ApiResponse<StudentProfileData>> => {
    return apiRequest<StudentProfileData>('updateProfile', { studentId, ...profileData });
  },

  uploadAvatar: async (studentId: string, avatarDataUrl: string): Promise<ApiResponse<{ avatarUrl: string }>> => {
    return apiRequest<{ avatarUrl: string }>('uploadAvatar', { studentId, avatarDataUrl });
  },
};
