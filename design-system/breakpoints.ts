// ServiceName 반응형 브레이크포인트 시스템
export const breakpoints = {
  // 모바일 (320px ~ 767px)
  mobile: {
    min: 320,
    max: 767,
  },
  // 태블릿 (768px ~ 1023px)
  tablet: {
    min: 768,
    max: 1023,
  },
  // 데스크톱 (1024px ~ 1439px)
  desktop: {
    min: 1024,
    max: 1439,
  },
  // 와이드 데스크톱 (1440px ~)
  wide: {
    min: 1440,
    max: Infinity,
  },
};

// Tailwind CSS 브레이크포인트
export const tailwindBreakpoints = {
  sm: "640px", // 모바일 가로/작은 태블릿
  md: "768px", // 태블릿
  lg: "1024px", // 데스크톱
  xl: "1280px", // 와이드 데스크톱
  "2xl": "1536px", // 초와이드 데스크톱
};

// ServiceName 커스텀 브레이크포인트
export const yeogiBreakpoints = {
  xs: "320px", // 최소 모바일
  sm: "640px", // 모바일 가로
  md: "768px", // 태블릿
  lg: "1024px", // 데스크톱
  xl: "1200px", // ServiceName 메인 컨테이너 width
  "2xl": "1440px", // 와이드 데스크톱
};

// 컨테이너 최대 너비
export const containerWidths = {
  mobile: "100%",
  tablet: "768px",
  desktop: "1200px", // ServiceName 메인 컨테이너
  wide: "1200px", // 최대 1200px로 제한
};

// ServiceName 전용 미디어 쿼리 헬퍼
export const mediaQueries = {
  mobile: `@media (max-width: ${breakpoints.mobile.max}px)`,
  tablet: `@media (min-width: ${breakpoints.tablet.min}px) and (max-width: ${breakpoints.tablet.max}px)`,
  desktop: `@media (min-width: ${breakpoints.desktop.min}px)`,
  wide: `@media (min-width: ${breakpoints.wide.min}px)`,

  // 범위 쿼리
  mobileOnly: `@media (max-width: ${breakpoints.mobile.max}px)`,
  tabletUp: `@media (min-width: ${breakpoints.tablet.min}px)`,
  desktopUp: `@media (min-width: ${breakpoints.desktop.min}px)`,

  // 터치 디바이스
  touch: "@media (hover: none) and (pointer: coarse)",
  hover: "@media (hover: hover) and (pointer: fine)",
};

// 반응형 스페이싱
export const responsiveSpacing = {
  section: {
    mobile: "py-8",
    tablet: "py-12",
    desktop: "py-16",
  },
  container: {
    mobile: "px-4",
    tablet: "px-6",
    desktop: "px-8",
  },
  gap: {
    mobile: "gap-3",
    tablet: "gap-4",
    desktop: "gap-6",
  },
};

// 반응형 텍스트 크기
export const responsiveText = {
  heroTitle: {
    mobile: "text-[24px]",
    tablet: "text-[28px]",
    desktop: "text-[36px]",
  },
  sectionTitle: {
    mobile: "text-[18px]",
    tablet: "text-[20px]",
    desktop: "text-[24px]",
  },
  cardTitle: {
    mobile: "text-[14px]",
    tablet: "text-[14px]",
    desktop: "text-[16px]",
  },
  body: {
    mobile: "text-[13px]",
    tablet: "text-[13px]",
    desktop: "text-[14px]",
  },
};

// 반응형 그리드
export const responsiveGrids = {
  category: {
    mobile: "grid-cols-4",
    tablet: "grid-cols-6",
    desktop: "grid-cols-8",
  },
  hotel: {
    mobile: "grid-cols-1",
    tablet: "grid-cols-2",
    desktop: "grid-cols-3",
    wide: "grid-cols-4",
  },
  destination: {
    mobile: "grid-cols-2",
    tablet: "grid-cols-4",
    desktop: "grid-cols-6",
  },
};

export default {
  breakpoints,
  tailwindBreakpoints,
  yeogiBreakpoints,
  containerWidths,
  mediaQueries,
  responsiveSpacing,
  responsiveText,
  responsiveGrids,
};
