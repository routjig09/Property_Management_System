import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { favoriteApi } from '../services';

interface FavoriteState {
  favorites: number[];
  isLoading: boolean;
  loadFavorites: (userId: number) => Promise<void>;
  toggleFavorite: (userId: number, propertyId: number) => Promise<void>;
  isFavorite: (propertyId: number) => boolean;
  favoriteCount: () => number;
}

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favorites: [],
      isLoading: false,

      loadFavorites: async (userId: number) => {
        set({ isLoading: true });
        try {
          const favs = await favoriteApi.getFavorites(userId);
          set({ favorites: favs.map(f => f.propertyId) });
        } finally {
          set({ isLoading: false });
        }
      },

      toggleFavorite: async (userId: number, propertyId: number) => {
        const isFav = get().isFavorite(propertyId);
        if (isFav) {
          set(state => ({ favorites: state.favorites.filter(id => id !== propertyId) }));
          await favoriteApi.removeFavorite(userId, propertyId);
        } else {
          set(state => ({ favorites: [...state.favorites, propertyId] }));
          await favoriteApi.addFavorite(userId, propertyId);
        }
      },

      isFavorite: (propertyId: number) => {
        return get().favorites.includes(propertyId);
      },

      favoriteCount: () => {
        return get().favorites.length;
      }
    }),
    {
      name: 'propsync-favorites',
      partialize: (state) => ({ favorites: state.favorites }),
    }
  )
);
