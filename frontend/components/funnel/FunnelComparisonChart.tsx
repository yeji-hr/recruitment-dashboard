'use client';

import Card from '@/components/ui/Card';
import { FunnelReport } from '@/types/funnel';

interface FunnelComparisonChartProps {
  report: FunnelReport;
}

export default function FunnelComparisonChart({ report }: FunnelComparisonChartProps) {
  const { data, rates } = report;

  const comparisonData = [
    { 
      label: '제안 대비 지원율', 
      value: rates.applicationVsProposal,
      benchmark: 10, // 업계 평균 10%
    },
    { 
      label: '지원 대비 서류합격률', 
      value: rates.documentSubmitRate,
      benchmark: 50, // 업계 평균 50%
    },
    { 
      label: '서류 대비 면접 진출률', 
      value: rates.documentPassRate,
      benchmark: 30, // 업계 평균 30%
    },
    { 
      label: '면접 대비 최종합격률', 
      value: rates.finalPassRate,
      benchmark: 60, // 업계 평균 60%
    },
  ];

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        핵심 전환율 벤치마크
      </h3>

      <div className="space-y-6">
        {comparisonData.map((item, index) => {
          const isBetter = item.value >= item.benchmark;
          const percentage = Math.min((item.value / item.benchmark) * 100, 150); // 최대 150%까지 표시

          return (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  {item.label}
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500">
                    업계 평균: {item.benchmark}%
                  </span>
                  <span className={`text-sm font-bold ${isBetter ? 'text-green-600' : 'text-orange-600'}`}>
                    {item.value.toFixed(1)}%
                  </span>
                  {isBetter ? (
                    <span className="text-green-600 text-xs font-semibold">우수</span>
                  ) : (
                    <span className="text-orange-600 text-xs font-semibold">개선필요</span>
                  )}
                </div>
              </div>

              {/* 비교 바 */}
              <div className="relative h-8 bg-gray-100 rounded-lg overflow-hidden">
                {/* 업계 평균 기준선 */}
                <div 
                  className="absolute top-0 h-full w-1 bg-gray-400 z-10"
                  style={{ left: '66.67%' }} // 기준선 2/3 지점
                  title="업계 평균"
                />
                
                {/* 실제 값 바 */}
                <div
                  className={`absolute left-0 top-0 h-full transition-all duration-700 ${
                    isBetter 
                      ? 'bg-gradient-to-r from-green-400 to-green-600' 
                      : 'bg-gradient-to-r from-orange-400 to-orange-600'
                  }`}
                  style={{ width: `${percentage}%` }}
                >
                  <div className="absolute inset-0 flex items-center justify-end pr-3">
                    <span className="text-white text-xs font-bold drop-shadow">
                      {item.value.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 종합 평가 */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900 mb-1">종합 평가</p>
            <p className="text-xs text-gray-700 leading-relaxed">
              {comparisonData.filter(d => d.value >= d.benchmark).length >= 3
                ? '전반적으로 우수한 채용 퍼널 성과를 보이고 있습니다. 현재 전략을 유지하세요.'
                : comparisonData.filter(d => d.value >= d.benchmark).length >= 2
                ? '양호한 수준이지만, 일부 단계에서 개선이 필요합니다. 병목 구간에 집중하세요.'
                : '여러 단계에서 개선이 필요합니다. 각 단계별 선발 기준과 프로세스를 재검토하세요.'}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}