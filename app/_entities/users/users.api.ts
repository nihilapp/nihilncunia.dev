import { Api } from '@/_libs';
import type { User } from '@/_prisma/client';
import type {
  CreateUser, UpdateUser, UpdateUserImage, UpdateUserPassword
} from '@/_types';

export class UsersApi {
  static async getAll() {
    return Api.getQuery<User[]>('/users');
  }

  static async getById(id: string) {
    return Api.getQuery<User>(`/users/${id}`);
  }

  static async getByEmail(email: string) {
    return Api.getQuery<User>(`/users/email/${email}`);
  }

  static async create(data: CreateUser) {
    return Api.postQuery<User, CreateUser>(
      '/users',
      data
    );
  }

  static async update(id: string, data: UpdateUser) {
    return Api.putQuery<User, UpdateUser>(
      `/users/${id}`,
      data
    );
  }

  static async delete(id: string) {
    return Api.deleteQuery<User>(`/users/${id}`);
  }

  static async deleteMany(ids: string[]) {
    return Api.deletesQuery<User, string[]>(
      `/users`,
      ids
    );
  }

  static async updatePassword(id: string, data: UpdateUserPassword) {
    return Api.putQuery<User, UpdateUserPassword>(
      `/users/${id}/password`,
      data
    );
  }

  static async updateImage(id: string, data: UpdateUserImage) {
    return Api.putQuery<User, UpdateUserImage>(
      `/users/${id}/image`,
      data
    );
  }
}
