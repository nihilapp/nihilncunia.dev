import { NextResponse } from 'next/server';
import { serverTools } from '@/api/_libs';
import { refreshCheck } from '@/api/_libs/refreshCheck'; // refreshCheck 함수 임포트
import type { ApiResponse, ApiError, RefreshApiResponse } from '@/_types'; // 필요한 타입 임포트

export async function POST() {
  try {
    // refreshCheck 함수를 사용하여 토큰 갱신 시도 (forceRefresh = true)
    const result = await refreshCheck(null, null, true);

    if (result.error) {
      // refreshCheck 내부에서 오류 발생 시
      const errorResponse: ApiError = {
        response: null,
        message: result.message,
      };

      const response = NextResponse.json(
        errorResponse,
        { status: result.status, } // refreshCheck에서 반환된 상태 코드 사용
      );

      // refreshCheck 내부에서도 쿠키를 삭제하지만,
      // 만일을 위해 응답에서도 확실히 삭제 (특히 401 오류 시)
      if (result.status === 401) {
        response.cookies.set(
          'refreshToken',
          '',
          {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 0,
            path: '/',
          }
        );
        response.cookies.set(
          'accessToken',
          '',
          {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 0,
            path: '/',
          }
        );
      }

      return response;
    }

    const newAccessTokenData = await serverTools.jwt.tokenInfo(
      'accessToken',
      result.newAccessToken!
    );

    // 토큰 갱신 성공
    const responseBody: ApiResponse<RefreshApiResponse> = {
      message: result.message, // refreshCheck의 성공 메시지 사용
      response: {
        // refreshCheck 함수는 성공 시 newAccessToken을 반환
        // 이를 클라이언트에게 전달할 access 토큰 정보로 구성
        accessToken: {
          token: result.newAccessToken!, // Non-null assertion 사용 (성공 시 항상 존재)
          // 만료 시간은 refreshCheck 내부에서 쿠키에 설정되므로, 여기서는 토큰 값만 전달
          // 필요하다면 exp 값도 전달할 수 있으나, 보통 클라이언트는 토큰 값만 필요로 함
          exp: newAccessTokenData.exp,
        },
      },
    };

    // refreshCheck 내부에서 이미 새로운 토큰들이 쿠키에 설정되었으므로,
    // 여기서는 성공 응답만 반환합니다.
    return NextResponse.json(
      responseBody,
      { status: 200, }
    );
  } catch (error: any) {
    // refreshCheck 함수 호출 자체에서 예외 발생 시 (예: 라이브러리 오류 등)
    console.error(
      '토큰 재발급 처리 중 예상치 못한 오류:',
      error
    );

    const errorResponse: ApiError = {
      response: null,
      message: '토큰 재발급 처리 중 예상치 못한 오류가 발생했습니다.',
    };

    return NextResponse.json(
      errorResponse,
      { status: 500, }
    );
  }
}
