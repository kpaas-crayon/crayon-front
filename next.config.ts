import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel 배포 최적화 설정
  output: 'standalone',
  
  // 이미지 최적화 설정
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // 압축 설정
  compress: true,
  
  // 실험적 기능 (필요시)
  experimental: {
    // optimizePackageImports: ['@heroicons/react', 'lucide-react'],
  },
  
  // 환경변수 설정
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  // 리다이렉트 설정 (필요시)
  async redirects() {
    return [
      // 예시: 이전 URL에서 새 URL로 리다이렉트
      // {
      //   source: '/old-page',
      //   destination: '/new-page',
      //   permanent: true,
      // },
    ];
  },
  
  // 리라이트 설정 (필요시)
  async rewrites() {
    return [
      // 예시: API 프록시
      // {
      //   source: '/api/:path*',
      //   destination: 'https://api.example.com/:path*',
      // },
    ];
  },
};

export default nextConfig;
