export const usersKeys = {
  // users.api.ts 에 맞게 키도 만들기
  users: [ 'users', ] as const,
  all: () => [ ...usersKeys.users, 'all', ] as const,
  byId: (id: string) => [ ...usersKeys.users, 'byId', id, ] as const,
  byEmail: (email: string) => [ ...usersKeys.users, 'byEmail', email, ] as const,
  byName: (name: string) => [ ...usersKeys.users, 'byName', name, ] as const,
};
