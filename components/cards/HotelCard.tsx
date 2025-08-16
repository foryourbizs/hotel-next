"use client";

import Image from 'next/image';

interface HotelCardProps {
  hotel: {
    id: number;
    name: string;
    location: string;
    rating: number;
    reviewCount: number;
    price: number;
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
  return (
    <div className="bg-white rounded-[4px] overflow-hidden border border-[#ebebeb] hover:shadow-lg transition-shadow cursor-pointer">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={hotel.image || "/images/no-image-placeholder.svg"}
          alt={hotel.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        {hotel.discount && (
          <div className="absolute top-2 left-2 bg-[#FF2D55] text-white px-1.5 py-0.5 rounded text-[11px] font-bold">
            {hotel.discount}%
          </div>
        )}
        {hotel.badge && (
          <div className="absolute top-2 right-2 bg-[#1D8BFF] text-white px-1.5 py-0.5 rounded text-[11px] font-bold">
            {hotel.badge}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        {/* Grade & Type */}
        <div className="flex items-center gap-1 mb-1">
          {hotel.grade && (
            <span className="text-[11px] text-[#1D8BFF] bg-[#F0F7FF] px-1 rounded">
              {hotel.grade}
            </span>
          )}
          <span className="text-[11px] text-[#919191]">{hotel.type}</span>
        </div>
        
        {/* Name */}
        <h3 className="font-medium text-[14px] text-[#333] mb-1 line-clamp-2 leading-[1.3]">
          {hotel.name}
        </h3>
        
        {/* Location */}
        <p className="text-[12px] text-[#919191] mb-2">
          {hotel.location}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 0.5L7.545 4.13L11.5 4.63L8.75 7.19L9.59 11.13L6 9.265L2.41 11.13L3.25 7.19L0.5 4.63L4.455 4.13L6 0.5Z" fill="#FFCC33"/>
            </svg>
            <span className="text-[12px] font-medium ml-0.5">{hotel.rating}</span>
          </div>
          <span className="text-[11px] text-[#919191]">({hotel.reviewCount.toLocaleString()})</span>
        </div>

        {/* Tags */}
        {hotel.tags && (
          <div className="flex flex-wrap gap-1 mb-2">
            {hotel.tags.slice(0, 2).map((tag, index) => (
              <span key={index} className="text-[10px] text-[#666] bg-[#f8f8f8] px-1.5 py-0.5 rounded">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Price */}
        <div className="text-right">
          {hotel.originalPrice && (
            <p className="text-[11px] text-[#c4c4c4] line-through">
              {hotel.originalPrice.toLocaleString()}원
            </p>
          )}
          <div className="flex items-end justify-end">
            <span className="text-[16px] font-bold text-[#333]">
              {hotel.price.toLocaleString()}
            </span>
            <span className="text-[12px] text-[#919191] ml-1">원</span>
          </div>
        </div>
      </div>
    </div>
  );
}