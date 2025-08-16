import { cn } from "@/utils/cn";
import { ReactNode } from "react";

interface GridProps {
  children: ReactNode;
  className?: string;
  cols?: {
    default?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: "none" | "sm" | "md" | "lg";
  rows?: "auto" | number;
}

const gapVariants = {
  none: "gap-0",
  sm: "gap-2",
  md: "gap-4", // ServiceName 기본 간격
  lg: "gap-6",
};

export default function Grid({
  children,
  className,
  cols = { default: 1 },
  gap = "md",
  rows = "auto",
}: GridProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
    8: "grid-cols-8",
    12: "grid-cols-12",
  };

  const responsiveClasses = [
    cols.default && gridCols[cols.default as keyof typeof gridCols],
    cols.sm && `sm:${gridCols[cols.sm as keyof typeof gridCols]}`,
    cols.md && `md:${gridCols[cols.md as keyof typeof gridCols]}`,
    cols.lg && `lg:${gridCols[cols.lg as keyof typeof gridCols]}`,
    cols.xl && `xl:${gridCols[cols.xl as keyof typeof gridCols]}`,
  ].filter(Boolean);

  const rowsClass =
    typeof rows === "number" ? `grid-rows-${rows}` : "grid-rows-auto";

  return (
    <div
      className={cn(
        "grid",
        ...responsiveClasses,
        gapVariants[gap],
        rowsClass,
        className
      )}
    >
      {children}
    </div>
  );
}

// ServiceName 전용 그리드 프리셋
export function YeogiGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Grid
      cols={{
        default: 2,
        md: 3,
        lg: 4,
      }}
      gap="md"
      className={className}
    >
      {children}
    </Grid>
  );
}

// 카테고리 메뉴 그리드
export function CategoryGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Grid
      cols={{
        default: 4,
        md: 8,
      }}
      gap="sm"
      className={className}
    >
      {children}
    </Grid>
  );
}

// 여행지 그리드
export function DestinationGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Grid
      cols={{
        default: 4,
        md: 8,
      }}
      gap="sm"
      className={className}
    >
      {children}
    </Grid>
  );
}
