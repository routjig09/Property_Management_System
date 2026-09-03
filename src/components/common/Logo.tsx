import { cn } from '@/utils/cn';
import { Building2 } from 'lucide-react';

interface LogoProps {
  variant?: 'full' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizes = {
  sm: { icon: 'w-5 h-5', text: 'text-lg', tagline: 'text-[9px]' },
  md: { icon: 'w-6 h-6', text: 'text-xl', tagline: 'text-[10px]' },
  lg: { icon: 'w-7 h-7', text: 'text-2xl', tagline: 'text-xs' },
};

export function Logo({ variant = 'full', size = 'md', className }: LogoProps) {
  const s = sizes[size];

  if (variant === 'icon') {
    return (
      <div className={cn('flex items-center justify-center', className)}>
        <div className="relative">
          <Building2 className={cn(s.icon, 'text-gold')} strokeWidth={2} />
        </div>
      </div>
    );
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="relative">
        <Building2 className={cn(s.icon, 'text-gold')} strokeWidth={2} />
      </div>
      <div className="flex flex-col leading-none">
        <span className={cn(s.text, 'font-heading font-bold tracking-tight')}>
          Prop<span className="text-gold">Sync</span>
        </span>
      </div>
    </div>
  );
}
