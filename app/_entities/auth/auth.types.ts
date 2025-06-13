import type { UserSession } from '@/_entities/users';

export interface SignUp {
  email: string;
  name: string;
  password: string;
}

export interface SignIn {
  email: string;
  password: string;
}

export interface SignOut {
  // 필요시 추가 데이터
}

export interface Refresh {
  // 필요시 추가 데이터
}

export interface AuthResponse {
  user: UserSession;
}
