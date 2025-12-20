import Link from 'next/link';
import Card from '@/components/ui/Card';
import StatusBadge from '@/components/candidates/StatusBadge';
import { Candidate } from '@/types/candidate';
import { formatDate } from '@/utils/helpers';
import { POSITION_LABELS } from '@/utils/constants';
import { ArrowRight } from 'lucide-react';

interface RecentCandidatesProps {
  candidates: Candidate[];
}

export default function RecentCandidates({ candidates }: RecentCandidatesProps) {
  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">최근 지원자</h3>
        <Link
          href="/candidates"
          className="text-sm text-primary hover:text-blue-600 flex items-center gap-1"
        >
          전체 보기
          <ArrowRight size={16} />
        </Link>
      </div>
      
      <div className="space-y-3">
        {candidates.length === 0 ? (
          <p className="text-center text-gray-500 py-8">등록된 지원자가 없습니다</p>
        ) : (
          candidates.map((candidate) => (
            <div
              key={candidate.id}
              className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <p className="font-medium text-gray-900">{candidate.name}</p>
                  <span className="text-sm text-gray-500">
                    {POSITION_LABELS[candidate.position]}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {formatDate(candidate.appliedDate)}
                </p>
              </div>
              <StatusBadge status={candidate.status} />
            </div>
          ))
        )}
      </div>
    </Card>
  );
}

