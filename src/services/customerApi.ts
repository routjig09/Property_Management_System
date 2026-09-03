import api, { useMockApi } from './api';
import type { User, UserStatus } from '../types';
import { mockUserStore } from '../mock';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const customerApi = {
  getCustomers: async (): Promise<User[]> => {
    if (useMockApi) {
      await delay(400);
      // Reads the live, localStorage-persisted user store - so anyone who has
      // signed up through the real registration flow shows up here, not just
      // the hardcoded seed accounts.
      return mockUserStore.getAllCustomers();
    }
    const { data } = await api.get('/customers');
    return data;
  },

  getCustomerById: async (id: number): Promise<User> => {
    if (useMockApi) {
      await delay(300);
      const user = mockUserStore.findById(id);
      if (!user || user.role !== 'CUSTOMER') throw new Error('Customer not found');
      return user;
    }
    const { data } = await api.get(`/customers/${id}`);
    return data;
  },

  updateCustomerStatus: async (id: number, status: UserStatus): Promise<User> => {
    if (useMockApi) {
      await delay(400);
      return mockUserStore.updateStatus(id, status);
    }
    const { data } = await api.patch(`/customers/${id}/status`, { status });
    return data;
  }
};
