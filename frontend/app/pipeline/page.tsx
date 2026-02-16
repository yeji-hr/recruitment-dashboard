'use client';

import PipelineBoard from '@/components/pipeline/PipelineBoard';

// 임시 데이터
const mockCandidates = [
  {
    id: '1',
    name: '김철수',
    email: 'kim@example.com',
    phone: '010-1234-5678',
    position: 'FRONTEND' as const,
    status: 'APPLIED' as const,
    source: 'WANTED' as const,
    appliedDate: '2025-12-10',
    createdAt: '2025-12-10T09:00:00Z',
    updatedAt: '2025-12-10T09:00:00Z',
  },
  {
    id: '2',
    name: '이영희',
    email: 'lee@example.com',
    phone: '010-2345-6789',
    position: 'BACKEND' as const,
    status: 'SCREENING' as const,
    source: 'REMEMBER' as const,
    appliedDate: '2025-12-09',
    createdAt: '2025-12-09T10:00:00Z',
    updatedAt: '2025-12-09T10:00:00Z',
  },
  {
    id: '3',
    name: '박민수',
    email: 'park@example.com',
    phone: '010-3456-7890',
    position: 'BACKEND' as const,
    status: 'FINAL' as const,
    source: 'SARAMIN' as const,
    appliedDate: '2025-12-08',
    createdAt: '2025-12-08T11:00:00Z',
    updatedAt: '2025-12-08T11:00:00Z',
  },
  {
    id: '4',
    name: '정지훈',
    email: 'jung@example.com',
    phone: '010-4567-8901',
    position: 'BACKEND' as const,
    status: 'INTERVIEW_2' as const,
    source: 'REFERRAL' as const,
    appliedDate: '2025-12-07',
    createdAt: '2025-12-07T14:00:00Z',
    updatedAt: '2025-12-07T14:00:00Z',
  },
  {
    id: '5',
    name: '최수진',
    email: 'choi@example.com',
    phone: '010-5678-9012',
    position: 'PM' as const,
    status: 'INTERVIEW_1' as const,
    source: 'WANTED' as const,
    appliedDate: '2025-12-06',
    createdAt: '2025-12-06T15:00:00Z',
    updatedAt: '2025-12-06T15:00:00Z',
  },
  {
    id: '6',
    name: '한소희',
    email: 'han@example.com',
    phone: '010-6789-0123',
    position: 'FRONTEND' as const,
    status: 'INTERVIEW_1' as const,
    source: 'SARAMIN' as const,
    appliedDate: '2025-12-05',
    createdAt: '2025-12-05T16:00:00Z',
    updatedAt: '2025-12-05T16:00:00Z',
  },
  {
    id: '7',
    name: '서영민',
    email: 'seo@example.com',
    phone: '010-7890-1234',
    position: 'BACKEND' as const,
    status: 'APPLIED' as const,
    source: 'JOBKOREA' as const,
    appliedDate: '2025-12-04',
    createdAt: '2025-12-04T17:00:00Z',
    updatedAt: '2025-12-04T17:00:00Z',
  },
  {
    id: '8',
    name: '윤지수',
    email: 'yoon@example.com',
    phone: '010-8901-2345',
    position: 'PM' as const,
    status: 'SCREENING' as const,
    source: 'DIRECT' as const,
    appliedDate: '2025-12-03',
    createdAt: '2025-12-03T18:00:00Z',
    updatedAt: '2025-12-03T18:00:00Z',
  },
];

export default function PipelinePage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">채용 파이프라인</h1>
        <p className="text-gray-600 mt-1">
          단계별 지원자 현황을 확인하고 카드를 클릭하여 상세 정보를 확인하세요
        </p>
      </div>

      {/* Pipeline Board */}
      <PipelineBoard candidates={mockCandidates} />
    </div>
  );
}

