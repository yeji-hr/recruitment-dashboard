'use client';

import Card from '@/components/ui/Card';
import { CandidateStats } from '@/types/candidate';
import { CANDIDATE_STATUS_LABELS } from '@/utils/constants';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface EnhancedStageChartProps {
  stats: CandidateStats;
}

export default function EnhancedStageChart({ stats }: EnhancedStageChartProps) {
  // 각 단계별 전환율 계산 (실제 AI 엔지니어 데이터 기반)
  const proposalToAccepted = stats.proposal > 0 ? (stats.proposalAccepted / stats.proposal) * 100 : 0;
  const acceptedToCoverLetter = stats.proposalAccepted > 0 ? (stats.coverLetter / stats.proposalAccepted) * 100 : 0;
  const coverLetterToApplied = stats.coverLetter > 0 ? (stats.applied / stats.coverLetter) * 100 : 0;
  const appliedToScreening = stats.applied > 0 ? (stats.screening / stats.applied) * 100 : 0;
  const screeningToInterview1 = stats.screening > 0 ? (stats.interview1 / stats.screening) * 100 : 0;
  const interview1ToAssignment = stats.interview1 > 0 ? (stats.assignment / stats.interview1) * 100 : 0;
  const assignmentToInterview2 = stats.assignment > 0 ? (stats.interview2 / stats.assignment) * 100 : 0;
  const interview2ToFinal = stats.interview2 > 0 ? (stats.final / stats.interview2) * 100 : 0;
  
  const stages = [
    { 
      key: 'proposal', 
      label: CANDIDATE_STATUS_LABELS.PROPOSAL, 
      value: stats.proposal, 
      color: 'bg-gray-500',
      nextLabel: '→ 제안수락',
      conversionRate: proposalToAccepted,
    },
    { 
      key: 'proposalAccepted', 
      label: CANDIDATE_STATUS_LABELS.PROPOSAL_ACCEPTED, 
      value: stats.proposalAccepted, 
      color: 'bg-cyan-500',
      nextLabel: '→ 자소서',
      conversionRate: acceptedToCoverLetter,
    },
    { 
      key: 'coverLetter', 
      label: CANDIDATE_STATUS_LABELS.COVER_LETTER, 
      value: stats.coverLetter, 
      color: 'bg-sky-500',
      nextLabel: '→ 서류접수',
      conversionRate: coverLetterToApplied,
    },
    { 
      key: 'applied', 
      label: CANDIDATE_STATUS_LABELS.APPLIED, 
      value: stats.applied, 
      color: 'bg-yellow-500',
      nextLabel: '→ 서류합격',
      conversionRate: appliedToScreening,
    },
    { 
      key: 'screening', 
      label: CANDIDATE_STATUS_LABELS.SCREENING, 
      value: stats.screening, 
      color: 'bg-blue-500',
      nextLabel: '→ 1차면접',
      conversionRate: screeningToInterview1,
    },
    { 
      key: 'interview1', 
      label: CANDIDATE_STATUS_LABELS.INTERVIEW_1, 
      value: stats.interview1, 
      color: 'bg-indigo-500',
      nextLabel: '→ 과제전형',
      conversionRate: interview1ToAssignment,
    },
    { 
      key: 'assignment', 
      label: CANDIDATE_STATUS_LABELS.ASSIGNMENT, 
      value: stats.assignment, 
      color: 'bg-orange-500',
      nextLabel: '→ 최종면접',
      conversionRate: assignmentToInterview2,
    },
    { 
      key: 'interview2', 
      label: CANDIDATE_STATUS_LABELS.INTERVIEW_2, 
      value: stats.interview2, 
      color: 'bg-purple-500',
      nextLabel: '→ 최종합격',
      conversionRate: interview2ToFinal,
    },
    { 
      key: 'final', 
      label: CANDIDATE_STATUS_LABELS.FINAL, 
      value: stats.final, 
      color: 'bg-green-500',
      nextLabel: '',
      conversionRate: null,
    },
  ];

  const maxValue = Math.max(...stages.map(s => s.value), 1);

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        단계별 현황 및 전환율
      </h3>
      
      <div className="space-y-3">
        {stages.map((stage) => {
          const percentage = (stage.value / maxValue) * 100;
          // AI 엔지니어는 전환율이 낮으므로 기준을 20%로 조정
          const isGoodConversion = stage.conversionRate !== null && stage.conversionRate >= 20;
          
          return (
            <div key={stage.key}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-700 min-w-[100px]">{stage.label}</span>
                  <span className="text-sm font-bold text-gray-900">{stage.value}명</span>
                </div>
                
                {/* 전환율 표시 */}
                {stage.conversionRate !== null && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">{stage.nextLabel}</span>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${
                      isGoodConversion ? 'bg-green-100' : 'bg-orange-100'
                    }`}>
                      {isGoodConversion ? (
                        <TrendingUp size={14} className="text-green-600" />
                      ) : (
                        <TrendingDown size={14} className="text-orange-600" />
                      )}
                      <span className={`text-xs font-bold ${
                        isGoodConversion ? 'text-green-600' : 'text-orange-600'
                      }`}>
                        {stage.conversionRate.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`${stage.color} h-2 rounded-full transition-all duration-500`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
      
      {/* 전환율 해석 가이드 */}
      <div className="mt-6 p-3 bg-blue-50 rounded-lg">
        <p className="text-xs text-gray-700">
          <span className="font-semibold">💡 전환율 가이드:</span> 
          {' '}각 단계에서 다음 단계로 넘어가는 비율입니다. 
          AI 엔지니어 채용은 경쟁이 치열해 전환율이 낮습니다. 20% 이상이면 우수(🟢), 20% 미만이면 개선 필요(🟠)입니다.
        </p>
      </div>
    </Card>
  );
}
