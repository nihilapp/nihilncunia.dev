export { UsersApi, AdminApi } from './users.api';

export { useGetUsers } from './hooks/useGetUsers';
export { useGetUserById } from './hooks/useGetUserById';
export { useGetUserByEmail } from './hooks/useGetUserByEmail';
export { useCreateUser } from './hooks/useCreateUser';
export { useUpdateUser } from './hooks/useUpdateUser';
export { useUpdatePassword } from './hooks/useUpdatePassword';
export { useUpdateImage } from './hooks/useUpdateImage';
export { useDeleteUser } from './hooks/useDeleteUser';
export { useDeleteManyUsers } from './hooks/useDeleteManyUsers';

// 관리자 hooks
export { useGetAdminProfile } from './hooks/useGetAdminProfile';
export { useUpdateAdminProfile } from './hooks/useUpdateAdminProfile';
export { useChangeAdminPassword } from './hooks/useChangeAdminPassword';

// 타입 exports
export type {
  CreateUser,
  UpdateUser,
  UpdateUserPassword,
  UpdateUserImage,
  DeleteUsers,
  UserEx,
  AdminProfileResponse,
  AdminProfileUpdateRequest,
  AdminPasswordChangeRequest
} from './users.types';
