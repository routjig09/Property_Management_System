import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Maximize, CheckCircle } from 'lucide-react';
import type { Property } from '@/types';
import { formatPrice, formatArea } from '@/utils/format';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { PropertyFavoriteButton } from './PropertyFavoriteButton';
import { cn } from '@/utils/cn';

interface PropertyCardProps {
  property: Property;
  className?: string;
}

const propertyTypeLabels: Record<string, string> = {
  APARTMENT: 'Apartment',
  VILLA: 'Villa',
  INDEPENDENT_HOUSE: 'Independent House',
  PLOT: 'Plot',
  COMMERCIAL: 'Commercial',
  OFFICE: 'Office',
  SHOP: 'Shop',
};

export function PropertyCard({ property, className }: PropertyCardProps) {
  const primaryImage = property.images.find((i) => i.isPrimary) || property.images[0];

  return (
    <article
      className={cn(
        'group bg-white rounded-xl shadow-card overflow-hidden card-hover',
        className
      )}
    >
      {/* Image Container */}
      <div className="relative hover-zoom">
        <Link to={`/properties/${property.id}`}>
          <div className="aspect-[4/3] overflow-hidden">
            <img
              src={primaryImage?.url || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop'}
              alt={property.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </Link>

        {/* Overlay Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {property.isVerified && (
            <Badge variant="success" size="sm">
              <CheckCircle className="w-3 h-3 mr-1" />
              Verified
            </Badge>
          )}
          <Badge variant="premium" size="sm">
            {property.listingType === 'SALE' ? 'For Sale' : 'For Rent'}
          </Badge>
        </div>

        {/* Favorite Button */}
        <div className="absolute top-3 right-3">
          <PropertyFavoriteButton propertyId={property.id} size="sm" />
        </div>

        {/* Property Type Label */}
        <div className="absolute bottom-3 left-3">
          <Badge variant="default" size="sm" className="bg-white/90 backdrop-blur-sm text-navy-800">
            {propertyTypeLabels[property.propertyType] || property.propertyType}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <Link to={`/properties/${property.id}`}>
          <h3 className="text-base font-heading font-semibold text-navy-900 group-hover:text-gold transition-colors line-clamp-1">
            {property.title}
          </h3>
        </Link>

        {/* Location */}
        <div className="flex items-center gap-1 text-sm text-navy-500">
          <MapPin className="w-3.5 h-3.5 text-gold shrink-0" />
          <span className="truncate">
            {property.location.area}, {property.location.city}
          </span>
        </div>

        {/* Specs */}
        {property.bedrooms > 0 && (
          <div className="flex items-center gap-4 text-sm text-navy-600">
            <span className="flex items-center gap-1">
              <Bed className="w-3.5 h-3.5" />
              {property.bedrooms} Beds
            </span>
            <span className="flex items-center gap-1">
              <Bath className="w-3.5 h-3.5" />
              {property.bathrooms} Baths
            </span>
            <span className="flex items-center gap-1">
              <Maximize className="w-3.5 h-3.5" />
              {formatArea(property.area)}
            </span>
          </div>
        )}

        {/* Price + CTA */}
        <div className="flex items-center justify-between pt-2 border-t border-navy-50">
          <div>
            <p className="text-lg font-heading font-bold text-navy-900">
              {formatPrice(property.price)}
            </p>
            {property.listingType === 'RENT' && (
              <p className="text-xs text-navy-400">/month</p>
            )}
          </div>
          <Link to={`/properties/${property.id}`}>
            <Button variant="outline" size="sm">
              View Property
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}
