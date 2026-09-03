import api, { useMockApi } from './api';
import type { Activity } from '../types';
import { mockActivities } from '../mock';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface DashboardStats {
  totalUsers: number;
  totalProperties: number;
  totalInquiries: number;
  activeListings: number;
}

export interface AnalyticsData {
  labels: string[];
  data: number[];
}

export const adminApi = {
  getDashboardStats: async (): Promise<DashboardStats> => {
    if (useMockApi) {
      await delay(400);
      return {
        totalUsers: 150,
        totalProperties: 45,
        totalInquiries: 120,
        activeListings: 38
      };
    }
    const { data } = await api.get('/admin/stats');
    return data;
  },

  getActivities: async (): Promise<Activity[]> => {
    if (useMockApi) {
      await delay(300);
      return [...mockActivities];
    }
    const { data } = await api.get('/admin/activities');
    return data;
  },

  getAnalyticsData: async (): Promise<AnalyticsData> => {
    if (useMockApi) {
      await delay(400);
      return {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        data: [12, 19, 3, 5, 2, 3]
      };
    }
    const { data } = await api.get('/admin/analytics');
    return data;
  }
};
