import { ReactNode } from 'react';
import Card from '@/components/ui/Card';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  color: string;
}

export default function StatCard({ title, value, icon, color }: StatCardProps) {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div
          className={`p-3 rounded-full ${color}`}
        >
          {icon}
        </div>
      </div>
    </Card>
  );
}

