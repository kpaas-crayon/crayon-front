'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAVIGATION_ITEMS } from '@/constants';
import { useAuth } from '@/contexts/AuthContext';
import LoginButton from '@/components/auth/LoginButton';
import UserProfile from '@/components/auth/UserProfile';
import MobileMenu from './MobileMenu';

/**
 * 상단 네비게이션 바 컴포넌트
 * 
 * 기능:
 * - 로고 및 서비스명 표시
 * - 메인 네비게이션 메뉴 (로그인 시에만 표시)
 * - 사용자 정보 및 알림 (로그인 시)
 * - 로그인/로그아웃 버튼 (미로그인 시)
 * - 반응형 디자인 지원
 */
const Header: React.FC = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, isLoading } = useAuth();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 w-full flex-shrink-0 fixed top-0 left-0 right-0 z-50 shadow-sm">
      <div className="mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* 로고 및 메뉴 */}
          <div className="flex items-center space-x-8">
            {/* 로고 */}
            <Link href="/" className="flex items-center hover:opacity-80 transition-opacity cursor-pointer">
              <img 
                src="/images/pencil-logo.png" 
                alt="로고" 
                className="w-8 h-8 rounded-full mr-2 shadow-sm"
              />
              <h1 className="text-lg font-bold">크레파스 - AI도우미</h1>
            </Link>
            
            {/* 네비게이션 메뉴 (로그인 시 또는 개발 모드에서 표시) */}
            {(isAuthenticated || process.env.NODE_ENV === 'development') && (
              <nav className="hidden md:flex items-center space-x-6">
                {NAVIGATION_ITEMS.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`text-sm font-semibold ${
                        isActive
                          ? 'text-primary-500 border-b-2 border-primary-500 pb-1'
                          : 'text-gray-600 hover:text-primary-500'
                      }`}
                    >
                      {item.title}
                    </Link>
                  );
                })}
              </nav>
            )}
          </div>
          
          {/* 우측 영역 - 로그인 상태에 따라 다른 UI 표시 */}
          <div className="flex items-center space-x-4">
            {isLoading ? (
              // 로딩 중
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm text-gray-600">로딩 중...</span>
              </div>
            ) : (isAuthenticated || process.env.NODE_ENV === 'development') ? (
              // 로그인된 상태 또는 개발 모드
              <>
                <button className="text-gray-500 hover:text-gray-800 transition-colors">
                  <i className="fas fa-bell"></i>
                </button>
                <UserProfile />
              </>
            ) : (
              // 로그인되지 않은 상태
              <LoginButton />
            )}
          </div>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </header>
  );
};

export default Header;
