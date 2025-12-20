import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { candidateService } from '@/services/candidateService';
import { CandidateFormData } from '@/types/candidate';
import { FilterParams, PaginationParams } from '@/types/common';

export function useCandidates(params?: FilterParams & PaginationParams) {
  return useQuery({
    queryKey: ['candidates', params],
    queryFn: () => candidateService.getCandidates(params),
  });
}

export function useCandidate(id: string) {
  return useQuery({
    queryKey: ['candidate', id],
    queryFn: () => candidateService.getCandidate(id),
    enabled: !!id,
  });
}

export function useCreateCandidate() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CandidateFormData) => candidateService.createCandidate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['candidates'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    },
  });
}

export function useUpdateCandidate(id: string) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Partial<CandidateFormData>) => 
      candidateService.updateCandidate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['candidates'] });
      queryClient.invalidateQueries({ queryKey: ['candidate', id] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    },
  });
}

export function useDeleteCandidate() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => candidateService.deleteCandidate(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['candidates'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    },
  });
}

export function useUpdateCandidateStatus() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      candidateService.updateCandidateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['candidates'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    },
  });
}

