import type { UserSession } from '@/_entities/users';
import type { UserRole } from '@/_prisma/client';

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
  userId: string;
}

export interface AuthResponse {
  user: UserSession;
}

export type TokenMode = 'accessToken' | 'refreshToken';

export interface Token {
  token: string;
  exp: number;
}

export interface Tokens {
  access: Token;
  refresh: Token;
}

export interface TokenPayload {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface TokenInfo extends TokenPayload {
  /** JWT 만료 시간 (UNIX timestamp) */
  exp: number;

  /** JWT 발급 시간 (UNIX timestamp) */
  iat: number;

  /** JWT not before (UNIX timestamp) */
  nbf: number;

  /** JWT 발급자 (issuer) */
  iss: string;

  /** JWT 대상자 (audience) */
  aud: string;

  /** JWT 주제 (subject, optional) */
  sub?: string;

  /** JWT 고유 식별자 (JWT ID, optional) */
  jti?: string;
}
