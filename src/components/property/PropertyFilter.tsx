import { useMemo } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import type { PropertyFilters, PropertyType, ListingType } from '@/types';
import { Button } from '@/components/ui/Button';
import { getStates, getCities, getAreas } from '@/mock/locations';

interface PropertyFilterProps {
  filters: PropertyFilters;
  onChange: (filters: PropertyFilters) => void;
  onReset: () => void;
  totalResults?: number;
}

const propertyTypes: { value: PropertyType; label: string }[] = [
  { value: 'APARTMENT', label: 'Apartment' },
  { value: 'VILLA', label: 'Villa' },
  { value: 'INDEPENDENT_HOUSE', label: 'Independent House' },
  { value: 'PLOT', label: 'Plot' },
  { value: 'COMMERCIAL', label: 'Commercial' },
  { value: 'OFFICE', label: 'Office' },
  { value: 'SHOP', label: 'Shop' },
];

const bhkOptions = [1, 2, 3, 4, 5];

export function PropertyFilter({ filters, onChange, onReset, totalResults }: PropertyFilterProps) {
  const states = useMemo(() => getStates(), []);
  const cities = useMemo(() => getCities(filters.state || ''), [filters.state]);
  const areas = useMemo(() => getAreas(filters.state || '', filters.city || ''), [filters.state, filters.city]);

  const updateFilter = (key: keyof PropertyFilters, value: unknown) => {
    const newFilters = { ...filters, [key]: value };
    // Reset dependent filters
    if (key === 'state') {
      newFilters.city = undefined;
      newFilters.area = undefined;
    }
    if (key === 'city') {
      newFilters.area = undefined;
    }
    onChange(newFilters);
  };

  const toggleArrayFilter = (key: 'propertyType' | 'bhk', value: PropertyType | number) => {
    const current = (filters[key] as Array<PropertyType | number>) || [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    updateFilter(key, updated.length > 0 ? updated : undefined);
  };

  const activeFilterCount = [
    filters.state,
    filters.city,
    filters.area,
    filters.propertyType?.length,
    filters.listingType,
    filters.bhk?.length,
    filters.minPrice,
    filters.maxPrice,
  ].filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-navy-600" />
          <h3 className="font-heading font-semibold text-navy-900">Filters</h3>
          {activeFilterCount > 0 && (
            <span className="px-2 py-0.5 text-xs bg-gold text-white rounded-full font-body">
              {activeFilterCount}
            </span>
          )}
        </div>
        {activeFilterCount > 0 && (
          <button onClick={onReset} className="text-sm text-navy-500 hover:text-error transition-colors font-body flex items-center gap-1">
            <X className="w-3.5 h-3.5" />
            Clear
          </button>
        )}
      </div>

      {totalResults !== undefined && (
        <p className="text-sm text-navy-500 font-body">{totalResults} properties found</p>
      )}

      {/* Listing Type */}
      <div>
        <label className="text-sm font-medium text-navy-900 font-body block mb-2">Purpose</label>
        <div className="flex gap-2">
          {(['SALE', 'RENT'] as ListingType[]).map((lt) => (
            <button
              key={lt}
              onClick={() => updateFilter('listingType', filters.listingType === lt ? undefined : lt)}
              className={`flex-1 px-3 py-2 rounded-lg text-sm font-body font-medium transition-colors border ${
                filters.listingType === lt
                  ? 'bg-navy-900 text-white border-navy-900'
                  : 'bg-white text-navy-600 border-navy-200 hover:border-navy-400'
              }`}
            >
              {lt === 'SALE' ? 'Buy' : 'Rent'}
            </button>
          ))}
        </div>
      </div>

      {/* Location: State */}
      <div>
        <label className="text-sm font-medium text-navy-900 font-body block mb-2">State</label>
        <select
          value={filters.state || ''}
          onChange={(e) => updateFilter('state', e.target.value || undefined)}
          className="w-full rounded-lg border border-navy-200 px-3 py-2 text-sm font-body focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent appearance-none"
        >
          <option value="">All States</option>
          {states.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Location: City */}
      {filters.state && (
        <div>
          <label className="text-sm font-medium text-navy-900 font-body block mb-2">City</label>
          <select
            value={filters.city || ''}
            onChange={(e) => updateFilter('city', e.target.value || undefined)}
            className="w-full rounded-lg border border-navy-200 px-3 py-2 text-sm font-body focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent appearance-none"
          >
            <option value="">All Cities</option>
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      )}

      {/* Location: Area */}
      {filters.city && (
        <div>
          <label className="text-sm font-medium text-navy-900 font-body block mb-2">Area</label>
          <select
            value={filters.area || ''}
            onChange={(e) => updateFilter('area', e.target.value || undefined)}
            className="w-full rounded-lg border border-navy-200 px-3 py-2 text-sm font-body focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent appearance-none"
          >
            <option value="">All Areas</option>
            {areas.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>
      )}

      {/* Property Type */}
      <div>
        <label className="text-sm font-medium text-navy-900 font-body block mb-2">Property Type</label>
        <div className="space-y-2">
          {propertyTypes.map((pt) => (
            <label key={pt.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.propertyType?.includes(pt.value) || false}
                onChange={() => toggleArrayFilter('propertyType', pt.value)}
                className="h-4 w-4 rounded border-navy-200 text-gold focus:ring-gold"
              />
              <span className="text-sm font-body text-navy-700">{pt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* BHK */}
      <div>
        <label className="text-sm font-medium text-navy-900 font-body block mb-2">BHK</label>
        <div className="flex flex-wrap gap-2">
          {bhkOptions.map((b) => (
            <button
              key={b}
              onClick={() => toggleArrayFilter('bhk', b)}
              className={`px-3 py-1.5 rounded-lg text-sm font-body border transition-colors ${
                filters.bhk?.includes(b)
                  ? 'bg-navy-900 text-white border-navy-900'
                  : 'bg-white text-navy-600 border-navy-200 hover:border-navy-400'
              }`}
            >
              {b}{b === 5 ? '+' : ''} BHK
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="text-sm font-medium text-navy-900 font-body block mb-2">Price Range</label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice || ''}
            onChange={(e) => updateFilter('minPrice', e.target.value ? Number(e.target.value) : undefined)}
            className="w-full rounded-lg border border-navy-200 px-3 py-2 text-sm font-body focus:outline-none focus:ring-2 focus:ring-gold"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice || ''}
            onChange={(e) => updateFilter('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
            className="w-full rounded-lg border border-navy-200 px-3 py-2 text-sm font-body focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>
      </div>

      {/* Apply */}
      <Button variant="primary" fullWidth onClick={() => onChange(filters)}>
        Apply Filters
      </Button>
    </div>
  );
}
