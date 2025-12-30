'use client';

import Card from '@/components/ui/Card';
import { Clock } from 'lucide-react';

interface LeadTimeWidgetProps {
  leadTime: number;
}

export default function LeadTimeWidget({ leadTime }: LeadTimeWidgetProps) {
  return (
    <Card>
      <div className="flex items-center gap-4">
        <div className="p-3 bg-purple-100 rounded-full">
          <Clock size={32} className="text-purple-600" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">평균 채용 리드타임</p>
          <div className="flex items-baseline gap-2 mt-1">
            <p className="text-3xl font-bold text-gray-900">{leadTime}</p>
            <span className="text-lg text-gray-600">일</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            서류 접수 → 최종 합격
          </p>
        </div>
      </div>
    </Card>
  );
}

