import { apiRequest, ApiResponse } from './apiClient';

export interface CertificateRecord {
  certificateId: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  courseName: string;
  issuedAt: string;
  verificationCode: string;
  certificateUrl?: string;
  status: string;
}

export const certificateApi = {
  getCertificate: async (studentEmail: string): Promise<ApiResponse<CertificateRecord>> => {
    return apiRequest<CertificateRecord>('getCertificate', { studentEmail }, 'GET');
  },

  issueCertificate: async (
    studentEmail: string,
    studentName: string,
    courseName: string = 'DevOps Academy & Systems Operations'
  ): Promise<ApiResponse<CertificateRecord>> => {
    return apiRequest<CertificateRecord>('issueCertificate', {
      studentEmail,
      studentName,
      courseName,
    });
  },

  verifyCertificate: async (verificationCode: string): Promise<ApiResponse<CertificateRecord>> => {
    return apiRequest<CertificateRecord>('verifyCertificate', { verificationCode }, 'GET');
  },
};
