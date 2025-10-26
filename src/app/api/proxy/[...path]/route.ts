/**
 * API 프록시 라우트 핸들러
 * 
 * Vercel에 배포된 백엔드 API로 요청을 프록시합니다.
 * 모든 HTTP 메서드를 지원하며, 헤더와 바디를 적절히 전달합니다.
 * 
 * 사용법:
 * - GET /api/proxy/students -> API_BASE_URL/students
 * - POST /api/proxy/auth/login -> API_BASE_URL/auth/login
 * - PUT /api/proxy/records/123 -> API_BASE_URL/records/123
 */

const API_BASE = process.env.API_BASE_URL!;

export async function GET(_: Request, ctx: { params: { path: string[] } }) {
  return forward('GET', ctx.params.path, _);
}

export async function POST(req: Request, ctx: { params: { path: string[] } }) {
  return forward('POST', ctx.params.path, req);
}

export async function PUT(req: Request, ctx: { params: { path: string[] } }) {
  return forward('PUT', ctx.params.path, req);
}

export async function PATCH(req: Request, ctx: { params: { path: string[] } }) {
  return forward('PATCH', ctx.params.path, req);
}

export async function DELETE(req: Request, ctx: { params: { path: string[] } }) {
  return forward('DELETE', ctx.params.path, req);
}

export async function OPTIONS(req: Request, ctx: { params: { path: string[] } }) {
  return forward('OPTIONS', ctx.params.path, req);
}

/**
 * 백엔드 API로 요청을 전달하는 함수
 * 
 * @param method HTTP 메서드
 * @param segments URL 경로 세그먼트 배열
 * @param req 원본 요청 객체
 * @returns 프록시된 응답
 */
async function forward(method: string, segments: string[], req: Request) {
  try {
    const path = segments.join('/');
    const url = `${API_BASE}/${path}`;

    // 헤더 복사 (Host 제거)
    const headers = new Headers(req.headers);
    headers.delete('host');

    // 비밀 토큰 주입 (환경변수에 설정된 경우)
    if (process.env.API_TOKEN) {
      headers.set('authorization', `Bearer ${process.env.API_TOKEN}`);
    }

    // Content-Type 설정 (POST, PUT, PATCH의 경우)
    if (['POST', 'PUT', 'PATCH'].includes(method) && !headers.get('content-type')) {
      headers.set('content-type', 'application/json');
    }

    // GET/HEAD는 body 없음
    const body = ['GET', 'HEAD'].includes(method) ? undefined : await req.arrayBuffer();

    console.log(`🔄 프록시 요청: ${method} ${url}`);

    const response = await fetch(url, { 
      method, 
      headers, 
      body,
      // 타임아웃 설정 (30초)
      signal: AbortSignal.timeout(30000)
    });

    // 응답 헤더 복사 (문제가 될 수 있는 헤더 제거)
    const responseHeaders = new Headers(response.headers);
    ['content-encoding', 'content-length', 'transfer-encoding', 'connection'].forEach(h => 
      responseHeaders.delete(h)
    );

    // CORS 헤더 추가
    responseHeaders.set('Access-Control-Allow-Origin', '*');
    responseHeaders.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    responseHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    console.log(`✅ 프록시 응답: ${response.status} ${url}`);

    return new Response(await response.arrayBuffer(), { 
      status: response.status, 
      statusText: response.statusText,
      headers: responseHeaders 
    });

  } catch (error) {
    console.error('❌ 프록시 오류:', error);
    
    // 에러 응답
    return new Response(
      JSON.stringify({ 
        error: 'API 프록시 오류', 
        message: error instanceof Error ? error.message : '알 수 없는 오류',
        timestamp: new Date().toISOString()
      }), 
      { 
        status: 500, 
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        } 
      }
    );
  }
}
