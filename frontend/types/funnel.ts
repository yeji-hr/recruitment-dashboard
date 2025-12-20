export interface FunnelData {
  date: string;
  proposal: number;          // 제안 (헤드헌팅)
  application: number;       // 지원
  documentSubmit: number;    // 자소서 제출
  documentPass: number;      // 서류전형 통과
  interviewPass: number;     // 면접 통과
  assignmentPass: number;    // 과제테스트 통과
  finalPass: number;         // 최종합격
}

export interface FunnelReport {
  date: string;
  data: FunnelData;
  rates: {
    applicationRate: number;         // 제안 → 지원 전환율
    documentSubmitRate: number;      // 지원 → 자소서 전환율
    documentPassRate: number;        // 자소서 → 서류통과 전환율
    interviewPassRate: number;       // 서류통과 → 면접통과 전환율
    assignmentPassRate: number;      // 면접 → 과제통과 전환율
    finalPassRate: number;           // 과제 → 최종합격 전환율
    
    // 제안 대비 비율
    applicationVsProposal: number;   // 제안 대비 지원율
    documentVsProposal: number;      // 제안 대비 자소서율
    documentPassVsProposal: number;  // 제안 대비 서류통과율
    interviewPassVsProposal: number; // 제안 대비 면접통과율
    assignmentPassVsProposal: number;// 제안 대비 과제통과율
    finalPassVsProposal: number;     // 제안 대비 최종합격률
  };
  changes?: {
    applicationRateChange?: number;
    documentSubmitRateChange?: number;
  };
}

export interface FunnelHistory {
  reports: FunnelReport[];
}

