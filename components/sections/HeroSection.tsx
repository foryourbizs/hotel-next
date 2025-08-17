"use client";

import {
  AccessibleHeading,
  LiveRegion,
  ScreenReaderOnly,
} from "@/components/ui/Accessibility";
import { FadeIn, SlideUp } from "@/components/ui/Animation";
import { Button } from "@/components/ui/button";
import { YeogiContainer } from "@/components/ui/Container";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2명");
  const [searchStatus, setSearchStatus] = useState("");

  const heroRef = useRef<HTMLElement>(null);
  // useIntersectionObserver(heroRef, { threshold: 0.3 });

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchStatus("지역이나 숙소명을 입력해주세요.");
      return;
    }
    if (!checkIn || !checkOut) {
      setSearchStatus("체크인, 체크아웃 날짜를 선택해주세요.");
      return;
    }

    setSearchStatus("검색 중...");
    console.log("검색:", { searchQuery, checkIn, checkOut, guests });

    // 실제 검색 로직이 여기 들어갈 예정
    setTimeout(() => {
      setSearchStatus("검색이 완료되었습니다.");
    }, 1000);
  };

  return (
    <>
      <LiveRegion>{searchStatus}</LiveRegion>

      <section
        ref={heroRef}
        className="relative mt-[112px] md:mt-[74px]"
        role="banner"
        aria-labelledby="hero-heading"
      >
        {/* Hero Background with Search */}
        <div
          className="relative h-[400px] md:h-[500px] lg:h-[536px] bg-cover bg-center"
          style={{
            backgroundImage: `url('https://picsum.photos/1920/1080?random=hero')`,
          }}
          role="img"
          aria-label="ServiceName 메인 배경 이미지"
        >
          {/* Gradient overlay - pointer-events-none로 클릭 이벤트 통과 */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 pointer-events-none" />

          <YeogiContainer className="relative h-full flex flex-col justify-center z-10">
            <FadeIn delay={0.2}>
              <AccessibleHeading
                level={1}
                id="hero-heading"
                className="mb-6 md:mb-8 text-center md:text-left text-[28px] md:text-[40px] lg:text-[48px] font-bold text-white leading-tight"
              >
                합리적인 호텔부터 특가 할인까지,
                <br />
                여행할때 ServiceName
              </AccessibleHeading>
            </FadeIn>

            {/* Enhanced Search Bar */}
            <SlideUp delay={0.4}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearch();
                }}
                className="bg-white rounded-lg shadow-xl p-4 md:p-6 max-w-full md:max-w-[700px] mx-auto md:mx-0"
                role="search"
                aria-labelledby="search-form-heading"
              >
                <ScreenReaderOnly>
                  <AccessibleHeading level={2} id="search-form-heading">
                    숙소 검색 폼
                  </AccessibleHeading>
                </ScreenReaderOnly>

                {/* Mobile: Vertical Layout */}
                <div className="md:hidden space-y-3">
                  <Input
                    placeholder="지역, 숙소명"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-12"
                    aria-label="지역 또는 숙소명 입력"
                    aria-required="true"
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      placeholder="체크인"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="h-12"
                      aria-label="체크인 날짜 선택"
                      aria-required="true"
                    />
                    <Input
                      placeholder="체크아웃"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="h-12"
                      aria-label="체크아웃 날짜 선택"
                      aria-required="true"
                    />
                  </div>

                  <Input
                    placeholder={guests}
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="h-12"
                    aria-label="투숙 인원 선택"
                  />

                  <Button
                    type="submit"
                    className="h-12 text-[16px] font-bold rounded-lg w-full"
                  >
                    검색하기
                  </Button>
                  <ScreenReaderOnly>
                    입력한 조건으로 숙소를 검색합니다
                  </ScreenReaderOnly>
                </div>

                {/* Desktop: Horizontal Layout */}
                <div className="hidden md:block">
                  <div className="grid grid-cols-4 gap-3 mb-4">
                    <Input
                      placeholder="지역, 숙소명"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-14"
                      aria-label="지역 또는 숙소명 입력"
                      aria-required="true"
                    />
                    <Input
                      placeholder="체크인"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="h-14"
                      aria-label="체크인 날짜 선택"
                      aria-required="true"
                    />
                    <Input
                      placeholder="체크아웃"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="h-14"
                      aria-label="체크아웃 날짜 선택"
                      aria-required="true"
                    />
                    <Input
                      placeholder={guests}
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="h-14"
                      aria-label="투숙 인원 선택"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="h-14 text-[16px] font-bold rounded-lg w-full"
                  >
                    검색하기
                  </Button>
                </div>
              </form>
            </SlideUp>
          </YeogiContainer>
        </div>
      </section>
    </>
  );
}
