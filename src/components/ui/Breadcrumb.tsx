import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav className={cn('flex items-center gap-1 text-sm font-body', className)} aria-label="Breadcrumb">
      <Link to="/" className="text-navy-400 hover:text-gold transition-colors p-1">
        <Home className="w-4 h-4" />
      </Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div key={index} className="flex items-center gap-1">
            <ChevronRight className="w-3.5 h-3.5 text-navy-300" />
            {isLast || !item.href ? (
              <span className="text-navy-900 font-medium">{item.label}</span>
            ) : (
              <Link to={item.href} className="text-navy-400 hover:text-gold transition-colors">
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
