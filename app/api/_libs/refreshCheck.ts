import type { RefreshCheckResult } from '@/_entities/user-auth';
import { performTokenRefresh } from '@/api/_libs/performRefresh';
import { serverTools } from '@/api/_libs/tools';

/**
 * 액세스 토큰과 리프레시 토큰을 검증하고 필요한 경우 갱신합니다.
 * @param id 사용자 ID (API 호출 시 전달, 선택 사항)
 * @param accessToken 액세스 토큰 (API 호출 시 전달, 선택 사항)
 * @param forceRefresh 리프레시 토큰 강제 갱신 여부 (기본값: false)
 * @returns 토큰 검증 및 갱신 결과
 */
export async function refreshCheck(
  id: string | null,
  accessToken: string | null,
  forceRefresh: boolean = false
): Promise<RefreshCheckResult> {
  // --- `refreshCheck` 함수의 주 로직 시작 ---
  try {
    // 1. `forceRefresh` 플래그 확인: true이면 즉시 리프레시 로직 실행
    if (forceRefresh) {
      // `forceRefresh` 시에는 AT 검증 없이 RT 기반으로 갱신 시도
      // 원래 요청 ID(id)만 추가 검증을 위해 전달
      return await performTokenRefresh(id);
    }

    // 2. 액세스 토큰 존재 여부 확인
    if (!accessToken) {
      return {
        error: true,
        message: '액세스 토큰 정보가 없습니다.',
        status: 401,
      };
    }

    // 3. 액세스 토큰 검증
    const accessTokenData = await serverTools.jwt!.tokenInfo(
      'accessToken',
      accessToken
    );

    // 4. 사용자 ID 일치 확인 (API 호출 ID vs AT 페이로드 ID)
    // 이 로직은 performTokenRefresh 내부의 추가 검사과 유사한 역할을 합니다.
    // 필요에 따라 여기서 먼저 검사하거나, performTokenRefresh에 위임할 수 있습니다.
    if (id && accessTokenData.id !== id) {
      return {
        error: true,
        message: '사용자 정보가 일치하지 않습니다.',
        status: 401,
      };
    }

    // 5. 액세스 토큰 만료 시간 확인
    const accessTokenExpCheck = serverTools.jwt!.expCheck(accessTokenData.exp);

    if (accessTokenExpCheck > 0) {
      // 액세스 토큰이 유효한 경우
      return {
        error: false,
        message: '액세스 토큰이 유효합니다.',
        status: 200,
      };
    }

    // 6. 액세스 토큰 만료 시: 리프레시 로직 실행
    // 원래 요청 ID(id)와 만료된 AT의 ID(accessTokenData.id)를 추가 검증용으로 전달
    return await performTokenRefresh(id, accessTokenData.id);
  } catch (error: any) {
    // 액세스 토큰 검증 실패 또는 예상치 못한 오류 처리
    console.error('토큰 검증/갱신 과정 오류:', error);

    let message = '인증 처리 중 오류가 발생했습니다.';
    let status = 500; // 기본 오류 상태

    // 특정 오류 메시지(예: JWT 관련 오류)에 따라 상태 코드 조정
    if (
      error.message.includes('유효하지 않습니다') // "유효하지 않은 토큰 정보입니다." 등
      || error.message.includes('일치하지 않습니다') // 사용자/토큰 불일치
      || error.message.includes('만료되었습니다') // 토큰 만료
    ) {
      message = '유효하지 않은 토큰 정보입니다.'; // 포괄적인 메시지로 변경
      status = 401;

      // 인증 실패 시 쿠키 삭제
      await serverTools.cookie!.remove('refreshToken');
      await serverTools.cookie!.remove('accessToken');
    }

    return {
      error: true,
      message,
      status,
    };
  }
}
