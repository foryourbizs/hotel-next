"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const promotions = [
  {
    id: 1,
    title: "국내 인기 호텔",
    subtitle: "최대 50% 할인",
    bgColor: "bg-gradient-to-r from-blue-400 to-blue-600",
    image: "/images/promo1.jpg"
  },
  {
    id: 2,
    title: "해외 특가 호텔",
    subtitle: "얼리버드 할인 중",
    bgColor: "bg-gradient-to-r from-purple-400 to-pink-600",
    image: "/images/promo2.jpg"
  },
  {
    id: 3,
    title: "제주도 풀빌라",
    subtitle: "여름 성수기 예약 오픈",
    bgColor: "bg-gradient-to-r from-green-400 to-teal-600",
    image: "/images/promo3.jpg"
  },
];

export default function PromotionBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % promotions.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + promotions.length) % promotions.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % promotions.length);
  };

  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {promotions.map((promo) => (
              <div
                key={promo.id}
                className={`w-full flex-shrink-0 h-[200px] md:h-[300px] ${promo.bgColor} relative`}
              >
                <div className="absolute inset-0 flex items-center justify-between px-8 md:px-16">
                  <div className="text-white">
                    <h2 className="text-2xl md:text-4xl font-bold mb-2">
                      {promo.title}
                    </h2>
                    <p className="text-lg md:text-xl opacity-90">
                      {promo.subtitle}
                    </p>
                    <button className="mt-4 bg-white text-gray-800 px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition">
                      자세히 보기
                    </button>
                  </div>
                  <div className="hidden md:block">
                    <div className="w-64 h-48 bg-white/20 rounded-lg backdrop-blur-sm" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition"
          >
            <ChevronLeft className="h-6 w-6 text-gray-800" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition"
          >
            <ChevronRight className="h-6 w-6 text-gray-800" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {promotions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 w-2 rounded-full transition-all ${
                  index === currentSlide 
                    ? "bg-white w-8" 
                    : "bg-white/50 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}