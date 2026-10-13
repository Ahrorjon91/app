import { apiRequest, ApiResponse } from './apiClient';
import { CourseBlock } from '../types';

export const courseApi = {
  getCourses: async (): Promise<ApiResponse<CourseBlock[]>> => {
    return apiRequest<CourseBlock[]>('getCourses', {}, 'GET');
  },

  getCourseBlocks: async (): Promise<ApiResponse<CourseBlock[]>> => {
    return apiRequest<CourseBlock[]>('getCourseBlocks', {}, 'GET');
  },
};
