'use client';

import Card from '@/components/ui/Card';
import { APPLICATION_SOURCE_LABELS } from '@/utils/constants';

interface SourceROIChartProps {
  sourceData: Array<{
    source: string;
    total: number;
    final: number;
    conversionRate: number;
  }>;
}

export default function SourceROIChart({ sourceData }: SourceROIChartProps) {
  const maxTotal = Math.max(...sourceData.map(d => d.total), 1);
  
  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        채널별 지원자 유입 및 ROI
      </h3>
      
      <div className="space-y-4">
        {sourceData.map((data, index) => {
          const barWidth = (data.total / maxTotal) * 100;
          const isTopPerformer = index === 0;
          
          return (
            <div key={data.source} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {isTopPerformer && <span className="text-lg">🏆</span>}
                  <span className="text-sm font-medium text-gray-700">
                    {APPLICATION_SOURCE_LABELS[data.source as keyof typeof APPLICATION_SOURCE_LABELS]}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">
                    {data.total}명
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">최종합격</span>
                    <span className="text-sm font-bold text-green-600">
                      {data.final}명 ({data.conversionRate.toFixed(1)}%)
                    </span>
                  </div>
                </div>
              </div>
              
              {/* 가로형 막대 그래프 */}
              <div className="relative h-8 bg-gray-100 rounded-lg overflow-hidden">
                <div
                  className={`absolute left-0 top-0 h-full transition-all duration-500 ${
                    isTopPerformer ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 'bg-blue-400'
                  }`}
                  style={{ width: `${barWidth}%` }}
                />
                
                {/* 최종합격자 표시 (녹색 세그먼트) */}
                {data.final > 0 && (
                  <div
                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-500 to-green-600"
                    style={{ width: `${(data.final / maxTotal) * 100}%` }}
                  />
                )}
                
                {/* 숫자 레이블 */}
                <div className="absolute inset-0 flex items-center justify-between px-3">
                  <span className="text-xs font-semibold text-white drop-shadow">
                    {data.total}명 지원
                  </span>
                  {data.final > 0 && (
                    <span className="text-xs font-semibold text-white drop-shadow">
                      {data.final}명 합격
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* ROI 분석 인사이트 */}
      <div className="mt-6 p-3 bg-green-50 rounded-lg">
        <p className="text-xs text-gray-700">
          <span className="font-semibold">📊 ROI 분석:</span> 
          {' '}녹색 영역은 최종 합격자 수를 나타냅니다. 
          전환율이 높은 채널에 리소스를 집중하는 것이 효율적입니다.
        </p>
      </div>
    </Card>
  );
}

