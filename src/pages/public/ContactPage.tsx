import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useUiStore } from '@/store/uiStore';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  subject: z.string().min(2, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactForm = z.infer<typeof contactSchema>;

const contactInfo = [
  { icon: MapPin, title: 'Visit Us', text: '123 Brigade Road, Bangalore\nKarnataka 560025' },
  { icon: Phone, title: 'Call Us', text: '+91 98765 43210' },
  { icon: Mail, title: 'Email Us', text: 'hello@propsync.in' },
  { icon: Clock, title: 'Office Hours', text: 'Mon - Sat: 9:00 AM - 7:00 PM' },
];

export function ContactPage() {
  const addToast = useUiStore((s) => s.addToast);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (_data: ContactForm) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    addToast({ message: 'Message sent successfully! We\'ll get back to you soon.', type: 'success' });
    reset();
  };

  return (
    <div className="bg-ivory">
      {/* Hero */}
      <section className="py-24 bg-navy-950">
        <div className="container-main text-center">
          <p className="text-gold font-body text-sm tracking-[0.2em] uppercase mb-4">Contact</p>
          <h1 className="text-white font-heading text-4xl md:text-5xl font-bold mb-6">
            Get in Touch
          </h1>
          <p className="text-white/60 font-body text-lg max-w-xl mx-auto">
            Have questions about a property or need assistance? Our team is here to help.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-heading font-semibold text-navy-900 mb-2">
                  Let's Talk
                </h2>
                <p className="text-navy-500 font-body">
                  Whether you're looking for a property or want to list one, we're here to assist.
                </p>
              </div>
              <div className="space-y-6">
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <p className="font-body font-semibold text-navy-900">{item.title}</p>
                        <p className="text-sm text-navy-500 font-body whitespace-pre-line">{item.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white rounded-xl shadow-card p-6 md:p-8 space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input label="Full Name" error={errors.name?.message} {...register('name')} />
                  <Input label="Email" type="email" error={errors.email?.message} {...register('email')} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input label="Phone" type="tel" error={errors.phone?.message} {...register('phone')} />
                  <Input label="Subject" error={errors.subject?.message} {...register('subject')} />
                </div>
                <div>
                  <label className="text-sm font-medium text-navy-900 font-body block mb-1">Message</label>
                  <textarea
                    {...register('message')}
                    rows={5}
                    className="w-full rounded-lg border border-navy-200 px-3 py-2 text-navy-900 font-body placeholder:text-navy-300 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent resize-none"
                    placeholder="Tell us how we can help..."
                  />
                  {errors.message && <p className="text-sm text-error mt-1">{errors.message.message}</p>}
                </div>
                <Button
                  type="submit"
                  variant="accent"
                  size="lg"
                  isLoading={isSubmitting}
                  leftIcon={<Send className="w-4 h-4" />}
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
