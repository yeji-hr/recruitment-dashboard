'use client';

import { useState } from 'react';
import FunnelInputForm from '@/components/funnel/FunnelInputForm';
import FunnelReportDisplay from '@/components/funnel/FunnelReport';
import Button from '@/components/ui/Button';
import { FunnelData, FunnelReport } from '@/types/funnel';
import { calculateFunnelReport } from '@/utils/funnelCalculator';
import { FileDown, History } from 'lucide-react';

export default function ReportsPage() {
  const [currentReport, setCurrentReport] = useState<FunnelReport | null>(null);
  const [history, setHistory] = useState<FunnelReport[]>([]);

  const handleSubmit = (data: FunnelData) => {
    // 이전 데이터가 있으면 전일 대비 계산
    const previousData = history.length > 0 ? history[history.length - 1].data : undefined;
    
    const report = calculateFunnelReport(data, previousData);
    setCurrentReport(report);
    
    // 히스토리에 추가
    setHistory((prev) => [...prev, report]);
  };

  const copyToClipboard = () => {
    if (!currentReport) return;

    const { data, rates, changes } = currentReport;
    
    let text = `[원티드]\n`;
    text += `## 🎉 핵심 성과 (${currentReport.date} 업데이트)\n\n`;
    text += `**전체 퍼널:**\n`;
    text += `- 제안 ${data.proposal.toLocaleString()}명 → 지원 ${data.application.toLocaleString()}명 (${rates.applicationRate.toFixed(1)}%)`;
    if (changes?.applicationRateChange) {
      text += ` ${changes.applicationRateChange >= 0 ? '⬆️' : '⬇️'}${changes.applicationRateChange.toFixed(1)}%p`;
    }
    text += `\n`;
    text += `- 지원 ${data.application.toLocaleString()}명 → 자소서 ${data.documentSubmit.toLocaleString()}명 (${rates.documentSubmitRate.toFixed(1)}%)`;
    if (changes?.documentSubmitRateChange) {
      text += ` ${changes.documentSubmitRateChange >= 0 ? '⬆️' : '⬇️'}${changes.documentSubmitRateChange.toFixed(1)}%p`;
    }
    text += `\n`;
    text += `- 자소서 ${data.documentSubmit.toLocaleString()}명 → 서류전형 ${data.documentPass.toLocaleString()}명 (${rates.documentPassRate.toFixed(1)}%)\n`;
    text += `- 서류전형 ${data.documentPass.toLocaleString()}명 → **면접 통과 ${data.interviewPass.toLocaleString()}명** ✅ (${rates.interviewPassRate.toFixed(1)}%)\n`;
    text += `- 면접 ${data.interviewPass.toLocaleString()}명 → **과제테스트 통과 ${data.assignmentPass.toLocaleString()}명** ✅ (${rates.assignmentPassRate.toFixed(1)}%)\n`;
    text += `- **과제 ${data.assignmentPass.toLocaleString()}명 → 최종합격 ${data.finalPass.toLocaleString()}명** 🎉\n\n`;
    
    text += `**제안 대비 비율 핵심:**\n`;
    text += `- 제안 ${data.proposal.toLocaleString()}명 중 ${data.application.toLocaleString()}명(${rates.applicationVsProposal.toFixed(1)}%)이 제안 수락 (지원)`;
    if (changes?.applicationRateChange) {
      text += ` ${changes.applicationRateChange >= 0 ? '⬆️' : '⬇️'}${changes.applicationRateChange.toFixed(1)}%p`;
    }
    text += `\n`;
    text += `- 제안 ${data.proposal.toLocaleString()}명 중 ${data.documentSubmit.toLocaleString()}명(${rates.documentVsProposal.toFixed(1)}%)이 자소서 제출`;
    if (changes?.documentSubmitRateChange) {
      text += ` ${changes.documentSubmitRateChange >= 0 ? '⬆️' : '⬇️'}${changes.documentSubmitRateChange.toFixed(1)}%p`;
    }
    text += `\n`;
    text += `- 제안 ${data.proposal.toLocaleString()}명 중 ${data.documentPass.toLocaleString()}명(${rates.documentPassVsProposal.toFixed(1)}%)이 서류전형 통과 유지\n`;
    text += `- 제안 ${data.proposal.toLocaleString()}명 중 ${data.interviewPass.toLocaleString()}명(${rates.interviewPassVsProposal.toFixed(1)}%)이 면접 통과 ✅\n`;
    text += `- 제안 ${data.proposal.toLocaleString()}명 중 ${data.assignmentPass.toLocaleString()}명(${rates.assignmentPassVsProposal.toFixed(1)}%)이 과제테스트 통과 ✅\n`;
    text += `- 제안 ${data.proposal.toLocaleString()}명 중 ${data.finalPass.toLocaleString()}명(${rates.finalPassVsProposal.toFixed(1)}%)이 최종합격 🎉\n`;

    navigator.clipboard.writeText(text);
    alert('리포트가 클립보드에 복사되었습니다! 📋');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">채용 퍼널 리포트 자동화</h1>
        <p className="text-gray-600 mt-1">
          제안 수와 각 단계별 인원을 입력하면 자동으로 전환율과 리포트가 생성됩니다
        </p>
      </div>

      {/* Input Form */}
      <FunnelInputForm onSubmit={handleSubmit} />

      {/* Generated Report */}
      {currentReport && (
        <>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">생성된 리포트</h2>
            <div className="flex gap-3">
              <Button onClick={copyToClipboard} variant="secondary">
                <FileDown size={18} className="mr-2" />
                텍스트 복사
              </Button>
              {history.length > 1 && (
                <Button variant="secondary">
                  <History size={18} className="mr-2" />
                  히스토리 ({history.length})
                </Button>
              )}
            </div>
          </div>
          
          <FunnelReportDisplay report={currentReport} />
        </>
      )}

      {/* Empty State */}
      {!currentReport && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg mb-2">📊 데이터를 입력하고 리포트를 생성해보세요!</p>
          <p className="text-gray-400 text-sm">
            제안 수와 각 단계별 인원만 입력하면 자동으로 계산됩니다
          </p>
        </div>
      )}
    </div>
  );
}

