"use client";

import HotelCard from "@/components/cards/HotelCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// 샘플 데이터 - Lorem Picsum을 사용한 이미지
const sampleHotels = {
  recommended: [
    {
      id: 1,
      name: "세인트존스 호텔",
      location: "강릉시 · 강릉 강문해변 앞",
      rating: 9.1,
      reviewCount: 9765,
      price: 250000,
      originalPrice: 350000,
      discount: 30,
      image: "https://picsum.photos/400/300?random=hotel1",
      type: "블랙",
      grade: "특급",
      badge: "베스트",
      tags: ["무료WiFi", "주차가능", "조식포함", "피트니스", "스파"],
    },
    {
      id: 2,
      name: "인스파이어 엔터테인먼트 리조트",
      location: "중구 · 영종도 IBC-1",
      rating: 9.5,
      reviewCount: 1338,
      price: 180000,
      originalPrice: 220000,
      discount: 20,
      image: "https://picsum.photos/400/300?random=hotel2",
      type: "블랙",
      grade: "5성급",
      tags: ["오션뷰", "풀", "카지노", "키즈룸", "발렛파킹", "셔틀버스"],
    },
    {
      id: 3,
      name: "★당일특가★ 제스터톤스 호텔",
      location: "속초시 · 속초터미널 차량 11분",
      rating: 9.1,
      reviewCount: 3039,
      price: 525000,
      image: "https://picsum.photos/400/300?random=hotel3",
      type: "가족호텔",
      grade: "호텔",
      tags: ["해변", "스파"],
    },
    {
      id: 4,
      name: "시그니엘 서울",
      location: "서울 송파구 · 잠실역 도보 5분",
      rating: 9.8,
      reviewCount: 2341,
      price: "다른 날짜 확인",
      image: "https://picsum.photos/400/300?random=hotel4",
      type: "호텔",
      grade: "5성급",
      badge: "럭셔리",
      tags: [
        "시티뷰",
        "라운지",
        "미쉐린레스토랑",
        "수영장",
        "사우나",
        "피트니스",
        "발렛파킹",
      ],
    },
    {
      id: 5,
      name: "그랜드 워커힐 서울",
      location: "광진구 · 아차산역 10분",
      rating: 8.9,
      reviewCount: 5432,
      price: 280000,
      originalPrice: 350000,
      discount: 20,
      image: "https://picsum.photos/400/300?random=hotel5",
      type: "호텔",
      grade: "5성급",
      tags: ["리버뷰", "카지노", "한강뷰", "수영장"],
    },
    {
      id: 6,
      name: "파라다이스시티",
      location: "중구 · 인천공항 인근",
      rating: 9.3,
      reviewCount: 3876,
      price: 450000,
      image: "https://picsum.photos/400/300?random=hotel6",
      type: "복합리조트",
      grade: "5성급",
      badge: "럭셔리",
      tags: [
        "카지노",
        "스파",
        "수영장",
        "키즈존",
        "쇼핑몰",
        "셔틀버스",
        "무료WiFi",
        "조식포함",
      ],
    },
    {
      id: 7,
      name: "롯데호텔 월드",
      location: "송파구 · 잠실역 직결",
      rating: 9.0,
      reviewCount: 6789,
      price: 320000,
      originalPrice: 400000,
      discount: 20,
      image: "https://picsum.photos/400/300?random=hotel7",
      type: "호텔",
      grade: "5성급",
      tags: ["테마파크", "쇼핑"],
    },
    {
      id: 8,
      name: "힐튼 부산",
      location: "기장군 · 해운대 근처",
      rating: 8.8,
      reviewCount: 2345,
      price: 220000,
      image: "https://picsum.photos/400/300?random=hotel8",
      type: "호텔",
      grade: "5성급",
      tags: ["오션뷰", "야외수영장", "비치클럽", "루프탑바", "피트니스"],
    },
  ],
  special: [
    {
      id: 5,
      name: "신라호텔 서울",
      location: "서울 중구",
      rating: 4.8,
      reviewCount: 1567,
      price: 320000,
      originalPrice: 450000,
      discount: 35,
      image: "https://picsum.photos/400/300?random=hotel5",
      type: "호텔",
      grade: "5성급",
      tags: ["WiFi", "주차", "조식"],
      badge: "특가",
    },
    {
      id: 6,
      name: "힐튼 경주",
      location: "경주시",
      rating: 4.6,
      reviewCount: 432,
      price: 150000,
      originalPrice: 200000,
      discount: 25,
      image: "https://picsum.photos/400/300?random=hotel6",
      type: "호텔",
      grade: "4성급",
      tags: ["WiFi", "주차"],
      badge: "특가",
    },
    {
      id: 7,
      name: "메이필드 호텔",
      location: "서울 강서구",
      rating: 4.5,
      reviewCount: 789,
      price: 120000,
      originalPrice: 160000,
      discount: 25,
      image: "https://picsum.photos/400/300?random=hotel7",
      type: "호텔",
      grade: "4성급",
      tags: ["WiFi", "주차", "조식"],
    },
    {
      id: 8,
      name: "베스트웨스턴 제주",
      location: "제주시",
      rating: 4.4,
      reviewCount: 234,
      price: 95000,
      originalPrice: 130000,
      discount: 30,
      image: "https://picsum.photos/400/300?random=hotel8",
      type: "호텔",
      grade: "3성급",
      tags: ["WiFi", "주차"],
      badge: "특가",
    },
  ],
  new: [
    {
      id: 9,
      name: "페어필드 바이 메리어트",
      location: "서울 영등포구",
      rating: 4.7,
      reviewCount: 123,
      price: 180000,
      image: "https://picsum.photos/400/300?random=hotel9",
      type: "호텔",
      grade: "4성급",
      tags: ["WiFi", "주차", "조식"],
      badge: "신규 오픈",
    },
    {
      id: 10,
      name: "몬드리안 서울 이태원",
      location: "서울 용산구",
      rating: 4.8,
      reviewCount: 89,
      price: 220000,
      image: "https://picsum.photos/400/300?random=hotel10",
      type: "호텔",
      grade: "5성급",
      tags: ["WiFi", "주차"],
      badge: "신규 오픈",
    },
    {
      id: 11,
      name: "안다즈 강남",
      location: "서울 강남구",
      rating: 4.9,
      reviewCount: 45,
      price: 380000,
      image: "https://picsum.photos/400/300?random=hotel11",
      type: "호텔",
      grade: "5성급",
      tags: ["WiFi", "주차", "조식"],
      badge: "신규 오픈",
    },
    {
      id: 12,
      name: "AC 호텔 서울 강남",
      location: "서울 강남구",
      rating: 4.6,
      reviewCount: 67,
      price: 160000,
      image: "https://picsum.photos/400/300?random=hotel12",
      type: "호텔",
      grade: "4성급",
      tags: ["WiFi", "주차"],
      badge: "신규 오픈",
    },
  ],
};

interface HotelListProps {
  title?: string;
  category: "recommended" | "special" | "new";
  showMore?: boolean;
}

export default function HotelList({
  title = "추천 숙소",
  category,
  showMore = false,
}: HotelListProps) {
  const hotels = sampleHotels[category];
  const swiperRef = useRef<SwiperType | undefined>(undefined);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  return (
    <section className="bg-white pb-8 pt-6">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[24px] font-bold">{title}</h2>
          {showMore && (
            <button className="text-sm text-gray-600 flex items-center">
              더보기
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          )}
        </div>
      </div>

      {/* Swiper Container - 모바일에서는 좌측 패딩만 */}
      <div className="relative md:max-w-[1200px] md:mx-auto pl-5 md:px-5 lg:px-10 min-h-[280px] md:min-h-[320px]">
        {/* Custom Navigation Buttons - 영역 밖으로 위치 */}
        <button
          ref={prevRef}
          className="absolute z-10 rounded-full w-12 h-12 hidden md:flex items-center justify-center swiper-button-prev-custom cursor-pointer"
          style={{
            top: "90px",
            left: "-25px",
            transform: "translateY(-50%)",
          }}
          aria-label="이전 호텔 보기"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700 font-bold" />
        </button>

        <button
          ref={nextRef}
          className="absolute z-10 rounded-full w-12 h-12 hidden md:flex items-center justify-center swiper-button-prev-custom cursor-pointer"
          style={{
            top: "90px",
            right: "-25px",
            transform: "translateY(-50%)",
          }}
          aria-label="다음 호텔 보기"
        >
          <ChevronRight className="w-5 h-5 text-gray-700 font-bold" />
        </button>

        {/* Swiper는 overflow hidden으로 감싸기 */}
        <div className="overflow-hidden min-h-[280px] md:min-h-[320px]">
          <Swiper
            modules={[Navigation]}
            spaceBetween={8}
            slidesPerView={1.4}
            slidesPerGroup={1}
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
              768: {
                spaceBetween: 16,
                slidesPerView: 4,
                slidesPerGroup: 1,
              },
            }}
            className={`hotel-swiper ${isInitialized ? 'swiper-initialized' : ''}`}
          >
            {hotels.map((hotel) => (
              <SwiperSlide key={hotel.id}>
                <HotelCard hotel={hotel} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <style jsx global>{`
          .swiper-button-prev-custom.swiper-button-disabled,
          .swiper-button-next-custom.swiper-button-disabled {
            opacity: 0;
            pointer-events: none;
          }
        `}</style>
      </div>
    </section>
  );
}
