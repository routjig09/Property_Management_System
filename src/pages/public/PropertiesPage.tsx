import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import type { PropertyFilters, SortOption } from '@/types';
import { PropertyGrid } from '@/components/property/PropertyGrid';
import { PropertyFilter } from '@/components/property/PropertyFilter';
import { PropertySearchBar } from '@/components/property/PropertySearchBar';
import { Drawer } from '@/components/ui/Drawer';
import { Pagination } from '@/components/ui/Pagination';
import { EmptyState } from '@/components/common/EmptyState';
import { ErrorState } from '@/components/common/ErrorState';
import { useProperties } from '@/hooks/useProperties';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'price_low_high', label: 'Price: Low → High' },
  { value: 'price_high_low', label: 'Price: High → Low' },
  { value: 'area_small_large', label: 'Area: Small → Large' },
  { value: 'area_large_small', label: 'Area: Large → Small' },
  { value: 'most_popular', label: 'Most Popular' },
];

export function PropertiesPage() {
  const [searchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 1023px)');

  const [filters, setFilters] = useState<PropertyFilters>({
    state: searchParams.get('state') || undefined,
    city: searchParams.get('city') || undefined,
    area: searchParams.get('area') || undefined,
    propertyType: searchParams.get('type')
      ? [searchParams.get('type') as PropertyFilters['propertyType'] extends (infer T)[] ? T : never]
      : undefined,
    listingType: (searchParams.get('listing') as 'SALE' | 'RENT') || undefined,
    bhk: searchParams.get('bhk') ? [Number(searchParams.get('bhk'))] : undefined,
    sortBy: 'newest',
    page: 1,
    limit: 9,
  });

  const { data, isLoading, error, refetch } = useProperties(filters);

  const handleFilterChange = (newFilters: PropertyFilters) => {
    setFilters({ ...newFilters, page: 1 });
  };

  const handleReset = () => {
    setFilters({ sortBy: 'newest', page: 1, limit: 9 });
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filterSidebar = (
    <PropertyFilter
      filters={filters}
      onChange={handleFilterChange}
      onReset={handleReset}
      totalResults={data?.total}
    />
  );

  return (
    <div className="bg-ivory min-h-screen">
      <div className="container-main py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <PropertySearchBar variant="page" />
        </div>

        <div className="flex gap-8">
          {/* Desktop Filter Sidebar */}
          {!isMobile && (
            <aside className="w-72 shrink-0">
              <div className="bg-white rounded-xl shadow-card p-5 sticky top-[88px]">
                {filterSidebar}
              </div>
            </aside>
          )}

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-heading font-semibold text-navy-900">
                  Properties
                </h1>
                {data && (
                  <p className="text-sm text-navy-500 font-body mt-1">
                    {data.total} properties found
                  </p>
                )}
              </div>
              <div className="flex items-center gap-3">
                {/* Mobile Filter Button */}
                {isMobile && (
                  <button
                    onClick={() => setIsFilterOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-navy-200 text-sm font-body text-navy-700 hover:bg-white transition-colors"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                  </button>
                )}

                {/* Sort */}
                <select
                  value={filters.sortBy || 'newest'}
                  onChange={(e) => setFilters((prev) => ({ ...prev, sortBy: e.target.value as SortOption }))}
                  className="rounded-lg border border-navy-200 px-3 py-2 text-sm font-body focus:outline-none focus:ring-2 focus:ring-gold appearance-none bg-white pr-8"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results */}
            {error ? (
              <ErrorState onRetry={() => refetch()} />
            ) : data && data.data.length === 0 && !isLoading ? (
              <EmptyState
                title="No properties found"
                message="Try adjusting your filters or search criteria."
                action={{ label: 'Clear Filters', onClick: handleReset }}
              />
            ) : (
              <>
                <PropertyGrid
                  properties={data?.data || []}
                  isLoading={isLoading}
                  skeletonCount={6}
                />
                {data && data.totalPages > 1 && (
                  <div className="mt-8">
                    <Pagination
                      currentPage={data.page}
                      totalPages={data.totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobile && (
        <Drawer
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          title="Filters"
          position="left"
          size="lg"
        >
          {filterSidebar}
        </Drawer>
      )}
    </div>
  );
}
