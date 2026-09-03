import type { SortOption } from '../types';

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price_low_high', label: 'Price: Low to High' },
  { value: 'price_high_low', label: 'Price: High to Low' },
  { value: 'area_large_small', label: 'Area: Largest First' },
  { value: 'area_small_large', label: 'Area: Smallest First' },
  { value: 'most_popular', label: 'Most Popular' }
];
