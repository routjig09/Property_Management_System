import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Eye, MapPin } from 'lucide-react';
import { useProperty } from '@/hooks/useProperties';
import { formatPrice, formatArea, formatDate } from '@/utils/format';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { LoadingState } from '@/components/common/LoadingState';
import { ErrorState } from '@/components/common/ErrorState';
import { mockInquiries, mockActivities } from '@/mock';

export function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: property, isLoading, error, refetch } = useProperty(Number(id));

  if (isLoading) return <LoadingState message="Loading property..." />;
  if (error || !property) return <ErrorState title="Property not found" onRetry={() => refetch()} />;

  const propertyInquiries = mockInquiries.filter((i) => i.propertyId === property.id);
  const propertyActivities = mockActivities.filter((a) => a.entityId === property.id);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/properties')}
            className="p-2 rounded-lg hover:bg-navy-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-navy-600" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-heading font-bold text-navy-900">{property.title}</h1>
              <Badge variant="success" size="sm" dot>{property.status}</Badge>
            </div>
            <p className="text-navy-500 font-body text-sm flex items-center gap-1 mt-1">
              <MapPin className="w-4 h-4 text-gold shrink-0" />
              {property.location.area}, {property.location.city}, {property.location.state}
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            leftIcon={<Eye className="w-4 h-4" />}
            onClick={() => window.open(`/properties/${property.id}`, '_blank')}
          >
            View Public Page
          </Button>
          <Button variant="accent" leftIcon={<Edit className="w-4 h-4" />}>
            Edit Property
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <p className="text-xs text-navy-400 font-body">Price</p>
          <p className="text-2xl font-heading font-bold text-navy-900 mt-1">{formatPrice(property.price)}</p>
          {property.listingType === 'RENT' && <p className="text-xs text-navy-400">/month</p>}
        </Card>
        <Card>
          <p className="text-xs text-navy-400 font-body">Total Views</p>
          <p className="text-2xl font-heading font-bold text-navy-900 mt-1">{property.viewCount.toLocaleString()}</p>
        </Card>
        <Card>
          <p className="text-xs text-navy-400 font-body">Favorites</p>
          <p className="text-2xl font-heading font-bold text-navy-900 mt-1">{property.favoriteCount}</p>
        </Card>
        <Card>
          <p className="text-xs text-navy-400 font-body">Inquiries</p>
          <p className="text-2xl font-heading font-bold text-navy-900 mt-1">{property.inquiryCount}</p>
        </Card>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Images */}
          <Card padding="sm">
            <div className="grid grid-cols-3 gap-2">
              {property.images.map((img, index) => (
                <img
                  key={img.id}
                  src={img.url}
                  alt=""
                  className={`w-full h-32 object-cover rounded-lg ${index === 0 ? 'col-span-2 row-span-2 h-66' : ''}`}
                />
              ))}
            </div>
          </Card>

          {/* Details */}
          <Card>
            <h3 className="font-heading font-semibold text-navy-900 mb-4">Property Specs</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm font-body">
              <div>
                <p className="text-navy-400 text-xs">Listing Type</p>
                <p className="font-medium text-navy-900 mt-0.5">{property.listingType}</p>
              </div>
              <div>
                <p className="text-navy-400 text-xs">Property Type</p>
                <p className="font-medium text-navy-900 mt-0.5">{property.propertyType}</p>
              </div>
              <div>
                <p className="text-navy-400 text-xs">Bedrooms / Bathrooms</p>
                <p className="font-medium text-navy-900 mt-0.5">{property.bedrooms} BHK / {property.bathrooms} Bath</p>
              </div>
              <div>
                <p className="text-navy-400 text-xs">Area</p>
                <p className="font-medium text-navy-900 mt-0.5">{formatArea(property.area)}</p>
              </div>
              <div>
                <p className="text-navy-400 text-xs">Furnishing</p>
                <p className="font-medium text-navy-900 mt-0.5">{property.furnishing || 'N/A'}</p>
              </div>
              <div>
                <p className="text-navy-400 text-xs">Created At</p>
                <p className="font-medium text-navy-900 mt-0.5">{formatDate(property.createdAt)}</p>
              </div>
            </div>
          </Card>

          {/* Description */}
          <Card>
            <h3 className="font-heading font-semibold text-navy-900 mb-3">Description</h3>
            <p className="text-navy-600 font-body text-sm leading-relaxed">{property.description}</p>
          </Card>

          {/* Amenities */}
          <Card>
            <h3 className="font-heading font-semibold text-navy-900 mb-3">Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {property.amenities.map((a) => (
                <Badge key={a} variant="outline" size="md">{a}</Badge>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column: Inquiries & Activity */}
        <div className="space-y-6">
          <Card>
            <h3 className="font-heading font-semibold text-navy-900 mb-4 flex items-center justify-between">
              <span>Property Inquiries</span>
              <Badge variant="info">{propertyInquiries.length}</Badge>
            </h3>
            {propertyInquiries.length === 0 ? (
              <p className="text-sm text-navy-400 font-body py-4 text-center">No inquiries yet for this property.</p>
            ) : (
              <div className="space-y-3">
                {propertyInquiries.map((inq) => (
                  <div key={inq.id} className="p-3 bg-ivory rounded-lg border border-beige text-xs font-body space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-navy-900">{inq.customerName}</span>
                      <Badge variant="warning" size="sm">{inq.status}</Badge>
                    </div>
                    <p className="text-navy-600 line-clamp-2">{inq.message}</p>
                    <p className="text-navy-400 text-[10px]">{formatDate(inq.createdAt)}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card>
            <h3 className="font-heading font-semibold text-navy-900 mb-4">Activity Log</h3>
            {propertyActivities.length === 0 ? (
              <p className="text-sm text-navy-400 font-body py-4 text-center">No recorded activity.</p>
            ) : (
              <div className="space-y-3">
                {propertyActivities.map((act) => (
                  <div key={act.id} className="text-xs font-body border-b border-navy-50 pb-2 last:border-0">
                    <p className="text-navy-800 font-medium">{act.description}</p>
                    <p className="text-navy-400 text-[10px] mt-0.5">{formatDate(act.timestamp)}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
