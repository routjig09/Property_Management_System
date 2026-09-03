import api, { useMockApi } from './api';
import type { Favorite } from '../types';
import { mockFavorites, persistArray } from '../mock';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const favoriteApi = {
  getFavorites: async (userId: number): Promise<Favorite[]> => {
    if (useMockApi) {
      await delay(300);
      return mockFavorites.filter(f => f.userId === userId);
    }
    const { data } = await api.get(`/users/${userId}/favorites`);
    return data;
  },

  addFavorite: async (userId: number, propertyId: number): Promise<Favorite> => {
    if (useMockApi) {
      await delay(300);
      const fav: Favorite = { id: Date.now(), userId, propertyId, createdAt: new Date().toISOString() };
      mockFavorites.push(fav);
      persistArray('favorites', mockFavorites);
      return fav;
    }
    const { data } = await api.post(`/users/${userId}/favorites`, { propertyId });
    return data;
  },

  removeFavorite: async (userId: number, propertyId: number): Promise<void> => {
    if (useMockApi) {
      await delay(300);
      const idx = mockFavorites.findIndex(f => f.userId === userId && f.propertyId === propertyId);
      if (idx > -1) mockFavorites.splice(idx, 1);
      persistArray('favorites', mockFavorites);
      return;
    }
    await api.delete(`/users/${userId}/favorites/${propertyId}`);
  },

  isFavorite: async (userId: number, propertyId: number): Promise<boolean> => {
    if (useMockApi) {
      await delay(100);
      return mockFavorites.some(f => f.userId === userId && f.propertyId === propertyId);
    }
    const { data } = await api.get(`/users/${userId}/favorites/${propertyId}/check`);
    return data.isFavorite;
  }
};
