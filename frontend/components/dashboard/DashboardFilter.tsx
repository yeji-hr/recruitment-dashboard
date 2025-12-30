'use client';

import { useState } from 'react';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import { POSITION_LABELS, APPLICATION_SOURCE_LABELS } from '@/utils/constants';
import { Filter, X } from 'lucide-react';

interface DashboardFilterProps {
  onFilterChange: (filters: {
    position: string;
    source: string;
  }) => void;
}

export default function DashboardFilter({ onFilterChange }: DashboardFilterProps) {
  const [position, setPosition] = useState('');
  const [source, setSource] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleApply = () => {
    onFilterChange({ position, source });
  };

  const handleReset = () => {
    setPosition('');
    setSource('');
    onFilterChange({ position: '', source: '' });
  };

  const hasFilters = position || source;

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* 필터 헤더 */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <Filter size={20} className="text-gray-600" />
          <h3 className="font-semibold text-gray-900">데이터 필터</h3>
          {hasFilters && (
            <span className="px-2 py-1 bg-primary text-white text-xs rounded-full">
              필터 적용 중
            </span>
          )}
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm text-primary hover:text-blue-600"
        >
          {isExpanded ? '접기' : '펼치기'}
        </button>
      </div>

      {/* 필터 컨트롤 */}
      {isExpanded && (
        <div className="p-4 pt-0 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 직무(포지션) 필터 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                직무 (Job Role)
              </label>
              <Select
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              >
                <option value="">전체 직무</option>
                {Object.entries(POSITION_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </Select>
            </div>

            {/* 채용 채널 필터 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                채용 채널 (Source)
              </label>
              <Select
                value={source}
                onChange={(e) => setSource(e.target.value)}
              >
                <option value="">전체 채널</option>
                {Object.entries(APPLICATION_SOURCE_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          {/* 액션 버튼 */}
          <div className="flex items-center gap-3">
            <Button onClick={handleApply} size="sm">
              필터 적용
            </Button>
            {hasFilters && (
              <Button onClick={handleReset} variant="secondary" size="sm">
                <X size={16} className="mr-1" />
                초기화
              </Button>
            )}
          </div>

          {/* 현재 필터 표시 */}
          {hasFilters && (
            <div className="flex flex-wrap gap-2">
              {position && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  직무: {POSITION_LABELS[position as keyof typeof POSITION_LABELS]}
                </span>
              )}
              {source && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                  채널: {APPLICATION_SOURCE_LABELS[source as keyof typeof APPLICATION_SOURCE_LABELS]}
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

