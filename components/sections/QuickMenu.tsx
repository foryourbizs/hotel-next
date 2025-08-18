"use client";

import {
  AccessibleButton,
  AccessibleHeading,
  ScreenReaderOnly,
} from "@/components/ui/Accessibility";
import { HoverScale, StaggeredFadeIn } from "@/components/ui/Animation";
import { SectionContainer } from "@/components/ui/Container";
import Image from "next/image";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const categories = [
  {
    id: 1,
    name: "모텔",
    icon: "/images/categories/motel.svg",
  },
  {
    id: 2,
    name: "호텔·리조트",
    icon: "/images/categories/hotel.svg",
  },
  {
    id: 3,
    name: "펜션",
    icon: "/images/categories/pension.svg",
  },
  {
    id: 4,
    name: "게스트하우스",
    icon: "/images/categories/guesthouse.svg",
  },
  {
    id: 5,
    name: "캠핑·글램핑",
    icon: "/images/categories/camping.svg",
  },
  {
    id: 6,
    name: "한옥",
    icon: "/images/categories/hanok.svg",
  },
  {
    id: 7,
    name: "내주변",
    icon: "/images/categories/nearby.svg",
  },
  {
    id: 8,
    name: "홈·빌라",
    icon: "/images/categories/villa.svg",
  },
];

// Separate component for handling image state
function CategoryImage({ icon, name }: { icon: string; name: string }) {
  const [imgSrc, setImgSrc] = useState(icon || "/ph.png");
  
  return (
    <Image
      src={imgSrc}
      alt=""
      width={48}
      height={48}
      className="w-full h-full object-contain"
      aria-hidden="true"
      onError={() => setImgSrc("/ph.png")}
    />
  );
}

export default function QuickMenu() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategory(categoryId);
    console.log(
      "선택된 카테고리:",
      categories.find((c) => c.id === categoryId)?.name
    );
  };

  return (
    <SectionContainer
      background="white"
      className="py-0 md:py-0 lg:py-0 pt-6 md:pt-6 lg:pt-6"
    >
      <AccessibleHeading level={2} id="quick-menu-heading" className="sr-only">
        숙소 카테고리 선택
      </AccessibleHeading>

      {/* Mobile: Swiper, Desktop: Grid */}
      {isMobile ? (
        <div className="relative min-h-[70px]">
          <Swiper
            modules={[FreeMode]}
            spaceBetween={8}
            slidesPerView={4.5}
            freeMode={true}
            className={`quick-menu-swiper ${isInitialized ? 'swiper-initialized' : ''}`}
            onInit={() => setIsInitialized(true)}
          >
            {categories.map((category) => (
              <SwiperSlide key={category.id}>
                <AccessibleButton
                  variant="ghost"
                  onClick={() => handleCategoryClick(category.id)}
                  className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-300 w-full ${
                    selectedCategory === category.id
                      ? "bg-primary-light"
                      : "hover:bg-[#F7F7F7]"
                  }`}
                  aria-pressed={selectedCategory === category.id}
                  aria-describedby={`category-${category.id}-description`}
                >
                  <div className="w-[40px] h-[40px] mb-1">
                    <CategoryImage icon={category.icon} name={category.name} />
                  </div>
                  <span
                    className={`text-[11px] font-medium text-center transition-colors ${
                      selectedCategory === category.id
                        ? "text-primary"
                        : "text-[#616161]"
                    }`}
                  >
                    {category.name}
                  </span>

                  <ScreenReaderOnly>
                    {selectedCategory === category.id
                      ? "선택됨"
                      : "선택하려면 클릭하세요"}
                  </ScreenReaderOnly>
                </AccessibleButton>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <StaggeredFadeIn className="grid grid-cols-8 gap-3">
          {categories.map((category) => (
            <HoverScale key={category.id}>
              <AccessibleButton
                variant="ghost"
                onClick={() => handleCategoryClick(category.id)}
                className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-primary-light"
                    : "hover:bg-[#F7F7F7]"
                }`}
                aria-pressed={selectedCategory === category.id}
                aria-describedby={`category-${category.id}-description`}
              >
                <div className="w-[48px] h-[48px] mb-2">
                  <CategoryImage icon={category.icon} name={category.name} />
                </div>
                <span
                  className={`text-[13px] font-medium text-center transition-colors ${
                    selectedCategory === category.id
                      ? "text-primary"
                      : "text-[#616161]"
                  }`}
                >
                  {category.name}
                </span>

                <ScreenReaderOnly>
                  {selectedCategory === category.id
                    ? "선택됨"
                    : "선택하려면 클릭하세요"}
                </ScreenReaderOnly>
              </AccessibleButton>
            </HoverScale>
          ))}
        </StaggeredFadeIn>
      )}
    </SectionContainer>
  );
}
