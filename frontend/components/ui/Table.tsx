import { ReactNode } from 'react';
import { cn } from '@/utils/helpers';

interface TableProps {
  children: ReactNode;
  className?: string;
}

export function Table({ children, className }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className={cn('min-w-full divide-y divide-gray-200', className)}>
        {children}
      </table>
    </div>
  );
}

export function TableHead({ children, className }: TableProps) {
  return (
    <thead className={cn('bg-gray-50', className)}>
      {children}
    </thead>
  );
}

export function TableBody({ children, className }: TableProps) {
  return (
    <tbody className={cn('bg-white divide-y divide-gray-200', className)}>
      {children}
    </tbody>
  );
}

export function TableRow({ children, className }: TableProps) {
  return (
    <tr className={cn('hover:bg-gray-50', className)}>
      {children}
    </tr>
  );
}

interface TableCellProps {
  children: ReactNode;
  className?: string;
  header?: boolean;
  colSpan?: number;
}

export function TableCell({ children, className, header = false, colSpan }: TableCellProps) {
  const Component = header ? 'th' : 'td';
  return (
    <Component
      className={cn(
        'px-6 py-4 whitespace-nowrap text-sm',
        header ? 'font-medium text-gray-900 text-left' : 'text-gray-700',
        className
      )}
      colSpan={colSpan}
    >
      {children}
    </Component>
  );
}

