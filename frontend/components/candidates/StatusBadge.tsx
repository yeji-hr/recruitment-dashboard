import { CandidateStatus } from '@/types/candidate';
import { CANDIDATE_STATUS_LABELS, CANDIDATE_STATUS_COLORS } from '@/utils/constants';
import { cn } from '@/utils/helpers';

interface StatusBadgeProps {
  status: CandidateStatus;
  className?: string;
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        CANDIDATE_STATUS_COLORS[status],
        className
      )}
    >
      {CANDIDATE_STATUS_LABELS[status]}
    </span>
  );
}

