import React from 'react';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';

export default function GradesPage() {
  return (
    <MainLayout>
      <div className="p-6 sm:p-8">
        <header className="mb-8">
          <nav className="text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-primary-500">홈</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">성적 관리</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            성적 관리
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            학생들의 성적을 체계적으로 관리하고 분석해보세요.
          </p>
        </header>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">성적 관리 시스템</h3>
          <p className="text-gray-600 mb-6">곧 출시 예정입니다</p>
          
          {/* 🔧 개발 모드: 테스트용 네비게이션 버튼들 */}
          <div className="space-y-3">
            <div className="text-sm text-gray-500 mb-4">🔧 개발 모드 - 테스트용 네비게이션</div>
            <div className="grid grid-cols-2 gap-3">
              <Link 
                href="/students" 
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm"
              >
                학생 관리
              </Link>
              <Link 
                href="/attendance" 
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm"
              >
                출석 관리
              </Link>
              <Link 
                href="/documents" 
                className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors text-sm"
              >
                문서 관리
              </Link>
              <Link 
                href="/records" 
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors text-sm"
              >
                기록 관리
              </Link>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <button className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors">
                알림 신청
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}