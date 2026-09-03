import type { Activity } from '../types';

export const mockActivities: Activity[] = [
  { id: 1, type: 'LOGIN', userId: 1, userName: 'Arjun Mehta', description: 'Admin logged in successfully', timestamp: '2023-11-26T15:30:00Z' },
  { id: 2, type: 'LOGIN', userId: 2, userName: 'Priya Sharma', description: 'Logged in', timestamp: '2023-11-25T09:40:00Z' },
  {
    id: 3, type: 'INQUIRY_CREATED', userId: 2, userName: 'Priya Sharma',
    description: 'Submitted a new inquiry for Luxury 3BHK at Prestige Lakeside Habitat',
    entityId: 1, entityType: 'INQUIRY', timestamp: '2023-11-25T10:00:00Z'
  },
  {
    id: 4, type: 'PROPERTY_FAVORITED', userId: 2, userName: 'Priya Sharma',
    description: 'Added Modern Villa in Jubilee Hills to favorites',
    entityId: 3, entityType: 'PROPERTY', timestamp: '2023-11-22T14:30:00Z'
  },
  {
    id: 5, type: 'PROPERTY_FAVORITED', userId: 2, userName: 'Priya Sharma',
    description: 'Added a property in Koramangala to favorites',
    entityId: 1, entityType: 'PROPERTY', timestamp: '2023-11-20T10:00:00Z'
  },
  {
    id: 6, type: 'REQUIREMENT_SUBMITTED', userId: 2, userName: 'Priya Sharma',
    description: 'Submitted a requirement for a 3 BHK apartment in Bangalore (₹1.5Cr–₹2.5Cr)',
    entityId: 1, entityType: 'USER', timestamp: '2023-11-20T10:05:00Z'
  },
  {
    id: 7, type: 'PROPERTY_VIEW', userId: 2, userName: 'Priya Sharma',
    description: 'Viewed Luxury 3BHK at Prestige Lakeside Habitat',
    entityId: 1, entityType: 'PROPERTY', timestamp: '2023-11-25T09:55:00Z'
  },
  { id: 8, type: 'LOGIN', userId: 3, userName: 'Rahul Verma', description: 'Logged in', timestamp: '2023-11-24T15:10:00Z' },
  {
    id: 9, type: 'INQUIRY_CREATED', userId: 3, userName: 'Rahul Verma',
    description: 'Submitted a new inquiry for Premium 2BHK in Indiranagar',
    entityId: 2, entityType: 'INQUIRY', timestamp: '2023-11-24T15:30:00Z'
  },
  {
    id: 10, type: 'PROPERTY_FAVORITED', userId: 3, userName: 'Rahul Verma',
    description: 'Added Premium 2BHK in Indiranagar to favorites',
    entityId: 2, entityType: 'PROPERTY', timestamp: '2023-11-18T11:20:00Z'
  },
  {
    id: 11, type: 'REQUIREMENT_SUBMITTED', userId: 3, userName: 'Rahul Verma',
    description: 'Submitted a requirement for a 2 BHK rental in Indiranagar (₹30k–₹45k/month)',
    entityId: 3, entityType: 'USER', timestamp: '2023-11-21T12:15:00Z'
  },
  { id: 12, type: 'USER_REGISTERED', userId: 4, userName: 'Sneha Patel', description: 'Created a new customer account', timestamp: '2023-11-10T08:00:00Z' },
  { id: 13, type: 'LOGIN', userId: 4, userName: 'Sneha Patel', description: 'Logged in', timestamp: '2023-11-19T07:50:00Z' },
  {
    id: 14, type: 'PROPERTY_FAVORITED', userId: 4, userName: 'Sneha Patel',
    description: 'Added a villa in Hitech City to favorites',
    entityId: 5, entityType: 'PROPERTY', timestamp: '2023-11-19T08:05:00Z'
  },
  {
    id: 15, type: 'REQUIREMENT_SUBMITTED', userId: 4, userName: 'Sneha Patel',
    description: 'Submitted a requirement for a 4 BHK villa in Hyderabad (₹4Cr–₹6Cr)',
    entityId: 4, entityType: 'USER', timestamp: '2023-11-15T09:30:00Z'
  },
  { id: 16, type: 'LOGIN', userId: 1, userName: 'Arjun Mehta', description: 'Admin logged in successfully', timestamp: '2023-11-24T08:15:00Z' },
  {
    id: 17, type: 'PROPERTY_PUBLISHED', userId: 1, userName: 'Arjun Mehta',
    description: 'Published Luxury 3BHK at Prestige Lakeside Habitat',
    entityId: 1, entityType: 'PROPERTY', timestamp: '2023-11-23T11:00:00Z'
  },
];
