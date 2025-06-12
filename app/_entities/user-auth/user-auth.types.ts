import type { UserRole } from "@/_prisma/client";

// 토큰 정보
export interface TokenInfo {
  token: string;
  exp: number;
}

// JWT 토큰 데이터 (페이로드)
export interface TokenData {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  exp: number;
}

// 액세스/리프레시 토큰 쌍
export interface Tokens {
  accessToken: TokenInfo;
  refreshToken: TokenInfo;
}

// 토큰 타입
export type TokenMode = 'accessToken' | 'refreshToken';

// 로그인 요청
export interface SignInUser {
  email: string;
  password: string;
}

// 로그인 응답
export interface SignInResponse {
  message: string;
  response: {
    user: {
      id: string;
      email: string;
      name: string;
      role: UserRole;
    };
    tokens: Tokens;
  };
}

// 로그아웃 요청
export interface SignOutUser {
  id: string;
}

// 토큰 갱신 요청
export interface RefreshUserAccessToken {
  id: string;
}

// 토큰 갱신 응답
export interface RefreshApiResponse {
  accessToken: TokenInfo;
}

// 리프레시 체크 결과
export interface RefreshCheckResult {
  error: boolean;
  message: string;
  status: number;
  newAccessToken?: string;
}

// 사용자 세션 정보
export interface UserSession {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

// 인증 상태
export interface AuthState {
  isAuthenticated: boolean;
  user: UserSession | null;
  loading: boolean;
}
