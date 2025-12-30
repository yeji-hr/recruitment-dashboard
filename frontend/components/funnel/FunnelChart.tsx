'use client';

import Card from '@/components/ui/Card';
import { FunnelData } from '@/types/funnel';

interface FunnelChartProps {
  data: FunnelData;
}

export default function FunnelChart({ data }: FunnelChartProps) {
  const stages = [
    { label: '제안', value: data.proposal, color: 'bg-blue-500', textColor: 'text-blue-700' },
    { label: '지원', value: data.application, color: 'bg-indigo-500', textColor: 'text-indigo-700' },
    { label: '자소서', value: data.documentSubmit, color: 'bg-purple-500', textColor: 'text-purple-700' },
    { label: '서류통과', value: data.documentPass, color: 'bg-pink-500', textColor: 'text-pink-700' },
    { label: '면접통과', value: data.interviewPass, color: 'bg-orange-500', textColor: 'text-orange-700' },
    { label: '과제통과', value: data.assignmentPass, color: 'bg-yellow-500', textColor: 'text-yellow-700' },
    { label: '최종합격', value: data.finalPass, color: 'bg-green-500', textColor: 'text-green-700' },
  ];

  const maxValue = data.proposal;

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        채용 퍼널 시각화
      </h3>

      <div className="space-y-1">
        {stages.map((stage, index) => {
          const percentage = maxValue > 0 ? (stage.value / maxValue) * 100 : 0;
          const conversionRate = index > 0 
            ? stages[index - 1].value > 0 
              ? (stage.value / stages[index - 1].value) * 100 
              : 0
            : 100;

          return (
            <div key={stage.label} className="relative">
              {/* 깔때기 바 */}
              <div 
                className={`${stage.color} rounded-lg transition-all duration-500 relative overflow-hidden`}
                style={{ 
                  width: `${percentage}%`,
                  minWidth: '200px',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                <div className="px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-white font-bold text-lg">
                      {stage.label}
                    </span>
                    <span className="text-white text-sm opacity-90">
                      ({stage.value.toLocaleString()}명)
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    {/* 전체 대비 비율 */}
                    <span className="text-white text-sm font-medium">
                      {percentage.toFixed(1)}%
                    </span>
                    
                    {/* 전환율 */}
                    {index > 0 && (
                      <div className="bg-white/20 px-3 py-1 rounded-full">
                        <span className="text-white text-xs font-semibold">
                          전환율 {conversionRate.toFixed(1)}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* 그라데이션 효과 */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 pointer-events-none" />
              </div>

              {/* 연결선 */}
              {index < stages.length - 1 && (
                <div className="flex justify-center py-1">
                  <div className="w-px h-4 bg-gray-300" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 인사이트 */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm text-gray-600">전체 전환율</p>
            <p className="text-2xl font-bold text-blue-600">
              {data.proposal > 0 ? ((data.finalPass / data.proposal) * 100).toFixed(2) : 0}%
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">최대 병목 구간</p>
            <p className="text-lg font-bold text-orange-600">
              {data.application > 0 && data.documentSubmit > 0
                ? ((data.documentSubmit / data.application) * 100) < 50
                  ? '지원→자소서'
                  : data.documentSubmit > 0 && data.documentPass > 0
                  ? ((data.documentPass / data.documentSubmit) * 100) < 50
                    ? '자소서→서류통과'
                    : '면접 단계'
                : '데이터 부족'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">예상 합격률</p>
            <p className="text-2xl font-bold text-green-600">
              {data.interviewPass > 0 ? ((data.finalPass / data.interviewPass) * 100).toFixed(1) : 0}%
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}