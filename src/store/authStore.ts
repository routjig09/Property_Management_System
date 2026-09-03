import { create } from 'zustand';
import type { User, LoginCredentials, RegisterData } from '../types';
import { authApi } from '../services';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
  isAdmin: () => boolean;
  isCustomer: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  login: async (credentials) => {
    const { user, token } = await authApi.login(credentials);
    localStorage.setItem('token', token);
    set({ user, isAuthenticated: true });
  },

  register: async (data) => {
    const { user, token } = await authApi.register(data);
    localStorage.setItem('token', token);
    set({ user, isAuthenticated: true });
  },

  logout: () => {
    authApi.logout();
    localStorage.removeItem('token');
    set({ user: null, isAuthenticated: false });
  },

  checkAuth: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      set({ isLoading: false });
      return;
    }
    try {
      const user = await authApi.getCurrentUser();
      set({ user, isAuthenticated: true });
    } catch {
      localStorage.removeItem('token');
    } finally {
      set({ isLoading: false });
    }
  },

  isAdmin: () => {
    const user = get().user;
    return user?.role === 'ADMIN';
  },

  isCustomer: () => {
    const user = get().user;
    return user?.role === 'CUSTOMER';
  }
}));
