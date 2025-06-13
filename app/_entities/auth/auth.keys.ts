export const authKeys = {
  auth: [ 'auth', ] as const,
  session: () => [ ...authKeys.auth, 'session', ] as const,
  refresh: () => [ ...authKeys.auth, 'refresh', ] as const,
};
