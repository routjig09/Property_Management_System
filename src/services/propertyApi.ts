import api, { useMockApi } from './api';
import type { Property, PropertyFilters, PaginatedResponse } from '../types';
import { mockProperties, getFeaturedProperties, getLatestProperties, searchProperties, persistArray } from '../mock';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const propertyApi = {
  getProperties: async (filters?: PropertyFilters): Promise<PaginatedResponse<Property>> => {
    if (useMockApi) {
      await delay(500);
      return searchProperties(filters || {});
    }
    const { data } = await api.get('/properties', { params: filters });
    return data;
  },

  getPropertyById: async (id: number): Promise<Property> => {
    if (useMockApi) {
      await delay(400);
      const prop = mockProperties.find(p => p.id === id);
      if (!prop) throw new Error('Property not found');
      return prop;
    }
    const { data } = await api.get(`/properties/${id}`);
    return data;
  },

  getFeaturedProperties: async (): Promise<Property[]> => {
    if (useMockApi) {
      await delay(300);
      return getFeaturedProperties();
    }
    const { data } = await api.get('/properties/featured');
    return data;
  },

  getLatestProperties: async (): Promise<Property[]> => {
    if (useMockApi) {
      await delay(300);
      return getLatestProperties();
    }
    const { data } = await api.get('/properties/latest');
    return data;
  },

  createProperty: async (propertyData: Partial<Property>): Promise<Property> => {
    if (useMockApi) {
      await delay(600);
      const newProp = {
        ...propertyData,
        id: mockProperties.length ? Math.max(...mockProperties.map(p => p.id)) + 1 : 1,
        viewCount: propertyData.viewCount ?? 0,
        favoriteCount: propertyData.favoriteCount ?? 0,
        inquiryCount: propertyData.inquiryCount ?? 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      } as Property;
      mockProperties.push(newProp);
      persistArray('properties', mockProperties);
      return newProp;
    }
    const { data } = await api.post('/properties', propertyData);
    return data;
  },

  updateProperty: async (id: number, propertyData: Partial<Property>): Promise<Property> => {
    if (useMockApi) {
      await delay(500);
      const index = mockProperties.findIndex(p => p.id === id);
      if (index === -1) throw new Error('Property not found');
      mockProperties[index] = { ...mockProperties[index], ...propertyData, updatedAt: new Date().toISOString() };
      persistArray('properties', mockProperties);
      return mockProperties[index];
    }
    const { data } = await api.put(`/properties/${id}`, propertyData);
    return data;
  },

  deleteProperty: async (id: number): Promise<void> => {
    if (useMockApi) {
      await delay(400);
      const index = mockProperties.findIndex(p => p.id === id);
      if (index > -1) mockProperties.splice(index, 1);
      persistArray('properties', mockProperties);
      return;
    }
    await api.delete(`/properties/${id}`);
  }
};
