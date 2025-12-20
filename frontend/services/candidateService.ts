import apiClient from './api';
import { 
  Candidate, 
  CandidateFormData, 
  CandidateStats 
} from '@/types/candidate';
import { PaginatedResponse, FilterParams, PaginationParams } from '@/types/common';

export const candidateService = {
  // 지원자 목록 조회
  async getCandidates(
    params?: FilterParams & PaginationParams
  ): Promise<PaginatedResponse<Candidate>> {
    const response = await apiClient.get('/candidates', { params });
    return response.data;
  },

  // 지원자 상세 조회
  async getCandidate(id: string): Promise<Candidate> {
    const response = await apiClient.get(`/candidates/${id}`);
    return response.data;
  },

  // 지원자 등록
  async createCandidate(data: CandidateFormData): Promise<Candidate> {
    const response = await apiClient.post('/candidates', data);
    return response.data;
  },

  // 지원자 수정
  async updateCandidate(id: string, data: Partial<CandidateFormData>): Promise<Candidate> {
    const response = await apiClient.put(`/candidates/${id}`, data);
    return response.data;
  },

  // 지원자 삭제
  async deleteCandidate(id: string): Promise<void> {
    await apiClient.delete(`/candidates/${id}`);
  },

  // 지원자 상태 변경
  async updateCandidateStatus(id: string, status: string): Promise<Candidate> {
    const response = await apiClient.patch(`/candidates/${id}/status`, { status });
    return response.data;
  },

  // 통계 조회
  async getStats(): Promise<CandidateStats> {
    const response = await apiClient.get('/candidates/stats');
    return response.data;
  },
};

