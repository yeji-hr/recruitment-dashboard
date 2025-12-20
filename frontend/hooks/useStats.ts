import { useQuery } from '@tanstack/react-query';
import { candidateService } from '@/services/candidateService';

export function useStats() {
  return useQuery({
    queryKey: ['stats'],
    queryFn: () => candidateService.getStats(),
  });
}

