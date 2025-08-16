'use client';

import { ReactNode, forwardRef } from 'react';
import Image from 'next/image';
import { cn } from '@/utils/cn';

// 접근성을 위한 Skip Link 컴포넌트
export function SkipLink({ children, href, className }: {
  children: ReactNode;
  href: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        'sr-only focus:not-sr-only',
        'fixed top-4 left-4 z-[999]',
        'bg-[#1D8BFF] text-white px-4 py-2 rounded-lg',
        'focus:outline-none focus:ring-2 focus:ring-white',
        className
      )}
    >
      {children}
    </a>
  );
}

// 스크린 리더 전용 텍스트
export function ScreenReaderOnly({ children, className }: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={cn('sr-only', className)}>
      {children}
    </span>
  );
}

// 접근 가능한 버튼 컴포넌트
interface AccessibleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  loading?: boolean;
  loadingText?: string;
}

export const AccessibleButton = forwardRef<HTMLButtonElement, AccessibleButtonProps>(
  ({ children, variant = 'primary', loading = false, loadingText = '로딩 중...', className, disabled, ...props }, ref) => {
    const baseClasses = 'focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200';
    const variantClasses = {
      primary: 'bg-[#1D8BFF] text-white focus:ring-[#1D8BFF] hover:bg-[#0066CC]',
      secondary: 'bg-[#F7F7F7] text-[#333] focus:ring-[#1D8BFF] hover:bg-[#EBEBEB]',
      ghost: 'text-[#616161] focus:ring-[#1D8BFF] hover:bg-[#F7F7F7]',
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          'px-4 py-2 rounded-lg font-medium',
          (disabled || loading) && 'opacity-50 cursor-not-allowed',
          className
        )}
        disabled={disabled || loading}
        aria-busy={loading}
        aria-describedby={loading ? 'loading-description' : undefined}
        {...props}
      >
        {loading ? (
          <>
            <span aria-hidden="true">⏳</span>
            <ScreenReaderOnly>{loadingText}</ScreenReaderOnly>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

AccessibleButton.displayName = 'AccessibleButton';

// 접근 가능한 링크 컴포넌트
interface AccessibleLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  external?: boolean;
  newTab?: boolean;
}

export function AccessibleLink({ 
  children, 
  external = false, 
  newTab = false, 
  className,
  ...props 
}: AccessibleLinkProps) {
  const linkProps = newTab ? {
    target: '_blank',
    rel: 'noopener noreferrer'
  } : {};

  return (
    <a
      className={cn(
        'focus:outline-none focus:ring-2 focus:ring-[#1D8BFF] focus:ring-offset-2',
        'rounded-sm transition-all duration-200',
        className
      )}
      {...linkProps}
      {...props}
    >
      {children}
      {external && (
        <ScreenReaderOnly> (새 창에서 열림)</ScreenReaderOnly>
      )}
    </a>
  );
}

// 접근 가능한 이미지 컴포넌트
interface AccessibleImageProps {
  src: string;
  alt: string;
  decorative?: boolean;
  className?: string;
  width?: number;
  height?: number;
}

export function AccessibleImage({ 
  src, 
  alt, 
  decorative = false, 
  className,
  width,
  height,
  ...props 
}: AccessibleImageProps) {
  return (
    <Image
      src={src}
      alt={decorative ? '' : alt}
      aria-hidden={decorative}
      className={className}
      width={width || 100}
      height={height || 100}
      {...props}
    />
  );
}

// 접근 가능한 헤딩 컴포넌트
interface AccessibleHeadingProps {
  children: ReactNode;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  id?: string;
}

export function AccessibleHeading({ children, level, className, id }: AccessibleHeadingProps) {
  const Component = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  
  return (
    <Component
      id={id}
      className={cn(
        'focus:outline-none focus:ring-2 focus:ring-[#1D8BFF] focus:ring-offset-2 rounded-sm',
        className
      )}
      tabIndex={id ? -1 : undefined}
    >
      {children}
    </Component>
  );
}

// Live Region for dynamic content announcements
export function LiveRegion({ 
  children, 
  politeness = 'polite',
  className 
}: {
  children: ReactNode;
  politeness?: 'polite' | 'assertive';
  className?: string;
}) {
  return (
    <div
      aria-live={politeness}
      aria-atomic="true"
      className={cn('sr-only', className)}
    >
      {children}
    </div>
  );
}

// 키보드 네비게이션을 위한 Focus Trap
export function FocusTrap({ 
  children, 
  active = true,
  className 
}: {
  children: ReactNode;
  active?: boolean;
  className?: string;
}) {
  return (
    <div
      className={className}
      onKeyDown={(e) => {
        if (!active) return;
        
        if (e.key === 'Tab') {
          // Focus trap logic would go here
          // For now, we'll just prevent default on demo
        }
      }}
    >
      {children}
    </div>
  );
}

// 접근성 개선을 위한 유틸리티
export const a11yUtils = {
  // 텍스트가 적절한 대비를 가지는지 확인
  checkColorContrast: () => {
    // 실제 구현에서는 color contrast ratio 계산 로직이 들어갑니다
    return true; // 임시
  },
  
  // 요소가 키보드로 접근 가능한지 확인
  isKeyboardAccessible: (element: HTMLElement) => {
    return element.tabIndex >= 0 || ['button', 'a', 'input', 'select', 'textarea'].includes(element.tagName.toLowerCase());
  },
  
  // ARIA 라벨 생성
  generateAriaLabel: (text: string, context?: string) => {
    return context ? `${text}, ${context}` : text;
  }
};