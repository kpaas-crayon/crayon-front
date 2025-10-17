'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

/**
 * 인증 에러 페이지
 * 
 * 로그인 과정에서 발생한 에러를 처리하는 페이지
 */
export default function AuthErrorPage() {
  const router = useRouter();

  const handleRetry = () => {
    router.push('/auth/signin');
  };

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        {/* 에러 아이콘 */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-red-100 rounded-xl flex items-center justify-center">
            <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            로그인 오류
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            로그인 과정에서 문제가 발생했습니다
          </p>
        </div>

        {/* 에러 카드 */}
        <div className="bg-white py-8 px-6 shadow-lg rounded-xl border border-gray-200">
          <div className="space-y-6">
            {/* 에러 메시지 */}
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                죄송합니다
              </h3>
              <p className="text-gray-600">
                로그인 중에 예상치 못한 오류가 발생했습니다.<br />
                다시 시도해 주시거나 잠시 후 이용해 주세요.
              </p>
            </div>

            {/* 가능한 원인들 */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-yellow-800 mb-2">
                가능한 원인:
              </h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• 네트워크 연결 문제</li>
                <li>• 구글 계정 권한 설정 문제</li>
                <li>• 서버 일시적 오류</li>
                <li>• 브라우저 캐시 문제</li>
              </ul>
            </div>

            {/* 액션 버튼들 */}
            <div className="space-y-3">
              <button
                onClick={handleRetry}
                className="w-full bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors font-medium"
              >
                다시 로그인 시도
              </button>
              
              <button
                onClick={handleGoHome}
                className="w-full border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                홈으로 돌아가기
              </button>
            </div>

            {/* 도움말 */}
            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                문제가 계속 발생하면 관리자에게 문의해 주세요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
