'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from '@/contexts/AuthContext';

/**
 * 클라이언트 사이드 프로바이더 래퍼
 * 
 * 서버 컴포넌트에서 React Context를 사용할 수 없는 문제를 해결하기 위해
 * 클라이언트 컴포넌트로 감싸는 래퍼 컴포넌트입니다.
 */
interface ClientProvidersProps {
  children: React.ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <SessionProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </SessionProvider>
  );
}
