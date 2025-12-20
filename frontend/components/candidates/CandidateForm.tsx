'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import { CandidateFormData } from '@/types/candidate';
import { POSITION_LABELS, APPLICATION_SOURCE_LABELS } from '@/utils/constants';

interface CandidateFormProps {
  initialData?: Partial<CandidateFormData>;
  onSubmit: (data: CandidateFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function CandidateForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: CandidateFormProps) {
  const [formData, setFormData] = useState<CandidateFormData>({
    name: initialData?.name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    position: initialData?.position || 'FRONTEND',
    source: initialData?.source || 'WANTED',
    resumeUrl: initialData?.resumeUrl || '',
    portfolioUrl: initialData?.portfolioUrl || '',
    notes: initialData?.notes || '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CandidateFormData, string>>>({});

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CandidateFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = '이름을 입력해주세요';
    }

    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력해주세요';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = '연락처를 입력해주세요';
    } else if (!/^[0-9-]+$/.test(formData.phone)) {
      newErrors.phone = '올바른 연락처 형식이 아닙니다';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field: keyof CandidateFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <Input
          label="이름 *"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          error={errors.name}
          placeholder="홍길동"
        />

        {/* Email */}
        <Input
          label="이메일 *"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          error={errors.email}
          placeholder="hong@example.com"
        />

        {/* Phone */}
        <Input
          label="연락처 *"
          value={formData.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          error={errors.phone}
          placeholder="010-1234-5678"
        />

        {/* Position */}
        <Select
          label="포지션 *"
          value={formData.position}
          onChange={(e) => handleChange('position', e.target.value)}
        >
          {Object.entries(POSITION_LABELS).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </Select>

        {/* Application Source */}
        <Select
          label="지원경로 *"
          value={formData.source}
          onChange={(e) => handleChange('source', e.target.value)}
        >
          {Object.entries(APPLICATION_SOURCE_LABELS).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </Select>

        {/* Resume URL */}
        <Input
          label="이력서 URL"
          value={formData.resumeUrl}
          onChange={(e) => handleChange('resumeUrl', e.target.value)}
          placeholder="https://..."
        />

        {/* Portfolio URL */}
        <Input
          label="포트폴리오 URL"
          value={formData.portfolioUrl}
          onChange={(e) => handleChange('portfolioUrl', e.target.value)}
          placeholder="https://..."
        />
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          메모
        </label>
        <textarea
          value={formData.notes}
          onChange={(e) => handleChange('notes', e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          placeholder="추가 메모사항..."
        />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-6 border-t">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={isLoading}>
          취소
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? '처리 중...' : '저장'}
        </Button>
      </div>
    </form>
  );
}

