import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';

export interface RadioOption {
  value: string | number;
  label: string;
}

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'onChange'> {
  label?: string;
  options: RadioOption[];
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  direction?: 'horizontal' | 'vertical';
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, options, value, onChange, name, error, direction = 'vertical', ...props }, ref) => {
    const generatedName = React.useId();
    const radioName = name || generatedName;

    return (
      <div className="flex flex-col gap-2">
        {label && <span className="text-sm font-medium text-navy-900 font-body">{label}</span>}
        <div className={cn('flex gap-3', direction === 'vertical' ? 'flex-col' : 'flex-row flex-wrap')}>
          {options.map((opt) => (
            <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name={radioName}
                value={opt.value}
                checked={value === opt.value}
                onChange={onChange}
                ref={ref}
                className={cn(
                  'h-4 w-4 border-navy-200 text-gold focus:ring-gold focus:ring-offset-2 transition-colors cursor-pointer',
                  error && 'border-error focus:ring-error',
                  className
                )}
                {...props}
              />
              <span className="text-sm font-body text-navy-900">{opt.label}</span>
            </label>
          ))}
        </div>
        {error && <p className="text-sm font-body text-error">{error}</p>}
      </div>
    );
  }
);
Radio.displayName = 'Radio';
