import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save, ArrowLeft, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Checkbox } from '@/components/ui/Checkbox';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { propertySchema, type PropertyFormData } from '@/schemas';
import { useCreateProperty } from '@/hooks/useProperties';
import { useUiStore } from '@/store/uiStore';
import { getStates, getCities, getAreas } from '@/mock/locations';
import { AMENITIES } from '@/constants';
import type { Property } from '@/types';

const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80';

const steps = [
  'Basic Info', 'Location', 'Property Details', 'Pricing', 'Amenities', 'Images', 'Description', 'Building Info', 'Review',
];

export function AddPropertyPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const createProperty = useCreateProperty();
  const addToast = useUiStore((s) => s.addToast);

  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: { listingType: 'SALE', propertyType: 'APARTMENT', furnishing: 'UNFURNISHED', status: 'DRAFT', amenities: [], images: [] },
  });

  const state = watch('state');
  const city = watch('city');
  const amenities = watch('amenities') || [];

  const nextStep = () => setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const onSubmit = async (data: PropertyFormData) => {
    try {
      const payload: Partial<Property> = {
        title: data.title,
        description: data.description,
        propertyType: data.propertyType,
        listingType: data.listingType,
        status: data.status ?? 'DRAFT',
        price: data.price,
        maintenanceCharge: data.maintenanceCharge,
        location: {
          state: data.state,
          city: data.city,
          area: data.area,
          address: data.address,
          pincode: data.pincode,
        },
        building: {
          name: data.buildingName,
          tower: data.tower,
          floor: data.floor,
          totalFloors: data.totalFloors,
          apartmentNumber: data.apartmentNumber,
        },
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        balconies: data.balconies,
        area: data.areaSqft,
        furnishing: data.furnishing,
        parking: data.parking,
        amenities: data.amenities,
        images: data.images && data.images.length > 0
          ? data.images
          : [{ id: Date.now(), url: PLACEHOLDER_IMAGE, isPrimary: true }],
        isVerified: false,
        viewCount: 0,
        favoriteCount: 0,
        inquiryCount: 0,
      };
      await createProperty.mutateAsync(payload);
      setSubmitted(true);
      addToast({ message: 'Property created successfully!', type: 'success' });
    } catch {
      addToast({ message: 'Failed to create property', type: 'error' });
    }
  };

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto text-center py-20">
        <div className="w-16 h-16 rounded-full bg-success-light mx-auto mb-4 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-success" />
        </div>
        <h2 className="text-2xl font-heading font-bold text-navy-900 mb-2">Property Created!</h2>
        <p className="text-navy-500 font-body mb-6">Your property has been saved as a draft.</p>
        <div className="flex gap-3 justify-center">
          <Button variant="outline" onClick={() => navigate('/admin/properties')}>View All Properties</Button>
          <Button variant="accent" onClick={() => { setSubmitted(false); setCurrentStep(0); }}>Add Another</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/admin/properties')} className="p-2 rounded-lg hover:bg-navy-50 transition-colors">
          <ArrowLeft className="w-5 h-5 text-navy-600" />
        </button>
        <div>
          <h1 className="text-2xl font-heading font-bold text-navy-900">Add New Property</h1>
          <p className="text-navy-500 font-body text-sm">Step {currentStep + 1} of {steps.length}</p>
        </div>
      </div>

      {/* Progress */}
      <div className="flex gap-1">
        {steps.map((step, i) => (
          <div key={step} className="flex-1">
            <div className={`h-1 rounded-full transition-colors ${i <= currentStep ? 'bg-gold' : 'bg-navy-100'}`} />
            <p className={`text-[10px] font-body mt-1 ${i === currentStep ? 'text-gold font-medium' : 'text-navy-300'}`}>{step}</p>
          </div>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="min-h-[300px]">
          {/* Step 0: Basic Info */}
          {currentStep === 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-heading font-semibold text-navy-900 mb-4">Basic Information</h3>
              <Input label="Title" error={errors.title?.message} {...register('title')} placeholder="e.g. Luxury 3 BHK Apartment in Koramangala" />
              <div className="grid grid-cols-2 gap-4">
                <Select label="Listing Type" options={[{ value: 'SALE', label: 'Sale' }, { value: 'RENT', label: 'Rent' }]} {...register('listingType')} />
                <Select label="Property Type" options={[
                  { value: 'APARTMENT', label: 'Apartment' }, { value: 'VILLA', label: 'Villa' },
                  { value: 'INDEPENDENT_HOUSE', label: 'Independent House' }, { value: 'PLOT', label: 'Plot' },
                  { value: 'COMMERCIAL', label: 'Commercial' },
                ]} {...register('propertyType')} />
              </div>
            </div>
          )}

          {/* Step 1: Location */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-heading font-semibold text-navy-900 mb-4">Location</h3>
              <Select label="State" options={getStates().map((s) => ({ value: s, label: s }))} placeholder="Select State" {...register('state')}
                onChange={(e) => { setValue('state', e.target.value); setValue('city', ''); setValue('area', ''); }} />
              {state && <Select label="City" options={getCities(state).map((c) => ({ value: c, label: c }))} placeholder="Select City" {...register('city')}
                onChange={(e) => { setValue('city', e.target.value); setValue('area', ''); }} />}
              {city && <Select label="Area" options={getAreas(state, city).map((a) => ({ value: a, label: a }))} placeholder="Select Area" {...register('area')} />}
              <Input label="Address" placeholder="Full address" {...register('address')} />
              <Input label="Pincode" placeholder="560001" {...register('pincode')} />
            </div>
          )}

          {/* Step 2: Details */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-heading font-semibold text-navy-900 mb-4">Property Details</h3>
              <div className="grid grid-cols-3 gap-4">
                <Input label="Bedrooms" type="number" {...register('bedrooms', { valueAsNumber: true })} />
                <Input label="Bathrooms" type="number" {...register('bathrooms', { valueAsNumber: true })} />
                <Input label="Balconies" type="number" {...register('balconies', { valueAsNumber: true })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Area (sq.ft)" type="number" error={errors.areaSqft?.message} {...register('areaSqft', { valueAsNumber: true })} />
                <Input label="Parking Spots" type="number" {...register('parking', { valueAsNumber: true })} />
              </div>
              <Select label="Furnishing" options={[
                { value: 'UNFURNISHED', label: 'Unfurnished' }, { value: 'SEMI_FURNISHED', label: 'Semi Furnished' },
                { value: 'FULLY_FURNISHED', label: 'Fully Furnished' },
              ]} {...register('furnishing')} />
            </div>
          )}

          {/* Step 3: Pricing */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-heading font-semibold text-navy-900 mb-4">Pricing</h3>
              <Input label="Price (₹)" type="number" error={errors.price?.message} {...register('price', { valueAsNumber: true })} placeholder="e.g. 5000000" />
              <Input label="Maintenance (₹/month)" type="number" {...register('maintenanceCharge', { valueAsNumber: true })} placeholder="Optional" />
              <Input label="Price per sq.ft (₹)" type="number" {...register('pricePerSqft', { valueAsNumber: true })} placeholder="Auto-calculated" />
            </div>
          )}

          {/* Step 4: Amenities */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-heading font-semibold text-navy-900 mb-4">Amenities</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {AMENITIES.map((amenity) => (
                  <Checkbox
                    key={amenity.value}
                    label={amenity.label}
                    checked={amenities.includes(amenity.value)}
                    onChange={(e) => {
                      const checked = (e.target as HTMLInputElement).checked;
                      setValue('amenities', checked ? [...amenities, amenity.value] : amenities.filter((a: string) => a !== amenity.value));
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Images */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <h3 className="text-lg font-heading font-semibold text-navy-900 mb-4">Images</h3>
              <div className="border-2 border-dashed border-navy-200 rounded-xl p-8 text-center">
                <p className="text-navy-500 font-body">Image upload will be available with backend integration.</p>
                <p className="text-sm text-navy-400 font-body mt-2">Mock images will be used for now.</p>
              </div>
            </div>
          )}

          {/* Step 6: Description */}
          {currentStep === 6 && (
            <div className="space-y-4">
              <h3 className="text-lg font-heading font-semibold text-navy-900 mb-4">Description</h3>
              <div>
                <label className="text-sm font-medium text-navy-900 font-body block mb-1">Property Description</label>
                <textarea {...register('description')} rows={8}
                  className="w-full rounded-lg border border-navy-200 px-3 py-2 text-sm font-body focus:outline-none focus:ring-2 focus:ring-gold resize-none"
                  placeholder="Write a detailed description of the property..." />
                {errors.description && <p className="text-sm text-error mt-1">{errors.description.message}</p>}
              </div>
            </div>
          )}

          {/* Step 7: Building Info */}
          {currentStep === 7 && (
            <div className="space-y-4">
              <h3 className="text-lg font-heading font-semibold text-navy-900 mb-4">Building Information</h3>
              <Input label="Building / Project Name" {...register('buildingName')} placeholder="e.g. Prestige Lakeside" />
              <div className="grid grid-cols-3 gap-4">
                <Input label="Tower" {...register('tower')} placeholder="e.g. A" />
                <Input label="Floor" type="number" {...register('floor', { valueAsNumber: true })} />
                <Input label="Total Floors" type="number" {...register('totalFloors', { valueAsNumber: true })} />
              </div>
              <Input label="Apartment / Unit" {...register('apartmentNumber')} placeholder="e.g. 1204" />
            </div>
          )}

          {/* Step 8: Review */}
          {currentStep === 8 && (
            <div className="space-y-4">
              <h3 className="text-lg font-heading font-semibold text-navy-900 mb-4">Review & Submit</h3>
              <p className="text-navy-500 font-body">Review your property details and submit.</p>
              <div className="bg-ivory rounded-lg p-4 space-y-2 text-sm font-body">
                <p><strong>Title:</strong> {watch('title') || '-'}</p>
                <p><strong>Type:</strong> {watch('propertyType')} ({watch('listingType')})</p>
                <p><strong>Location:</strong> {watch('area')}, {watch('city')}, {watch('state')}</p>
                <p><strong>Rooms:</strong> {watch('bedrooms')} BHK, {watch('bathrooms')} bath</p>
                <p><strong>Built-up area:</strong> {watch('areaSqft') ? `${watch('areaSqft')} sq.ft` : '-'}</p>
                <p><strong>Price:</strong> ₹{watch('price')?.toLocaleString()}</p>
                <p><strong>Amenities:</strong> {amenities.length} selected</p>
              </div>
            </div>
          )}
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 0}>Previous</Button>
          {currentStep < steps.length - 1 ? (
            <Button type="button" variant="primary" onClick={nextStep}>Next</Button>
          ) : (
            <Button type="submit" variant="accent" isLoading={isSubmitting} leftIcon={<Save className="w-4 h-4" />}>Create Property</Button>
          )}
        </div>
      </form>
    </div>
  );
}
