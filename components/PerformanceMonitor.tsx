'use client';

import { useEffect, useState } from 'react';
import { measureWebVitals, monitorMemoryUsage, getNetworkStatus, getPerformanceRecommendations, addResourceHints } from '@/utils/performance';

interface PerformanceData {
  memoryUsage?: { used: number; total: number; limit: number };
  networkStatus?: { effectiveType: string; downlink: number; rtt: number; saveData: boolean };
  recommendations: string[];
}

export default function PerformanceMonitor() {
  const [performanceData, setPerformanceData] = useState<PerformanceData>({ recommendations: [] });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 리소스 힌트 추가
    addResourceHints();

    // Web Vitals 측정 시작
    measureWebVitals();

    // 성능 데이터 수집
    const updatePerformanceData = () => {
      const memoryUsage = monitorMemoryUsage();
      const networkStatus = getNetworkStatus();
      const recommendations = getPerformanceRecommendations();

      setPerformanceData({
        memoryUsage,
        networkStatus: networkStatus || undefined,
        recommendations,
      });
    };

    // 초기 데이터 수집
    updatePerformanceData();

    // 주기적 업데이트 (30초마다)
    const interval = setInterval(updatePerformanceData, 30000);

    // 개발 환경에서만 성능 데이터 표시 토글
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        setIsVisible(!isVisible);
      }
    };

    if (process.env.NODE_ENV === 'development') {
      window.addEventListener('keydown', handleKeyPress);
    }

    return () => {
      clearInterval(interval);
      if (process.env.NODE_ENV === 'development') {
        window.removeEventListener('keydown', handleKeyPress);
      }
    };
  }, [isVisible]);

  // 성능 권장사항이 있을 때만 렌더링 (프로덕션에서는 숨김)
  if (!isVisible && process.env.NODE_ENV === 'production') return null;
  if (!isVisible && process.env.NODE_ENV === 'development') return null;

  return (
    <div className="fixed bottom-4 right-4 z-[9999] max-w-sm">
      <div className="bg-black/90 text-white text-xs p-3 rounded-lg shadow-xl">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold">성능 모니터</h3>
          <button
            onClick={() => setIsVisible(false)}
            className="text-white/70 hover:text-white"
            aria-label="성능 모니터 닫기"
          >
            ✕
          </button>
        </div>

        {performanceData.memoryUsage && (
          <div className="mb-2">
            <div className="text-white/70">메모리 사용량</div>
            <div>{performanceData.memoryUsage.used}MB / {performanceData.memoryUsage.limit}MB</div>
            <div className="w-full bg-white/20 rounded-full h-1 mt-1">
              <div 
                className="bg-blue-500 h-1 rounded-full transition-all duration-300"
                style={{ 
                  width: `${(performanceData.memoryUsage.used / performanceData.memoryUsage.limit) * 100}%` 
                }}
              />
            </div>
          </div>
        )}

        {performanceData.networkStatus && (
          <div className="mb-2">
            <div className="text-white/70">네트워크</div>
            <div>
              {performanceData.networkStatus.effectiveType.toUpperCase()} 
              {' '}({performanceData.networkStatus.downlink}Mbps)
            </div>
            {performanceData.networkStatus.saveData && (
              <div className="text-yellow-400">데이터 절약 모드</div>
            )}
          </div>
        )}

        {performanceData.recommendations.length > 0 && (
          <div>
            <div className="text-white/70 mb-1">권장사항</div>
            <ul className="text-yellow-400 space-y-1">
              {performanceData.recommendations.map((rec, index) => (
                <li key={index}>• {rec}</li>
              ))}
            </ul>
          </div>
        )}

        {process.env.NODE_ENV === 'development' && (
          <div className="mt-2 pt-2 border-t border-white/20 text-white/50">
            Ctrl+Shift+P로 토글
          </div>
        )}
      </div>
    </div>
  );
}

// 성능 최적화를 위한 HOC
export function withPerformanceOptimization<T extends Record<string, unknown>>(
  WrappedComponent: React.ComponentType<T>
) {
  return function PerformanceOptimizedComponent(props: T) {
    useEffect(() => {
      // 컴포넌트별 성능 최적화 적용
      const networkStatus = getNetworkStatus();
      
      if (networkStatus?.saveData) {
        // 데이터 절약 모드에서는 이미지 품질 조정
        document.documentElement.style.setProperty('--image-quality', '0.7');
      }

      if (networkStatus?.effectiveType === 'slow-2g' || networkStatus?.effectiveType === '2g') {
        // 느린 연결에서는 애니메이션 비활성화
        document.documentElement.style.setProperty('--animation-duration', '0s');
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
}