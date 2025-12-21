'use client';

import Card from '@/components/ui/Card';
import { FunnelReport } from '@/types/funnel';
import { formatRate, formatChange } from '@/utils/funnelCalculator';
import { ArrowDown, ArrowUp, Minus } from 'lucide-react';

interface FunnelReportProps {
  report: FunnelReport;
}

export default function FunnelReportDisplay({ report }: FunnelReportProps) {
  const { data, rates, changes } = report;

  const renderChange = (change?: number) => {
    if (change === undefined) return null;
    
    if (change > 0) {
      return (
        <span className="inline-flex items-center gap-1 text-red-600 text-sm">
          <ArrowUp size={16} />
          {formatChange(change)}
        </span>
      );
    } else if (change < 0) {
      return (
        <span className="inline-flex items-center gap-1 text-blue-600 text-sm">
          <ArrowDown size={16} />
          {formatChange(change)}
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center gap-1 text-gray-600 text-sm">
          <Minus size={16} />
          {formatChange(0)}
        </span>
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          🎉 핵심 성과 ({report.date} 업데이트)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600">최종 합격</p>
            <p className="text-3xl font-bold text-green-600">{data.finalPass}명</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600">과제 통과</p>
            <p className="text-3xl font-bold text-blue-600">{data.assignmentPass}명</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-gray-600">면접 통과</p>
            <p className="text-3xl font-bold text-purple-600">{data.interviewPass}명</p>
          </div>
        </div>
      </Card>

      {/* 전체 퍼널 */}
      <Card>
        <h3 className="text-xl font-bold text-gray-900 mb-4">📊 전체 퍼널</h3>
        
        <div className="space-y-3">
          {/* 제안 → 지원 */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <p className="font-medium text-gray-900">
                제안 {data.proposal.toLocaleString()}명 → 지원 {data.application.toLocaleString()}명
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-bold text-lg text-primary">{formatRate(rates.applicationRate)}</span>
              {renderChange(changes?.applicationRateChange)}
            </div>
          </div>

          {/* 지원 → 자소서 */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <p className="font-medium text-gray-900">
                지원 {data.application.toLocaleString()}명 → 자소서 {data.documentSubmit.toLocaleString()}명
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-bold text-lg text-primary">{formatRate(rates.documentSubmitRate)}</span>
              {renderChange(changes?.documentSubmitRateChange)}
            </div>
          </div>

          {/* 자소서 → 서류전형 */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <p className="font-medium text-gray-900">
                자소서 {data.documentSubmit.toLocaleString()}명 → 서류전형 {data.documentPass.toLocaleString()}명
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-bold text-lg text-primary">{formatRate(rates.documentPassRate)}</span>
            </div>
          </div>

          {/* 서류전형 → 면접 */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <p className="font-medium text-gray-900">
                서류전형 {data.documentPass.toLocaleString()}명 → 면접 통과 {data.interviewPass.toLocaleString()}명
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-bold text-lg text-green-600">{formatRate(rates.interviewPassRate)}</span>
              {rates.interviewPassRate === 100 && <span className="text-green-600">✅</span>}
            </div>
          </div>

          {/* 면접 → 과제 */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <p className="font-medium text-gray-900">
                면접 {data.interviewPass.toLocaleString()}명 → 과제테스트 통과 {data.assignmentPass.toLocaleString()}명
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-bold text-lg text-green-600">{formatRate(rates.assignmentPassRate)}</span>
              {rates.assignmentPassRate === 100 && <span className="text-green-600">✅</span>}
            </div>
          </div>

          {/* 과제 → 최종 */}
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border-2 border-green-200">
            <div className="flex-1">
              <p className="font-bold text-gray-900">
                과제 {data.assignmentPass.toLocaleString()}명 → 최종합격 {data.finalPass.toLocaleString()}명
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-bold text-xl text-green-600">{formatRate(rates.finalPassRate)}</span>
              <span className="text-2xl">🎉</span>
            </div>
          </div>
        </div>
      </Card>

      {/* 제안 대비 비율 */}
      <Card>
        <h3 className="text-xl font-bold text-gray-900 mb-4">🔍 제안 대비 비율 핵심</h3>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
            <p className="text-gray-700">
              제안 {data.proposal.toLocaleString()}명 중 {data.application.toLocaleString()}명이 제안 수락 (지원)
            </p>
            <div className="flex items-center gap-2">
              <span className="font-bold text-primary">{formatRate(rates.applicationVsProposal)}</span>
              {renderChange(changes?.applicationRateChange)}
            </div>
          </div>

          <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
            <p className="text-gray-700">
              제안 {data.proposal.toLocaleString()}명 중 {data.documentSubmit.toLocaleString()}명이 자소서 제출
            </p>
            <div className="flex items-center gap-2">
              <span className="font-bold text-primary">{formatRate(rates.documentVsProposal)}</span>
              {renderChange(changes?.documentSubmitRateChange)}
            </div>
          </div>

          <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
            <p className="text-gray-700">
              제안 {data.proposal.toLocaleString()}명 중 {data.documentPass.toLocaleString()}명이 서류전형 통과 유지
            </p>
            <span className="font-bold text-primary">{formatRate(rates.documentPassVsProposal)}</span>
          </div>

          <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
            <p className="text-gray-700">
              제안 {data.proposal.toLocaleString()}명 중 {data.interviewPass.toLocaleString()}명이 면접 통과
            </p>
            <div className="flex items-center gap-2">
              <span className="font-bold text-green-600">{formatRate(rates.interviewPassVsProposal)}</span>
              <span>✅</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
            <p className="text-gray-700">
              제안 {data.proposal.toLocaleString()}명 중 {data.assignmentPass.toLocaleString()}명이 과제테스트 통과
            </p>
            <div className="flex items-center gap-2">
              <span className="font-bold text-green-600">{formatRate(rates.assignmentPassVsProposal)}</span>
              <span>✅</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <p className="font-bold text-gray-900">
              제안 {data.proposal.toLocaleString()}명 중 {data.finalPass.toLocaleString()}명이 최종합격
            </p>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xl text-green-600">{formatRate(rates.finalPassVsProposal)}</span>
              <span className="text-xl">🎉</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}


