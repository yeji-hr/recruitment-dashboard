'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { FunnelData } from '@/types/funnel';

interface FunnelInputFormProps {
  onSubmit: (data: FunnelData) => void;
  initialData?: FunnelData;
}

export default function FunnelInputForm({ onSubmit, initialData }: FunnelInputFormProps) {
  const today = new Date().toISOString().split('T')[0];
  
  const [formData, setFormData] = useState<FunnelData>(
    initialData || {
      date: today,
      proposal: 0,
      application: 0,
      documentSubmit: 0,
      documentPass: 0,
      interviewPass: 0,
      assignmentPass: 0,
      finalPass: 0,
    }
  );

  const handleChange = (field: keyof FunnelData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === 'date' ? value : Number(value) || 0,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card>
      <h2 className="text-xl font-bold text-gray-900 mb-6">📊 채용 퍼널 데이터 입력</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Date */}
          <div className="md:col-span-2 lg:col-span-4">
            <Input
              label="날짜"
              type="date"
              value={formData.date}
              onChange={(e) => handleChange('date', e.target.value)}
            />
          </div>

          {/* Proposal */}
          <Input
            label="🎯 제안 (헤드헌팅)"
            type="number"
            value={formData.proposal}
            onChange={(e) => handleChange('proposal', e.target.value)}
            placeholder="5242"
          />

          {/* Application */}
          <Input
            label="📝 지원"
            type="number"
            value={formData.application}
            onChange={(e) => handleChange('application', e.target.value)}
            placeholder="269"
          />

          {/* Document Submit */}
          <Input
            label="📄 자소서 제출"
            type="number"
            value={formData.documentSubmit}
            onChange={(e) => handleChange('documentSubmit', e.target.value)}
            placeholder="111"
          />

          {/* Document Pass */}
          <Input
            label="✅ 서류전형 통과"
            type="number"
            value={formData.documentPass}
            onChange={(e) => handleChange('documentPass', e.target.value)}
            placeholder="6"
          />

          {/* Interview Pass */}
          <Input
            label="💼 면접 통과"
            type="number"
            value={formData.interviewPass}
            onChange={(e) => handleChange('interviewPass', e.target.value)}
            placeholder="1"
          />

          {/* Assignment Pass */}
          <Input
            label="📋 과제테스트 통과"
            type="number"
            value={formData.assignmentPass}
            onChange={(e) => handleChange('assignmentPass', e.target.value)}
            placeholder="1"
          />

          {/* Final Pass */}
          <Input
            label="🎉 최종합격"
            type="number"
            value={formData.finalPass}
            onChange={(e) => handleChange('finalPass', e.target.value)}
            placeholder="1"
          />
        </div>

        <div className="flex justify-end gap-3">
          <Button type="submit" size="lg">
            📊 리포트 생성하기
          </Button>
        </div>
      </form>
    </Card>
  );
}

