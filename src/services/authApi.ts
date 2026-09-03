import api, { useMockApi } from './api';
import type { LoginCredentials, RegisterData, User } from '../types';
import { mockUserStore } from '../mock';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Mock tokens encode the user id so getCurrentUser() (and page refresh / new tabs)
 * resolve to whoever actually logged in, instead of a hardcoded account.
 * Format: "mock.<userId>" - not a real JWT, just enough to round-trip identity locally.
 */
const MOCK_TOKEN_PREFIX = 'mock.';

function encodeMockToken(userId: number): string {
  return `${MOCK_TOKEN_PREFIX}${userId}`;
}

function decodeMockToken(token: string): number | null {
  if (!token.startsWith(MOCK_TOKEN_PREFIX)) return null;
  const id = Number(token.slice(MOCK_TOKEN_PREFIX.length));
  return Number.isFinite(id) ? id : null;
}

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<{ user: User; token: string }> => {
    if (useMockApi) {
      await delay(500);
      const user = mockUserStore.verifyCredentials(credentials.email, credentials.password);
      if (!user) {
        throw new Error('Invalid email or password');
      }
      return { user, token: encodeMockToken(user.id) };
    }
    const { data } = await api.post('/auth/login', credentials);
    return data;
  },

  register: async (registerData: RegisterData): Promise<{ user: User; token: string }> => {
    if (useMockApi) {
      await delay(500);
      // registerCustomer() checks for an existing email itself and throws a clear
      // error if found - that error propagates up to the RegisterPage's catch block.
      const newUser = mockUserStore.registerCustomer({
        name: registerData.name,
        email: registerData.email,
        phone: registerData.phone,
        password: registerData.password,
      });
      return { user: newUser, token: encodeMockToken(newUser.id) };
    }
    const { data } = await api.post('/auth/register', registerData);
    return data;
  },

  logout: async (): Promise<void> => {
    if (useMockApi) {
      await delay(200);
      return;
    }
    await api.post('/auth/logout');
  },

  getCurrentUser: async (): Promise<User> => {
    if (useMockApi) {
      await delay(300);
      const token = localStorage.getItem('token') ?? '';
      const userId = decodeMockToken(token);
      const user = userId !== null ? mockUserStore.findById(userId) : undefined;
      if (!user) {
        throw new Error('Session expired. Please log in again.');
      }
      return user;
    }
    const { data } = await api.get('/auth/me');
    return data;
  }
};
