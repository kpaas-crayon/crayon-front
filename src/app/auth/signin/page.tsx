'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

/**
 * 커스텀 로그인 페이지
 * 
 * 구글 OAuth를 통한 로그인을 위한 전용 페이지
 */
export default function SignInPage() {
  const { isAuthenticated, isLoading, login } = useAuth();
  const router = useRouter();

  // 이미 로그인된 경우 홈으로 리다이렉트
  React.useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-600">로딩 중...</span>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return null; // 리다이렉트 중
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        {/* 로고 및 제목 */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-primary-500 rounded-xl flex items-center justify-center">
            <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            AI 학교 행정 자동화 도우미
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            교사님만을 위한 스마트한 업무 관리 시스템
          </p>
        </div>

        {/* 로그인 카드 */}
        <div className="bg-white py-8 px-6 shadow-lg rounded-xl border border-gray-200">
          <div className="space-y-6">
            {/* 환영 메시지 */}
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                환영합니다!
              </h3>
              <p className="text-gray-600">
                구글 계정으로 로그인하여 시작하세요
              </p>
            </div>

            {/* 구글 로그인 버튼 */}
            <button
              onClick={login}
              className="w-full flex items-center justify-center space-x-3 bg-white border-2 border-gray-300 rounded-lg px-6 py-3 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 shadow-sm"
            >
              {/* 구글 아이콘 */}
              <svg className="w-6 h-6" viewBox="0 0 24 24">
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
              
              <span className="text-gray-700 font-medium text-lg">
                구글로 로그인
              </span>
            </button>

            {/* 서비스 소개 */}
            <div className="space-y-3 pt-4 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-900">이 서비스로 할 수 있는 것들:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>AI 기반 수행평가 자동 채점</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>생활기록부 자동 작성</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>출석 관리 및 분석</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>구글 드라이브 연동</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 푸터 */}
        <div className="text-center text-xs text-gray-500">
          <p>로그인 시 서비스 이용약관 및 개인정보처리방침에 동의하는 것으로 간주됩니다.</p>
        </div>
      </div>
    </div>
  );
}
