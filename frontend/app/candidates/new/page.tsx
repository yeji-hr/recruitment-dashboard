'use client';

import { useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import CandidateForm from '@/components/candidates/CandidateForm';
import { CandidateFormData } from '@/types/candidate';

export default function NewCandidatePage() {
  const router = useRouter();

  const handleSubmit = (data: CandidateFormData) => {
    // TODO: API 호출로 대체
    console.log('Creating candidate:', data);
    
    // 임시로 콘솔에 출력하고 목록으로 이동
    alert('지원자가 등록되었습니다!');
    router.push('/candidates');
  };

  const handleCancel = () => {
    router.push('/candidates');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">새 지원자 추가</h1>
        <p className="text-gray-600 mt-1">지원자 정보를 입력해주세요</p>
      </div>

      {/* Form */}
      <Card>
        <CandidateForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </Card>
    </div>
  );
}

