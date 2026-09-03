import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send, CheckCircle } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Radio } from '@/components/ui/Radio';
import { inquirySchema, type InquiryFormData } from '@/schemas';
import { useAuthStore } from '@/store/authStore';
import { useUiStore } from '@/store/uiStore';

interface PropertyInquiryFormProps {
  isOpen: boolean;
  onClose: () => void;
  propertyTitle: string;
  propertyId: number;
}

export function PropertyInquiryForm({ isOpen, onClose, propertyTitle, propertyId: _propertyId }: PropertyInquiryFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { user } = useAuthStore();
  const addToast = useUiStore((s) => s.addToast);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      message: `Hi, I'm interested in "${propertyTitle}". Please share more details.`,
      contactMethod: 'EMAIL',
    },
  });

  const contactMethod = watch('contactMethod');

  const onSubmit = async (_data: InquiryFormData) => {
    // Mock submission
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitted(true);
    addToast({ message: 'Inquiry submitted successfully!', type: 'success' });
  };

  const handleClose = () => {
    setIsSubmitted(false);
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Send Inquiry" size="lg">
      {isSubmitted ? (
        <div className="text-center py-6">
          <div className="w-16 h-16 rounded-full bg-success-light mx-auto mb-4 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-success" />
          </div>
          <h3 className="text-lg font-heading font-semibold text-navy-900 mb-2">
            Inquiry Sent Successfully!
          </h3>
          <p className="text-navy-500 font-body text-sm mb-6">
            Our property team will contact you shortly regarding{' '}
            <span className="font-medium text-navy-700">"{propertyTitle}"</span>.
          </p>
          <Button variant="accent" onClick={handleClose}>
            Done
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <p className="text-sm text-navy-500 font-body mb-2">
            Interested in <span className="font-medium text-navy-700">"{propertyTitle}"</span>?
          </p>
          <Input label="Full Name" error={errors.name?.message} {...register('name')} />
          <Input label="Email" type="email" error={errors.email?.message} {...register('email')} />
          <Input label="Phone" type="tel" error={errors.phone?.message} {...register('phone')} />
          <div>
            <label className="text-sm font-medium text-navy-900 font-body block mb-1">Message</label>
            <textarea
              {...register('message')}
              rows={3}
              className="w-full rounded-lg border border-navy-200 px-3 py-2 text-sm font-body focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent resize-none"
            />
            {errors.message && (
              <p className="text-sm text-error mt-1">{errors.message.message}</p>
            )}
          </div>
          <Radio
            label="Preferred Contact Method"
            options={[
              { value: 'CALL', label: 'Call' },
              { value: 'WHATSAPP', label: 'WhatsApp' },
              { value: 'EMAIL', label: 'Email' },
            ]}
            value={contactMethod}
            onChange={(e) => setValue('contactMethod', e.target.value as 'CALL' | 'WHATSAPP' | 'EMAIL')}
            direction="horizontal"
          />
          <Button
            type="submit"
            variant="accent"
            fullWidth
            isLoading={isSubmitting}
            leftIcon={<Send className="w-4 h-4" />}
          >
            Send Inquiry
          </Button>
        </form>
      )}
    </Modal>
  );
}
