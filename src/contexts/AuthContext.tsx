'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

/**
 * 사용자 정보 타입 정의
 */
export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  role?: string;
}

/**
 * 인증 컨텍스트 타입 정의
 */
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  backendToken: string | null;
  googleAccessToken: string | null;
}

/**
 * 인증 컨텍스트 생성
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * AuthProvider 컴포넌트
 * 
 * 인증 상태를 전역적으로 관리하고 하위 컴포넌트에서 사용할 수 있도록 제공
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [backendToken, setBackendToken] = useState<string | null>(null);
  const [googleAccessToken, setGoogleAccessToken] = useState<string | null>(null);

  const isLoading = status === 'loading';
  const isAuthenticated = !!session && !!user;

  // 세션 변경 시 사용자 정보 업데이트
  useEffect(() => {
    if (session?.user) {
      setUser({
        id: (session.user as { id?: string }).id || '',
        name: session.user.name || '',
        email: session.user.email || '',
        image: session.user.image || undefined,
        role: 'teacher', // 기본 역할을 선생님으로 설정
      });
      
      // 백엔드 토큰과 구글 액세스 토큰 저장
      if ('backendToken' in session) {
        setBackendToken(session.backendToken as string);
      }
      if ('googleAccessToken' in session) {
        setGoogleAccessToken(session.googleAccessToken as string);
      }
    } else {
      setUser(null);
      setBackendToken(null);
      setGoogleAccessToken(null);
    }
  }, [session]);

  /**
   * 구글 로그인 실행
   */
  const login = async () => {
    try {
      await signIn('google', { 
        callbackUrl: '/',
        redirect: true 
      });
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  };

  /**
   * 로그아웃 실행
   */
  const logout = async () => {
    try {
      await signOut({ 
        callbackUrl: '/',
        redirect: true 
      });
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    backendToken,
    googleAccessToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * useAuth 훅
 * 
 * 인증 컨텍스트를 쉽게 사용할 수 있도록 하는 커스텀 훅
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
