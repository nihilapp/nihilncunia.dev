import type { CreateUser, DeleteUser, DeleteUsers, DeletesUsersResponse, UpdateUser, UpdateUserImage, UpdateUserPassword } from '@/_entities/users';
import { Api } from '@/_libs';
import type { User } from '@/_prisma/client';

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

  static async getByUsername(name: string) {
    return Api.getQuery<User>(`/users/name/${name}`);
  }

  static async create(createUser: CreateUser) {
    return Api.postQuery<User, CreateUser>(
      '/users',
      createUser
    );
  }

  static async update(id: string, updateUser: UpdateUser) {
    return Api.putQuery<User, UpdateUser>(
      `/users/${id}`,
      updateUser
    );
  }

  static async updatePassword(id: string, updateUserPassword: UpdateUserPassword) {
    return Api.putQuery<User, UpdateUserPassword>(
      `/users/${id}/password`,
      updateUserPassword
    );
  }

  static async updateImage(id: string, updateUserImage: UpdateUserImage) {
    return Api.putQuery<User, UpdateUserImage>(
      `/users/${id}/image`,
      updateUserImage
    );
  }

  static async delete(deleteUser: DeleteUser) {
    return Api.deleteWithDataQuery<null, DeleteUser>(
      `/users/${deleteUser.id}`,
      deleteUser
    );
  }

  static async deleteMany(deleteUsers: DeleteUsers) {
    return Api.deletesQuery<null, DeleteUsers>(
      `/users`,
      deleteUsers
    );
  }
}
