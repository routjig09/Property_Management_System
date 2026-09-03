import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  position?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg' | 'full';
}

const drawerSizes: Record<string, string> = {
  sm: 'w-64',
  md: 'w-80',
  lg: 'w-96',
  full: 'w-full',
};

export function Drawer({
  isOpen,
  onClose,
  title,
  children,
  position = 'right',
  size = 'md',
}: DrawerProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const positionClasses =
    position === 'left' ? 'left-0 animate-slide-in-left' : 'right-0 animate-slide-in-right';

  return createPortal(
    <div className="fixed inset-0 z-[var(--z-modal-backdrop)] flex">
      <div
        className="absolute inset-0 bg-navy-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div
        className={cn(
          'relative z-[var(--z-modal)] h-full bg-white shadow-modal flex flex-col',
          drawerSizes[size],
          positionClasses
        )}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between p-6 border-b border-navy-100 shrink-0">
          {title && (
            <h2 className="text-xl font-heading font-semibold text-navy-900">{title}</h2>
          )}
          <button
            onClick={onClose}
            className="text-navy-400 hover:text-navy-900 transition-colors p-1 rounded-md hover:bg-navy-50 ml-auto"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto flex-1">{children}</div>
      </div>
    </div>,
    document.body
  );
}
