import type { User, UserRole } from '@/_prisma/client';
import type { TokenInfo } from '@/_types/user-auth.types';

export interface CreateUser {
  email: string;
  name?: string;
  role?: UserRole;
  password: string;
}

export interface UpdateUser {
  userId: string;
  name?: string;
  role?: UserRole;
}

export interface UpdateUserPassword {
  oldPassword: string;
  newPassword: string;
}

export interface UpdateUserImage {
  image: string;
}

export interface DeleteUsers {
  ids: string[];
}

export interface UserSession extends User {
  access_token: TokenInfo;
}
