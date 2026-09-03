import { useFavoriteStore } from '../store/favoriteStore';
import { useAuthStore } from '../store/authStore';
import { useCallback } from 'react';

export const useFavorites = () => {
  const user = useAuthStore(state => state.user);
  const store = useFavoriteStore();

  const toggleFavorite = useCallback(async (propertyId: number) => {
    if (!user) {
      // Could throw or show toast to login
      return;
    }
    await store.toggleFavorite(user.id, propertyId);
  }, [user, store]);

  return {
    favorites: store.favorites,
    isLoading: store.isLoading,
    toggleFavorite,
    isFavorite: store.isFavorite,
    favoriteCount: store.favoriteCount(),
    loadFavorites: () => user && store.loadFavorites(user.id)
  };
};
