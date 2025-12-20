'use client';

import Card from '@/components/ui/Card';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">설정</h1>
        <p className="text-gray-600 mt-1">시스템 설정을 관리하세요</p>
      </div>

      <Card>
        <div className="text-center py-12">
          <p className="text-gray-500">설정 페이지는 추후 구현 예정입니다</p>
        </div>
      </Card>
    </div>
  );
}

