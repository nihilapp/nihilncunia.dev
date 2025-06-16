import type { User, UserRole } from '@/_prisma/client';

export interface UserEx extends User {
  accessToken: string;
  accessTokenExp: number;
}

export interface CreateUser {
  email: string;
  username: string;
  role: UserRole;
  password: string;
}

export interface UpdateUser {
  username?: string;
  role?: UserRole;
}

export interface UpdateUserPassword {
  password: string;
  newPassword: string;
}

export interface UpdateUserIamge {
  image_url?: string;
}

export interface DeleteUser {
  id: string;
}

export interface DeleteUsers {
  ids: string[];
}

export interface DeleteUsersResponse {
  count: number;
}
