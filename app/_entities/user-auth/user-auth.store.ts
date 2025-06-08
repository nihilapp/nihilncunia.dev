// user-auth 자원의 zustand store 정의
import { create, StateCreator } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface UserAuthActions {
  // 액션 메소드를 여기에 작성
}

interface UserAuthState {
  // 상태 정의를 여기에 작성
  actions: UserAuthActions;
}

const createUserAuthSlice: StateCreator<
  UserAuthState,
  [['zustand/immer', never]]
> = (_set) => ({
  // 초기 상태 설정
  actions: {
    // 액션 구현
  },
});

export const useUserAuthStore = create<UserAuthState>()(immer(createUserAuthSlice));

// 커스텀 훅 내보내기
export const useUserAuthActions = () => useUserAuthStore((state) => state.actions);
