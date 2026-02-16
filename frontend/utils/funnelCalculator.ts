import { FunnelData, FunnelReport } from '@/types/funnel';

export interface BottleneckAnalysis {
  stage: string;
  rate: number;
  severity: 'critical' | 'warning' | 'normal';
  recommendation: string;
}

export function analyzeBottleneck(report: FunnelReport): BottleneckAnalysis[] {
  const stages = [
    { 
      name: '제안 → 지원 전환율', 
      rate: report.rates.applicationRate,
      recommendations: {
        critical: '제안 메시지의 매력도를 높이세요. 포지션/연봉 정보를 구체적으로 명시하고, 회사의 강점을 부각시키는 것이 중요합니다.',
        warning: '제안 타이밍과 타겟팅을 재점검하세요. 후보자의 이직 의향이 있는 시기에 접근하는 것이 효과적입니다.',
        normal: '양호한 전환율입니다. 현재 제안 전략을 유지하세요.'
      }
    },
    { 
      name: '지원 → 서류접수 전환율', 
      rate: report.rates.documentSubmitRate,
      recommendations: {
        critical: '지원 프로세스가 너무 복잡할 수 있습니다. 지원 양식을 간소화하고, 모바일 최적화를 확인하세요.',
        warning: '지원 단계에서의 이탈을 줄이기 위해 UX를 개선하세요. 필수 입력 항목을 최소화하는 것이 좋습니다.',
        normal: '원활한 지원 프로세스입니다. 현재 시스템을 유지하세요.'
      }
    },
    { 
      name: '서류접수 → 서류합격 전환율', 
      rate: report.rates.documentPassRate,
      recommendations: {
        critical: '서류 평가 기준을 재검토하세요. 너무 높은 기준은 우수 인재 이탈로 이어질 수 있습니다. 평가 항목을 명확히 하고, 포트폴리오/경력 중심으로 평가하세요.',
        warning: '서류 전형 탈락률이 높습니다. 평가 기준을 완화하거나, 1차 면접 기회를 더 많이 제공하는 것을 고려하세요.',
        normal: '적절한 서류 합격률입니다. 현재 기준을 유지하세요.'
      }
    },
    { 
      name: '서류합격 → 1차면접 합격 전환율', 
      rate: report.rates.interviewPassRate,
      recommendations: {
        critical: '면접 프로세스를 개선하세요. 면접관 교육, 평가 기준 명확화, 면접 경험 개선이 필요합니다. 후보자에게 긍정적인 면접 경험을 제공하세요.',
        warning: '1차 면접 탈락률이 높습니다. 면접 질문과 평가 기준을 재점검하고, 면접 시간과 방식을 개선하세요.',
        normal: '양호한 면접 합격률입니다. 현재 프로세스를 유지하세요.'
      }
    },
    { 
      name: '1차면접 → 과제전형 합격 전환율', 
      rate: report.rates.assignmentPassRate,
      recommendations: {
        critical: '과제 난이도와 소요 시간을 재검토하세요. 과제가 너무 어렵거나 시간이 오래 걸리면 우수 인재가 이탈할 수 있습니다. 실무와 유사하고 2-3시간 내 완료 가능한 과제로 조정하세요.',
        warning: '과제 전형 통과율이 낮습니다. 과제 가이드를 명확히 하고, 평가 기준을 투명하게 공개하세요.',
        normal: '적절한 과제 합격률입니다. 현재 기준을 유지하세요.'
      }
    },
    { 
      name: '과제전형 → 최종합격 전환율', 
      rate: report.rates.finalPassRate,
      recommendations: {
        critical: '최종 면접에서의 탈락률이 높습니다. 컬처핏과 처우 조건을 사전에 충분히 논의하세요. 최종 단계에서는 회사의 비전과 성장 가능성을 강조하는 것이 중요합니다.',
        warning: '최종 합격률을 높이기 위해 연봉 협상과 복리후생을 개선하세요. 후보자의 기대치와 회사 제안의 갭을 줄이는 것이 중요합니다.',
        normal: '양호한 최종 합격률입니다. 현재 프로세스를 유지하세요.'
      }
    }
  ];

  const analyses: BottleneckAnalysis[] = stages.map(stage => {
    let severity: 'critical' | 'warning' | 'normal';
    let recommendation: string;

    if (stage.rate < 30) {
      severity = 'critical';
      recommendation = stage.recommendations.critical;
    } else if (stage.rate < 50) {
      severity = 'warning';
      recommendation = stage.recommendations.warning;
    } else {
      severity = 'normal';
      recommendation = stage.recommendations.normal;
    }

    return {
      stage: stage.name,
      rate: stage.rate,
      severity,
      recommendation
    };
  });

  // 전환율이 낮은 순으로 정렬 (병목구간이 위로)
  return analyses.sort((a, b) => a.rate - b.rate);
}

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

