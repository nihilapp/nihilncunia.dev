declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_ACCESS_TOKEN_SECRET: string;
    NEXT_PUBLIC_REFRESH_TOKEN_SECRET: string;
    NEXT_PUBLIC_ACCESS_TOKEN_EXPIRE_TIME: string;
    NEXT_PUBLIC_REFRESH_TOKEN_EXPIRE_TIME: string;
  }
}
