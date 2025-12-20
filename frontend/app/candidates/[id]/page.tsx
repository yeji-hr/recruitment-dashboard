'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Mail, Phone, Calendar, Edit, ExternalLink, MapPin } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import StatusBadge from '@/components/candidates/StatusBadge';
import Select from '@/components/ui/Select';
import { POSITION_LABELS, CANDIDATE_STATUS_LABELS, APPLICATION_SOURCE_LABELS } from '@/utils/constants';
import { formatDate, formatPhoneNumber } from '@/utils/helpers';
import { useState } from 'react';

// 임시 데이터
const mockCandidate = {
  id: '1',
  name: '김철수',
  email: 'kim@example.com',
  phone: '01012345678',
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

export default function CandidateDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [candidate, setCandidate] = useState(mockCandidate);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    setIsUpdating(true);
    // TODO: API 호출로 대체
    setTimeout(() => {
      setCandidate({ ...candidate, status: newStatus as any });
      setIsUpdating(false);
      alert('상태가 변경되었습니다!');
    }, 500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back Button */}
      <Link
        href="/candidates"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft size={20} />
        <span>목록으로</span>
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{candidate.name}</h1>
          <p className="text-gray-600 mt-1">{POSITION_LABELS[candidate.position]}</p>
        </div>
        <Link href={`/candidates/${params.id}/edit`}>
          <Button>
            <Edit size={18} className="mr-2" />
            수정
          </Button>
        </Link>
      </div>

      {/* Status Update */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">채용 상태</h2>
        <div className="flex items-center gap-4">
          <StatusBadge status={candidate.status} />
          <Select
            value={candidate.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            disabled={isUpdating}
            className="max-w-xs"
          >
            {Object.entries(CANDIDATE_STATUS_LABELS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </Select>
        </div>
      </Card>

      {/* Basic Info */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">기본 정보</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Mail size={20} className="text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">이메일</p>
              <p className="text-gray-900">{candidate.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Phone size={20} className="text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">연락처</p>
              <p className="text-gray-900">{formatPhoneNumber(candidate.phone)}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar size={20} className="text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">지원일</p>
              <p className="text-gray-900">{formatDate(candidate.appliedDate)}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MapPin size={20} className="text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">지원경로</p>
              <p className="text-gray-900">{APPLICATION_SOURCE_LABELS[candidate.source]}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Links */}
      {(candidate.resumeUrl || candidate.portfolioUrl) && (
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">자료</h2>
          <div className="space-y-3">
            {candidate.resumeUrl && (
              <a
                href={candidate.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary hover:text-blue-600"
              >
                <ExternalLink size={18} />
                <span>이력서 보기</span>
              </a>
            )}
            {candidate.portfolioUrl && (
              <a
                href={candidate.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary hover:text-blue-600"
              >
                <ExternalLink size={18} />
                <span>포트폴리오 보기</span>
              </a>
            )}
          </div>
        </Card>
      )}

      {/* Notes */}
      {candidate.notes && (
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">메모</h2>
          <p className="text-gray-700 whitespace-pre-wrap">{candidate.notes}</p>
        </Card>
      )}
    </div>
  );
}

