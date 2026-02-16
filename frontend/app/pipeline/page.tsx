'use client';

import { useMemo } from 'react';
import PipelineBoard from '@/components/pipeline/PipelineBoard';
import { generateMockCandidates } from '@/utils/mockDataGenerator';

export default function PipelinePage() {
  // 실제 AI 엔지니어 데이터 생성
  const mockCandidates = useMemo(() => generateMockCandidates(), []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">채용 파이프라인</h1>
        <p className="text-gray-600 mt-1">
          전체 {mockCandidates.length}명의 지원자를 단계별로 확인하세요
        </p>
      </div>

      {/* Pipeline Board */}
      <PipelineBoard candidates={mockCandidates} />
    </div>
  );
}
