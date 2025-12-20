import { FunnelData, FunnelReport } from '@/types/funnel';

export function calculateFunnelReport(
  data: FunnelData,
  previousData?: FunnelData
): FunnelReport {
  const { proposal, application, documentSubmit, documentPass, interviewPass, assignmentPass, finalPass } = data;

  // 단계별 전환율 계산
  const applicationRate = proposal > 0 ? (application / proposal) * 100 : 0;
  const documentSubmitRate = application > 0 ? (documentSubmit / application) * 100 : 0;
  const documentPassRate = documentSubmit > 0 ? (documentPass / documentSubmit) * 100 : 0;
  const interviewPassRate = documentPass > 0 ? (interviewPass / documentPass) * 100 : 0;
  const assignmentPassRate = interviewPass > 0 ? (assignmentPass / interviewPass) * 100 : 0;
  const finalPassRate = assignmentPass > 0 ? (finalPass / assignmentPass) * 100 : 0;

  // 제안 대비 비율 계산
  const applicationVsProposal = proposal > 0 ? (application / proposal) * 100 : 0;
  const documentVsProposal = proposal > 0 ? (documentSubmit / proposal) * 100 : 0;
  const documentPassVsProposal = proposal > 0 ? (documentPass / proposal) * 100 : 0;
  const interviewPassVsProposal = proposal > 0 ? (interviewPass / proposal) * 100 : 0;
  const assignmentPassVsProposal = proposal > 0 ? (assignmentPass / proposal) * 100 : 0;
  const finalPassVsProposal = proposal > 0 ? (finalPass / proposal) * 100 : 0;

  const report: FunnelReport = {
    date: data.date,
    data,
    rates: {
      applicationRate,
      documentSubmitRate,
      documentPassRate,
      interviewPassRate,
      assignmentPassRate,
      finalPassRate,
      applicationVsProposal,
      documentVsProposal,
      documentPassVsProposal,
      interviewPassVsProposal,
      assignmentPassVsProposal,
      finalPassVsProposal,
    },
  };

  // 전일 대비 변화율 계산
  if (previousData) {
    const prevApplicationRate = previousData.proposal > 0 
      ? (previousData.application / previousData.proposal) * 100 
      : 0;
    const prevDocumentSubmitRate = previousData.application > 0 
      ? (previousData.documentSubmit / previousData.application) * 100 
      : 0;

    report.changes = {
      applicationRateChange: applicationRate - prevApplicationRate,
      documentSubmitRateChange: documentSubmitRate - prevDocumentSubmitRate,
    };
  }

  return report;
}

export function formatRate(rate: number): string {
  return `${rate.toFixed(1)}%`;
}

export function formatChange(change: number): string {
  const sign = change >= 0 ? '+' : '';
  return `${sign}${change.toFixed(1)}%p`;
}

