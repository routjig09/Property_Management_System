import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Mail } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/common/Logo';
import { useState } from 'react';

const schema = z.object({ email: z.string().email('Valid email is required') });
type ForgotForm = z.infer<typeof schema>;

export function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ForgotForm>({ resolver: zodResolver(schema) });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 800));
    setSent(true);
  };

  return (
    <div className="h-dvh overflow-hidden bg-ivory flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <Link to="/">
          <Logo variant="full" size="lg" className="mb-8 mx-auto" />
        </Link>

        {sent ? (
          <div className="text-center bg-white rounded-xl shadow-card p-8">
            <div className="w-16 h-16 rounded-full bg-success-light mx-auto mb-4 flex items-center justify-center">
              <Mail className="w-8 h-8 text-success" />
            </div>
            <h2 className="text-2xl font-heading font-bold text-navy-900 mb-2">Check Your Email</h2>
            <p className="text-navy-500 font-body mb-6">
              We've sent password reset instructions to your email address.
            </p>
            <Link to="/login">
              <Button variant="outline" leftIcon={<ArrowLeft className="w-4 h-4" />}>
                Back to Sign In
              </Button>
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-card p-8">
            <h1 className="text-2xl font-heading font-bold text-navy-900 mb-2">Forgot Password?</h1>
            <p className="text-navy-500 font-body mb-6">
              Enter your email and we'll send you reset instructions.
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <Input label="Email" type="email" placeholder="you@example.com" error={errors.email?.message} {...register('email')} />
              <Button type="submit" variant="accent" fullWidth isLoading={isSubmitting}>
                Send Reset Link
              </Button>
            </form>
            <div className="mt-6 text-center">
              <Link to="/login" className="text-sm font-body text-navy-500 hover:text-gold inline-flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Sign In
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
