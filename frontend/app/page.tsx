'use client';

import { Users, FileText, Calendar, CheckCircle } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import RecentCandidates from '@/components/dashboard/RecentCandidates';
import StageChart from '@/components/dashboard/StageChart';

// 임시 데이터 (나중에 API로 대체)
const mockStats = {
  total: 52,
  applied: 12,
  screening: 8,
  assignment: 6,
  interview1: 15,
  interview2: 10,
  final: 7,
  rejected: 0,
};

const mockRecentCandidates = [
  {
    id: '1',
    name: '김철수',
    email: 'kim@example.com',
    phone: '010-1234-5678',
    position: 'FRONTEND' as const,
    status: 'APPLIED' as const,
    source: 'WANTED' as const,
    appliedDate: '2024-12-10',
    createdAt: '2024-12-10T09:00:00Z',
    updatedAt: '2024-12-10T09:00:00Z',
  },
  {
    id: '2',
    name: '이영희',
    email: 'lee@example.com',
    phone: '010-2345-6789',
    position: 'BACKEND' as const,
    status: 'INTERVIEW_1' as const,
    source: 'REMEMBER' as const,
    appliedDate: '2024-12-09',
    createdAt: '2024-12-09T10:00:00Z',
    updatedAt: '2024-12-09T10:00:00Z',
  },
  {
    id: '3',
    name: '박민수',
    email: 'park@example.com',
    phone: '010-3456-7890',
    position: 'DESIGN' as const,
    status: 'FINAL' as const,
    source: 'LINKEDIN' as const,
    appliedDate: '2024-12-08',
    createdAt: '2024-12-08T11:00:00Z',
    updatedAt: '2024-12-08T11:00:00Z',
  },
  {
    id: '4',
    name: '정지훈',
    email: 'jung@example.com',
    phone: '010-4567-8901',
    position: 'FULLSTACK' as const,
    status: 'INTERVIEW_2' as const,
    source: 'REFERRAL' as const,
    appliedDate: '2024-12-07',
    createdAt: '2024-12-07T14:00:00Z',
    updatedAt: '2024-12-07T14:00:00Z',
  },
  {
    id: '5',
    name: '최수진',
    email: 'choi@example.com',
    phone: '010-5678-9012',
    position: 'PM' as const,
    status: 'SCREENING' as const,
    source: 'WANTED' as const,
    appliedDate: '2024-12-06',
    createdAt: '2024-12-06T15:00:00Z',
    updatedAt: '2024-12-06T15:00:00Z',
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">대시보드</h1>
        <p className="text-gray-600 mt-1">채용 현황을 한눈에 확인하세요</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="전체 지원자"
          value={mockStats.total}
          icon={<Users className="text-white" size={24} />}
          color="bg-primary"
        />
        <StatCard
          title="서류접수"
          value={mockStats.applied}
          icon={<FileText className="text-white" size={24} />}
          color="bg-warning"
        />
        <StatCard
          title="면접 진행"
          value={mockStats.interview1 + mockStats.interview2}
          icon={<Calendar className="text-white" size={24} />}
          color="bg-purple-500"
        />
        <StatCard
          title="최종 합격"
          value={mockStats.final}
          icon={<CheckCircle className="text-white" size={24} />}
          color="bg-success"
        />
      </div>

      {/* Charts and Recent Candidates */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StageChart stats={mockStats} />
        <RecentCandidates candidates={mockRecentCandidates} />
      </div>
    </div>
  );
}

