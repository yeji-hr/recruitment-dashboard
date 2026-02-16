export type CandidateStatus = 
  | 'PROPOSAL'       // 제안
  | 'PROPOSAL_ACCEPTED' // 제안수락
  | 'COVER_LETTER'  // 자기소개서 제출
  | 'APPLIED'       // 서류접수
  | 'SCREENING'     // 서류합격
  | 'INTERVIEW_1'   // 1차면접
  | 'ASSIGNMENT'    // 과제전형
  | 'INTERVIEW_2'   // 최종면접
  | 'FINAL'         // 최종합격
  | 'REJECTED';     // 불합격

export type Position = 
  | 'FRONTEND'
  | 'BACKEND'
  | 'AI_ENGINEER'
  | 'VIDEO_MARKETER'
  | 'OTHER';

export type ApplicationSource = 
  | 'WANTED'      // 원티드
  | 'REMEMBER'    // 리멤버
  | 'SARAMIN'     // 사람인
  | 'JOBKOREA'    // 잡코리아
  | 'DIRECT';     // 직접지원

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: Position;
  status: CandidateStatus;
  source: ApplicationSource;
  appliedDate: string;
  resumeUrl?: string;
  portfolioUrl?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CandidateFormData {
  name: string;
  email: string;
  phone: string;
  position: Position;
  source: ApplicationSource;
  resumeUrl?: string;
  portfolioUrl?: string;
  notes?: string;
}

export interface CandidateStats {
  total: number;
  proposal: number;
  proposalAccepted: number;
  coverLetter: number;
  applied: number;
  screening: number;
  interview1: number;
  assignment: number;
  interview2: number;
  final: number;
  rejected: number;
}

