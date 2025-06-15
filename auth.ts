import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { DB } from '@/api/_libs';
import { serverTools } from '@/api/_libs';

// NextAuth 타입 확장
declare module 'next-auth' {
  interface User {
    role?: string
  }

  interface Session {
    user: {
      id: string
      email?: string | null
      name?: string | null
      image?: string | null
      role?: string
    }
  }
}

export const { handlers, auth, signIn, signOut, } = NextAuth({
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: {
          label: '이메일',
          type: 'email',
          placeholder: '이메일을 입력하세요',
        },
        password: {
          label: '비밀번호',
          type: 'password',
          placeholder: '비밀번호를 입력하세요',
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // 사용자 조회
          const findUser = await DB.user().findUnique({
            where: {
              email: credentials.email as string,
            },
          });

          if (!findUser) {
            return null;
          }

          // 비밀번호 검증
          const isValidPassword = await serverTools.bcrypt!.dataCompare(
            findUser.password,
            credentials.password as string
          );

          if (!isValidPassword) {
            return null;
          }

          // 사용자 정보 반환 (비밀번호 제외)
          return {
            id: findUser.id,
            email: findUser.email,
            name: findUser.username,
            image: findUser.image,
            role: findUser.role,
          };
        } catch (error) {
          console.error('인증 오류:', error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60, // 1시간 (3600초)
    updateAge: 24 * 60 * 60, // 24시간마다 세션 업데이트
  },
  jwt: {
    maxAge: 60 * 60, // 1시간 (3600초)
  },
  callbacks: {
    async jwt({ token, user, trigger, }) {
      // 수동 업데이트 트리거 처리
      if (trigger === 'update') {
        // 사용자 정보를 다시 조회하여 토큰 갱신
        try {
          const findUser = await DB.user().findUnique({
            where: { id: token.sub, },
          });

          if (findUser) {
            token.role = findUser.role;
            token.name = findUser.username;
            token.email = findUser.email;
          }
        } catch (error) {
          console.error('토큰 갱신 오류:', error);
        }
      }

      if (user?.role) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token, }) {
      if (token?.sub) {
        session.user.id = token.sub;
        if (token.role) {
          session.user.role = token.role as string;
        }
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
});
