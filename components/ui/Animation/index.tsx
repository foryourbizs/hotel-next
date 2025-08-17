"use client";

import { cn } from "@/utils/cn";
import { HTMLMotionProps, motion, Variants } from "framer-motion";
import { ReactNode } from "react";

interface AnimationProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  animation?:
    | "fadeIn"
    | "slideUp"
    | "slideDown"
    | "slideLeft"
    | "slideRight"
    | "scale"
    | "bounce";
  duration?: number;
  delay?: number;
  stagger?: number;
}

// Framer Motion 애니메이션 variants
const animations: Record<string, Variants> = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
    },
  },
  slideUp: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
    },
  },
  slideDown: {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
    },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
    },
  },
  slideRight: {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
    },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
    },
  },
  bounce: {
    hidden: { opacity: 0, scale: 0.3 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  },
};

export default function Animation({
  children,
  className,
  animation = "fadeIn",
  duration,
  delay = 0,
  ...props
}: AnimationProps) {
  const variant = animations[animation];

  // duration이 지정된 경우 transition 오버라이드
  if (duration) {
    if (
      variant.visible &&
      typeof variant.visible === "object" &&
      "transition" in variant.visible
    ) {
      variant.visible.transition = { ...variant.visible.transition, duration };
    }
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variant}
      transition={{ delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ServiceName 전용 애니메이션 프리셋
export function FadeIn({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <Animation animation="fadeIn" delay={delay} className={className}>
      {children}
    </Animation>
  );
}

export function SlideUp({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <Animation animation="slideUp" delay={delay} className={className}>
      {children}
    </Animation>
  );
}

export function HoverScale({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function HoverLift({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{
        y: -4,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function LoadingSpinner({
  size = "md",
  className,
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className={cn(sizes[size], className)}
    >
      <svg viewBox="0 0 24 24" fill="none">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </motion.div>
  );
}

export function PulseLoader({ className }: { className?: string }) {
  return (
    <div className={cn("flex space-x-1", className)}>
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
          className="w-2 h-2 bg-primary rounded-full"
        />
      ))}
    </div>
  );
}

export function SkeletonLoader({
  className,
  width = "100%",
  height = "1rem",
  rounded = true,
}: {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: boolean;
}) {
  return (
    <motion.div
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      className={cn("bg-[#F7F7F7]", rounded && "rounded", className)}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
      }}
    />
  );
}

export function StaggeredFadeIn({
  children,
  className,
  staggerDelay = 0.1,
}: {
  children: ReactNode[];
  className?: string;
  staggerDelay?: number;
}) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={className}
    >
      {Array.isArray(children) &&
        children.map((child, index) => (
          <motion.div key={index} variants={itemVariants}>
            {child}
          </motion.div>
        ))}
    </motion.div>
  );
}

// 스크롤 트리거 애니메이션
export function ScrollReveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
