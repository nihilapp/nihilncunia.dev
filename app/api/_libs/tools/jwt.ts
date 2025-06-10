import { jwtVerify, SignJWT } from 'jose';

import {
  type TokenMode,
  type TokenData,
  type Tokens
} from '@/_entities/user-auth';
import { User } from '@/_prisma/client';

export class Jwt {
  // 비밀 키 설정
  public async setSecret(secret: string) {
    return new TextEncoder()
      .encode(secret);
  }

  // 토큰 만료 시간 형식 검증 및 변환
  private validateExpireTime(expireTime: string | undefined, defaultValue: string): string {
    if (!expireTime) {
      return defaultValue;
    }

    // JWT에서 허용하는 형식인지 확인 (예: 1h, 30m, 7d, 또는 숫자)
    const validTimePattern = /^(\d+)([smhd]?)$|^(\d+)$/;

    if (validTimePattern.test(expireTime)) {
      return expireTime;
    }

    // 잘못된 형식이면 기본값 사용
    console.warn(`잘못된 토큰 만료 시간 형식: ${expireTime}, 기본값 사용: ${defaultValue}`);
    return defaultValue;
  }

  // 토큰 생성
  public async genTokens(user: User): Promise<Tokens> {
    const {
      id, email, name,
    } = user;

    const tokenPayload = {
      id, email, name,
    };

    const accessTokenSecret = await this.setSecret(process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET);
    const refreshTokenSecret = await this.setSecret(process.env.NEXT_PUBLIC_REFRESH_TOKEN_SECRET);

    // 환경 변수에서 만료 시간을 가져오고 올바른 형식으로 변환
    console.log('DEBUG - 환경 변수 값:', {
      access: process.env.NEXT_PUBLIC_ACCESS_TOKEN_EXPIRE_TIME,
      refresh: process.env.NEXT_PUBLIC_REFRESH_TOKEN_EXPIRE_TIME,
    });

    const accessTokenExpire = this.validateExpireTime(
      process.env.NEXT_PUBLIC_ACCESS_TOKEN_EXPIRE_TIME,
      '1h'
    );
    const refreshTokenExpire = this.validateExpireTime(
      process.env.NEXT_PUBLIC_REFRESH_TOKEN_EXPIRE_TIME,
      '30d'
    );

    console.log('DEBUG - 변환된 값:', {
      access: accessTokenExpire,
      refresh: refreshTokenExpire,
    });

    const accessToken = await new SignJWT(tokenPayload)
      .setProtectedHeader({ alg: 'HS256', })
      .setIssuedAt()
      .setExpirationTime(accessTokenExpire)
      .sign(accessTokenSecret);

    const refreshToken = await new SignJWT(tokenPayload)
      .setProtectedHeader({ alg: 'HS256', })
      .setIssuedAt()
      .setExpirationTime(refreshTokenExpire)
      .sign(refreshTokenSecret);

    // 생성된 토큰의 실제 만료 시간(exp) 확인
    // const info = await this.tokenInfo(mode, token);
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
    mode: TokenMode,
    token: string
  ): Promise<TokenData> {
    const secretString = mode === 'accessToken'
      ? process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET
      : process.env.NEXT_PUBLIC_REFRESH_TOKEN_SECRET;

    const secret = await this.setSecret(secretString);

    try {
      const { payload, } = await jwtVerify(
        token,
        secret,
        {
          algorithms: [ 'HS256', ],
        }
      );

      return payload as unknown as TokenData;
    } catch (error: any) {
      console.error(
        `${mode} 토큰 검증 실패:`,
        error.message
      );

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
