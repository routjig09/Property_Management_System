import type { Property } from '@/types';
import { PropertyCard } from './PropertyCard';
import { PropertyCardSkeleton } from '@/components/ui/Skeleton';

interface PropertyGridProps {
  properties: Property[];
  isLoading?: boolean;
  skeletonCount?: number;
}

export function PropertyGrid({ properties, isLoading, skeletonCount = 6 }: PropertyGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <PropertyCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
