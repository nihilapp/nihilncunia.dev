// users 자원의 리액트 쿼리 키 정의
export const usersKeys = {
  all: [ 'users', ] as const,
  lists: () => [ ...usersKeys.all, 'list', ] as const,
  list: (filters: string) => [ ...usersKeys.lists(), { filters, }, ] as const,
  details: () => [ ...usersKeys.all, 'detail', ] as const,
  detail: (id: string) => [ ...usersKeys.details(), id, ] as const,
};
