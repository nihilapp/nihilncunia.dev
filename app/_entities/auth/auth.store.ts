import { create, StateCreator } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import type { UserSession } from '@/_entities/user-auth';

interface AuthActions {
  setUserSession: (userSession: UserSession | null) => void;
}

interface AuthState {
  userSession: UserSession | null;
  actions: AuthActions;
}

const createAuthSlice: StateCreator<
  AuthState,
  [['zustand/immer', never]]
> = (set) => ({
  userSession: null,
  actions: {
    setUserSession: (userSession: UserSession | null) => set((state) => {
      state.userSession = userSession;
    }),
  },
});

const useAuthStore = create<AuthState>()(persist(
  immer(createAuthSlice),
  {
    name: 'auth-storage',
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => ({ userSession: state.userSession, }),
  }
));

export const useUserSession = () => useAuthStore((state) => state.userSession);

export const useAuthActions = () => useAuthStore((state) => state.actions);
