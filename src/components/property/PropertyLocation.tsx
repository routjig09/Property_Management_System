import { MapPin } from 'lucide-react';
import type { PropertyLocation as PropertyLocationType } from '@/types';

interface PropertyLocationProps {
  location: PropertyLocationType;
}

export function PropertyLocation({ location }: PropertyLocationProps) {
  return (
    <section>
      <h3 className="text-xl font-heading font-semibold text-navy-900 mb-4">Location</h3>
      <div className="divider mb-6" />
      <div className="flex items-start gap-3 mb-4">
        <MapPin className="w-5 h-5 text-gold mt-0.5 shrink-0" />
        <div>
          <p className="text-navy-900 font-body font-medium">
            {location.area}, {location.city}
          </p>
          <p className="text-sm text-navy-500 font-body">
            {location.state}
            {location.pincode && ` — ${location.pincode}`}
          </p>
          {location.address && (
            <p className="text-sm text-navy-500 font-body mt-1">{location.address}</p>
          )}
        </div>
      </div>
      {/* Map Placeholder */}
      <div className="w-full h-64 rounded-xl bg-navy-100 border border-navy-200 flex items-center justify-center">
        <div className="text-center">
          <MapPin className="w-8 h-8 text-navy-300 mx-auto mb-2" />
          <p className="text-navy-400 font-body text-sm">Map view coming soon</p>
          <p className="text-navy-300 font-body text-xs mt-1">
            {location.area}, {location.city}, {location.state}
          </p>
        </div>
      </div>
    </section>
  );
}
