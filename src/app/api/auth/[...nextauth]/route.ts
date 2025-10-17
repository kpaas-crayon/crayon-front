import NextAuth from "next-auth/next";
import { authOptions } from "@/lib/auth";

/**
 * NextAuth API 라우트 핸들러
 * 
 * 모든 인증 관련 요청을 처리합니다:
 * - /api/auth/signin
 * - /api/auth/signout  
 * - /api/auth/callback/google
 * - /api/auth/session
 * - /api/auth/csrf
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handler = NextAuth(authOptions as any);

export { handler as GET, handler as POST };
