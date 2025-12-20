'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MoreVertical, Eye, Edit, Trash2 } from 'lucide-react';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@/components/ui/Table';
import StatusBadge from './StatusBadge';
import { Candidate } from '@/types/candidate';
import { formatDate, formatPhoneNumber } from '@/utils/helpers';
import { POSITION_LABELS, APPLICATION_SOURCE_LABELS, APPLICATION_SOURCE_COLORS } from '@/utils/constants';

interface CandidateTableProps {
  candidates: Candidate[];
  onDelete?: (id: string) => void;
}

export default function CandidateTable({ candidates, onDelete }: CandidateTableProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell header>이름</TableCell>
            <TableCell header>이메일</TableCell>
            <TableCell header>연락처</TableCell>
            <TableCell header>포지션</TableCell>
            <TableCell header>지원경로</TableCell>
            <TableCell header>지원일</TableCell>
            <TableCell header>상태</TableCell>
            <TableCell header>액션</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {candidates.length === 0 ? (
            <TableRow>
              <TableCell className="text-center py-12 text-gray-500" colSpan={8}>
                검색 결과가 없습니다
              </TableCell>
            </TableRow>
          ) : (
            candidates.map((candidate) => (
              <TableRow key={candidate.id}>
                <TableCell>
                  <Link
                    href={`/candidates/${candidate.id}`}
                    className="font-medium text-gray-900 hover:text-primary"
                  >
                    {candidate.name}
                  </Link>
                </TableCell>
                <TableCell className="text-gray-600">{candidate.email}</TableCell>
                <TableCell className="text-gray-600">
                  {formatPhoneNumber(candidate.phone)}
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {POSITION_LABELS[candidate.position]}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${APPLICATION_SOURCE_COLORS[candidate.source]}`}>
                    {APPLICATION_SOURCE_LABELS[candidate.source]}
                  </span>
                </TableCell>
                <TableCell className="text-gray-600">
                  {formatDate(candidate.appliedDate)}
                </TableCell>
                <TableCell>
                  <StatusBadge status={candidate.status} />
                </TableCell>
                <TableCell>
                  <div className="relative">
                    <button
                      onClick={() => setOpenMenuId(openMenuId === candidate.id ? null : candidate.id)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      <MoreVertical size={18} />
                    </button>
                    
                    {openMenuId === candidate.id && (
                      <>
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setOpenMenuId(null)}
                        />
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                          <Link
                            href={`/candidates/${candidate.id}`}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <Eye size={16} />
                            상세보기
                          </Link>
                          <Link
                            href={`/candidates/${candidate.id}/edit`}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <Edit size={16} />
                            수정
                          </Link>
                          <button
                            onClick={() => {
                              if (confirm('정말 삭제하시겠습니까?')) {
                                onDelete?.(candidate.id);
                              }
                              setOpenMenuId(null);
                            }}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-danger hover:bg-red-50 w-full"
                          >
                            <Trash2 size={16} />
                            삭제
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

