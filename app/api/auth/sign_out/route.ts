import { NextRequest, NextResponse } from 'next/server';
import {
  DB, getHeaderToken, serverTools, refreshCheck
} from '@/api/_libs';
import type { ApiResponse, ApiError, SignOutUser } from '@/_types';

export async function POST(request: NextRequest) {
  let idFromBody: string;

  try {
    const { id, }: SignOutUser = await request.json();
    console.log('1. idFromBody', id);

    idFromBody = id;
  } catch (error) {
    // 요청 본문 파싱 오류 처리
    return NextResponse.json(
      { response: null, message: '잘못된 요청 형식입니다.', },
      { status: 400, }
    );
  }

  const accessToken = getHeaderToken(request);
  console.log('2. accessToken', accessToken);

  // 1. 토큰 검증 및 자동 갱신 시도
  const checkResult = await refreshCheck(idFromBody, accessToken);

  // 2. 검증/갱신 실패 시 에러 응답 반환
  if (checkResult.error) {
    const errorResponse: ApiError = {
      response: null,
      message: checkResult.message,
    };

    return NextResponse.json(errorResponse, { status: checkResult.status, });
  }

  // 3. 검증/갱신 성공 시 로그아웃 처리 진행
  try {
    // 3.1. 리프레시 토큰 쿠키 삭제
    await serverTools.cookie.remove('refreshToken');

    // 3.2. 액세스 토큰 쿠키 삭제 (refreshCheck에서 설정했을 수 있으므로)
    await serverTools.cookie.remove('accessToken');

    // 3.3. DB에 저장된 리프레시 토큰 무효화/삭제
    await DB.userAuths().update({
      where: { user_id: idFromBody, },
      data: { refresh_token: null, }, // null 또는 빈 문자열 등으로 무효화
    });

    // 3.4. 성공 응답 반환
    const successResponse: ApiResponse<null> = {
      response: null,
      message: '성공적으로 로그아웃되었습니다.',
    };

    return NextResponse.json(
      successResponse,
      { status: 200, }
    );
  } catch (error: any) {
    // 로그아웃 처리 중 DB 오류 등 발생 시
    console.error('로그아웃 처리 중 오류:', error);

    const errorResponse: ApiError = {
      response: null,
      message: '로그아웃 처리 중 오류가 발생했습니다.',
    };

    return NextResponse.json(
      errorResponse,
      { status: 500, }
    );
  }
}
