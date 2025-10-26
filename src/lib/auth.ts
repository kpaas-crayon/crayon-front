import GoogleProvider from "next-auth/providers/google";

/**
 * NextAuth 설정
 * 
 * 구글 OAuth를 통한 인증 시스템 설정
 * - Spring Boot 서버와 토큰 연동 예정
 * - Kong Gateway를 통한 FastAPI AI 서비스 연동 예정
 */
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: [
            "openid",
            "email", 
            "profile",
            "https://www.googleapis.com/auth/drive.readonly", // 구글 드라이브 읽기 권한
            "https://www.googleapis.com/auth/drive.file" // 구글 드라이브 파일 관리 권한
          ].join(" "),
        },
      },
    }),
  ],
  
  callbacks: {
    /**
     * JWT 토큰 생성 시 호출
     * Spring Boot 서버에서 받은 토큰을 저장
     */
    async jwt({ token, account, profile }: { token: Record<string, unknown>; account: Record<string, unknown> | null; profile?: Record<string, unknown> }) {
      if (account && profile) {
        // 백엔드가 없을 때 모의 데이터 사용 (개발용)
        if (!process.env.NEXT_PUBLIC_API_URL) {
          console.log('🔧 개발 모드: 모의 데이터 사용');
          token.backendToken = `mock_backend_token_${Date.now()}`;
          token.userId = `mock_user_${Date.now()}`;
          token.googleAccessToken = account.access_token;
          token.googleRefreshToken = account.refresh_token;
          return token;
        }

        // 구글 토큰을 Spring Boot 서버로 전송하여 백엔드 토큰 획득
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/google`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              googleToken: account.access_token,
              email: profile.email,
              name: profile.name,
              picture: (profile as { picture?: string }).picture,
            }),
          });
          
          if (response.ok) {
            const backendAuth = await response.json();
            token.backendToken = backendAuth.token;
            token.userId = backendAuth.userId;
            token.googleAccessToken = account.access_token;
            token.googleRefreshToken = account.refresh_token;
          }
        } catch (error) {
          console.error('백엔드 인증 실패:', error);
          // 백엔드 실패 시에도 모의 데이터로 로그인 허용
          token.backendToken = `mock_backend_token_${Date.now()}`;
          token.userId = `mock_user_${Date.now()}`;
          token.googleAccessToken = account.access_token;
          token.googleRefreshToken = account.refresh_token;
        }
      }
      
      return token;
    },
    
    /**
     * 세션 생성 시 호출
     * 클라이언트에서 사용할 수 있도록 세션 데이터 구성
     */
    async session({ session, token }: { session: Record<string, unknown>; token: Record<string, unknown> }) {
      if (token) {
        (session.user as Record<string, unknown>).id = token.userId as string;
        session.backendToken = token.backendToken as string;
        session.googleAccessToken = token.googleAccessToken as string;
        session.googleRefreshToken = token.googleRefreshToken as string;
      }
      
      return session;
    },
  },
  
  pages: {
    signIn: '/auth/signin', // 커스텀 로그인 페이지
    error: '/auth/error',   // 에러 페이지
  },
  
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60, // 30일
  },
  
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30일
  },
};

/**
 * 세션 타입 정의
 */
interface ExtendedSession {
  backendToken?: string;
  googleAccessToken?: string;
}

/**
 * API 요청 시 사용할 헤더 생성 함수
 * Kong Gateway를 통한 AI 서비스 호출 시 사용
 */
export const getAuthHeaders = (session: ExtendedSession) => {
  return {
    'Authorization': `Bearer ${session.backendToken}`,
    'X-Google-Token': session.googleAccessToken,
    'Content-Type': 'application/json',
  };
};

/**
 * 구글 드라이브 API 호출 시 사용할 헤더
 */
export const getGoogleDriveHeaders = (session: ExtendedSession) => {
  return {
    'Authorization': `Bearer ${session.googleAccessToken}`,
    'Content-Type': 'application/json',
  };
};
