"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-2xl mx-auto p-8 text-center">
        {/* 404 Icon */}
        <div className="mb-8">
          <svg
            className="mx-auto h-24 w-24 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* 404 Title */}
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>

        {/* Main Message */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          페이지를 찾을 수 없습니다
        </h2>

        {/* Wishket Notice */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8 text-left">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-blue-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                위시캣 제안용 프로토타입
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>
                  본 사이트는 위시캣 프로젝트 제안을 위한 프로토타입으로, 현재는
                  메인 페이지만 구현되어 있습니다.
                </p>
                <p className="mt-2">
                  실제 서비스 개발 시 모든 페이지가 구현될 예정입니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <p className="text-gray-600 mb-8">
          요청하신 페이지는 아직 개발되지 않았거나 존재하지 않습니다.
          <br />
          메인 페이지로 돌아가서 구현된 기능을 확인해보세요.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary hover:bg-primary-hover transition-colors"
          >
            메인으로 돌아가기
          </Link>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            이전 페이지로
          </button>
        </div>
      </div>
    </div>
  );
}
