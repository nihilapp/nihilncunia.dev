import { NextRequest, NextResponse } from 'next/server';

// CORS 설정
const ALLOWED_ORIGINS = [
  'https://nihilncunia.dev',
  'https://www.nihilncunia.dev',
  'http://localhost:3000',
  'http://localhost:3001',
];

const ALLOWED_METHODS = [ 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', ];

const ALLOWED_HEADERS = [
  'Content-Type',
  'Authorization',
  'X-Requested-With',
  'Accept',
  'Origin',
];

// CORS 미들웨어
export function corsMiddleware(request: NextRequest): NextResponse | null {
  const origin = request.headers.get('origin');
  const method = request.method;

  // Preflight 요청 처리
  if (method === 'OPTIONS') {
    const response = new NextResponse(null, { status: 200, });

    if (origin && ALLOWED_ORIGINS.includes(origin)) {
      response.headers.set('Access-Control-Allow-Origin', origin);
    }

    response.headers.set('Access-Control-Allow-Methods', ALLOWED_METHODS.join(', '));
    response.headers.set('Access-Control-Allow-Headers', ALLOWED_HEADERS.join(', '));
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    response.headers.set('Access-Control-Max-Age', '86400');

    return response;
  }

  return null;
}

// CORS 헤더 설정
export function setCorsHeaders(response: NextResponse, origin?: string | null): void {
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
  }

  response.headers.set('Access-Control-Allow-Credentials', 'true');
}

// XSS 보호 헤더 설정
export function setSecurityHeaders(response: NextResponse): void {
  // XSS 보호
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Content Security Policy
  response.headers.set(
    'Content-Security-Policy',
    'default-src \'self\'; script-src \'self\' \'unsafe-inline\' \'unsafe-eval\'; style-src \'self\' \'unsafe-inline\'; img-src \'self\' data: https:; font-src \'self\' data:; connect-src \'self\';'
  );

  // HTTP Strict Transport Security (HTTPS 환경에서만)
  if (process.env.NODE_ENV === 'production') {
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  }
}

// API 요청 유효성 검사
export function validateApiRequest(request: NextRequest): {
  isValid: boolean;
  error?: string;
} {
  const contentType = request.headers.get('content-type');
  const method = request.method;

  // POST, PUT 요청에 대한 Content-Type 검증
  if ([ 'POST', 'PUT', ].includes(method)) {
    if (!contentType || !contentType.includes('application/json')) {
      return {
        isValid: false,
        error: 'Content-Type은 application/json이어야 합니다.',
      };
    }
  }

  // User-Agent 확인 (봇 차단)
  const userAgent = request.headers.get('user-agent');
  if (!userAgent) {
    return {
      isValid: false,
      error: '유효하지 않은 요청입니다.',
    };
  }

  // 요청 크기 제한 확인
  const contentLength = request.headers.get('content-length');
  if (contentLength && parseInt(contentLength) > 10 * 1024 * 1024) { // 10MB 제한
    return {
      isValid: false,
      error: '요청 크기가 너무 큽니다.',
    };
  }

  return { isValid: true, };
}

// CSRF 토큰 생성
export function generateCSRFToken(): string {
  return crypto.randomUUID();
}

// CSRF 토큰 검증
export function validateCSRFToken(
  request: NextRequest,
  excludeMethods: string[] = [ 'GET', 'HEAD', 'OPTIONS', ]
): boolean {
  if (excludeMethods.includes(request.method)) {
    return true;
  }

  const tokenFromHeader = request.headers.get('x-csrf-token');
  const tokenFromCookie = request.cookies.get('csrf-token')?.value;

  return tokenFromHeader === tokenFromCookie && !!tokenFromHeader;
}

// 통합 보안 미들웨어
export function applySecurityMiddleware(
  request: NextRequest,
  options: {
    enableCSRF?: boolean;
    enableCORS?: boolean;
    enableValidation?: boolean;
  } = {}
): { response?: NextResponse; error?: string } {
  const {
    enableCSRF = false,
    enableCORS = true,
    enableValidation = true,
  } = options;

  // CORS 처리
  if (enableCORS) {
    const corsResponse = corsMiddleware(request);
    if (corsResponse) {
      return { response: corsResponse, };
    }
  }

  // API 요청 유효성 검사
  if (enableValidation) {
    const validation = validateApiRequest(request);
    if (!validation.isValid) {
      return { error: validation.error, };
    }
  }

  // CSRF 토큰 검증
  if (enableCSRF) {
    const isValidCSRF = validateCSRFToken(request);
    if (!isValidCSRF) {
      return { error: 'CSRF 토큰이 유효하지 않습니다.', };
    }
  }

  return {};
}

// 에러 응답 생성 헬퍼
export function createSecurityErrorResponse(
  message: string,
  status: number = 400
): NextResponse {
  const response = NextResponse.json(
    {
      success: false,
      message,
      response: null,
    },
    { status, }
  );

  setSecurityHeaders(response);
  return response;
}

// 성공 응답에 보안 헤더 적용 헬퍼
export function createSecureResponse(
  data: any,
  status: number = 200,
  origin?: string | null
): NextResponse {
  const response = NextResponse.json(data, { status, });

  setSecurityHeaders(response);
  setCorsHeaders(response, origin);

  return response;
}
