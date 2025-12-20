'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import StageColumn from './StageColumn';
import { Candidate, CandidateStatus } from '@/types/candidate';
import { CANDIDATE_STATUS_LABELS } from '@/utils/constants';

interface PipelineBoardProps {
  candidates: Candidate[];
}

const stages: Array<{
  key: CandidateStatus;
  color: string;
}> = [
  { key: 'APPLIED', color: 'bg-yellow-500' },
  { key: 'SCREENING', color: 'bg-blue-500' },
  { key: 'INTERVIEW_1', color: 'bg-indigo-500' },
  { key: 'ASSIGNMENT', color: 'bg-orange-500' },
  { key: 'INTERVIEW_2', color: 'bg-purple-500' },
  { key: 'FINAL', color: 'bg-green-500' },
];

export default function PipelineBoard({ candidates }: PipelineBoardProps) {
  const router = useRouter();

  const getCandidatesByStatus = (status: CandidateStatus) => {
    return candidates.filter((c) => c.status === status);
  };

  const handleCandidateClick = (candidate: Candidate) => {
    router.push(`/candidates/${candidate.id}`);
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {stages.map((stage) => {
        const stageCandidates = getCandidatesByStatus(stage.key);
        
        return (
          <StageColumn
            key={stage.key}
            title={CANDIDATE_STATUS_LABELS[stage.key]}
            count={stageCandidates.length}
            candidates={stageCandidates}
            color={stage.color}
            onCandidateClick={handleCandidateClick}
          />
        );
      })}
    </div>
  );
}

