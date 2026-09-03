import { useState } from 'react';
import { Heart } from 'lucide-react';
import { cn } from '@/utils/cn';
import { useAuthStore } from '@/store/authStore';
import { useFavoriteStore } from '@/store/favoriteStore';
import { LoginRequiredModal } from '@/components/common/LoginRequiredModal';
import { useUiStore } from '@/store/uiStore';

interface PropertyFavoriteButtonProps {
  propertyId: number;
  className?: string;
  size?: 'sm' | 'md';
}

export function PropertyFavoriteButton({ propertyId, className, size = 'md' }: PropertyFavoriteButtonProps) {
  const [showLogin, setShowLogin] = useState(false);
  const { isAuthenticated, user } = useAuthStore();
  const { isFavorite, toggleFavorite } = useFavoriteStore();
  const addToast = useUiStore((s) => s.addToast);
  const favorited = isFavorite(propertyId);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated || !user) {
      setShowLogin(true);
      return;
    }

    toggleFavorite(user.id, propertyId);
    addToast({ message: favorited ? 'Removed from favorites' : 'Added to favorites', type: favorited ? 'info' : 'success' });
  };

  const iconSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
  const btnSize = size === 'sm' ? 'p-1.5' : 'p-2';

  return (
    <>
      <button
        onClick={handleClick}
        className={cn(
          'rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white transition-all duration-200',
          btnSize,
          className
        )}
        aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
      >
        <Heart
          className={cn(
            iconSize,
            'transition-all duration-200',
            favorited ? 'fill-error text-error animate-pulse-heart' : 'text-navy-400 hover:text-error'
          )}
        />
      </button>
      <LoginRequiredModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        message="Please sign in to save properties to your favorites."
      />
    </>
  );
}
