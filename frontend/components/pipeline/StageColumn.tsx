'use client';

import { Candidate, CandidateStatus } from '@/types/candidate';
import { POSITION_LABELS } from '@/utils/constants';

interface StageColumnProps {
  title: string;
  count: number;
  candidates: Candidate[];
  color: string;
  onCandidateClick: (candidate: Candidate) => void;
}

export default function StageColumn({ 
  title, 
  count, 
  candidates,
  color,
  onCandidateClick 
}: StageColumnProps) {
  return (
    <div className="flex-1 min-w-[280px]">
      {/* Column Header */}
      <div className={`${color} rounded-t-lg px-4 py-3`}>
        <h3 className="text-white font-semibold">
          {title} ({count})
        </h3>
      </div>

      {/* Cards Container */}
      <div className="bg-gray-50 rounded-b-lg p-3 space-y-3 min-h-[400px] border-x border-b border-gray-200">
        {candidates.map((candidate) => (
          <div
            key={candidate.id}
            onClick={() => onCandidateClick(candidate)}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
          >
            <h4 className="font-medium text-gray-900 mb-1">{candidate.name}</h4>
            <p className="text-sm text-gray-600 mb-2">
              {POSITION_LABELS[candidate.position]}
            </p>
            <p className="text-xs text-gray-500">{candidate.email}</p>
          </div>
        ))}
        
        {candidates.length === 0 && (
          <div className="text-center py-8 text-gray-400 text-sm">
            지원자가 없습니다
          </div>
        )}
      </div>
    </div>
  );
}

