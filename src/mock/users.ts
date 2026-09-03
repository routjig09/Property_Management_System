import type { User } from '../types';

export const mockUsers: User[] = [
  {
    id: 1,
    name: 'Arjun Mehta',
    email: 'admin@propsync.com',
    role: 'ADMIN',
    status: 'ACTIVE',
    createdAt: '2023-01-01T10:00:00Z',
    lastActiveAt: '2023-11-26T15:30:00Z'
  },
  {
    id: 2,
    name: 'Priya Sharma',
    email: 'customer@propsync.com',
    phone: '9876543210',
    role: 'CUSTOMER',
    status: 'ACTIVE',
    createdAt: '2023-06-15T09:00:00Z',
    lastActiveAt: '2023-11-25T11:20:00Z'
  },
  {
    id: 3,
    name: 'Rahul Verma',
    email: 'rahul.v@example.com',
    phone: '9988776655',
    role: 'CUSTOMER',
    status: 'ACTIVE',
    createdAt: '2023-08-20T14:15:00Z'
  },
  {
    id: 4,
    name: 'Sneha Patel',
    email: 'sneha.p@example.com',
    phone: '9123456780',
    role: 'CUSTOMER',
    status: 'ACTIVE',
    createdAt: '2023-09-10T11:45:00Z'
  }
];
