// ServiceName 컬러 시스템
export const yeogiColors = {
  // Primary Colors (메인 브랜드 컬러)
  primary: {
    DEFAULT: "#FF1C7D",
    hover: "#E6006C",
    light: "#FFE5EC",
    50: "#FFE5EC",
    100: "#FFD1E0",
    200: "#FFB3CF",
    300: "#FF8CB8",
    400: "#FF5C9C",
    500: "#FF1C7D",
    600: "#E6006C",
    700: "#CC0061",
    800: "#B30055",
    900: "#99004A",
  },

  // Secondary Colors (서브 컬러)
  secondary: {
    DEFAULT: "#2D3748",
    50: "#F7FAFC",
    100: "#EDF2F7",
    200: "#E2E8F0",
    300: "#CBD5E0",
    400: "#A0AEC0",
    500: "#718096",
    600: "#4A5568",
    700: "#2D3748",
    800: "#1A202C",
    900: "#171923",
  },

  // Accent Colors (액센트 컬러)
  accent: {
    DEFAULT: "#38B2AC",
    50: "#E6FFFA",
    100: "#B2F5EA",
    200: "#81E6D9",
    300: "#4FD1C5",
    400: "#38B2AC",
    500: "#319795",
    600: "#2C7A7B",
    700: "#285E61",
    800: "#234E52",
    900: "#1D4044",
  },

  // Semantic Colors (의미적 컬러)
  semantic: {
    success: "#48BB78",
    warning: "#F6AD55",
    error: "#FC8181",
    info: "#FF1C7D",
  },

  // Neutral Colors (중성 컬러 - 그레이)
  neutral: {
    0: "#FFFFFF",
    50: "#F7FAFC",
    100: "#F7FAFC",
    200: "#EDF2F7",
    300: "#E2E8F0",
    400: "#CBD5E0",
    500: "#A0AEC0",
    600: "#718096",
    700: "#4A5568",
    800: "#2D3748",
    900: "#1A202C",
  },

  // Background Colors (백그라운드 컬러)
  background: {
    primary: "#FFFFFF",
    secondary: "#F7FAFC",
    tertiary: "#FFE5EC", // primary-light
    card: "#FFFFFF",
    overlay: "#00000080",
  },

  // Border Colors (보더 컬러)
  border: {
    light: "#E2E8F0",
    medium: "#CBD5E0",
    dark: "#A0AEC0",
    focus: "#FF1C7D",
  },

  // Text Colors (텍스트 컬러)
  text: {
    primary: "#1A202C", // gray-900
    secondary: "#4A5568", // gray-700
    muted: "#A0AEC0", // gray-500
    inverse: "#FFFFFF",
    link: "#FF1C7D",
    brand: "#FF1C7D",
  },
};

// CSS Custom Properties 생성 함수
export function generateCSSVariables() {
  const cssVars: Record<string, string> = {};

  // Primary colors
  cssVars["--primary"] = yeogiColors.primary.DEFAULT;
  cssVars["--primary-hover"] = yeogiColors.primary.hover;
  cssVars["--primary-light"] = yeogiColors.primary.light;
  Object.entries(yeogiColors.primary).forEach(([key, value]) => {
    if (typeof value === "string" && !["DEFAULT", "hover", "light"].includes(key)) {
      cssVars[`--primary-${key}`] = value;
    }
  });

  // Secondary colors
  cssVars["--secondary"] = yeogiColors.secondary.DEFAULT;
  Object.entries(yeogiColors.secondary).forEach(([key, value]) => {
    if (typeof value === "string" && key !== "DEFAULT") {
      cssVars[`--secondary-${key}`] = value;
    }
  });

  // Accent color
  cssVars["--accent"] = yeogiColors.accent.DEFAULT;

  // Semantic colors
  cssVars["--success"] = yeogiColors.semantic.success;
  cssVars["--warning"] = yeogiColors.semantic.warning;
  cssVars["--error"] = yeogiColors.semantic.error;

  // Gray scale
  Object.entries(yeogiColors.neutral).forEach(([key, value]) => {
    if (key === "0") {
      cssVars["--white"] = value;
    } else {
      cssVars[`--gray-${key}`] = value;
    }
  });

  return cssVars;
}

// Tailwind CSS 컬러 확장
export const tailwindColors = {
  primary: yeogiColors.primary,
  secondary: yeogiColors.secondary,
  accent: yeogiColors.accent,
  success: yeogiColors.semantic.success,
  warning: yeogiColors.semantic.warning,
  error: yeogiColors.semantic.error,
  gray: yeogiColors.neutral,
  white: yeogiColors.neutral[0],
};