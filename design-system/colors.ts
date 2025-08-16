// ServiceName 컬러 시스템
export const yeogiColors = {
  // Primary Colors (메인 브랜드 컬러)
  primary: {
    50: "#F0F7FF", // 매우 밝은 블루 (백그라운드)
    100: "#E0EFFF", // 밝은 블루
    200: "#B6DFFF", //
    300: "#84CCFF", //
    400: "#4DA3FF", // 라이트 블루 (호버)
    500: "#1D8BFF", // 메인 블루 (Primary)
    600: "#0066CC", // 다크 블루 (Active)
    700: "#0052A3", //
    800: "#003D7A", //
    900: "#002952", // 가장 어두운 블루
  },

  // Neutral Colors (중성 컬러)
  neutral: {
    0: "#FFFFFF", // 순백
    50: "#F7F7F7", // 라이트 백그라운드
    100: "#EBEBEB", // 보더/구분선
    200: "#D4D4D4", //
    300: "#C4C4C4", // 라인/비활성 보더
    400: "#A3A3A3", //
    500: "#919191", // 플레이스홀더/비활성 텍스트
    600: "#737373", //
    700: "#616161", // 서브 텍스트
    800: "#404040", //
    900: "#333333", // 메인 텍스트 (거의 검정)
    950: "#1A1A1A", // 가장 어두운 텍스트
  },

  // Accent Colors (액센트 컬러)
  accent: {
    red: {
      50: "#FFF0F0",
      100: "#FFE0E1",
      500: "#FF2D55", // 할인/특가 메인
      600: "#E6194B",
      900: "#B30F3A",
    },
    orange: {
      50: "#FFF5F0",
      100: "#FFE8D6",
      500: "#FF6B35", // 알림/배지
      600: "#E6521C",
      900: "#B33F15",
    },
    green: {
      50: "#F0FDF4",
      100: "#E1F5EA",
      500: "#34C759", // 성공/확인
      600: "#22C55E",
      900: "#166534",
    },
    yellow: {
      50: "#FFFBEB",
      100: "#FEF3C7",
      500: "#FFCC33", // 별점 메인
      600: "#F59E0B",
      900: "#92400E",
    },
  },

  // Semantic Colors (의미적 컬러)
  semantic: {
    success: "#34C759",
    warning: "#FF6B35",
    error: "#FF2D55",
    info: "#1D8BFF",
  },

  // Background Colors (백그라운드 컬러)
  background: {
    primary: "#FFFFFF", // 메인 백그라운드
    secondary: "#F7F7F7", // 섹션 백그라운드
    tertiary: "#F0F7FF", // 블루 틴트 백그라운드
    card: "#FFFFFF", // 카드 백그라운드
    overlay: "#00000080", // 오버레이 (50% 투명도)
  },

  // Border Colors (보더 컬러)
  border: {
    light: "#EBEBEB", // 라이트 보더
    medium: "#C4C4C4", // 미디엄 보더
    dark: "#919191", // 다크 보더
    focus: "#1D8BFF", // 포커스 보더
  },

  // Text Colors (텍스트 컬러)
  text: {
    primary: "#333333", // 메인 텍스트
    secondary: "#616161", // 서브 텍스트
    muted: "#919191", // 비활성/플레이스홀더
    inverse: "#FFFFFF", // 역방향 (어두운 배경용)
    link: "#1D8BFF", // 링크
    brand: "#1D8BFF", // 브랜드 컬러 텍스트
  },
};

// CSS Custom Properties 생성 함수
export function generateCSSVariables() {
  const cssVars: Record<string, string> = {};

  // Primary colors
  Object.entries(yeogiColors.primary).forEach(([key, value]) => {
    cssVars[`--color-primary-${key}`] = value;
  });

  // Neutral colors
  Object.entries(yeogiColors.neutral).forEach(([key, value]) => {
    cssVars[`--color-neutral-${key}`] = value;
  });

  // Accent colors
  Object.entries(yeogiColors.accent).forEach(([colorName, shades]) => {
    if (typeof shades === "object") {
      Object.entries(shades).forEach(([shade, value]) => {
        cssVars[`--color-${colorName}-${shade}`] = value;
      });
    } else {
      cssVars[`--color-accent-${colorName}`] = shades;
    }
  });

  // Semantic colors
  Object.entries(yeogiColors.semantic).forEach(([key, value]) => {
    cssVars[`--color-${key}`] = value;
  });

  // Background colors
  Object.entries(yeogiColors.background).forEach(([key, value]) => {
    cssVars[`--color-bg-${key}`] = value;
  });

  // Border colors
  Object.entries(yeogiColors.border).forEach(([key, value]) => {
    cssVars[`--color-border-${key}`] = value;
  });

  // Text colors
  Object.entries(yeogiColors.text).forEach(([key, value]) => {
    cssVars[`--color-text-${key}`] = value;
  });

  return cssVars;
}

// Tailwind CSS 컬러 확장
export const tailwindColors = {
  yeogi: {
    primary: yeogiColors.primary,
    neutral: yeogiColors.neutral,
    red: yeogiColors.accent.red,
    orange: yeogiColors.accent.orange,
    green: yeogiColors.accent.green,
    yellow: yeogiColors.accent.yellow,
  },
  // 자주 사용되는 컬러 단축키
  "yeogi-blue": yeogiColors.primary[500],
  "yeogi-blue-light": yeogiColors.primary[400],
  "yeogi-blue-dark": yeogiColors.primary[600],
  "yeogi-red": yeogiColors.accent.red[500],
  "yeogi-text": yeogiColors.text.primary,
  "yeogi-text-muted": yeogiColors.text.muted,
  "yeogi-bg": yeogiColors.background.primary,
  "yeogi-bg-secondary": yeogiColors.background.secondary,
};
