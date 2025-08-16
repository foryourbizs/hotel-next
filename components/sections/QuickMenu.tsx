"use client";

import { useState } from 'react';
import Image from 'next/image';
import { HoverScale, StaggeredFadeIn } from '@/components/ui/Animation';
import { SectionContainer } from '@/components/ui/Container';
import { AccessibleButton, AccessibleHeading, ScreenReaderOnly } from '@/components/ui/Accessibility';

const categories = [
  { 
    id: 1, 
    name: "모텔", 
    icon: "/images/categories/motel.svg"
  },
  { 
    id: 2, 
    name: "호텔·리조트", 
    icon: "/images/categories/hotel.svg"
  },
  { 
    id: 3, 
    name: "펜션", 
    icon: "/images/categories/pension.svg"
  },
  { 
    id: 4, 
    name: "게스트하우스", 
    icon: "/images/categories/guesthouse.svg"
  },
  { 
    id: 5, 
    name: "캠핑·글램핑", 
    icon: "/images/categories/camping.svg"
  },
  { 
    id: 6, 
    name: "한옥", 
    icon: "/images/categories/hanok.svg"
  },
  { 
    id: 7, 
    name: "내주변", 
    icon: "/images/categories/nearby.svg"
  },
  { 
    id: 8, 
    name: "홈·빌라", 
    icon: "/images/categories/villa.svg"
  },
];

export default function QuickMenu() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategory(categoryId);
    console.log("선택된 카테고리:", categories.find(c => c.id === categoryId)?.name);
  };

  return (
    <SectionContainer 
      background="white" 
      className="py-6 md:py-8"
    >
      <AccessibleHeading 
        level={2} 
        id="quick-menu-heading"
        className="sr-only"
      >
        숙소 카테고리 선택
      </AccessibleHeading>
      
      {/* Mobile: 4 columns, Desktop: 8 columns */}
      <StaggeredFadeIn 
        className="grid grid-cols-4 md:grid-cols-8 gap-3 md:gap-4"
      >
        {categories.map((category) => (
          <HoverScale key={category.id}>
            <AccessibleButton
              variant="ghost"
              onClick={() => handleCategoryClick(category.id)}
              className={`flex flex-col items-center justify-center p-3 md:p-4 rounded-lg transition-all duration-300 ${
                selectedCategory === category.id 
                  ? 'bg-[#F0F7FF] border-2 border-[#1D8BFF]' 
                  : 'hover:bg-[#F7F7F7] border-2 border-transparent'
              }`}
              aria-pressed={selectedCategory === category.id}
              aria-describedby={`category-${category.id}-description`}
            >
              <div className="w-[40px] h-[40px] md:w-[48px] md:h-[48px] mb-2 md:mb-3">
                <Image 
                  src={category.icon} 
                  alt=""
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                  aria-hidden="true"
                />
              </div>
              <span className={`text-[11px] md:text-[13px] font-medium text-center transition-colors ${
                selectedCategory === category.id 
                  ? 'text-[#1D8BFF]' 
                  : 'text-[#616161]'
              }`}>
                {category.name}
              </span>
              
              <ScreenReaderOnly>
                {selectedCategory === category.id ? '선택됨' : '선택하려면 클릭하세요'}
              </ScreenReaderOnly>
            </AccessibleButton>
          </HoverScale>
        ))}
      </StaggeredFadeIn>
    </SectionContainer>
  );
}