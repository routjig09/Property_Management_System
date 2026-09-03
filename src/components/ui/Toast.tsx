import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface ToastProps {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  onDismiss: (id: string) => void;
}

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const styles = {
  success: 'bg-success text-white',
  error: 'bg-error text-white',
  warning: 'bg-warning text-white',
  info: 'bg-info text-white',
};

export function Toast({ id, message, type, onDismiss }: ToastProps) {
  const Icon = icons[type];

  return (
    <div
      className={cn(
        'flex items-center gap-3 px-4 py-3 rounded-lg shadow-elevated animate-slide-in-right font-body text-sm min-w-[280px] max-w-md',
        styles[type]
      )}
      role="alert"
    >
      <Icon className="w-5 h-5 shrink-0" />
      <p className="flex-1">{message}</p>
      <button
        onClick={() => onDismiss(id)}
        className="p-0.5 rounded hover:bg-white/20 transition-colors shrink-0"
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
