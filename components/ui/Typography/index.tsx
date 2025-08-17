import { cn } from "@/utils/cn";
import { ElementType, ReactNode } from "react";

interface TypographyProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  variant?:
    | "hero-title" // 메인 히어로 제목
    | "section-title" // 섹션 제목 (20px)
    | "card-title" // 카드 제목 (14px)
    | "body" // 본문 (13px)
    | "caption" // 캡션 (12px)
    | "label" // 라벨 (11px)
    | "badge"; // 배지 (10px)
  weight?: "normal" | "medium" | "semibold" | "bold";
  color?: "primary" | "secondary" | "muted" | "white" | "blue" | "red";
}

const variants = {
  "hero-title": "text-[28px] md:text-[36px] font-bold leading-tight",
  "section-title": "text-[20px] font-bold leading-tight",
  "card-title": "text-[14px] font-medium leading-[1.3]",
  body: "text-[13px] leading-relaxed",
  caption: "text-[12px] leading-normal",
  label: "text-[11px] leading-normal",
  badge: "text-[10px] font-bold leading-none",
};

const weights = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

const colors = {
  primary: "text-[#333]", // 메인 텍스트
  secondary: "text-[#616161]", // 서브 텍스트
  muted: "text-[#919191]", // 플레이스홀더/비활성
  white: "text-white",
  blue: "text-primary", // 메인 블루
  red: "text-[#FF2D55]", // 할인/특가
};

export default function Typography({
  children,
  className,
  as: Component = "span",
  variant = "body",
  weight,
  color = "primary",
}: TypographyProps) {
  return (
    <Component
      className={cn(
        variants[variant],
        weight && weights[weight],
        colors[color],
        className
      )}
    >
      {children}
    </Component>
  );
}

// ServiceName 전용 타이포그래피 컴포넌트들
export function HeroTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Typography
      as="h1"
      variant="hero-title"
      color="white"
      className={className}
    >
      {children}
    </Typography>
  );
}

export function SectionTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Typography as="h2" variant="section-title" className={className}>
      {children}
    </Typography>
  );
}

export function CardTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Typography as="h3" variant="card-title" className={className}>
      {children}
    </Typography>
  );
}

export function BodyText({
  children,
  className,
  color = "secondary",
}: {
  children: ReactNode;
  className?: string;
  color?: "primary" | "secondary" | "muted";
}) {
  return (
    <Typography variant="body" color={color} className={className}>
      {children}
    </Typography>
  );
}

export function Caption({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Typography variant="caption" color="muted" className={className}>
      {children}
    </Typography>
  );
}

export function Label({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Typography variant="label" color="muted" className={className}>
      {children}
    </Typography>
  );
}

export function BadgeText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Typography variant="badge" className={className}>
      {children}
    </Typography>
  );
}

export function PriceText({
  children,
  className,
  size = "normal",
}: {
  children: ReactNode;
  className?: string;
  size?: "small" | "normal" | "large";
}) {
  const sizeClasses = {
    small: "text-[12px]",
    normal: "text-[16px]",
    large: "text-[18px]",
  };

  return (
    <Typography
      as="span"
      weight="bold"
      className={cn(sizeClasses[size], className)}
    >
      {children}
    </Typography>
  );
}
