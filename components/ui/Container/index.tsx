import { cn } from "@/utils/cn";
import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: "full" | "lg" | "md" | "sm";
  padding?: "none" | "sm" | "md" | "lg";
  as?: "div" | "section" | "main" | "article" | "header" | "footer";
}

const sizes = {
  full: "max-w-none",
  lg: "max-w-[1200px]", // ServiceName 메인 컨테이너
  md: "max-w-[1024px]",
  sm: "max-w-[768px]",
};

const paddings = {
  none: "",
  sm: "px-4 md:px-6",
  md: "px-4 md:px-8",
  lg: "px-4 md:px-10",
};

export default function Container({
  children,
  className,
  size = "lg",
  padding = "md",
  as: Component = "div",
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full",
        sizes[size],
        paddings[padding],
        className
      )}
    >
      {children}
    </Component>
  );
}

// ServiceName 전용 컨테이너 프리셋
export function YeogiContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Container size="lg" padding="lg" className={className}>
      {children}
    </Container>
  );
}

export function SectionContainer({
  children,
  className,
  background = "white",
}: {
  children: ReactNode;
  className?: string;
  background?: "white" | "gray" | "blue";
}) {
  const backgrounds = {
    white: "bg-white",
    gray: "bg-[#F7F7F7]",
    blue: "bg-[#F0F7FF]",
  };

  return (
    <section
      className={cn(
        "py-8 md:py-12 lg:py-16",
        backgrounds[background],
        className
      )}
    >
      <YeogiContainer>{children}</YeogiContainer>
    </section>
  );
}

export function HeroContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative min-h-[400px] md:min-h-[500px] lg:min-h-[600px]",
        "flex items-center justify-center",
        className
      )}
    >
      <YeogiContainer>{children}</YeogiContainer>
    </div>
  );
}
