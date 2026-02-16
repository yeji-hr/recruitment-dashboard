import { CandidateStatus, Position, ApplicationSource } from '@/types/candidate';

export const CANDIDATE_STATUS_LABELS: Record<CandidateStatus, string> = {
  PROPOSAL: '제안',
  PROPOSAL_ACCEPTED: '제안수락',
  COVER_LETTER: '자소서 제출',
  APPLIED: '서류접수',
  SCREENING: '서류합격',
  INTERVIEW_1: '1차면접',
  ASSIGNMENT: '과제전형',
  INTERVIEW_2: '최종면접',
  FINAL: '최종합격',
  REJECTED: '불합격',
};

export const CANDIDATE_STATUS_COLORS: Record<CandidateStatus, string> = {
  PROPOSAL: 'bg-gray-100 text-gray-800',
  PROPOSAL_ACCEPTED: 'bg-cyan-100 text-cyan-800',
  COVER_LETTER: 'bg-sky-100 text-sky-800',
  APPLIED: 'bg-yellow-100 text-yellow-800',
  SCREENING: 'bg-blue-100 text-blue-800',
  INTERVIEW_1: 'bg-indigo-100 text-indigo-800',
  ASSIGNMENT: 'bg-orange-100 text-orange-800',
  INTERVIEW_2: 'bg-purple-100 text-purple-800',
  FINAL: 'bg-green-100 text-green-800',
  REJECTED: 'bg-red-100 text-red-800',
};

export const POSITION_LABELS: Record<Position, string> = {
  FRONTEND: '프론트엔드',
  BACKEND: '백엔드',
  AI_ENGINEER: 'AI 엔지니어',
  VIDEO_MARKETER: '영상콘텐츠마케터',
  OTHER: '기타',
};

export const APPLICATION_SOURCE_LABELS: Record<ApplicationSource, string> = {
  WANTED: '원티드',
  REMEMBER: '리멤버',
  SARAMIN: '사람인',
  JOBKOREA: '잡코리아',
  DIRECT: '직접지원',
};

export const APPLICATION_SOURCE_COLORS: Record<ApplicationSource, string> = {
  WANTED: 'bg-blue-100 text-blue-800',
  REMEMBER: 'bg-purple-100 text-purple-800',
  SARAMIN: 'bg-green-100 text-green-800',
  JOBKOREA: 'bg-yellow-100 text-yellow-800',
  DIRECT: 'bg-gray-100 text-gray-800',
};

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

