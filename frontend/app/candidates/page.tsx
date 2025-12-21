'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import Button from '@/components/ui/Button';
import FilterBar from '@/components/candidates/FilterBar';
import CandidateTable from '@/components/candidates/CandidateTable';

// 임시 데이터 (나중에 API로 대체)
const mockCandidates = [
  {
    id: '1',
    name: '김철수',
    email: 'kim@example.com',
    phone: '01012345678',
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
    phone: '01023456789',
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
    phone: '01034567890',
    position: 'DESIGN' as const,
    status: 'FINAL' as const,
    source: 'LINKEDIN' as const,
    appliedDate: '2025-12-08',
    createdAt: '2025-12-08T11:00:00Z',
    updatedAt: '2025-12-08T11:00:00Z',
  },
  {
    id: '4',
    name: '정지훈',
    email: 'jung@example.com',
    phone: '01045678901',
    position: 'FULLSTACK' as const,
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
    phone: '01056789012',
    position: 'PM' as const,
    status: 'SCREENING' as const,
    source: 'WANTED' as const,
    appliedDate: '2025-12-06',
    createdAt: '2025-12-06T15:00:00Z',
    updatedAt: '2025-12-06T15:00:00Z',
  },
];

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState(mockCandidates);
  const [filteredCandidates, setFilteredCandidates] = useState(mockCandidates);

  const handleFilterChange = (filters: { search: string; position: string; status: string }) => {
    let filtered = [...candidates];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(searchLower) ||
          c.email.toLowerCase().includes(searchLower)
      );
    }

    if (filters.position) {
      filtered = filtered.filter((c) => c.position === filters.position);
    }

    if (filters.status) {
      filtered = filtered.filter((c) => c.status === filters.status);
    }

    setFilteredCandidates(filtered);
  };

  const handleDelete = (id: string) => {
    const updated = candidates.filter((c) => c.id !== id);
    setCandidates(updated);
    setFilteredCandidates(updated);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">지원자 관리</h1>
          <p className="text-gray-600 mt-1">
            전체 {filteredCandidates.length}명의 지원자
          </p>
        </div>
        <Link href="/candidates/new">
          <Button>
            <Plus size={20} className="mr-2" />
            새 지원자 추가
          </Button>
        </Link>
      </div>

      {/* Filter Bar */}
      <FilterBar onFilterChange={handleFilterChange} />

      {/* Candidate Table */}
      <CandidateTable candidates={filteredCandidates} onDelete={handleDelete} />
    </div>
  );
}

