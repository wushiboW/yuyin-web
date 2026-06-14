import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { userApi, User } from '@/api/user';

interface UserState {
  user: User | null;
  access_token: string | null;
  refresh_token: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setTokens: (access_token: string, refresh_token: string) => void;
  clearAuth: () => void;
  login: (identifier: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: { username: string; password: string; email: string; phone?: string }) => Promise<void>;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      access_token: null,
      refresh_token: null,
      isLoggedIn: false,
      isLoading: false,
      error: null,

      setUser: (user) => set({ user }),

      setTokens: (access_token, refresh_token) => {
        set({ access_token, refresh_token, isLoggedIn: true });
        localStorage.setItem('yuyin-token', access_token);
      },

      clearAuth: () => {
        set({ user: null, access_token: null, refresh_token: null, isLoggedIn: false });
        localStorage.removeItem('yuyin-token');
      },

      login: async (identifier, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await userApi.login(identifier, password);
          const { user, tokens } = response;
          set({
            user,
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
            isLoggedIn: true,
            isLoading: false,
          });
          localStorage.setItem('yuyin-token', tokens.access_token);
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false });
          throw error;
        }
      },

      logout: async () => {
        set({ isLoading: true });
        try {
          await userApi.logout();
        } catch (error) {
          // Ignore logout errors, still clear local state
          console.error('Logout API error:', error);
        } finally {
          get().clearAuth();
          set({ isLoading: false });
        }
      },

      register: async (data: { username: string; password: string; email: string; phone?: string }) => {
        set({ isLoading: true, error: null });
        try {
          const response = await userApi.register(data);
          const { user, tokens } = response;
          set({
            user,
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
            isLoggedIn: true,
            isLoading: false,
          });
          localStorage.setItem('yuyin-token', tokens.access_token);
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false });
          throw error;
        }
      },
    }),
    {
      name: 'yuyin-user-storage',
      partialize: (state) => ({
        user: state.user,
        access_token: state.access_token,
        refresh_token: state.refresh_token,
        isLoggedIn: state.isLoggedIn,
      }),
    }
  )
);

export default useUserStore;
