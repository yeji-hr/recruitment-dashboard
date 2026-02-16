'use client';

import { BottleneckAnalysis as BottleneckData } from '@/utils/funnelCalculator';
import { AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react';

interface BottleneckAnalysisProps {
  analyses: BottleneckData[];
}

export default function BottleneckAnalysis({ analyses }: BottleneckAnalysisProps) {
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      default:
        return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
  };

  const getSeverityBgColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-green-50 border-green-200';
    }
  };

  const getSeverityLabel = (severity: string) => {
    switch (severity) {
      case 'critical':
        return '심각';
      case 'warning':
        return '주의';
      default:
        return '양호';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        병목구간 분석 및 개선 전략
      </h3>
      
      <div className="space-y-4">
        {analyses.map((analysis, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border-2 ${getSeverityBgColor(analysis.severity)}`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                {getSeverityIcon(analysis.severity)}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">
                    {analysis.stage}
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-600">
                      {analysis.rate.toFixed(1)}%
                    </span>
                    <span className={`text-xs font-medium px-2 py-1 rounded ${
                      analysis.severity === 'critical' 
                        ? 'bg-red-100 text-red-700' 
                        : analysis.severity === 'warning'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {getSeverityLabel(analysis.severity)}
                    </span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-700 leading-relaxed">
                  {analysis.recommendation}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-2">해석 가이드</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• <strong>심각 (30% 미만)</strong>: 즉시 개선이 필요한 병목구간입니다.</li>
          <li>• <strong>주의 (30-50%)</strong>: 개선을 고려해야 하는 구간입니다.</li>
          <li>• <strong>양호 (50% 이상)</strong>: 현재 프로세스가 잘 작동하고 있습니다.</li>
        </ul>
      </div>
    </div>
  );
}

