import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import QueryProvider from '@/providers/QueryProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '채용 대시보드',
  description: '채용 프로세스를 효율적으로 관리하는 대시보드',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <QueryProvider>
          <div className="min-h-screen bg-background">
            <Sidebar />
            <Header />
            <main className="ml-64 pt-16">
              <div className="p-6">
                {children}
              </div>
            </main>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}

