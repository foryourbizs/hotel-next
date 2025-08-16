import { cn } from "@/utils/cn";
import Image from "next/image";
import { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: "default" | "hotel" | "banner" | "category";
  padding?: "none" | "sm" | "md" | "lg";
  shadow?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
  rounded?: "none" | "sm" | "md" | "lg" | "xl";
}

const variants = {
  default: "bg-white border border-[#EBEBEB]",
  hotel:
    "bg-white border border-[#EBEBEB] hover:shadow-lg transition-all duration-300 cursor-pointer",
  banner:
    "bg-gradient-to-r from-[#1D8BFF] to-[#4DA3FF] text-white overflow-hidden",
  category:
    "bg-white border border-[#EBEBEB] hover:border-[#1D8BFF] hover:shadow-md transition-all duration-200 cursor-pointer",
};

const paddings = {
  none: "p-0",
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
};

const shadows = {
  none: "shadow-none",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
};

const roundeds = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-lg",
  lg: "rounded-xl",
  xl: "rounded-2xl",
};

export default function Card({
  children,
  className,
  variant = "default",
  padding = "md",
  shadow = "sm",
  hover = false,
  rounded = "md",
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "relative",
        variants[variant],
        paddings[padding],
        shadows[shadow],
        roundeds[rounded],
        hover && "hover:shadow-lg transition-shadow duration-300",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// ServiceName 전용 카드 프리셋
export function HotelCard({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative overflow-hidden group",
        "bg-white border border-[#EBEBEB] hover:shadow-lg transition-all duration-300 cursor-pointer",
        "rounded-lg",
        onClick &&
          "focus:outline-none focus:ring-2 focus:ring-[#1D8BFF] focus:ring-offset-2",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CategoryCard({ children, className, ...props }: CardProps) {
  return (
    <Card
      variant="category"
      padding="md"
      rounded="lg"
      className={cn("text-center", className)}
      {...props}
    >
      {children}
    </Card>
  );
}

export function BannerCard({ children, className, ...props }: CardProps) {
  return (
    <Card
      variant="banner"
      padding="lg"
      rounded="xl"
      shadow="lg"
      className={className}
      {...props}
    >
      {children}
    </Card>
  );
}

export function InfoCard({
  title,
  description,
  icon,
  children,
  className,
  ...props
}: CardProps & {
  title?: string;
  description?: string;
  icon?: ReactNode;
}) {
  return (
    <Card
      padding="lg"
      hover
      className={cn("text-center", className)}
      {...props}
    >
      {icon && (
        <div className="flex justify-center mb-4 text-[#1D8BFF]">{icon}</div>
      )}

      {title && (
        <h3 className="text-[14px] font-bold text-[#333] mb-2">{title}</h3>
      )}

      {description && (
        <p className="text-[12px] text-[#616161] mb-4">{description}</p>
      )}

      {children}
    </Card>
  );
}

// 호텔 카드 내부 컴포넌트들
export function HotelCardImage({
  src,
  alt,
  badge,
  className,
}: {
  src: string;
  alt: string;
  badge?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative aspect-[4/3] overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        width={400}
        height={300}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
      {badge && (
        <div className="absolute top-2 left-2 bg-[#FF2D55] text-white text-[10px] font-bold px-2 py-1 rounded">
          {badge}
        </div>
      )}
    </div>
  );
}

export function HotelCardContent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("p-4", className)}>{children}</div>;
}

export function HotelCardTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={cn(
        "text-[14px] font-bold text-[#333] mb-1 line-clamp-1",
        className
      )}
    >
      {children}
    </h3>
  );
}

export function HotelCardLocation({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-[12px] text-[#616161] mb-2", className)}>
      {children}
    </p>
  );
}

export function HotelCardRating({
  rating,
  reviewCount,
  className,
}: {
  rating: number;
  reviewCount?: number;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-1 mb-2", className)}>
      <div
        className="flex items-center gap-0.5"
        role="img"
        aria-label={`${rating}점 만점에 ${rating.toFixed(1)}점`}
      >
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill={i < rating ? "#FFCC33" : "#EBEBEB"}
            aria-hidden="true"
          >
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
          </svg>
        ))}
      </div>
      <span className="text-[11px] text-[#616161]">{rating.toFixed(1)}</span>
      {reviewCount && (
        <span className="text-[11px] text-[#919191]">
          (
          <span aria-label={`후기 ${reviewCount.toLocaleString()}개`}>
            {reviewCount.toLocaleString()}
          </span>
          )
        </span>
      )}
    </div>
  );
}

export function HotelCardPrice({
  originalPrice,
  currentPrice,
  discount,
  className,
}: {
  originalPrice?: number;
  currentPrice: number;
  discount?: number;
  className?: string;
}) {
  return (
    <div className={cn("flex items-end gap-2", className)}>
      {originalPrice && originalPrice > currentPrice && (
        <span className="text-[11px] text-[#919191] line-through">
          {originalPrice.toLocaleString()}원
        </span>
      )}

      <span className="text-[16px] font-bold text-[#333]">
        {currentPrice.toLocaleString()}원
      </span>

      {discount && (
        <span className="text-[11px] font-bold text-[#FF2D55]">
          {discount}% 할인
        </span>
      )}
    </div>
  );
}
