'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import { POSITION_LABELS, CANDIDATE_STATUS_LABELS } from '@/utils/constants';

interface FilterBarProps {
  onFilterChange: (filters: {
    search: string;
    position: string;
    status: string;
  }) => void;
}

export default function FilterBar({ onFilterChange }: FilterBarProps) {
  const [search, setSearch] = useState('');
  const [position, setPosition] = useState('');
  const [status, setStatus] = useState('');

  const handleApplyFilters = () => {
    onFilterChange({ search, position, status });
  };

  const handleReset = () => {
    setSearch('');
    setPosition('');
    setStatus('');
    onFilterChange({ search: '', position: '', status: '' });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search */}
        <div className="md:col-span-2">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="이름, 이메일로 검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleApplyFilters()}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        {/* Position Filter */}
        <Select
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        >
          <option value="">포지션 전체</option>
          {Object.entries(POSITION_LABELS).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </Select>

        {/* Status Filter */}
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">상태 전체</option>
          {Object.entries(CANDIDATE_STATUS_LABELS).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </Select>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-4">
        <Button onClick={handleApplyFilters} size="sm">
          적용
        </Button>
        <Button onClick={handleReset} variant="secondary" size="sm">
          초기화
        </Button>
      </div>
    </div>
  );
}

