'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

/**
 * 로그인 버튼 컴포넌트
 * 
 * 구글 로그인 버튼을 제공합니다.
 * 로그인 상태에 따라 다른 UI를 표시합니다.
 */
export default function LoginButton() {
  const { isAuthenticated, isLoading, login } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-gray-600">로딩 중...</span>
      </div>
    );
  }

  if (isAuthenticated) {
    return null; // 로그인된 상태에서는 아무것도 표시하지 않음
  }

  return (
    <button
      onClick={login}
      className="flex items-center space-x-3 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors shadow-sm"
    >
      {/* 구글 아이콘 */}
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>
      
      <span className="text-gray-700 font-medium">구글로 로그인</span>
    </button>
  );
}
