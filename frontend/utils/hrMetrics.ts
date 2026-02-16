import { CandidateStats } from '@/types/candidate';

// 채용 리드타임 계산 (서류 접수 → 최종 합격)
export function calculateLeadTime(candidates: any[]): number {
  const finalCandidates = candidates.filter(c => c.status === 'FINAL');
  
  if (finalCandidates.length === 0) return 0;
  
  const totalDays = finalCandidates.reduce((sum, candidate) => {
    const appliedDate = new Date(candidate.appliedDate);
    const updatedDate = new Date(candidate.updatedAt);
    const diffDays = Math.floor((updatedDate.getTime() - appliedDate.getTime()) / (1000 * 60 * 60 * 24));
    return sum + diffDays;
  }, 0);
  
  return Math.round(totalDays / finalCandidates.length);
}

// 전환율 계산 (이전 단계 대비 합격률)
export function calculateConversionRates(stats: CandidateStats) {
  return {
    proposalToAcceptedRate: stats.proposal > 0 ? (stats.proposalAccepted / stats.proposal) * 100 : 0,
    acceptedToCoverLetterRate: stats.proposalAccepted > 0 ? (stats.coverLetter / stats.proposalAccepted) * 100 : 0,
    coverLetterToAppliedRate: stats.coverLetter > 0 ? (stats.applied / stats.coverLetter) * 100 : 0,
    screeningRate: stats.applied > 0 ? (stats.screening / stats.applied) * 100 : 0,
    interview1Rate: stats.screening > 0 ? (stats.interview1 / stats.screening) * 100 : 0,
    assignmentRate: stats.interview1 > 0 ? (stats.assignment / stats.interview1) * 100 : 0,
    interview2Rate: stats.assignment > 0 ? (stats.interview2 / stats.assignment) * 100 : 0,
    finalRate: stats.interview2 > 0 ? (stats.final / stats.interview2) * 100 : 0,
  };
}

// 채널별 지원자 수 집계
export function calculateSourceStats(candidates: any[]) {
  const sourceMap = new Map<string, number>();
  
  candidates.forEach(candidate => {
    const source = candidate.source;
    sourceMap.set(source, (sourceMap.get(source) || 0) + 1);
  });
  
  return Array.from(sourceMap.entries())
    .map(([source, count]) => ({ source, count }))
    .sort((a, b) => b.count - a.count);
}

// 채널별 최종 합격률 (ROI 지표)
export function calculateSourceROI(candidates: any[]) {
  const sourceMap = new Map<string, { total: number; final: number }>();
  
  candidates.forEach(candidate => {
    const source = candidate.source;
    const current = sourceMap.get(source) || { total: 0, final: 0 };
    
    sourceMap.set(source, {
      total: current.total + 1,
      final: current.final + (candidate.status === 'FINAL' ? 1 : 0),
    });
  });
  
  return Array.from(sourceMap.entries())
    .map(([source, data]) => ({
      source,
      total: data.total,
      final: data.final,
      conversionRate: data.total > 0 ? (data.final / data.total) * 100 : 0,
    }))
    .sort((a, b) => b.total - a.total);
}

