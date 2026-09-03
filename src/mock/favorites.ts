import type { Favorite } from '../types';
import { hydrateArray } from './persist';

export const mockFavorites: Favorite[] = [
  { id: 1, userId: 2, propertyId: 1, createdAt: '2023-11-20T10:00:00Z' },
  { id: 2, userId: 2, propertyId: 3, createdAt: '2023-11-22T14:30:00Z' },
  { id: 3, userId: 2, propertyId: 9, createdAt: '2023-11-24T09:10:00Z' },
  { id: 4, userId: 3, propertyId: 2, createdAt: '2023-11-18T11:20:00Z' },
  { id: 5, userId: 3, propertyId: 11, createdAt: '2023-11-23T16:45:00Z' },
  { id: 6, userId: 4, propertyId: 5, createdAt: '2023-11-19T08:05:00Z' },
];

hydrateArray('favorites', mockFavorites);
