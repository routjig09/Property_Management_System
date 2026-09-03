import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const generatedId = React.useId();
    const checkboxId = id || generatedId;

    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={checkboxId} className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            id={checkboxId}
            ref={ref}
            className={cn(
              'h-4 w-4 rounded border-navy-200 text-gold focus:ring-gold focus:ring-offset-2 transition-colors cursor-pointer',
              error && 'border-error focus:ring-error',
              className
            )}
            {...props}
          />
          <span className="text-sm font-body text-navy-900">{label}</span>
        </label>
        {error && <p className="text-sm font-body text-error">{error}</p>}
      </div>
    );
  }
);
Checkbox.displayName = 'Checkbox';
