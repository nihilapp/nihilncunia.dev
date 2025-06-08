import { cookies } from 'next/headers';

import { serverTools } from '@/api/_libs/tools';

export class Cookie {
  static async store() {
    const cookieStore = await cookies();
    return cookieStore;
  }

  public async set(name: string, value: string, expiresAt: number) {
    (await Cookie.store()).set(
      name,
      value,
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: expiresAt,
      }
    );
  }

  public async get<T>(name: string): Promise<T | null> {
    const cookieStore = await Cookie.store();
    const cookie = cookieStore.get(name);

    if (!cookie) {
      return null;
    }

    return serverTools.common.parse<T>(cookie.value);
  }

  public async remove(name: string) {
    (await Cookie.store()).set(
      name,
      '',
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 0,
      }
    );
  }
}
