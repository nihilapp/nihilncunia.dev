// users 자원의 리액트 쿼리 키 정의
export const usersKeys = {
  all: [ 'users', ] as const,
  list: () => [ ...usersKeys.all, 'list', ] as const,
  detail: (id: string) => [ ...usersKeys.all, 'detail', id, ] as const,
};
