import type { User, UserRole } from '../types';
import { mockUsers as seedUsers } from './users';

/**
 * A lightweight, persisted stand-in for a real backend user table - used only while
 * VITE_USE_MOCK_API=true. It solves three things the previous mock layer didn't:
 *
 *   1. Registered users are actually saved (to localStorage), so logging back in
 *      with the same email/password works after a refresh or a new tab.
 *   2. Every user has their own password, checked per-account - not two shared
 *      literal strings ('admin123' / 'password123') that any email could use.
 *   3. There is exactly one ADMIN account, seeded once, with no code path that can
 *      ever create a second one - registration always produces a CUSTOMER.
 *
 * When the real Spring Boot backend is wired up (VITE_USE_MOCK_API=false), this
 * entire file becomes dead code - the backend's BCrypt-hashed Postgres `users`
 * table takes over identically, and authApi.ts's real-API branches call it instead.
 */

interface StoredUser extends User {
  /** Demo-only: plaintext in localStorage. A real backend must hash this (see PropSync's BCryptPasswordEncoder). */
  password: string;
}

const USERS_KEY = 'propsync_mock_users_v1';

const DEFAULT_PASSWORD = 'password123';
const ADMIN_PASSWORD = 'admin123';

function seedIfEmpty(): StoredUser[] {
  const raw = localStorage.getItem(USERS_KEY);
  if (raw) {
    try {
      return JSON.parse(raw) as StoredUser[];
    } catch {
      // fall through and reseed on corrupt data
    }
  }

  const seeded: StoredUser[] = seedUsers.map((u) => ({
    ...u,
    password: u.role === 'ADMIN' ? ADMIN_PASSWORD : DEFAULT_PASSWORD,
  }));

  localStorage.setItem(USERS_KEY, JSON.stringify(seeded));
  return seeded;
}

function readAll(): StoredUser[] {
  return seedIfEmpty();
}

function writeAll(users: StoredUser[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function stripPassword(u: StoredUser): User {
  const { password: _password, ...user } = u;
  return user;
}

export const mockUserStore = {
  getAll(): User[] {
    return readAll().map(stripPassword);
  },

  getAllCustomers(): User[] {
    return this.getAll().filter((u) => u.role === 'CUSTOMER');
  },

  updateStatus(id: number, status: User['status']): User {
    const users = readAll();
    const found = users.find((u) => u.id === id);
    if (!found) throw new Error('User not found');
    found.status = status;
    writeAll(users);
    return stripPassword(found);
  },

  findByEmail(email: string): StoredUser | undefined {
    const normalized = email.trim().toLowerCase();
    return readAll().find((u) => u.email.toLowerCase() === normalized);
  },

  findById(id: number): User | undefined {
    const found = readAll().find((u) => u.id === id);
    return found ? stripPassword(found) : undefined;
  },

  existsByEmail(email: string): boolean {
    return !!this.findByEmail(email);
  },

  verifyCredentials(email: string, password: string): User | null {
    const found = this.findByEmail(email);
    if (!found || found.password !== password) return null;
    if (found.status === 'DISABLED') {
      throw new Error('This account has been disabled. Contact an administrator.');
    }
    return stripPassword(found);
  },

  /**
   * Registration ALWAYS creates a CUSTOMER. There is no parameter for `role` here on
   * purpose - the single ADMIN account only ever comes from the seed data above, so
   * there is no code path anywhere in the app that can mint a second admin.
   */
  registerCustomer(input: { name: string; email: string; phone: string; password: string }): User {
    if (this.existsByEmail(input.email)) {
      throw new Error('An account with this email already exists. Please log in instead.');
    }

    const users = readAll();
    const role: UserRole = 'CUSTOMER';
    const newUser: StoredUser = {
      id: users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1,
      name: input.name,
      email: input.email.trim().toLowerCase(),
      phone: input.phone,
      role,
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
      password: input.password,
    };

    users.push(newUser);
    writeAll(users);

    return stripPassword(newUser);
  },
};
