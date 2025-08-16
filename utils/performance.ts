// 성능 최적화 유틸리티
import React from 'react';

// 디바운스 함수
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// 스로틀 함수
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// 지연 로딩을 위한 Intersection Observer 훅
export function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
) {
  const [isIntersecting, setIsIntersecting] = React.useState(false);

  React.useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      {
        threshold: 0.1,
        ...options,
      }
    );

    observer.observe(element);
    return () => observer.unobserve(element);
  }, [elementRef, options]);

  return isIntersecting;
}

// 이미지 프리로딩
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

// 이미지 배치 프리로딩
export async function preloadImages(srcs: string[]): Promise<void[]> {
  return Promise.all(srcs.map(preloadImage));
}

// 가상화를 위한 유틸리티
export function calculateVisibleItems(
  containerHeight: number,
  itemHeight: number,
  scrollTop: number,
  buffer: number = 5
) {
  const visibleStart = Math.floor(scrollTop / itemHeight) - buffer;
  const visibleEnd = Math.ceil((scrollTop + containerHeight) / itemHeight) + buffer;
  
  return {
    start: Math.max(0, visibleStart),
    end: visibleEnd,
  };
}

// 메모이제이션 유틸리티
export function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map();
  
  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
}

// 번들 사이즈 최적화를 위한 동적 import 래퍼
export function lazyImport<T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>
) {
  return React.lazy(importFunc);
}

// Web Vitals 측정
export function measureWebVitals() {
  if (typeof window === 'undefined') return;

  // CLS (Cumulative Layout Shift) 측정
  let clsValue = 0;
  let clsEntries: any[] = [];

  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries() as any[]) {
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
        clsEntries.push(entry);
      }
    }
  });

  observer.observe({ type: 'layout-shift', buffered: true });

  // LCP (Largest Contentful Paint) 측정
  const lcpObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1] as PerformanceEntry & { renderTime?: number; loadTime?: number };
    const lcp = lastEntry.renderTime || lastEntry.loadTime;
    console.log('LCP:', lcp);
  });

  lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

  // FID (First Input Delay) 측정
  const fidObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries() as PerformanceEventTiming[]) {
      const fid = entry.processingStart - entry.startTime;
      console.log('FID:', fid);
    }
  });

  fidObserver.observe({ type: 'first-input', buffered: true });

  return {
    getCLS: () => clsValue,
    getEntries: () => clsEntries,
  };
}

// 리소스 힌트 유틸리티
export function addResourceHints() {
  if (typeof document === 'undefined') return;

  // DNS 프리페치
  const dnsPrefetch = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
  ];

  dnsPrefetch.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = url;
    document.head.appendChild(link);
  });

  // 프리커넥트
  const preconnect = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
  ];

  preconnect.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = url;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
}

// 메모리 사용량 모니터링
export function monitorMemoryUsage() {
  if (typeof window === 'undefined' || !('memory' in performance)) return;

  const memory = (performance as any).memory;
  
  return {
    used: Math.round(memory.usedJSHeapSize / 1048576), // MB
    total: Math.round(memory.totalJSHeapSize / 1048576), // MB
    limit: Math.round(memory.jsHeapSizeLimit / 1048576), // MB
  };
}

// 배터리 상태 기반 성능 조절
export async function getBatteryStatus() {
  if (typeof navigator === 'undefined' || !('getBattery' in navigator)) {
    return null;
  }

  try {
    const battery = await (navigator as any).getBattery();
    return {
      charging: battery.charging,
      level: battery.level,
      chargingTime: battery.chargingTime,
      dischargingTime: battery.dischargingTime,
    };
  } catch {
    return null;
  }
}

// 네트워크 상태 기반 최적화
export function getNetworkStatus() {
  if (typeof navigator === 'undefined' || !('connection' in navigator)) {
    return null;
  }

  const connection = (navigator as any).connection;
  
  return {
    effectiveType: connection.effectiveType, // '4g', '3g', '2g', 'slow-2g'
    downlink: connection.downlink, // Mbps
    rtt: connection.rtt, // ms
    saveData: connection.saveData, // boolean
  };
}

// 성능 최적화 권장사항
export function getPerformanceRecommendations() {
  const networkStatus = getNetworkStatus();
  const memoryStatus = monitorMemoryUsage();
  
  const recommendations: string[] = [];
  
  if (networkStatus?.effectiveType === 'slow-2g' || networkStatus?.effectiveType === '2g') {
    recommendations.push('저화질 이미지 사용');
    recommendations.push('애니메이션 최소화');
  }
  
  if (networkStatus?.saveData) {
    recommendations.push('데이터 절약 모드 활성화');
  }
  
  if (memoryStatus && memoryStatus.used > memoryStatus.limit * 0.8) {
    recommendations.push('메모리 사용량 최적화 필요');
  }
  
  return recommendations;
}