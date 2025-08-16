// ServiceName 디자인 시스템 토큰
export const designTokens = {
  // 컬러 시스템
  colors: {
    primary: {
      500: "#1D8BFF", // 메인 블루
      400: "#4DA3FF", // 라이트 블루
      600: "#1570CC", // 다크 블루
    },
    neutral: {
      900: "#333333", // 메인 텍스트
      700: "#616161", // 서브 텍스트
      500: "#919191", // 플레이스홀더
      300: "#C4C4C4", // 라인/보더
      100: "#EBEBEB", // 백그라운드 보더
      50: "#F7F7F7", // 라이트 백그라운드
      0: "#FFFFFF", // 화이트
    },
    accent: {
      red: "#FF2D55", // 할인/특가
      orange: "#FF6B35", // 알림/배지
      green: "#34C759", // 성공/확인
      yellow: "#FFCC33", // 별점
    },
    background: {
      primary: "#FFFFFF",
      secondary: "#F7F7F7",
      tertiary: "#F0F7FF", // 블루 틴트
    },
  },

  // 타이포그래피
  typography: {
    fontFamily: {
      primary:
        "'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif",
    },
    fontSize: {
      xs: "10px", // 뱃지, 라벨
      sm: "11px", // 캡션
      base: "12px", // 본문 소
      md: "13px", // 본문
      lg: "14px", // 본문 대
      xl: "16px", // 제목 소
      "2xl": "18px", // 제목
      "3xl": "20px", // 섹션 제목
      "4xl": "24px", // 페이지 제목
      "5xl": "28px", // 메인 제목 (모바일)
      "6xl": "36px", // 메인 제목 (데스크톱)
    },
    fontWeight: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
    lineHeight: {
      tight: "1.2",
      normal: "1.3",
      relaxed: "1.5",
    },
  },

  // 스페이싱
  spacing: {
    px: "1px",
    0.5: "2px",
    1: "4px",
    1.5: "6px",
    2: "8px",
    2.5: "10px",
    3: "12px",
    3.5: "14px",
    4: "16px",
    5: "20px",
    6: "24px",
    7: "28px",
    8: "32px",
    10: "40px",
    12: "48px",
    16: "64px",
    20: "80px",
    24: "96px",
  },

  // 브레이크포인트
  breakpoints: {
    mobile: "0px",
    tablet: "912px",
    desktop: "1280px",
    wide: "1440px",
  },

  // 컨테이너
  container: {
    maxWidth: "1200px",
    padding: {
      mobile: "20px",
      tablet: "40px",
    },
  },

  // 보더 & 라운드
  borderRadius: {
    none: "0",
    sm: "2px",
    DEFAULT: "4px",
    md: "6px",
    lg: "8px",
    xl: "12px",
    full: "9999px",
  },

  // 그림자
  boxShadow: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    DEFAULT: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    card: "0 2px 16px rgba(0, 0, 0, 0.08)",
    hover: "0 8px 24px rgba(0, 0, 0, 0.12)",
  },

  // Z-인덱스
  zIndex: {
    hide: -1,
    auto: "auto",
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },

  // 트랜지션
  transition: {
    duration: {
      fast: "150ms",
      normal: "300ms",
      slow: "500ms",
    },
    easing: {
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeOut: "cubic-bezier(0, 0, 0.2, 1)",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
    },
  },
};
