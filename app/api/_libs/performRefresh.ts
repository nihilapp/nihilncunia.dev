import type { RefreshCheckResult, TokenData, TokenInfo } from '@/_types';
import { DB } from '@/api/_libs/prisma';
import { serverTools } from '@/api/_libs/tools';

/**
 * 리프레시 토큰을 검증하고 새로운 토큰 세트를 발급 및 저장합니다.
 * @param requestId API 호출 시 받은 사용자 ID (null일 수 있음, 추가 검증용)
 * @param userIdFromAccessToken 만료된 액세스 토큰에서 추출한 사용자 ID (선택 사항, 추가 검증용)
 * @returns 토큰 갱신 결과
 */
export async function performTokenRefresh(
  requestId: string | null, // 원래 API 요청의 ID (추가 검증용)
  userIdFromAccessToken?: string // 만료된 AT의 ID (추가 검증용)
): Promise<RefreshCheckResult> {
  // 1. 쿠키에서 리프레시 토큰 조회
  const refreshTokenInfo = await serverTools.cookie!.get<TokenInfo>('refreshToken');

  if (!refreshTokenInfo) {
    return {
      error: true,
      message: '리프레시 토큰 정보가 없습니다. 다시 로그인해주세요.',
      status: 401,
    };
  }

  const { token: refreshToken, } = refreshTokenInfo;

  // 2. 리프레시 토큰 검증 (유효성, 만료 시간)
  let refreshTokenData: TokenData;
  try {
    refreshTokenData = await serverTools.jwt!.tokenInfo(
      'refreshToken',
      refreshToken
    );

    const expCheck = serverTools.jwt!.expCheck(refreshTokenData.exp);

    if (expCheck <= 0) {
      throw new Error('리프레시 토큰이 만료되었습니다');
    }

    // --- 추가 검증 --- //
    // 검증 1: 원래 API 요청 ID (requestId)와 RT의 ID가 일치하는지 확인
    if (requestId && refreshTokenData.id !== requestId) {
      console.warn(`리프레시 토큰 사용자 불일치: 요청 ID (${requestId}) vs 토큰 ID (${refreshTokenData.id})`);
      // 정책에 따라 오류 처리 또는 로깅만 할 수 있습니다.
      // 여기서는 일단 오류로 처리하겠습니다.
      throw new Error('요청 사용자와 토큰 소유자가 일치하지 않습니다.');
    }

    // 검증 2: 만료된 AT의 ID (userIdFromAccessToken)와 RT의 ID가 일치하는지 확인
    if (userIdFromAccessToken && refreshTokenData.id !== userIdFromAccessToken) {
      console.warn(`리프레시 토큰 사용자 불일치: 액세스 토큰 ID (${userIdFromAccessToken}) vs 리프레시 토큰 ID (${refreshTokenData.id})`);
      throw new Error('액세스 토큰과 리프레시 토큰의 사용자가 일치하지 않습니다.');
    }
    // --- 추가 검증 끝 --- //
  } catch (error: any) {
    console.error('리프레시 토큰 검증 실패:', error.message);

    // 유효하지 않은 토큰 관련 쿠키 삭제
    await serverTools.cookie!.remove('refreshToken');
    await serverTools.cookie!.remove('accessToken');

    // 오류 메시지를 구분하여 반환
    let message = '유효하지 않거나 만료된 리프레시 토큰입니다.';
    if (
      error.message.includes('일치하지 않습니다')
      || error.message.includes('mismatch')
    ) {
      message = error.message;
    }

    return {
      error: true,
      message,
      status: 401,
    };
  }

  // 3. DB에서 사용자 정보 조회 (리프레시 토큰의 ID 사용 - 이것이 기준 ID)
  const user = await DB.user().findUnique({
    where: { id: refreshTokenData.id, }, // RT의 ID를 사용
  });

  if (!user) {
    // 사용자를 찾을 수 없는 경우 쿠키 삭제
    await serverTools.cookie!.remove('refreshToken');
    await serverTools.cookie!.remove('accessToken');

    return {
      error: true,
      message: '사용자 정보를 찾을 수 없습니다. 다시 로그인해주세요.',
      status: 401,
    };
  }

  // (선택적) 3.1. DB에 저장된 RT와 쿠키의 RT 비교 (더 강력한 보안)
  const userAuth = await DB.userAuth().findUnique({
    where: {
      user_id: user.id,
    },
  });

  if (!userAuth || userAuth.refresh_token !== refreshToken) {
    await serverTools.cookie!.remove('refreshToken');
    await serverTools.cookie!.remove('accessToken');

    return {
      error: true,
      message: '저장된 리프레시 토큰과 일치하지 않습니다.',
      status: 401,
    };
  }

  // 4. 새로운 토큰 세트 발급
  const newTokens = await serverTools.jwt!.genTokens(user);

  // 5. 새로운 토큰 세트 쿠키에 저장
  await serverTools.cookie!.set(
    'accessToken',
    serverTools.common!.string(newTokens.accessToken),
    newTokens.accessToken.exp
  );

  await serverTools.cookie!.set(
    'refreshToken',
    serverTools.common!.string(newTokens.refreshToken),
    newTokens.refreshToken.exp
  );

  // 6. DB에 새로운 리프레시 토큰 업데이트 (선택적)
  await DB.userAuth().update({
    where: { user_id: user.id, },
    data: { refresh_token: newTokens.refreshToken.token, },
  });

  return {
    error: false,
    message: '토큰이 성공적으로 갱신되었습니다.',
    status: 200,
    newAccessToken: newTokens.accessToken.token,
  };
}
