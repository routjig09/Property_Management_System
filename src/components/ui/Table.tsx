import { cn } from '@/utils/cn';
import { ArrowUpDown, ChevronUp, ChevronDown } from 'lucide-react';

export interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  onSort?: (key: string) => void;
  emptyMessage?: string;
  isLoading?: boolean;
}

export function Table<T extends object>({
  columns,
  data,
  onRowClick,
  sortBy,
  sortOrder,
  onSort,
  emptyMessage = 'No data found',
  isLoading,
}: TableProps<T>) {
  const renderSortIcon = (key: string) => {
    if (!sortBy || sortBy !== key) return <ArrowUpDown className="w-3.5 h-3.5 text-navy-300" />;
    return sortOrder === 'asc' ? (
      <ChevronUp className="w-3.5 h-3.5 text-gold" />
    ) : (
      <ChevronDown className="w-3.5 h-3.5 text-gold" />
    );
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-navy-100">
      <table className="w-full text-left font-body">
        <thead className="bg-navy-50/60">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  'px-4 py-3 text-xs font-semibold uppercase tracking-wider text-navy-600',
                  col.sortable && 'cursor-pointer select-none hover:text-navy-900',
                  col.className
                )}
                onClick={() => col.sortable && onSort?.(col.key)}
              >
                <span className="flex items-center gap-1.5">
                  {col.header}
                  {col.sortable && renderSortIcon(col.key)}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-navy-100">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <tr key={`skeleton-${i}`}>
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3">
                    <div className="skeleton h-4 w-full rounded" />
                  </td>
                ))}
              </tr>
            ))
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-12 text-center text-navy-400">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr
                key={index}
                onClick={() => onRowClick?.(item)}
                className={cn(
                  'bg-white transition-colors',
                  onRowClick && 'cursor-pointer hover:bg-navy-50/50'
                )}
              >
                {columns.map((col) => (
                  <td key={col.key} className={cn('px-4 py-3 text-sm text-navy-800', col.className)}>
                    {col.render ? col.render(item) : String((item as Record<string, unknown>)[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
