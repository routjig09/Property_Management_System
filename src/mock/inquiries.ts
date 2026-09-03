import type { Inquiry } from '../types';
import { hydrateArray } from './persist';

export const mockInquiries: Inquiry[] = [
  {
    id: 1,
    customerId: 2,
    customerName: 'Priya Sharma',
    customerEmail: 'customer@propsync.com',
    customerPhone: '9876543210',
    propertyId: 1,
    propertyTitle: 'Luxury 3BHK at Prestige Lakeside Habitat',
    message: 'I am interested in this property. Can we schedule a visit this weekend?',
    contactMethod: 'CALL',
    status: 'NEW',
    createdAt: '2023-11-25T10:00:00Z',
    updatedAt: '2023-11-25T10:00:00Z'
  },
  {
    id: 2,
    customerId: 3,
    customerName: 'Rahul Verma',
    customerEmail: 'rahul.v@example.com',
    customerPhone: '9988776655',
    propertyId: 2,
    propertyTitle: 'Premium 2BHK in Indiranagar',
    message: 'Is the rent negotiable? Also wanted to check about the pet policy.',
    contactMethod: 'WHATSAPP',
    status: 'IN_PROGRESS',
    assignedTo: 'Arjun Mehta',
    createdAt: '2023-11-24T15:30:00Z',
    updatedAt: '2023-11-25T09:15:00Z'
  }
];

// Restore inquiries submitted (or status changes made by admin) in a previous
// session - see inquiryApi.ts, which calls persistArray('inquiries', ...) on write.
hydrateArray('inquiries', mockInquiries);
