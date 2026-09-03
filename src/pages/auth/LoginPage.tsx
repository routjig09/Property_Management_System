import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LogIn, Eye, EyeOff } from 'lucide-react';
import { loginSchema, type LoginFormData } from '@/schemas';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/common/Logo';
import { useAuthStore } from '@/store/authStore';
import { useUiStore } from '@/store/uiStore';

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const addToast = useUiStore((s) => s.addToast);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
      addToast({ message: 'Welcome back!', type: 'success' });
      // Land on the home page (not the dashboard) - the header now shows the
      // signed-in profile ("Welcome, {name}") in place of Sign In / Get Started.
      // The dashboard itself is reached from the profile dropdown / sidebar menu.
      navigate('/');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid email or password.';
      setError('root', { message });
    }
  };

  return (
    // <div className="min-h-screen bg-ivory flex">
    <div className="h-dvh overflow-hidden bg-ivory flex">
      {/* Left: Form */}
      <div className="flex-1 h-dvh flex items-center justify-center px-6 py-6">
        <div className="w-full max-w-md">
          <div className="mb-5">
            <Link to="/">
              <Logo variant="full" size="lg" className="mb-4" />
            </Link>
            <h1 className="text-3xl font-heading font-bold text-navy-900 mb-2">Welcome back</h1>
            <p className="text-navy-500 font-body">Sign in to continue to PropSync</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            {errors.root && (
              <div className="p-3 rounded-lg bg-error-light text-error text-sm font-body">
                {errors.root.message}
              </div>
            )}
            <Input label="Email" type="email" placeholder="you@example.com" error={errors.email?.message} {...register('email')} />
            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
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

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="h-4 w-4 rounded border-navy-200 text-gold focus:ring-gold" />
                <span className="text-sm font-body text-navy-600">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm font-body text-gold hover:text-gold-dark">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" variant="accent" fullWidth size="lg" isLoading={isSubmitting} leftIcon={<LogIn className="w-4 h-4" />}>
              Sign In
            </Button>
          </form>

          <p className="mt-4 text-center text-sm font-body text-navy-500">
            Don't have an account?{' '}
            <Link to="/register" className="text-gold font-medium hover:text-gold-dark">
              Create one
            </Link>
          </p>

          {/* Mock credentials hint */}
          <div className="mt-4 p-3 rounded-lg bg-navy-50 border border-navy-100">
            <p className="text-xs font-body text-navy-500 font-semibold mb-1">Demo Credentials:</p>
            <p className="text-xs font-body text-navy-400">Admin: admin@propsync.com / admin123</p>
            <p className="text-xs font-body text-navy-400">Customer: customer@propsync.com / password123</p>
          </div>
        </div>
      </div>

      {/* Right: Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=1600&fit=crop"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-900/30 to-transparent" />
        <div className="absolute bottom-12 left-12 right-12">
          <h2 className="text-white font-heading text-3xl font-bold mb-3">
            Your dream property awaits
          </h2>
          <p className="text-white/60 font-body">
            Join thousands of property seekers who trust PropSync.
          </p>
        </div>
      </div>
    </div>
  );
}
