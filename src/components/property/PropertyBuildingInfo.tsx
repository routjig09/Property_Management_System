import { Building } from 'lucide-react';
import type { PropertyBuilding } from '@/types';

interface PropertyBuildingInfoProps {
  building: PropertyBuilding;
}

export function PropertyBuildingInfo({ building }: PropertyBuildingInfoProps) {
  const items = [
    { label: 'Project / Building', value: building.name },
    { label: 'Tower', value: building.tower },
    { label: 'Floor', value: building.floor },
    { label: 'Total Floors', value: building.totalFloors },
    { label: 'Apartment / Unit', value: building.apartmentNumber },
  ].filter((item) => item.value !== undefined && item.value !== null);

  if (items.length === 0) return null;

  return (
    <section>
      <h3 className="text-xl font-heading font-semibold text-navy-900 mb-4">
        <Building className="w-5 h-5 text-gold inline mr-2" />
        Building Information
      </h3>
      <div className="divider mb-6" />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.label} className="p-4 rounded-lg bg-ivory border border-beige">
            <p className="text-xs text-navy-500 font-body mb-1">{item.label}</p>
            <p className="text-sm font-semibold text-navy-900 font-body">{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
