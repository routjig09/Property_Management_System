import { useSearchParams } from 'react-router-dom';
import type { PropertyFilters } from '../types';
import { useCallback, useMemo } from 'react';

export const usePropertyFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(() => {
    const params: Record<string, any> = {};
    searchParams.forEach((value, key) => {
      if (['bhk', 'propertyType', 'status', 'furnishing', 'amenities'].includes(key)) {
        params[key] = value.split(',');
        if (key === 'bhk') params[key] = params[key].map(Number);
      } else if (['minPrice', 'maxPrice', 'minArea', 'maxArea', 'floor', 'page', 'limit'].includes(key)) {
        params[key] = Number(value);
      } else {
        params[key] = value;
      }
    });
    return params as PropertyFilters;
  }, [searchParams]);

  const setFilter = useCallback((key: keyof PropertyFilters, value: any) => {
    const newParams = new URLSearchParams(searchParams);
    
    if (value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0)) {
      newParams.delete(key);
    } else if (Array.isArray(value)) {
      newParams.set(key, value.join(','));
    } else {
      newParams.set(key, String(value));
    }
    
    // reset page on filter change
    if (key !== 'page') {
      newParams.delete('page');
    }
    
    setSearchParams(newParams);
  }, [searchParams, setSearchParams]);

  const setFilters = useCallback((newFilters: PropertyFilters) => {
    const newParams = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value) && value.length > 0) {
          newParams.set(key, value.join(','));
        } else if (!Array.isArray(value)) {
          newParams.set(key, String(value));
        }
      }
    });
    setSearchParams(newParams);
  }, [setSearchParams]);

  const clearFilters = useCallback(() => {
    setSearchParams(new URLSearchParams());
  }, [setSearchParams]);

  return {
    filters,
    setFilter,
    setFilters,
    clearFilters
  };
};
