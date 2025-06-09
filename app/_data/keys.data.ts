export const userKeys = {
  list: [ 'users', 'list', ],
  detailId: (id: string) => [ 'users', 'detail', id, ],
  detailEmail: (email: string) => [ 'users', 'detail', email, ],
};

export const userAuthKeys = {
  list: [ 'user_auths', 'list', ],
  detailId: (id: string) => [ 'user_auths', 'detail', id, ],
  adminProfile: () => [ 'admin', 'profile', ],
};
