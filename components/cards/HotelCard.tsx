"use client";

import Image from "next/image";

interface HotelCardProps {
  hotel: {
    id: number;
    name: string;
    location: string;
    rating: number;
    reviewCount: number;
    price: number | string;
    originalPrice?: number;
    discount?: number;
    image: string;
    type: string;
    grade?: string;
    badge?: string;
    tags?: string[];
  };
}

export default function HotelCard({ hotel }: HotelCardProps) {
  // 가격이 "다른 날짜 확인" 같은 문자열일 수 있음
  const priceDisplay =
    typeof hotel.price === "number"
      ? `${hotel.price.toLocaleString()}원`
      : hotel.price;

  return (
    <div className="bg-white overflow-hidden cursor-pointer">
      {/* Image Container */}
      <div className="relative aspect-[3/2] overflow-hidden">
        <Image
          src={hotel.image || "/images/no-image-placeholder.svg"}
          alt={hotel.name}
          fill
          className="object-cover rounded-lg"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>

      {/* Content */}
      <div className="pt-4">
        {/* Type & Grade Row */}
        <div className="flex items-center gap-1 mb-1">
          <span className="text-xs text-gray-500">{hotel.type}</span>
          {hotel.grade && (
            <>
              <span className="text-xs text-gray-300">•</span>
              <span className="text-xs text-gray-500">{hotel.grade}</span>
            </>
          )}
        </div>

        {/* Hotel Name */}
        <h3 className="font-bold text-base text-gray-900 mb-2 line-clamp-2 min-h-[48px]">
          {hotel.name}
        </h3>

        {/* Location */}
        <p className="text-sm text-gray-500 mb-3 line-clamp-1">
          {hotel.location}
        </p>

        {/* Rating & Reviews */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center bg-[#FFD700] text-black px-2 py-0.5 rounded">
            <svg
              className="w-3 h-3 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-bold text-xs">{hotel.rating}</span>
          </div>
          <span className="text-xs text-gray-500">
            {hotel.reviewCount.toLocaleString()}명 평가
          </span>
        </div>

        {/* Price Section */}
        <div className="flex items-end gap-1">
          {typeof hotel.price === "number" ? (
            <>
              <p className="text-lg font-bold text-gray-900">
                {hotel.price.toLocaleString()}
                <span className="text-sm font-normal">원</span>
              </p>
              {hotel.originalPrice && (
                <p className="text-xs text-gray-400 line-through mb-1">
                  {hotel.originalPrice.toLocaleString()}원
                </p>
              )}
            </>
          ) : (
            <p className="text-sm text-gray-500">{hotel.price}</p>
          )}
        </div>
      </div>
    </div>
  );
}
