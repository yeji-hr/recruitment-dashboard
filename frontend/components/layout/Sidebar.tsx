'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, GitBranch, FileText, Settings } from 'lucide-react';
import { cn } from '@/utils/helpers';

const menuItems = [
  { icon: LayoutDashboard, label: '대시보드', href: '/' },
  { icon: Users, label: '지원자 관리', href: '/candidates' },
  { icon: GitBranch, label: '채용 파이프라인', href: '/pipeline' },
  { icon: FileText, label: '퍼널 리포트', href: '/reports' },
  { icon: Settings, label: '설정', href: '/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen fixed left-0 top-0">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">채용 대시보드</h1>
      </div>

      {/* Menu */}
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || 
              (item.href !== '/' && pathname.startsWith(item.href));
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                    isActive
                      ? 'bg-primary text-white font-semibold'
                      : 'text-gray-900 hover:bg-gray-100'
                  )}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

