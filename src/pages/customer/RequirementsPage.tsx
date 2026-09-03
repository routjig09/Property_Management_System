import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send, CheckCircle } from 'lucide-react';
import { requirementSchema, type RequirementFormData } from '@/schemas';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Radio } from '@/components/ui/Radio';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useUiStore } from '@/store/uiStore';
import { getStates, getCities, getAreas } from '@/mock/locations';

export function RequirementsPage() {
  const [submitted, setSubmitted] = useState(false);
  const addToast = useUiStore((s) => s.addToast);

  const { register, handleSubmit, watch, setValue, reset, formState: { errors, isSubmitting } } = useForm<RequirementFormData>({
    resolver: zodResolver(requirementSchema),
    defaultValues: { listingType: 'SALE' },
  });

  const state = watch('state');
  const city = watch('city');
  const listingType = watch('listingType');

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    addToast({ message: 'Requirement submitted successfully!', type: 'success' });
  };

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto text-center py-16">
        <div className="w-16 h-16 rounded-full bg-success-light mx-auto mb-4 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-success" />
        </div>
        <h2 className="text-2xl font-heading font-bold text-navy-900 mb-2">Requirement Submitted</h2>
        <p className="text-navy-500 font-body mb-6">We'll help match you with suitable properties.</p>
        <Button variant="outline" onClick={() => { setSubmitted(false); reset(); }}>
          Submit Another
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-navy-900">My Requirements</h1>
        <p className="text-navy-500 font-body mt-1">Tell us what you're looking for.</p>
      </div>

      <Card>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Radio
            label="Looking to"
            options={[{ value: 'SALE', label: 'Buy' }, { value: 'RENT', label: 'Rent' }]}
            value={listingType}
            onChange={(e) => setValue('listingType', e.target.value as 'SALE' | 'RENT')}
            direction="horizontal"
          />

          <Select
            label="State"
            options={getStates().map((s) => ({ value: s, label: s }))}
            placeholder="Select State"
            error={errors.state?.message}
            {...register('state')}
            onChange={(e) => { setValue('state', e.target.value); setValue('city', ''); setValue('area', ''); }}
          />

          {state && (
            <Select
              label="City"
              options={getCities(state).map((c) => ({ value: c, label: c }))}
              placeholder="Select City"
              error={errors.city?.message}
              {...register('city')}
              onChange={(e) => { setValue('city', e.target.value); setValue('area', ''); }}
            />
          )}

          {city && (
            <Select
              label="Area"
              options={getAreas(state ?? '', city).map((a) => ({ value: a, label: a }))}
              placeholder="Select Area"
              {...register('area')}
            />
          )}

          <Select
            label="Property Type"
            options={[
              { value: 'APARTMENT', label: 'Apartment' },
              { value: 'VILLA', label: 'Villa' },
              { value: 'INDEPENDENT_HOUSE', label: 'Independent House' },
              { value: 'PLOT', label: 'Plot' },
              { value: 'COMMERCIAL', label: 'Commercial' },
            ]}
            placeholder="Select Type"
            {...register('propertyType')}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input label="BHK" type="number" placeholder="e.g. 3" {...register('bhk', { valueAsNumber: true })} />
            <Input label="Budget (₹)" type="number" placeholder="e.g. 5000000" {...register('maxBudget', { valueAsNumber: true })} />
          </div>

          <Input label="Preferred Area (sq.ft)" type="number" placeholder="e.g. 1500" {...register('preferredArea', { valueAsNumber: true })} />

          <div>
            <label className="text-sm font-medium text-navy-900 font-body block mb-1">Additional Requirements</label>
            <textarea
              {...register('additionalRequirements')}
              rows={3}
              className="w-full rounded-lg border border-navy-200 px-3 py-2 text-sm font-body focus:outline-none focus:ring-2 focus:ring-gold resize-none"
              placeholder="Any specific requirements..."
            />
          </div>

          <Button type="submit" variant="accent" fullWidth isLoading={isSubmitting} leftIcon={<Send className="w-4 h-4" />}>
            Submit Requirement
          </Button>
        </form>
      </Card>
    </div>
  );
}
