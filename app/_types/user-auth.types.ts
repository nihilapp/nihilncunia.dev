export interface TokenInfo {
  token: string;
  exp: number;
}

export interface TokenData {
  id: string;
  email: string;
  role: string;
  exp: number;
}

export interface Tokens {
  accessToken: TokenInfo;
  refreshToken: TokenInfo;
}

export type TokenMode = 'accessToken' | 'refreshToken';

export interface SignInUser {
  email: string;
  password: string;
}

export interface SignOutUser {
  id: string;
}

export interface RefreshUserAccessToken {
  id: string;
}

export interface RefreshCheckResult {
  error: boolean;
  message: string;
  status: number;
  newAccessToken?: string; // 선택적으로 새 액세스 토큰 전달
}

export interface RefreshApiResponse {
  accessToken: TokenInfo;
}

export interface UserSession {
  id: string;
  email: string;
  name: string;
}
