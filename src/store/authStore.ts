import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (phone: string, otp: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (phone: string, otp: string) => {
    // Mock login validation
    if (phone === '+989104801452' && otp === '666666') {
      const mockUser: User = {
        id: '1',
        phone,
        fullName: 'Test User',
        email: 'test@example.com',
        tokens: 100,
      };
      set({ user: mockUser, isAuthenticated: true });
    } else {
      throw new Error('Invalid credentials');
    }
  },
  logout: () => set({ user: null, isAuthenticated: false }),
}));