
/**
 * NextAuth 모듈 확장
 * 
 * 기본 NextAuth 타입에 추가 속성을 정의합니다.
 * 구글 OAuth와 백엔드 토큰 연동을 위한 타입 확장
 */
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
    backendToken: string;
    googleAccessToken: string;
    googleRefreshToken: string;
  }

  interface User {
    id: string;
  }

  interface JWT {
    userId?: string;
    backendToken?: string;
    googleAccessToken?: string;
    googleRefreshToken?: string;
  }
}
