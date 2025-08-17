import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'image.goodchoice.kr',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.goodchoice.kr',
        pathname: '/**',
      },
    ],
  },
  // eslint: {
  //   // 빌드 시 ESLint 에러를 무시 (개발용 템플릿이므로)
  //   ignoreDuringBuilds: true,
  // },
  // typescript: {
  //   // 빌드 시 TypeScript 에러를 무시 (개발용 템플릿이므로)
  //   ignoreBuildErrors: false, // 필요시 true로 변경
  // },
};

export default nextConfig;
