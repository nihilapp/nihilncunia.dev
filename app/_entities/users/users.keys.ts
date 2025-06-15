export const usersKeys = {
  users: [ 'users', ] as const,
  all: () => [ ...usersKeys.users, ] as const,
  byId: (id: string) => [ ...usersKeys.users, 'byId', id, ] as const,
  byEmail: (email: string) => [ ...usersKeys.users, 'byEmail', email, ] as const,
};
