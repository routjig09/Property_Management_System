import {
  Wifi, Dumbbell, Waves, TreePine, ShieldCheck, Zap,
  Car, Building, Users, Baby, Cctv, Wind, Droplets, Fence
} from 'lucide-react';

interface PropertyAmenitiesProps {
  amenities: string[];
}

const amenityIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'Lift': Building,
  'Swimming Pool': Waves,
  'Gym': Dumbbell,
  'Clubhouse': Users,
  'Security': ShieldCheck,
  'Power Backup': Zap,
  'Garden': TreePine,
  'Parking': Car,
  "Children's Play Area": Baby,
  'CCTV': Cctv,
  'Central AC': Wind,
  'Wifi': Wifi,
  'Water Supply': Droplets,
  'Boundary Wall': Fence,
};

export function PropertyAmenities({ amenities }: PropertyAmenitiesProps) {
  if (amenities.length === 0) return null;

  return (
    <section>
      <h3 className="text-xl font-heading font-semibold text-navy-900 mb-4">Amenities</h3>
      <div className="divider mb-6" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {amenities.map((amenity) => {
          const Icon = amenityIcons[amenity] || ShieldCheck;
          return (
            <div
              key={amenity}
              className="flex items-center gap-3 p-3 rounded-lg bg-ivory border border-beige"
            >
              <Icon className="w-5 h-5 text-gold shrink-0" />
              <span className="text-sm font-body text-navy-800">{amenity}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
