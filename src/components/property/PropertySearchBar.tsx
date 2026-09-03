import { useState, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { getStates, getCities, getAreas } from '@/mock/locations';

interface PropertySearchBarProps {
  onSearch?: (filters: Record<string, string>) => void;
  variant?: 'hero' | 'page';
}

export function PropertySearchBar({ onSearch, variant = 'page' }: PropertySearchBarProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [state, setState] = useState(searchParams.get('state') || '');
  const [city, setCity] = useState(searchParams.get('city') || '');
  const [area, setArea] = useState(searchParams.get('area') || '');
  const [propertyType, setPropertyType] = useState(searchParams.get('type') || '');
  const [bhk, setBhk] = useState(searchParams.get('bhk') || '');

  const states = useMemo(() => getStates(), []);
  const cities = useMemo(() => getCities(state), [state]);
  const areas = useMemo(() => getAreas(state, city), [state, city]);

  const handleStateChange = useCallback((val: string) => {
    setState(val);
    setCity('');
    setArea('');
  }, []);

  const handleCityChange = useCallback((val: string) => {
    setCity(val);
    setArea('');
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (state) params.set('state', state);
    if (city) params.set('city', city);
    if (area) params.set('area', area);
    if (propertyType) params.set('type', propertyType);
    if (bhk) params.set('bhk', bhk);
    setSearchParams(params);
    onSearch?.({
      state,
      city,
      area,
      type: propertyType,
      bhk,
    });
  };

  const isHero = variant === 'hero';

  const selectBase = isHero
    ? 'bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 focus:border-gold'
    : 'bg-white border-navy-200 text-navy-900 focus:border-gold focus:ring-gold';

  return (
    <div
      className={
        isHero
          ? 'glass-dark rounded-2xl p-6 md:p-8'
          : 'bg-white rounded-xl shadow-card p-4 md:p-6 border border-navy-100'
      }
    >
      {isHero && (
        <p className="text-white/80 text-sm font-body mb-4 tracking-wide">
          What are you looking for?
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
        {/* State */}
        <select
          value={state}
          onChange={(e) => handleStateChange(e.target.value)}
          className={`w-full rounded-lg border px-3 py-2.5 text-sm font-body focus:outline-none focus:ring-2 transition-colors appearance-none ${selectBase}`}
        >
          <option value="">All States</option>
          {states.map((s) => (
            <option key={s} value={s} className="text-navy-900">{s}</option>
          ))}
        </select>

        {/* City */}
        <select
          value={city}
          onChange={(e) => handleCityChange(e.target.value)}
          disabled={!state}
          className={`w-full rounded-lg border px-3 py-2.5 text-sm font-body focus:outline-none focus:ring-2 transition-colors appearance-none disabled:opacity-50 ${selectBase}`}
        >
          <option value="">All Cities</option>
          {cities.map((c) => (
            <option key={c} value={c} className="text-navy-900">{c}</option>
          ))}
        </select>

        {/* Area */}
        <select
          value={area}
          onChange={(e) => setArea(e.target.value)}
          disabled={!city}
          className={`w-full rounded-lg border px-3 py-2.5 text-sm font-body focus:outline-none focus:ring-2 transition-colors appearance-none disabled:opacity-50 ${selectBase}`}
        >
          <option value="">All Areas</option>
          {areas.map((a) => (
            <option key={a} value={a} className="text-navy-900">{a}</option>
          ))}
        </select>

        {/* Type */}
        <select
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          className={`w-full rounded-lg border px-3 py-2.5 text-sm font-body focus:outline-none focus:ring-2 transition-colors appearance-none ${selectBase}`}
        >
          <option value="">All Types</option>
          <option value="APARTMENT" className="text-navy-900">Apartment</option>
          <option value="VILLA" className="text-navy-900">Villa</option>
          <option value="INDEPENDENT_HOUSE" className="text-navy-900">Independent House</option>
          <option value="PLOT" className="text-navy-900">Plot</option>
          <option value="COMMERCIAL" className="text-navy-900">Commercial</option>
        </select>

        {/* BHK */}
        <select
          value={bhk}
          onChange={(e) => setBhk(e.target.value)}
          className={`w-full rounded-lg border px-3 py-2.5 text-sm font-body focus:outline-none focus:ring-2 transition-colors appearance-none ${selectBase}`}
        >
          <option value="">BHK</option>
          <option value="1" className="text-navy-900">1 BHK</option>
          <option value="2" className="text-navy-900">2 BHK</option>
          <option value="3" className="text-navy-900">3 BHK</option>
          <option value="4" className="text-navy-900">4 BHK</option>
          <option value="5" className="text-navy-900">5+ BHK</option>
        </select>

        {/* Search */}
        <Button
          variant="accent"
          onClick={handleSearch}
          className="w-full"
          leftIcon={<Search className="w-4 h-4" />}
        >
          Search
        </Button>
      </div>
    </div>
  );
}
