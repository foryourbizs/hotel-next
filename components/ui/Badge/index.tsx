import { cn } from "@/utils/cn";
import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  className?: string;
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "error"
    | "discount"
    | "new"
    | "popular";
  size?: "xs" | "sm" | "md";
  rounded?: boolean;
}

const variants = {
  default: "bg-[#F7F7F7] text-[#616161]",
  primary: "bg-primary text-white",
  secondary: "bg-[#616161] text-white",
  success: "bg-success text-white",
  warning: "bg-warning text-white",
  error: "bg-error text-white",
  discount: "bg-error text-white font-bold",
  new: "bg-success text-white font-bold",
  popular: "bg-gradient-to-r from-warning to-error text-white font-bold",
};

const sizes = {
  xs: "px-1.5 py-0.5 text-[9px]",
  sm: "px-2 py-0.5 text-[10px]",
  md: "px-2.5 py-1 text-[11px]",
};

export default function Badge({
  children,
  className,
  variant = "default",
  size = "sm",
  rounded = true,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center",
        "font-medium leading-none",
        "whitespace-nowrap",
        variants[variant],
        sizes[size],
        rounded ? "rounded-full" : "rounded",
        className
      )}
    >
      {children}
    </span>
  );
}

// ServiceName 전용 배지 프리셋
export function DiscountBadge({
  percent,
  className,
}: {
  percent: number;
  className?: string;
}) {
  return (
    <Badge variant="discount" size="sm" className={className}>
      {percent}% 할인
    </Badge>
  );
}

export function NewBadge({ className }: { className?: string }) {
  return (
    <Badge variant="new" size="xs" className={className}>
      NEW
    </Badge>
  );
}

export function PopularBadge({ className }: { className?: string }) {
  return (
    <Badge variant="popular" size="sm" className={className}>
      인기
    </Badge>
  );
}

export function SoldOutBadge({ className }: { className?: string }) {
  return (
    <Badge
      variant="secondary"
      size="sm"
      className={cn("opacity-90", className)}
    >
      품절
    </Badge>
  );
}

export function FreeCancelBadge({ className }: { className?: string }) {
  return (
    <Badge variant="success" size="xs" className={className}>
      무료취소
    </Badge>
  );
}

export function InstantBookBadge({ className }: { className?: string }) {
  return (
    <Badge variant="primary" size="xs" className={className}>
      즉시확정
    </Badge>
  );
}

export function CategoryBadge({
  children,
  active = false,
  className,
}: {
  children: ReactNode;
  active?: boolean;
  className?: string;
}) {
  return (
    <Badge
      variant={active ? "primary" : "default"}
      size="md"
      className={cn(
        "cursor-pointer transition-all duration-200",
        "hover:bg-primary hover:text-white",
        className
      )}
    >
      {children}
    </Badge>
  );
}

export function RatingBadge({
  rating,
  className,
}: {
  rating: number;
  className?: string;
}) {
  const getRatingVariant = (rating: number) => {
    if (rating >= 4.5) return "success";
    if (rating >= 4.0) return "primary";
    if (rating >= 3.5) return "warning";
    return "default";
  };

  return (
    <Badge
      variant={getRatingVariant(rating)}
      size="sm"
      className={cn("gap-1", className)}
    >
      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
      </svg>
      {rating.toFixed(1)}
    </Badge>
  );
}
