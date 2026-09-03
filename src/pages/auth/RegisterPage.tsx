import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserPlus, Eye, EyeOff } from 'lucide-react';
import { registerSchema, type RegisterFormData } from '@/schemas';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/common/Logo';
import { useAuthStore } from '@/store/authStore';
import { useUiStore } from '@/store/uiStore';

export function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const registerUser = useAuthStore((s) => s.register);
  const addToast = useUiStore((s) => s.addToast);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data);
      addToast({ message: 'Account created successfully!', type: 'success' });
      // Land on the home page - header now shows "Welcome, {name}" in place
      // of Sign In / Get Started. Dashboard is reached from the profile menu.
      navigate('/');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Registration failed. Please try again.';
      setError('root', { message });
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-ivory flex">
      {/* Left: Image */}
      <div className="hidden lg:block lg:w-1/2 h-screen relative">
        <img
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=1600&fit=crop"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-900/30 to-transparent" />
        <div className="absolute bottom-10 left-10 right-10">
          <h2 className="text-white font-heading text-2xl font-bold mb-2">
            Start your property journey
          </h2>
          <p className="text-white/60 font-body text-sm">
            Create an account to save favorites, submit inquiries, and get personalized recommendations.
          </p>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex-1 h-screen flex items-center justify-center px-6 py-4 overflow-y-auto">
        <div className="w-full max-w-md">
          <div className="mb-4">
            <Link to="/">
              <Logo variant="full" size="md" className="mb-4" />
            </Link>
            <h1 className="text-2xl font-heading font-bold text-navy-900 mb-1">Create an account</h1>
            <p className="text-navy-500 font-body text-sm">Join PropSync to find your perfect property</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5">
            {errors.root && (
              <div className="p-2.5 rounded-lg bg-error-light text-error text-sm font-body">
                {errors.root.message}
              </div>
            )}
            <Input label="Full Name" placeholder="John Doe" error={errors.name?.message} {...register('name')} />
            <Input label="Email" type="email" placeholder="you@example.com" error={errors.email?.message} {...register('email')} />
            <Input label="Phone" type="tel" placeholder="+91 98765 43210" error={errors.phone?.message} {...register('phone')} />
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Min 6 characters"
                  error={errors.password?.message}
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[38px] text-navy-400 hover:text-navy-600"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <Input
                label="Confirm Password"
                type="password"
                placeholder="Confirm password"
                error={errors.confirmPassword?.message}
                {...register('confirmPassword')}
              />
            </div>

            <Button type="submit" variant="accent" fullWidth size="lg" isLoading={isSubmitting} leftIcon={<UserPlus className="w-4 h-4" />}>
              Create Account
            </Button>
          </form>

          <p className="mt-4 text-center text-sm font-body text-navy-500">
            Already have an account?{' '}
            <Link to="/login" className="text-gold font-medium hover:text-gold-dark">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}