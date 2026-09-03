import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = 'Loading...' }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Loader2 className="w-10 h-10 text-gold animate-spin mb-4" />
      <p className="text-navy-500 font-body">{message}</p>
    </div>
  );
}
