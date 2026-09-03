import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Phone, MessageCircle, Send, Calendar, Share2 } from 'lucide-react';
import { useProperty } from '@/hooks/useProperties';
import { formatPrice, formatDate } from '@/utils/format';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { PropertyGallery } from '@/components/property/PropertyGallery';
import { PropertyOverview } from '@/components/property/PropertyOverview';
import { PropertyAmenities } from '@/components/property/PropertyAmenities';
import { PropertyLocation } from '@/components/property/PropertyLocation';
import { PropertyBuildingInfo } from '@/components/property/PropertyBuildingInfo';
import { PropertyFavoriteButton } from '@/components/property/PropertyFavoriteButton';
import { PropertyInquiryForm } from '@/components/property/PropertyInquiryForm';
import { LoadingState } from '@/components/common/LoadingState';
import { ErrorState } from '@/components/common/ErrorState';

const propertyTypeLabels: Record<string, string> = {
  APARTMENT: 'Apartment', VILLA: 'Villa', INDEPENDENT_HOUSE: 'Independent House',
  PLOT: 'Plot', COMMERCIAL: 'Commercial', OFFICE: 'Office', SHOP: 'Shop',
};

export function PropertyDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: property, isLoading, error, refetch } = useProperty(Number(id));
  const [showInquiry, setShowInquiry] = useState(false);

  if (isLoading) return <LoadingState message="Loading property details..." />;
  if (error || !property) return <ErrorState title="Property not found" onRetry={() => refetch()} />;

  return (
    <div className="bg-ivory min-h-screen">
      <div className="container-main py-6">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Properties', href: '/properties' },
            { label: property.location.city, href: `/properties?city=${property.location.city}` },
            { label: property.title },
          ]}
          className="mb-6"
        />

        {/* Gallery */}
        <PropertyGallery images={property.images} title={property.title} />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge variant="premium">{property.listingType === 'SALE' ? 'For Sale' : 'For Rent'}</Badge>
                <Badge variant="outline">{propertyTypeLabels[property.propertyType]}</Badge>
                {property.isVerified && <Badge variant="success">✓ Verified</Badge>}
              </div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-navy-900 mb-3">
                {property.title}
              </h1>
              <div className="flex items-center gap-1 text-navy-500 font-body">
                <MapPin className="w-4 h-4 text-gold" />
                <span>
                  {property.location.area}, {property.location.city}, {property.location.state}
                </span>
              </div>
            </div>

            {/* Price (mobile) */}
            <div className="lg:hidden bg-white rounded-xl shadow-card p-6">
              <p className="text-3xl font-heading font-bold text-navy-900">
                {formatPrice(property.price)}
              </p>
              {property.listingType === 'RENT' && (
                <p className="text-sm text-navy-400 font-body">/month</p>
              )}
              <div className="flex gap-2 mt-4">
                <Button variant="accent" fullWidth leftIcon={<Send className="w-4 h-4" />} onClick={() => setShowInquiry(true)}>
                  Send Inquiry
                </Button>
                <PropertyFavoriteButton propertyId={property.id} />
              </div>
            </div>

            {/* Overview */}
            <PropertyOverview property={property} />

            {/* Description */}
            <section>
              <h3 className="text-xl font-heading font-semibold text-navy-900 mb-4">About this property</h3>
              <div className="divider mb-6" />
              <p className="text-navy-700 font-body leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </section>

            {/* Amenities */}
            <PropertyAmenities amenities={property.amenities} />

            {/* Building Info */}
            {property.building && <PropertyBuildingInfo building={property.building} />}

            {/* Location */}
            <PropertyLocation location={property.location} />
          </div>

          {/* Sticky Sidebar (desktop) */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-xl shadow-card p-6 sticky top-[88px] space-y-6">
              {/* Price */}
              <div>
                <p className="text-3xl font-heading font-bold text-navy-900">
                  {formatPrice(property.price)}
                </p>
                {property.listingType === 'RENT' && (
                  <p className="text-sm text-navy-400 font-body">/month</p>
                )}
                {property.maintenanceCharge && (
                  <p className="text-xs text-navy-400 font-body mt-1">
                    + ₹{property.maintenanceCharge.toLocaleString('en-IN')}/month maintenance
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Button variant="accent" fullWidth leftIcon={<Send className="w-4 h-4" />} onClick={() => setShowInquiry(true)}>
                  Send Inquiry
                </Button>
                <Button variant="outline" fullWidth leftIcon={<Phone className="w-4 h-4" />}>
                  Call
                </Button>
                <Button variant="outline" fullWidth leftIcon={<MessageCircle className="w-4 h-4" />}>
                  WhatsApp
                </Button>
                <Button variant="outline" fullWidth leftIcon={<Calendar className="w-4 h-4" />}>
                  Schedule Visit
                </Button>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2 pt-4 border-t border-navy-100">
                <PropertyFavoriteButton propertyId={property.id} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border border-navy-200 text-sm font-body text-navy-600 hover:bg-ivory transition-colors" />
                <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border border-navy-200 text-sm font-body text-navy-600 hover:bg-ivory transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-navy-100">
                <div className="text-center">
                  <p className="text-lg font-semibold text-navy-900 font-body">{property.viewCount.toLocaleString()}</p>
                  <p className="text-xs text-navy-400 font-body">Views</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-navy-900 font-body">{property.favoriteCount}</p>
                  <p className="text-xs text-navy-400 font-body">Favorites</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-navy-900 font-body">{property.inquiryCount}</p>
                  <p className="text-xs text-navy-400 font-body">Inquiries</p>
                </div>
              </div>

              <p className="text-xs text-navy-400 font-body text-center">
                Listed on {formatDate(property.createdAt)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Inquiry Form Modal */}
      <PropertyInquiryForm
        isOpen={showInquiry}
        onClose={() => setShowInquiry(false)}
        propertyTitle={property.title}
        propertyId={property.id}
      />
    </div>
  );
}
