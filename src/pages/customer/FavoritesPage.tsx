import { useMemo } from 'react';
import { useFavoriteStore } from '@/store/favoriteStore';
import { useProperties } from '@/hooks/useProperties';
import { PropertyGrid } from '@/components/property/PropertyGrid';
import { EmptyState } from '@/components/common/EmptyState';
import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function FavoritesPage() {
  const { favorites } = useFavoriteStore();
  const { data, isLoading } = useProperties({});
  const navigate = useNavigate();

  const favoriteProperties = useMemo(() => {
    if (!data?.data) return [];
    return data.data.filter((p) => favorites.includes(p.id));
  }, [data, favorites]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-navy-900">Saved Properties</h1>
        <p className="text-navy-500 font-body mt-1">
          {favorites.length} {favorites.length === 1 ? 'property' : 'properties'} saved
        </p>
      </div>

      {favorites.length === 0 ? (
        <EmptyState
          icon={<Heart className="w-8 h-8 text-navy-300" />}
          title="No saved properties"
          message="Start exploring properties and save your favorites here."
          action={{ label: 'Browse Properties', onClick: () => navigate('/properties') }}
        />
      ) : (
        <PropertyGrid properties={favoriteProperties} isLoading={isLoading} />
      )}
    </div>
  );
}
