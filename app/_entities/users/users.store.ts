import { create, type StateCreator } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import type { UserSession } from '@/_entities/users/users.types';

interface UserActions {

}

interface UserState {
  userSession: UserSession;
  actions: UserActions;
}

const createUserSlice: StateCreator<
  UserState,
  [['zustand/immer', never]]
> = (set) => ({
  userSession: null,
  actions: {
    setUserSession: (userSession: UserSession) => (
      set({ userSession, })
    ),
  },
});

const userStore = create(persist(
  immer(createUserSlice),
  {
    name: 'user-session',
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => ({ userSession: state.userSession, }),
  }
));

export const useUserSession = () => userStore((state) => state.userSession);

export const useUserActions = () => userStore((state) => state.actions);
