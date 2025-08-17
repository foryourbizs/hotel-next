"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

const events = [
  {
    id: 1,
    title: "겨울 특가 이벤트",
    subtitle: "최대 50% 할인",
    image: "/images/events/event1.png",
  },
  {
    id: 2,
    title: "신규 회원 혜택",
    subtitle: "첫 예약 10% 추가 할인",
    image: "/images/events/event2.png",
  },
  {
    id: 3,
    title: "주말 여행 특가",
    subtitle: "금요일 체크인 20% 할인",
    image: "/images/events/event3.png",
  },
  {
    id: 4,
    title: "얼리버드 예약",
    subtitle: "30일 전 예약시 25% 할인",
    image: "/images/events/event4.png",
  },
];

export default function EventBanner() {
  const swiperRef = useRef<SwiperType | undefined>(undefined);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <section className="py-8 bg-white">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[20px] font-bold">이벤트</h2>
        </div>

        {/* Swiper Container */}
        <div className="relative">
          {/* Custom Navigation Buttons */}
          <button
            ref={prevRef}
            className="absolute z-10 bg-white shadow-lg rounded-full border border-gray-300 w-12 h-12 flex items-center justify-center hidden md:flex"
            style={{
              top: "50%",
              left: "-25px",
              transform: "translateY(-50%)",
            }}
            aria-label="이전 이벤트 보기"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>

          <button
            ref={nextRef}
            className="absolute z-10 bg-white shadow-lg rounded-full border border-gray-300 w-12 h-12 flex items-center justify-center hidden md:flex"
            style={{
              top: "50%",
              right: "-25px",
              transform: "translateY(-50%)",
            }}
            aria-label="다음 이벤트 보기"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>

          {/* Swiper */}
          <div className="overflow-hidden">
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={16}
              slidesPerView={1}
              slidesPerGroup={1}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              loop={true}
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
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  slidesPerGroup: 1,
                },
                1024: {
                  slidesPerView: 3,
                  slidesPerGroup: 1,
                },
              }}
              className="event-swiper"
            >
              {events.map((event) => (
                <SwiperSlide key={event.id}>
                  <div className="relative overflow-hidden rounded-xl cursor-pointer hover:shadow-lg transition-shadow group">
                    <div className="relative h-[180px] md:h-[200px]">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-contain"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        priority={event.id <= 3}
                      />
                    </div>
                  </div>
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
      </div>
    </section>
  );
}