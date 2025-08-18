"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// 호텔 타입 정의
type Hotel = {
  id: number;
  rank: number;
  name: string;
  location: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  image: string;
  category: string;
};

// 샘플 데이터 - 카테고리별 호텔
const hotelsByCategory: Record<string, Hotel[]> = {
  호텔: [
    {
      id: 1,
      rank: 1,
      name: "부평 뉴캐슬 호텔",
      location: "인천",
      price: 207000,
      originalPrice: 400000,
      discount: 48,
      rating: 4.9,
      reviewCount: 143,
      image: "https://picsum.photos/400/500?random=hotel1",
      category: "호텔",
    },
    {
      id: 2,
      rank: 2,
      name: "송도 센트럴파크 호텔",
      location: "인천",
      price: 282900,
      originalPrice: 455000,
      discount: 38,
      rating: 4.6,
      reviewCount: 4873,
      image: "https://picsum.photos/400/500?random=hotel2",
      category: "호텔",
    },
    {
      id: 3,
      rank: 3,
      name: "인천 그랜드 호텔",
      location: "인천",
      price: 195000,
      originalPrice: 280000,
      discount: 30,
      rating: 4.7,
      reviewCount: 2341,
      image: "https://picsum.photos/400/500?random=hotel3",
      category: "호텔",
    },
    {
      id: 4,
      rank: 4,
      name: "파라다이스 시티",
      location: "인천",
      price: 450000,
      originalPrice: 580000,
      discount: 22,
      rating: 4.8,
      reviewCount: 3876,
      image: "https://picsum.photos/400/500?random=hotel4",
      category: "호텔",
    },
    {
      id: 5,
      rank: 5,
      name: "베스트웨스턴 인천",
      location: "인천",
      price: 125000,
      originalPrice: 180000,
      discount: 31,
      rating: 4.5,
      reviewCount: 1234,
      image: "https://picsum.photos/400/500?random=hotel5",
      category: "호텔",
    },
  ],
  펜션: [
    {
      id: 6,
      rank: 1,
      name: "영종도 오션뷰 펜션",
      location: "인천",
      price: 180000,
      originalPrice: 250000,
      discount: 28,
      rating: 4.7,
      reviewCount: 387,
      image: "https://picsum.photos/400/500?random=pension1",
      category: "펜션",
    },
    {
      id: 7,
      rank: 2,
      name: "월미도 테라스 펜션",
      location: "인천",
      price: 150000,
      originalPrice: 200000,
      discount: 25,
      rating: 4.6,
      reviewCount: 523,
      image: "https://picsum.photos/400/500?random=pension2",
      category: "펜션",
    },
    {
      id: 8,
      rank: 3,
      name: "강화도 힐링 펜션",
      location: "인천",
      price: 220000,
      originalPrice: 280000,
      discount: 21,
      rating: 4.8,
      reviewCount: 892,
      image: "https://picsum.photos/400/500?random=pension3",
      category: "펜션",
    },
    {
      id: 9,
      rank: 4,
      name: "을왕리 비치 펜션",
      location: "인천",
      price: 195000,
      originalPrice: 260000,
      discount: 25,
      rating: 4.5,
      reviewCount: 234,
      image: "https://picsum.photos/400/500?random=pension4",
      category: "펜션",
    },
    {
      id: 10,
      rank: 5,
      name: "송도 프라이빗 펜션",
      location: "인천",
      price: 165000,
      originalPrice: 210000,
      discount: 21,
      rating: 4.4,
      reviewCount: 156,
      image: "https://picsum.photos/400/500?random=pension5",
      category: "펜션",
    },
  ],
  모텔: [
    {
      id: 11,
      rank: 1,
      name: "더 스테이 송도",
      location: "인천",
      price: 89000,
      originalPrice: 120000,
      discount: 26,
      rating: 4.5,
      reviewCount: 1049,
      image: "https://picsum.photos/400/500?random=motel1",
      category: "모텔",
    },
    {
      id: 12,
      rank: 2,
      name: "부평 럭셔리 모텔",
      location: "인천",
      price: 75000,
      originalPrice: 100000,
      discount: 25,
      rating: 4.3,
      reviewCount: 678,
      image: "https://picsum.photos/400/500?random=motel2",
      category: "모텔",
    },
    {
      id: 13,
      rank: 3,
      name: "구월동 프리미엄 모텔",
      location: "인천",
      price: 95000,
      originalPrice: 130000,
      discount: 27,
      rating: 4.4,
      reviewCount: 892,
      image: "https://picsum.photos/400/500?random=motel3",
      category: "모텔",
    },
    {
      id: 14,
      rank: 4,
      name: "주안 스타 모텔",
      location: "인천",
      price: 65000,
      originalPrice: 90000,
      discount: 28,
      rating: 4.2,
      reviewCount: 345,
      image: "https://picsum.photos/400/500?random=motel4",
      category: "모텔",
    },
    {
      id: 15,
      rank: 5,
      name: "계양 클래식 모텔",
      location: "인천",
      price: 70000,
      originalPrice: 95000,
      discount: 26,
      rating: 4.1,
      reviewCount: 234,
      image: "https://picsum.photos/400/500?random=motel5",
      category: "모텔",
    },
  ],
  게스트하우스: [
    {
      id: 16,
      rank: 1,
      name: "인천공항 트랜짓 게스트하우스",
      location: "인천",
      price: 45000,
      originalPrice: 60000,
      discount: 25,
      rating: 4.6,
      reviewCount: 2341,
      image: "https://picsum.photos/400/500?random=guest1",
      category: "게스트하우스",
    },
    {
      id: 17,
      rank: 2,
      name: "차이나타운 게스트하우스",
      location: "인천",
      price: 35000,
      originalPrice: 50000,
      discount: 30,
      rating: 4.5,
      reviewCount: 1523,
      image: "https://picsum.photos/400/500?random=guest2",
      category: "게스트하우스",
    },
    {
      id: 18,
      rank: 3,
      name: "송도 백패커스",
      location: "인천",
      price: 28000,
      originalPrice: 40000,
      discount: 30,
      rating: 4.4,
      reviewCount: 987,
      image: "https://picsum.photos/400/500?random=guest3",
      category: "게스트하우스",
    },
    {
      id: 19,
      rank: 4,
      name: "부평역 게스트하우스",
      location: "인천",
      price: 32000,
      originalPrice: 45000,
      discount: 29,
      rating: 4.3,
      reviewCount: 456,
      image: "https://picsum.photos/400/500?random=guest4",
      category: "게스트하우스",
    },
    {
      id: 20,
      rank: 5,
      name: "월미도 하버 게스트하우스",
      location: "인천",
      price: 38000,
      originalPrice: 55000,
      discount: 31,
      rating: 4.2,
      reviewCount: 234,
      image: "https://picsum.photos/400/500?random=guest5",
      category: "게스트하우스",
    },
  ],
};


const categories = ["호텔", "펜션", "모텔", "게스트하우스"];

export default function PopularHotels() {
  const [selectedCategory, setSelectedCategory] = useState("호텔");
  const swiperRef = useRef<SwiperType | undefined>(undefined);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // 선택된 카테고리에 따라 호텔 목록 변경
  const displayHotels = hotelsByCategory[selectedCategory] || [];

  return (
    <section className="bg-white py-8">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-[24px] font-bold mb-4">
            확인한 지역의 인기 숙소
            <span className="text-[14px] font-normal text-gray-500 ml-2">
              인천광역시
            </span>
          </h2>

          {/* Category Tabs */}
          <div className="flex gap-2 mb-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Swiper Container - 모바일에서는 좌측 패딩만 */}
      <div className="relative md:max-w-[1200px] md:mx-auto pl-5 md:px-5 lg:px-10 min-h-[340px] md:min-h-[380px]">
        {/* Custom Navigation Buttons */}
        <button
          ref={prevRef}
          className="absolute z-10 bg-white shadow-lg rounded-full border border-gray-300 w-12 h-12 hidden md:flex items-center justify-center"
          style={{
            top: "50%",
            left: "-25px",
            transform: "translateY(-50%)",
          }}
          aria-label="이전 호텔 보기"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>

        <button
          ref={nextRef}
          className="absolute z-10 bg-white shadow-lg rounded-full border border-gray-300 w-12 h-12 hidden md:flex items-center justify-center"
          style={{
            top: "50%",
            right: "-25px",
            transform: "translateY(-50%)",
          }}
          aria-label="다음 호텔 보기"
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>

        <div className="overflow-hidden min-h-[340px] md:min-h-[380px]">
          <Swiper
            modules={[Navigation]}
            spaceBetween={8}
            slidesPerView={1.2}
            loop={true}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            onInit={(swiper) => {
              // @ts-expect-error - Swiper navigation type issue
              swiper.params.navigation.prevEl = prevRef.current;
              // @ts-expect-error - Swiper navigation type issue
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
              setIsInitialized(true);
            }}
            breakpoints={{
              640: {
                spaceBetween: 16,
                slidesPerView: 2.5,
              },
              768: {
                spaceBetween: 16,
                slidesPerView: 3.5,
              },
              1024: {
                spaceBetween: 20,
                slidesPerView: 4.5,
              },
              1280: {
                spaceBetween: 20,
                slidesPerView: 5,
              },
            }}
            className={`popular-hotels-swiper ${isInitialized ? 'swiper-initialized' : ''}`}
          >
              {displayHotels.map((hotel) => (
                <SwiperSlide key={hotel.id}>
                  <HotelImageCard hotel={hotel} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
      </div>
    </section>
  );
}

// Separate component for handling image state
function HotelImageCard({ hotel }: { hotel: Hotel }) {
  const [imgSrc, setImgSrc] = useState(hotel.image || "/ph.png");
  
  return (
    <div className="relative cursor-pointer group">
      {/* Image */}
      <div className="relative aspect-[4/5]">
        <Image
          src={imgSrc}
          alt={hotel.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
          style={{ borderRadius: "12px" }}
          onError={() => setImgSrc("/ph.png")}
        />

        {/* Rank Badge - Bottom Left */}
        <div className="absolute -bottom-1 -left-1 z-10">
          <div className="bg-white text-balck text-3xl font-bold italic leading-none px-6 py-3 rounded-tr-2xl">
            {hotel.rank}
          </div>
        </div>
      </div>

      {/* Content Below Image */}
      <div className="pt-3">
        <h3 className="font-bold text-base text-gray-900 mb-1 line-clamp-2">
          {hotel.name}
        </h3>

        <div className="flex items-baseline gap-2 mb-1">
          {hotel.discount && (
            <span className="text-primary font-bold text-base">
              {hotel.discount}%
            </span>
          )}
          <span className="font-bold text-base text-gray-900">
            {hotel.price.toLocaleString()}원~
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <svg
            className="w-3.5 h-3.5 text-black fill-current"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-xs text-gray-700">
            {hotel.rating} ({hotel.reviewCount})
          </span>
        </div>
      </div>
    </div>
  );
}
