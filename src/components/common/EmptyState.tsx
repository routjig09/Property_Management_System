import { Inbox } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title?: string;
  message?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({
  icon,
  title = 'No results found',
  message = 'There are no items to display right now.',
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-full bg-navy-50 flex items-center justify-center mb-4">
        {icon || <Inbox className="w-8 h-8 text-navy-300" />}
      </div>
      <h3 className="text-lg font-heading font-semibold text-navy-900 mb-2">{title}</h3>
      <p className="text-navy-500 font-body mb-6 max-w-sm">{message}</p>
      {action && (
        <Button variant="accent" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
