import type { User, UserRole } from '@/_prisma/client';

export interface UserSession extends User {
  accessToken: string;
}

export interface CreateUser {
  email: string;
  name: string;
  role: UserRole;
  image_url?: string;
  password: string;
}

export interface UpdateUser {
  email?: string;
  name?: string;
  role?: UserRole;
}

export interface UpdateUserPassword {
  oldPassword: string;
  newPassword: string;
}

export interface UpdateUserImage {
  image_url: string;
}

export interface DeleteUser {
  id: string;
}

export interface DeleteUsers {
  ids: string[];
}
