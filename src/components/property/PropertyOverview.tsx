import { Bed, Bath, Maximize, Building, Sofa, Car } from 'lucide-react';
import type { Property } from '@/types';
import { formatArea } from '@/utils/format';

interface PropertyOverviewProps {
  property: Property;
}

const furnishingLabels: Record<string, string> = {
  UNFURNISHED: 'Unfurnished',
  SEMI_FURNISHED: 'Semi Furnished',
  FULLY_FURNISHED: 'Fully Furnished',
};

export function PropertyOverview({ property }: PropertyOverviewProps) {
  const specs = [
    { icon: Bed, label: 'Bedrooms', value: property.bedrooms, show: property.bedrooms > 0 },
    { icon: Bath, label: 'Bathrooms', value: property.bathrooms, show: property.bathrooms > 0 },
    { icon: Maximize, label: 'Area', value: formatArea(property.area), show: true },
    { icon: Building, label: 'Floor', value: property.building?.floor ? `${property.building.floor}th Floor` : undefined, show: !!property.building?.floor },
    { icon: Sofa, label: 'Furnishing', value: property.furnishing ? furnishingLabels[property.furnishing] : undefined, show: !!property.furnishing },
    { icon: Car, label: 'Parking', value: property.parking ? `${property.parking} Spots` : undefined, show: !!property.parking },
  ].filter((s) => s.show);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {specs.map((spec) => {
        const Icon = spec.icon;
        return (
          <div
            key={spec.label}
            className="flex flex-col items-center p-4 rounded-xl bg-ivory border border-beige text-center"
          >
            <Icon className="w-6 h-6 text-gold mb-2" />
            <p className="text-xs text-navy-500 font-body mb-1">{spec.label}</p>
            <p className="text-sm font-semibold text-navy-900 font-body">{spec.value}</p>
          </div>
        );
      })}
    </div>
  );
}
