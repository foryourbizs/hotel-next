// ServiceName 컴포넌트 스타일 정의
import { designTokens } from "./tokens";

export const componentStyles = {
  // 버튼 시스템
  button: {
    base: {
      fontFamily: designTokens.typography.fontFamily.primary,
      fontWeight: designTokens.typography.fontWeight.medium,
      borderRadius: designTokens.borderRadius.DEFAULT,
      transition: `all ${designTokens.transition.duration.fast} ${designTokens.transition.easing.easeInOut}`,
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      border: "none",
      outline: "none",
    },
    variants: {
      primary: {
        backgroundColor: designTokens.colors.primary[500],
        color: designTokens.colors.neutral[0],
        "&:hover": {
          backgroundColor: designTokens.colors.primary[600],
        },
        "&:active": {
          backgroundColor: designTokens.colors.primary[600],
          transform: "translateY(1px)",
        },
      },
      secondary: {
        backgroundColor: designTokens.colors.neutral[100],
        color: designTokens.colors.neutral[700],
        "&:hover": {
          backgroundColor: designTokens.colors.neutral[300],
        },
      },
      ghost: {
        backgroundColor: "transparent",
        color: designTokens.colors.neutral[700],
        "&:hover": {
          backgroundColor: designTokens.colors.neutral[50],
        },
      },
    },
    sizes: {
      sm: {
        fontSize: designTokens.typography.fontSize.sm,
        padding: `${designTokens.spacing[2]} ${designTokens.spacing[3]}`,
        height: "32px",
      },
      md: {
        fontSize: designTokens.typography.fontSize.md,
        padding: `${designTokens.spacing[3]} ${designTokens.spacing[4]}`,
        height: "40px",
      },
      lg: {
        fontSize: designTokens.typography.fontSize.lg,
        padding: `${designTokens.spacing[3]} ${designTokens.spacing[6]}`,
        height: "48px",
      },
    },
  },

  // 카드 시스템
  card: {
    base: {
      backgroundColor: designTokens.colors.background.primary,
      borderRadius: designTokens.borderRadius.DEFAULT,
      border: `1px solid ${designTokens.colors.neutral[100]}`,
      overflow: "hidden",
      transition: `all ${designTokens.transition.duration.normal} ${designTokens.transition.easing.easeInOut}`,
    },
    variants: {
      default: {
        boxShadow: designTokens.boxShadow.sm,
        "&:hover": {
          boxShadow: designTokens.boxShadow.card,
          transform: "translateY(-2px)",
        },
      },
      elevated: {
        boxShadow: designTokens.boxShadow.card,
        "&:hover": {
          boxShadow: designTokens.boxShadow.hover,
          transform: "translateY(-4px)",
        },
      },
    },
  },

  // 인풋 시스템
  input: {
    base: {
      fontFamily: designTokens.typography.fontFamily.primary,
      fontSize: designTokens.typography.fontSize.lg,
      padding: `${designTokens.spacing[3]} ${designTokens.spacing[4]}`,
      border: `1px solid ${designTokens.colors.neutral[100]}`,
      borderRadius: designTokens.borderRadius.DEFAULT,
      backgroundColor: designTokens.colors.background.primary,
      color: designTokens.colors.neutral[900],
      outline: "none",
      transition: `all ${designTokens.transition.duration.fast} ${designTokens.transition.easing.easeInOut}`,
      "&::placeholder": {
        color: designTokens.colors.neutral[500],
      },
      "&:focus": {
        borderColor: designTokens.colors.primary[500],
        boxShadow: `0 0 0 2px ${designTokens.colors.primary[500]}20`,
      },
    },
  },

  // 뱃지 시스템
  badge: {
    base: {
      fontSize: designTokens.typography.fontSize.xs,
      fontWeight: designTokens.typography.fontWeight.bold,
      padding: `${designTokens.spacing[0.5]} ${designTokens.spacing[1.5]}`,
      borderRadius: designTokens.borderRadius.sm,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      lineHeight: "1",
    },
    variants: {
      primary: {
        backgroundColor: designTokens.colors.primary[500],
        color: designTokens.colors.neutral[0],
      },
      secondary: {
        backgroundColor: designTokens.colors.neutral[100],
        color: designTokens.colors.neutral[700],
      },
      success: {
        backgroundColor: designTokens.colors.accent.green,
        color: designTokens.colors.neutral[0],
      },
      warning: {
        backgroundColor: designTokens.colors.accent.orange,
        color: designTokens.colors.neutral[0],
      },
      error: {
        backgroundColor: designTokens.colors.accent.red,
        color: designTokens.colors.neutral[0],
      },
    },
  },

  // 텍스트 시스템
  text: {
    variants: {
      h1: {
        fontSize: designTokens.typography.fontSize["6xl"],
        fontWeight: designTokens.typography.fontWeight.bold,
        lineHeight: designTokens.typography.lineHeight.tight,
        color: designTokens.colors.neutral[900],
      },
      h2: {
        fontSize: designTokens.typography.fontSize["4xl"],
        fontWeight: designTokens.typography.fontWeight.bold,
        lineHeight: designTokens.typography.lineHeight.tight,
        color: designTokens.colors.neutral[900],
      },
      h3: {
        fontSize: designTokens.typography.fontSize["3xl"],
        fontWeight: designTokens.typography.fontWeight.bold,
        lineHeight: designTokens.typography.lineHeight.normal,
        color: designTokens.colors.neutral[900],
      },
      body: {
        fontSize: designTokens.typography.fontSize.md,
        fontWeight: designTokens.typography.fontWeight.normal,
        lineHeight: designTokens.typography.lineHeight.relaxed,
        color: designTokens.colors.neutral[700],
      },
      caption: {
        fontSize: designTokens.typography.fontSize.sm,
        fontWeight: designTokens.typography.fontWeight.normal,
        lineHeight: designTokens.typography.lineHeight.normal,
        color: designTokens.colors.neutral[500],
      },
    },
  },

  // 이미지 시스템
  image: {
    aspectRatios: {
      "4:3": "75%", // 호텔 카드 이미지
      "16:9": "56.25%", // 배너 이미지
      "1:1": "100%", // 아바타/아이콘
      "3:2": "66.67%", // 갤러리 이미지
    },
    base: {
      objectFit: "cover",
      objectPosition: "center",
      width: "100%",
      height: "100%",
    },
  },

  // 컨테이너 시스템
  container: {
    base: {
      maxWidth: designTokens.container.maxWidth,
      margin: "0 auto",
      paddingLeft: designTokens.container.padding.mobile,
      paddingRight: designTokens.container.padding.mobile,
      [`@media (min-width: ${designTokens.breakpoints.tablet})`]: {
        paddingLeft: designTokens.container.padding.tablet,
        paddingRight: designTokens.container.padding.tablet,
      },
    },
  },

  // 그리드 시스템
  grid: {
    base: {
      display: "grid",
      gap: designTokens.spacing[4],
    },
    responsive: {
      cols1: {
        gridTemplateColumns: "1fr",
      },
      cols2: {
        gridTemplateColumns: "repeat(2, 1fr)",
      },
      cols3: {
        gridTemplateColumns: "repeat(3, 1fr)",
      },
      cols4: {
        gridTemplateColumns: "repeat(4, 1fr)",
      },
      cols8: {
        gridTemplateColumns: "repeat(8, 1fr)",
      },
    },
  },
};
