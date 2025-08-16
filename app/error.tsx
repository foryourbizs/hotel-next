'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // 에러를 로깅 서비스에 전송할 수 있습니다
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-2xl text-red-600">
            오류가 발생했습니다
          </CardTitle>
          <CardDescription>
            예기치 않은 오류가 발생했습니다. 불편을 드려 죄송합니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-sm text-red-800">
              {error.message || '알 수 없는 오류가 발생했습니다.'}
            </p>
            {error.digest && (
              <p className="text-xs text-red-600 mt-2">
                오류 코드: {error.digest}
              </p>
            )}
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => reset()}
              className="flex-1"
            >
              다시 시도
            </Button>
            <Button
              variant="outline"
              onClick={() => window.location.href = '/'}
              className="flex-1"
            >
              홈으로 이동
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}