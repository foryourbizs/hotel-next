'use client';

import { useEffect, useState } from 'react';
import { a11yUtils } from '@/components/ui/Accessibility';

interface AccessibilityIssue {
  level: 'error' | 'warning' | 'info';
  rule: string;
  description: string;
  element?: string;
  suggestion: string;
}

interface AccessibilityReport {
  score: number;
  issues: AccessibilityIssue[];
  passedChecks: string[];
}

export default function AccessibilityAudit() {
  const [report, setReport] = useState<AccessibilityReport | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const runAccessibilityAudit = async () => {
    setIsRunning(true);
    const issues: AccessibilityIssue[] = [];
    const passedChecks: string[] = [];

    try {
      // 1. 이미지 alt 텍스트 검사
      const images = document.querySelectorAll('img');
      images.forEach((img, index) => {
        if (!img.alt && !img.hasAttribute('aria-hidden')) {
          issues.push({
            level: 'error',
            rule: 'WCAG 1.1.1',
            description: 'Image missing alt text',
            element: `img[${index}]`,
            suggestion: 'Add meaningful alt text or aria-hidden="true" for decorative images'
          });
        } else {
          passedChecks.push('이미지 alt 텍스트');
        }
      });

      // 2. 헤딩 구조 검사
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      let hasH1 = false;
      let previousLevel = 0;

      headings.forEach((heading, index) => {
        const level = parseInt(heading.tagName.substring(1));
        
        if (level === 1) {
          if (hasH1) {
            issues.push({
              level: 'warning',
              rule: 'WCAG 1.3.1',
              description: 'Multiple H1 elements found',
              element: `${heading.tagName.toLowerCase()}[${index}]`,
              suggestion: 'Use only one H1 per page'
            });
          }
          hasH1 = true;
        }

        if (previousLevel > 0 && level > previousLevel + 1) {
          issues.push({
            level: 'warning',
            rule: 'WCAG 1.3.1',
            description: 'Heading level skipped',
            element: `${heading.tagName.toLowerCase()}[${index}]`,
            suggestion: 'Use sequential heading levels'
          });
        }

        previousLevel = level;
      });

      if (hasH1) {
        passedChecks.push('H1 구조');
      }

      // 3. 링크 텍스트 검사
      const links = document.querySelectorAll('a');
      links.forEach((link, index) => {
        const text = link.textContent?.trim() || '';
        const ariaLabel = link.getAttribute('aria-label');
        
        if (!text && !ariaLabel) {
          issues.push({
            level: 'error',
            rule: 'WCAG 2.4.4',
            description: 'Link without text or aria-label',
            element: `a[${index}]`,
            suggestion: 'Add descriptive text or aria-label to link'
          });
        } else if (text.toLowerCase().includes('click here') || text.toLowerCase().includes('read more')) {
          issues.push({
            level: 'warning',
            rule: 'WCAG 2.4.4',
            description: 'Non-descriptive link text',
            element: `a[${index}]`,
            suggestion: 'Use descriptive link text'
          });
        } else {
          passedChecks.push('링크 텍스트');
        }
      });

      // 4. 폼 레이블 검사
      const inputs = document.querySelectorAll('input, select, textarea');
      inputs.forEach((input, index) => {
        const label = document.querySelector(`label[for="${input.id}"]`);
        const ariaLabel = input.getAttribute('aria-label');
        const ariaLabelledby = input.getAttribute('aria-labelledby');

        if (!label && !ariaLabel && !ariaLabelledby) {
          issues.push({
            level: 'error',
            rule: 'WCAG 1.3.1',
            description: 'Form control without label',
            element: `${input.tagName.toLowerCase()}[${index}]`,
            suggestion: 'Add label, aria-label, or aria-labelledby'
          });
        } else {
          passedChecks.push('폼 레이블');
        }
      });

      // 5. 색상 대비 검사 (간단한 버전)
      const elementsWithColor = document.querySelectorAll('[style*="color"], .text-');
      if (elementsWithColor.length > 0) {
        // 실제 구현에서는 색상 대비 비율을 계산해야 함
        // 여기서는 기본적인 체크만 수행
        const hasGoodContrast = a11yUtils.checkColorContrast();
        if (hasGoodContrast) {
          passedChecks.push('색상 대비');
        }
      }

      // 6. 키보드 접근성 검사
      const interactiveElements = document.querySelectorAll('button, a, input, select, textarea, [tabindex]');
      let keyboardAccessibleCount = 0;

      interactiveElements.forEach((element) => {
        if (a11yUtils.isKeyboardAccessible(element as HTMLElement)) {
          keyboardAccessibleCount++;
        }
      });

      if (keyboardAccessibleCount === interactiveElements.length) {
        passedChecks.push('키보드 접근성');
      } else {
        issues.push({
          level: 'warning',
          rule: 'WCAG 2.1.1',
          description: 'Some elements not keyboard accessible',
          suggestion: 'Ensure all interactive elements are keyboard accessible'
        });
      }

      // 7. ARIA 속성 검사
      const elementsWithAria = document.querySelectorAll('[aria-label], [aria-labelledby], [aria-describedby], [role]');
      if (elementsWithAria.length > 0) {
        passedChecks.push('ARIA 속성 사용');
      }

      // 8. 스킵 링크 검사
      const skipLinks = document.querySelectorAll('a[href^="#"]');
      let hasSkipToMain = false;
      skipLinks.forEach((link) => {
        if (link.textContent?.includes('메인') || link.textContent?.includes('콘텐츠')) {
          hasSkipToMain = true;
        }
      });

      if (hasSkipToMain) {
        passedChecks.push('스킵 링크');
      } else {
        issues.push({
          level: 'warning',
          rule: 'WCAG 2.4.1',
          description: 'No skip to main content link found',
          suggestion: 'Add skip link for keyboard users'
        });
      }

      // 점수 계산
      const totalChecks = issues.length + passedChecks.length;
      const score = totalChecks > 0 ? Math.round((passedChecks.length / totalChecks) * 100) : 100;

      setReport({
        score,
        issues,
        passedChecks: [...new Set(passedChecks)] // 중복 제거
      });

    } catch (error) {
      console.error('Accessibility audit failed:', error);
    } finally {
      setIsRunning(false);
    }
  };

  useEffect(() => {
    // 개발 환경에서만 키보드 단축키 활성화
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        setIsVisible(!isVisible);
      }
    };

    if (process.env.NODE_ENV === 'development') {
      window.addEventListener('keydown', handleKeyPress);
    }

    return () => {
      if (process.env.NODE_ENV === 'development') {
        window.removeEventListener('keydown', handleKeyPress);
      }
    };
  }, [isVisible]);

  if (!isVisible && process.env.NODE_ENV === 'production') return null;
  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-[9999] max-w-md max-h-[80vh] overflow-y-auto">
      <div className="bg-white border border-gray-300 rounded-lg shadow-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-lg">접근성 감사</h3>
          <div className="flex gap-2">
            <button
              onClick={runAccessibilityAudit}
              disabled={isRunning}
              className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 disabled:opacity-50"
            >
              {isRunning ? '검사 중...' : '검사 실행'}
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-500 hover:text-gray-700"
              aria-label="접근성 감사 닫기"
            >
              ✕
            </button>
          </div>
        </div>

        {report && (
          <div className="space-y-4">
            {/* 점수 */}
            <div className="text-center">
              <div className={`text-3xl font-bold ${
                report.score >= 90 ? 'text-green-600' : 
                report.score >= 70 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {report.score}%
              </div>
              <div className="text-sm text-gray-600">접근성 점수</div>
            </div>

            {/* 통과한 검사 */}
            {report.passedChecks.length > 0 && (
              <div>
                <h4 className="font-semibold text-green-600 mb-2">✓ 통과한 검사</h4>
                <ul className="text-sm space-y-1">
                  {report.passedChecks.map((check, index) => (
                    <li key={index} className="text-green-700">• {check}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* 문제점 */}
            {report.issues.length > 0 && (
              <div>
                <h4 className="font-semibold text-red-600 mb-2">⚠ 발견된 문제</h4>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {report.issues.map((issue, index) => (
                    <div key={index} className="border border-gray-200 rounded p-2">
                      <div className={`font-medium text-sm ${
                        issue.level === 'error' ? 'text-red-600' : 
                        issue.level === 'warning' ? 'text-yellow-600' : 'text-blue-600'
                      }`}>
                        {issue.rule}: {issue.description}
                      </div>
                      {issue.element && (
                        <div className="text-xs text-gray-500 mt-1">
                          Element: {issue.element}
                        </div>
                      )}
                      <div className="text-xs text-gray-700 mt-1">
                        💡 {issue.suggestion}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {process.env.NODE_ENV === 'development' && (
          <div className="mt-4 pt-3 border-t border-gray-200 text-xs text-gray-500">
            Ctrl+Shift+A로 토글
          </div>
        )}
      </div>
    </div>
  );
}