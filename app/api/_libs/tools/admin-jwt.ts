import { jwtVerify, SignJWT } from 'jose';

import { Admin } from '@/_prisma/client';
import {
  type AdminTokenMode,
  type AdminTokenData,
  type AdminTokens
} from '@/_types/admin-auth.types';

export class AdminJwt {
  // 비밀 키 설정
  public async setSecret(secret: string) {
    return new TextEncoder().encode(secret);
  }

  // 토큰 생성
  public async genTokens(admin: Admin): Promise<AdminTokens> {
    const { id, email, name, } = admin;

    const tokenPayload = {
      id,
      email,
      name,
    };

    const accessTokenSecret = await this.setSecret(process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET!);

    const refreshTokenSecret = await this.setSecret(process.env.NEXT_PUBLIC_REFRESH_TOKEN_SECRET!);

    const accessToken = await new SignJWT(tokenPayload)
      .setProtectedHeader({ alg: 'HS256', })
      .setIssuedAt()
      .setExpirationTime(process.env.NEXT_PUBLIC_ACCESS_TOKEN_EXPIRE_TIME!)
      .sign(accessTokenSecret);

    const refreshToken = await new SignJWT(tokenPayload)
      .setProtectedHeader({ alg: 'HS256', })
      .setIssuedAt()
      .setExpirationTime(process.env.NEXT_PUBLIC_REFRESH_TOKEN_EXPIRE_TIME!)
      .sign(refreshTokenSecret);

    // 생성된 토큰의 실제 만료 시간(exp) 확인
    const accessTokenInfo = await this.tokenInfo('accessToken', accessToken);
    const refreshTokenInfo = await this.tokenInfo('refreshToken', refreshToken);

    return {
      accessToken: {
        token: accessToken,
        exp: accessTokenInfo.exp,
      },
      refreshToken: {
        token: refreshToken,
        exp: refreshTokenInfo.exp,
      },
    };
  }

  // 토큰 정보 (페이로드) 조회 및 검증
  public async tokenInfo(
    mode: AdminTokenMode,
    token: string
  ): Promise<AdminTokenData> {
    const secretString =
      mode === 'accessToken'
        ? process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET!
        : process.env.NEXT_PUBLIC_REFRESH_TOKEN_SECRET!;

    const secret = await this.setSecret(secretString);

    try {
      const { payload, } = await jwtVerify(token, secret, {
        algorithms: [ 'HS256', ],
      });

      return payload as unknown as AdminTokenData;
    } catch (error: any) {
      console.error(`${mode} 토큰 검증 실패:`, error.message);

      throw new Error(`${mode} 토큰이 유효하지 않습니다.`);
    }
  }

  // 토큰 만료까지 남은 시간 계산 (초 단위)
  public expCheck(expTime: number): number {
    const now = Math.floor(Date.now() / 1000);
    const diff = Math.floor(expTime) - now;

    return diff;
  }
}
