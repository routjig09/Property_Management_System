import type { Requirement } from '../types';

export const mockRequirements: Requirement[] = [
  {
    id: 1,
    customerId: 2,
    listingType: 'SALE',
    state: 'Karnataka',
    city: 'Bangalore',
    propertyType: 'APARTMENT',
    bhk: 3,
    minBudget: 15000000,
    maxBudget: 25000000,
    status: 'ACTIVE',
    createdAt: '2023-11-20T10:00:00Z'
  },
  {
    id: 2,
    customerId: 3,
    listingType: 'RENT',
    state: 'Karnataka',
    city: 'Bangalore',
    area: 'Indiranagar',
    propertyType: 'APARTMENT',
    bhk: 2,
    minBudget: 30000,
    maxBudget: 45000,
    status: 'ACTIVE',
    createdAt: '2023-11-21T12:15:00Z'
  },
  {
    id: 3,
    customerId: 4,
    listingType: 'SALE',
    state: 'Telangana',
    city: 'Hyderabad',
    propertyType: 'VILLA',
    bhk: 4,
    minBudget: 40000000,
    maxBudget: 60000000,
    status: 'MATCHED',
    createdAt: '2023-11-15T09:30:00Z'
  }
];
