'use client';

import Card from '@/components/ui/Card';
import { CandidateStats } from '@/types/candidate';
import { CANDIDATE_STATUS_LABELS } from '@/utils/constants';

interface StageChartProps {
  stats: CandidateStats;
}

export default function StageChart({ stats }: StageChartProps) {
  const stages = [
    { key: 'applied', label: CANDIDATE_STATUS_LABELS.APPLIED, value: stats.applied, color: 'bg-yellow-500' },
    { key: 'screening', label: CANDIDATE_STATUS_LABELS.SCREENING, value: stats.screening, color: 'bg-blue-500' },
    { key: 'interview1', label: CANDIDATE_STATUS_LABELS.INTERVIEW_1, value: stats.interview1, color: 'bg-indigo-500' },
    { key: 'assignment', label: CANDIDATE_STATUS_LABELS.ASSIGNMENT, value: stats.assignment, color: 'bg-orange-500' },
    { key: 'interview2', label: CANDIDATE_STATUS_LABELS.INTERVIEW_2, value: stats.interview2, color: 'bg-purple-500' },
    { key: 'final', label: CANDIDATE_STATUS_LABELS.FINAL, value: stats.final, color: 'bg-green-500' },
  ];

  const maxValue = Math.max(...stages.map(s => s.value), 1);

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-6">단계별 현황</h3>
      
      <div className="space-y-4">
        {stages.map((stage) => {
          const percentage = (stage.value / maxValue) * 100;
          
          return (
            <div key={stage.key}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">{stage.label}</span>
                <span className="text-sm font-bold text-gray-900">{stage.value}명</span>
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
    </Card>
  );
}

