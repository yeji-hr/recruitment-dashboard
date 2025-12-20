'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Card from '@/components/ui/Card';
import CandidateForm from '@/components/candidates/CandidateForm';
import { CandidateFormData } from '@/types/candidate';

// 임시 데이터
const mockCandidate = {
  id: '1',
  name: '김철수',
  email: 'kim@example.com',
  phone: '010-1234-5678',
  position: 'FRONTEND' as const,
  status: 'APPLIED' as const,
  source: 'WANTED' as const,
  appliedDate: '2024-12-10',
  resumeUrl: 'https://example.com/resume.pdf',
  portfolioUrl: 'https://portfolio.example.com',
  notes: '프론트엔드 개발 경력 3년\nReact, TypeScript 능숙',
  createdAt: '2024-12-10T09:00:00Z',
  updatedAt: '2024-12-10T09:00:00Z',
};

export default function EditCandidatePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (data: CandidateFormData) => {
    setIsLoading(true);
    // TODO: API 호출로 대체
    console.log('Updating candidate:', params.id, data);
    
    setTimeout(() => {
      setIsLoading(false);
      alert('지원자 정보가 수정되었습니다!');
      router.push(`/candidates/${params.id}`);
    }, 500);
  };

  const handleCancel = () => {
    router.push(`/candidates/${params.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">지원자 수정</h1>
        <p className="text-gray-600 mt-1">지원자 정보를 수정해주세요</p>
      </div>

      {/* Form */}
      <Card>
        <CandidateForm
          initialData={mockCandidate}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isLoading}
        />
      </Card>
    </div>
  );
}

