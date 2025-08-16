"use client";

import Image from 'next/image';

import { useState } from 'react';
import { SectionTitle } from '@/components/ui/Typography';
import { Button } from '@/components/ui/button';
import { StaggeredFadeIn, ScrollReveal } from '@/components/ui/Animation';
import { SectionContainer } from '@/components/ui/Container';
import { cn } from '@/utils/cn';

// 샘플 호텔 데이터
const hotels = [
  {
    id: 1,
    name: "서울 롯데호텔",
    location: "중구 소공동",
    image: "/images/hotels/hotel-1.svg",
    rating: 4.8,
    reviewCount: 2840,
    originalPrice: 350000,
    currentPrice: 280000,
    discount: 20,
    badges: ['popular', 'free-cancel'],
    isNew: false,
  },
  {
    id: 2,
    name: "제주 신라호텔",
    location: "제주시 연동",
    image: "/images/hotels/hotel-2.svg",
    rating: 4.9,
    reviewCount: 1950,
    originalPrice: 420000,
    currentPrice: 336000,
    discount: 25,
    badges: ['new', 'free-cancel'],
    isNew: true,
  },
  {
    id: 3,
    name: "부산 파라다이스호텔",
    location: "해운대구 우동",
    image: "/images/hotels/hotel-3.svg",
    rating: 4.7,
    reviewCount: 3200,
    originalPrice: 280000,
    currentPrice: 210000,
    discount: 25,
    badges: ['popular'],
    isNew: false,
  },
  {
    id: 4,
    name: "강원도 휘닉스파크",
    location: "평창군 용평면",
    image: "/images/hotels/hotel-4.svg",
    rating: 4.6,
    reviewCount: 1560,
    originalPrice: 320000,
    currentPrice: 256000,
    discount: 20,
    badges: ['free-cancel'],
    isNew: false,
  },
];

const filters = [
  { id: 'price', name: '가격', count: 0 },
  { id: 'rating', name: '평점', count: 0 },
  { id: 'location', name: '위치', count: 0 },
  { id: 'facilities', name: '부대시설', count: 2 },
];

export default function HotelListSection() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('popular');

  const handleFilterClick = (filterId: string) => {
    setSelectedFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  const handleHotelClick = (hotelId: number) => {
    console.log("호텔 선택:", hotels.find(h => h.id === hotelId)?.name);
  };

  return (
    <SectionContainer background="white">
      {/* Section Header */}
      <ScrollReveal>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 md:mb-8 gap-4">
          <SectionTitle>추천 숙소</SectionTitle>
          
          {/* Sort Options */}
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-[#EBEBEB] rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#1D8BFF] md:w-auto w-full"
          >
            <option value="popular">인기순</option>
            <option value="price-low">낮은 가격순</option>
            <option value="price-high">높은 가격순</option>
            <option value="rating">높은 평점순</option>
            <option value="distance">거리순</option>
          </select>
        </div>
      </ScrollReveal>

      {/* Filter Bar */}
      <ScrollReveal>
        <div className="flex gap-3 mb-6 md:mb-8 overflow-x-auto scrollbar-hide">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              onClick={() => handleFilterClick(filter.id)}
              className={cn(
                'whitespace-nowrap',
                selectedFilters.includes(filter.id) ? 'bg-[#1D8BFF] text-white border-[#1D8BFF]' : ''
              )}
            >
              {filter.name}
            </Button>
          ))}
        </div>
      </ScrollReveal>

      {/* Hotel Grid - Responsive */}
      <ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          <StaggeredFadeIn staggerDelay={0.1}>
            {hotels.map((hotel) => (
              <div key={hotel.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleHotelClick(hotel.id)}>
                <div className="relative">
                  <div className="relative w-full h-48">
                    <Image
                      src={hotel.image}
                      alt={hotel.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  
                  {/* Badges */}
                  <div className="absolute top-2 right-2 flex flex-col gap-1">
                    {hotel.isNew && <span className="bg-green-500 text-white px-2 py-1 rounded text-xs">NEW</span>}
                    {hotel.badges.includes('popular') && <span className="bg-red-500 text-white px-2 py-1 rounded text-xs">인기</span>}
                    {hotel.badges.includes('free-cancel') && <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs">무료취소</span>}
                  </div>
                </div>

                <div className="p-3 md:p-4">
                  <h3 className="text-[13px] md:text-[14px] font-medium text-gray-900 mb-1">{hotel.name}</h3>
                  <p className="text-[11px] md:text-[12px] text-gray-500 mb-2">{hotel.location}</p>
                  
                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-yellow-500">★</span>
                    <span className="text-[12px] font-medium">{hotel.rating}</span>
                    <span className="text-[11px] text-gray-500">({hotel.reviewCount.toLocaleString()})</span>
                  </div>
                  
                  <div className="flex justify-between items-end">
                    <div>
                      {hotel.originalPrice && (
                        <p className="text-[11px] text-gray-400 line-through">
                          {hotel.originalPrice.toLocaleString()}원
                        </p>
                      )}
                      <p className="text-[14px] md:text-[16px] font-bold text-gray-900">
                        {hotel.currentPrice.toLocaleString()}원
                      </p>
                    </div>
                    
                    <button className="text-[#1D8BFF] text-[11px] md:text-[12px] font-medium hover:underline">
                      자세히 보기
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </StaggeredFadeIn>
        </div>
      </ScrollReveal>

      {/* More Button */}
      <ScrollReveal>
        <div className="text-center mt-8 md:mt-12">
          <button className="px-6 md:px-8 py-3 border-2 border-[#1D8BFF] text-[#1D8BFF] rounded-lg font-medium hover:bg-[#1D8BFF] hover:text-white transition-all duration-300 w-full md:w-auto">
            더 많은 숙소 보기
          </button>
        </div>
      </ScrollReveal>
    </SectionContainer>
  );
}