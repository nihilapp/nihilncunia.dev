// User 타입은 필요할 때 @/_prisma/client에서 import

export interface CreateUser {
  email: string;
  name: string;
  password: string;
}

export interface UpdateUser {
  userId: string;
  name?: string;
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
