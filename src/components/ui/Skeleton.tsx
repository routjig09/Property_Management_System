import { cn } from '@/utils/cn';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

export function Skeleton({ className, variant = 'text', width, height }: SkeletonProps) {
  return (
    <div
      className={cn(
        'skeleton',
        variant === 'circular' && 'rounded-full',
        variant === 'text' && 'rounded h-4',
        variant === 'rectangular' && 'rounded-lg',
        className
      )}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}

export function PropertyCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-card overflow-hidden">
      <Skeleton variant="rectangular" className="w-full h-56" />
      <div className="p-4 space-y-3">
        <Skeleton className="w-20 h-5" />
        <Skeleton className="w-full h-5" />
        <Skeleton className="w-3/4 h-4" />
        <div className="flex gap-4 pt-2">
          <Skeleton className="w-16 h-4" />
          <Skeleton className="w-16 h-4" />
          <Skeleton className="w-16 h-4" />
        </div>
        <div className="flex justify-between items-center pt-2">
          <Skeleton className="w-24 h-6" />
          <Skeleton className="w-28 h-9 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5, cols = 5 }: { rows?: number; cols?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 py-3">
          {Array.from({ length: cols }).map((_, j) => (
            <Skeleton key={j} className="flex-1 h-4" />
          ))}
        </div>
      ))}
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white rounded-lg p-6 shadow-card">
            <Skeleton className="w-20 h-4 mb-3" />
            <Skeleton className="w-16 h-8" />
          </div>
        ))}
      </div>
      <div className="bg-white rounded-lg p-6 shadow-card">
        <Skeleton className="w-32 h-5 mb-4" />
        <Skeleton variant="rectangular" className="w-full h-64" />
      </div>
    </div>
  );
}
