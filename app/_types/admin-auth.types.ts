export interface AdminTokenInfo {
  token: string;
  exp: number;
}

export interface AdminTokenData {
  id: string;
  email: string;
  name: string;
  exp: number;
}

export interface AdminTokens {
  accessToken: AdminTokenInfo;
  refreshToken: AdminTokenInfo;
}

export type AdminTokenMode = 'accessToken' | 'refreshToken';

export interface AdminSignIn {
  email: string;
  password: string;
}

export interface AdminSignOut {
  id: string;
}

export interface AdminRefreshToken {
  id: string;
}

export interface AdminRefreshCheckResult {
  error: boolean;
  message: string;
  status: number;
  newAccessToken?: string;
}

export interface AdminRefreshApiResponse {
  accessToken: AdminTokenInfo;
}

export interface AdminSession {
  id: string;
  email: string;
  name: string;
}
