'use client';

import { useState, useMemo } from 'react';
import { Users, Send, CheckCircle2, FileEdit, FileText, Calendar, Award } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import RecentCandidates from '@/components/dashboard/RecentCandidates';
import EnhancedStageChart from '@/components/dashboard/EnhancedStageChart';
import LeadTimeWidget from '@/components/dashboard/LeadTimeWidget';
import SourceROIChart from '@/components/dashboard/SourceROIChart';
import DashboardFilter from '@/components/dashboard/DashboardFilter';
import { calculateLeadTime, calculateSourceROI } from '@/utils/hrMetrics';
import { Candidate } from '@/types/candidate';
import { generateMockCandidates, REAL_AI_ENGINEER_STATS } from '@/utils/mockDataGenerator';

export default function DashboardPage() {
  const [filters, setFilters] = useState({ position: '', source: '' });
  
  // 샘플 데이터 생성 (500명, Vercel 용량 제한)
  const allCandidates = useMemo(() => generateMockCandidates(), []);

  // 필터 적용
  const filteredCandidates = allCandidates.filter(candidate => {
    if (filters.position && candidate.position !== filters.position) return false;
    if (filters.source && candidate.source !== filters.source) return false;
    return true;
  });

  // 필터가 없으면 실제 통계 사용, 필터가 있으면 샘플 데이터 통계 사용
  const hasFilters = filters.position || filters.source;
  
  const filteredStats = hasFilters ? {
    total: filteredCandidates.length,
    proposal: filteredCandidates.filter(c => c.status === 'PROPOSAL').length,
    proposalAccepted: filteredCandidates.filter(c => c.status === 'PROPOSAL_ACCEPTED').length,
    coverLetter: filteredCandidates.filter(c => c.status === 'COVER_LETTER').length,
    applied: filteredCandidates.filter(c => c.status === 'APPLIED').length,
    screening: filteredCandidates.filter(c => c.status === 'SCREENING').length,
    interview1: filteredCandidates.filter(c => c.status === 'INTERVIEW_1').length,
    assignment: filteredCandidates.filter(c => c.status === 'ASSIGNMENT').length,
    interview2: filteredCandidates.filter(c => c.status === 'INTERVIEW_2').length,
    final: filteredCandidates.filter(c => c.status === 'FINAL').length,
    rejected: filteredCandidates.filter(c => c.status === 'REJECTED').length,
  } : REAL_AI_ENGINEER_STATS; // 필터 없으면 실제 데이터 사용!

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="제안"
          value={filteredStats.proposal}
          icon={<Send className="text-white" size={24} />}
          color="bg-gray-600"
        />
        <StatCard
          title="제안수락"
          value={filteredStats.proposalAccepted}
          icon={<CheckCircle2 className="text-white" size={24} />}
          color="bg-cyan-500"
        />
        <StatCard
          title="자소서 제출"
          value={filteredStats.coverLetter}
          icon={<FileEdit className="text-white" size={24} />}
          color="bg-sky-500"
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
      </div>
      
      {/* 추가 통계 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="서류접수"
          value={filteredStats.applied}
          icon={<FileText className="text-white" size={24} />}
          color="bg-yellow-500"
        />
        <StatCard
          title="최종면접"
          value={filteredStats.interview2}
          icon={<Calendar className="text-white" size={24} />}
          color="bg-purple-500"
        />
        <StatCard
          title="최종 합격"
          value={filteredStats.final}
          icon={<Award className="text-white" size={24} />}
          color="bg-green-500"
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

