import api, { useMockApi } from './api';
import type { Inquiry, CreateInquiryData, InquiryStatus } from '../types';
import { mockInquiries, mockProperties, persistArray } from '../mock';
import { useAuthStore } from '../store/authStore';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const inquiryApi = {
  getInquiries: async (userId?: number): Promise<Inquiry[]> => {
    if (useMockApi) {
      await delay(400);
      return userId ? mockInquiries.filter(i => i.customerId === userId) : [...mockInquiries];
    }
    const { data } = await api.get('/inquiries', { params: { userId } });
    return data;
  },

  createInquiry: async (inquiryData: CreateInquiryData): Promise<Inquiry> => {
    if (useMockApi) {
      await delay(500);
      // Attach whoever is actually signed in (so the admin's Inquiries/Customers
      // views show the real person, not a hardcoded placeholder). Falls back to
      // customerId 0 for a signed-out visitor submitting a public inquiry.
      const currentUser = useAuthStore.getState().user;
      const property = mockProperties.find(p => p.id === inquiryData.propertyId);

      const newInq: Inquiry = {
        ...inquiryData,
        id: mockInquiries.length ? Math.max(...mockInquiries.map(i => i.id)) + 1 : 1,
        customerId: currentUser?.id ?? 0,
        customerName: inquiryData.name,
        customerEmail: inquiryData.email,
        customerPhone: inquiryData.phone,
        propertyTitle: property?.title ?? 'Property',
        status: 'NEW',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      mockInquiries.push(newInq);
      persistArray('inquiries', mockInquiries);
      return newInq;
    }
    const { data } = await api.post('/inquiries', inquiryData);
    return data;
  },

  updateInquiryStatus: async (id: number, status: InquiryStatus): Promise<Inquiry> => {
    if (useMockApi) {
      await delay(400);
      const inq = mockInquiries.find(i => i.id === id);
      if (!inq) throw new Error('Inquiry not found');
      inq.status = status;
      inq.updatedAt = new Date().toISOString();
      persistArray('inquiries', mockInquiries);
      return inq;
    }
    const { data } = await api.patch(`/inquiries/${id}/status`, { status });
    return data;
  },

  getInquiriesByProperty: async (propertyId: number): Promise<Inquiry[]> => {
    if (useMockApi) {
      await delay(300);
      return mockInquiries.filter(i => i.propertyId === propertyId);
    }
    const { data } = await api.get(`/properties/${propertyId}/inquiries`);
    return data;
  }
};
