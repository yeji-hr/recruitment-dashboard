'use client';

import { useState } from 'react';
import { Users, FileText, Calendar, CheckCircle } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import RecentCandidates from '@/components/dashboard/RecentCandidates';
import EnhancedStageChart from '@/components/dashboard/EnhancedStageChart';
import LeadTimeWidget from '@/components/dashboard/LeadTimeWidget';
import SourceROIChart from '@/components/dashboard/SourceROIChart';
import DashboardFilter from '@/components/dashboard/DashboardFilter';
import { calculateLeadTime, calculateSourceROI } from '@/utils/hrMetrics';
import { Candidate } from '@/types/candidate';

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

const mockRecentCandidates: Candidate[] = [
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
    status: 'INTERVIEW_1' as const,
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
    position: 'FRONTEND' as const,
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
    position: 'VIDEO_MARKETER' as const,
    status: 'SCREENING' as const,
    source: 'WANTED' as const,
    appliedDate: '2025-12-06',
    createdAt: '2025-12-06T15:00:00Z',
    updatedAt: '2025-12-06T15:00:00Z',
  },
];

// 전체 후보자 데이터 (필터링용)
const allCandidates: Candidate[] = [
  ...mockRecentCandidates,
  {
    id: '6',
    name: '강민지',
    email: 'kang@example.com',
    phone: '010-1111-2222',
    position: 'FRONTEND' as const,
    status: 'FINAL' as const,
    source: 'WANTED' as const,
    appliedDate: '2025-11-20',
    createdAt: '2025-11-20T09:00:00Z',
    updatedAt: '2025-12-15T14:00:00Z',
  },
  {
    id: '7',
    name: '송하준',
    email: 'song@example.com',
    phone: '010-3333-4444',
    position: 'BACKEND' as const,
    status: 'FINAL' as const,
    source: 'REMEMBER' as const,
    appliedDate: '2025-11-18',
    createdAt: '2025-11-18T10:00:00Z',
    updatedAt: '2025-12-12T16:00:00Z',
  },
];

export default function DashboardPage() {
  const [filters, setFilters] = useState({ position: '', source: '' });

  // 필터 적용
  const filteredCandidates = allCandidates.filter(candidate => {
    if (filters.position && candidate.position !== filters.position) return false;
    if (filters.source && candidate.source !== filters.source) return false;
    return true;
  });

  // 필터링된 데이터로 통계 재계산
  const filteredStats = {
    total: filteredCandidates.length,
    applied: filteredCandidates.filter(c => c.status === 'APPLIED').length,
    screening: filteredCandidates.filter(c => c.status === 'SCREENING').length,
    interview1: filteredCandidates.filter(c => c.status === 'INTERVIEW_1').length,
    assignment: filteredCandidates.filter(c => c.status === 'ASSIGNMENT').length,
    interview2: filteredCandidates.filter(c => c.status === 'INTERVIEW_2').length,
    final: filteredCandidates.filter(c => c.status === 'FINAL').length,
    rejected: filteredCandidates.filter(c => c.status === 'REJECTED').length,
  };

  // HR 메트릭 계산
  const leadTime = calculateLeadTime(filteredCandidates);
  const sourceROI = calculateSourceROI(filteredCandidates);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">대시보드</h1>
        <p className="text-gray-600 mt-1">
          데이터 기반 채용 인사이트를 확인하세요
        </p>
      </div>

      {/* 필터 */}
      <DashboardFilter onFilterChange={setFilters} />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-6">
        <StatCard
          title="전체 지원자"
          value={filteredStats.total}
          icon={<Users className="text-white" size={24} />}
          color="bg-primary"
        />
        <StatCard
          title="서류접수"
          value={filteredStats.applied}
          icon={<FileText className="text-white" size={24} />}
          color="bg-warning"
        />
        <StatCard
          title="1차면접 합격"
          value={filteredStats.interview1}
          icon={<Calendar className="text-white" size={24} />}
          color="bg-indigo-500"
        />
        <StatCard
          title="과제 합격"
          value={filteredStats.assignment}
          icon={<FileText className="text-white" size={24} />}
          color="bg-orange-500"
        />
        <StatCard
          title="면접 진행"
          value={filteredStats.interview1 + filteredStats.interview2}
          icon={<Calendar className="text-white" size={24} />}
          color="bg-purple-500"
        />
        <StatCard
          title="최종 합격"
          value={filteredStats.final}
          icon={<CheckCircle className="text-white" size={24} />}
          color="bg-success"
        />
        {/* 리드타임 위젯 */}
        <LeadTimeWidget leadTime={leadTime} />
      </div>

      {/* 전환율 차트 & 채널별 ROI */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EnhancedStageChart stats={filteredStats} />
        <SourceROIChart sourceData={sourceROI} />
      </div>

      {/* 최근 지원자 */}
      <RecentCandidates candidates={filteredCandidates.slice(0, 5)} />
    </div>
  );
}

