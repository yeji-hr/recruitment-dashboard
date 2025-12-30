'use client';

import Card from '@/components/ui/Card';
import { CandidateStats } from '@/types/candidate';
import { CANDIDATE_STATUS_LABELS } from '@/utils/constants';
import { calculateConversionRates } from '@/utils/hrMetrics';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface EnhancedStageChartProps {
  stats: CandidateStats;
}

export default function EnhancedStageChart({ stats }: EnhancedStageChartProps) {
  const conversionRates = calculateConversionRates(stats);
  
  const stages = [
    { 
      key: 'applied', 
      label: CANDIDATE_STATUS_LABELS.APPLIED, 
      value: stats.applied, 
      color: 'bg-yellow-500',
      nextLabel: '→ 서류합격',
      conversionRate: conversionRates.screeningRate,
    },
    { 
      key: 'screening', 
      label: CANDIDATE_STATUS_LABELS.SCREENING, 
      value: stats.screening, 
      color: 'bg-blue-500',
      nextLabel: '→ 1차면접',
      conversionRate: conversionRates.interview1Rate,
    },
    { 
      key: 'interview1', 
      label: CANDIDATE_STATUS_LABELS.INTERVIEW_1, 
      value: stats.interview1, 
      color: 'bg-indigo-500',
      nextLabel: '→ 과제전형',
      conversionRate: conversionRates.assignmentRate,
    },
    { 
      key: 'assignment', 
      label: CANDIDATE_STATUS_LABELS.ASSIGNMENT, 
      value: stats.assignment, 
      color: 'bg-orange-500',
      nextLabel: '→ 최종면접',
      conversionRate: conversionRates.interview2Rate,
    },
    { 
      key: 'interview2', 
      label: CANDIDATE_STATUS_LABELS.INTERVIEW_2, 
      value: stats.interview2, 
      color: 'bg-purple-500',
      nextLabel: '→ 최종합격',
      conversionRate: conversionRates.finalRate,
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
      
      <div className="space-y-4">
        {stages.map((stage) => {
          const percentage = (stage.value / maxValue) * 100;
          const isGoodConversion = stage.conversionRate !== null && stage.conversionRate >= 50;
          
          return (
            <div key={stage.key}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-700">{stage.label}</span>
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
          50% 이상이면 우수(🟢), 50% 미만이면 개선 필요(🟠)입니다.
        </p>
      </div>
    </Card>
  );
}

