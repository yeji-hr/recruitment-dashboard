'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import Button from '@/components/ui/Button';
import FilterBar from '@/components/candidates/FilterBar';
import CandidateTable from '@/components/candidates/CandidateTable';
import { generateMockCandidates } from '@/utils/mockDataGenerator';

export default function CandidatesPage() {
  // 실제 AI 엔지니어 데이터 생성
  const mockCandidates = useMemo(() => generateMockCandidates(), []);
  
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
