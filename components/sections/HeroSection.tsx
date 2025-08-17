"use client";

import {
  AccessibleHeading,
  LiveRegion,
  ScreenReaderOnly,
} from "@/components/ui/Accessibility";
import { FadeIn, SlideUp } from "@/components/ui/Animation";
import { Button } from "@/components/ui/button";
import { YeogiContainer } from "@/components/ui/Container";
import { useRef, useState } from "react";

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [searchStatus, setSearchStatus] = useState("");
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [guestCount, setGuestCount] = useState(2);
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 7)); // August 2025
  const [selectingCheckIn, setSelectingCheckIn] = useState(true);

  const recentSearches = ["리츠 모텔", "신림역"];
  const popularSearches = [
    "강릉",
    "부산",
    "속초",
    "경주",
    "광안리",
    "여수",
    "서울",
    "전주",
    "포항",
  ];

  const heroRef = useRef<HTMLElement>(null);
  // useIntersectionObserver(heroRef, { threshold: 0.3 });

  // Helper functions for calendar
  const formatDate = (date: Date | null) => {
    if (!date) return "";
    const months = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
    ];
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    const month = months[date.getMonth()];
    const day = date.getDate().toString().padStart(2, "0");
    const dayName = days[date.getDay()];
    return `${month}.${day} ${dayName}`;
  };

  const formatDateRange = () => {
    if (!checkIn && !checkOut) return "";
    if (checkIn && !checkOut) return `${formatDate(checkIn)} - 체크아웃 선택`;
    if (checkIn && checkOut) {
      const nights = Math.ceil(
        (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
      );
      return `${formatDate(checkIn)} - ${formatDate(checkOut)} (${nights}박)`;
    }
    return "";
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };


  const isRangeStart = (date: Date) => {
    return checkIn && date.getTime() === checkIn.getTime();
  };

  const isRangeEnd = (date: Date) => {
    return checkOut && date.getTime() === checkOut.getTime();
  };

  const isRangeMiddle = (date: Date) => {
    if (!checkIn || !checkOut) return false;
    return date > checkIn && date < checkOut;
  };

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const handleDateClick = (date: Date) => {
    if (isDateDisabled(date)) return;

    if (selectingCheckIn || !checkIn) {
      setCheckIn(date);
      setCheckOut(null);
      setSelectingCheckIn(false);
    } else {
      if (date < checkIn) {
        setCheckIn(date);
        setCheckOut(null);
        setSelectingCheckIn(false);
      } else {
        setCheckOut(date);
        setSelectingCheckIn(true);
        // Close the date modal after selecting both dates
        setTimeout(() => {
          setShowDateModal(false);
        }, 300); // Small delay for better UX
      }
    }
  };

  const handleMonthChange = (direction: "prev" | "next") => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev);
      if (direction === "prev") {
        newMonth.setMonth(prev.getMonth() - 1);
      } else {
        newMonth.setMonth(prev.getMonth() + 1);
      }
      return newMonth;
    });
  };

  const renderCalendar = (monthOffset: number = 0) => {
    const displayMonth = new Date(currentMonth);
    displayMonth.setMonth(currentMonth.getMonth() + monthOffset);

    const year = displayMonth.getFullYear();
    const month = displayMonth.getMonth();
    const daysInMonth = getDaysInMonth(displayMonth);
    const firstDay = getFirstDayOfMonth(displayMonth);

    const monthNames = [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ];

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-10 h-10"></div>);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isDisabled = isDateDisabled(date);
      const isStart = isRangeStart(date);
      const isEnd = isRangeEnd(date);
      const isMiddle = isRangeMiddle(date);
      const isToday = date.toDateString() === new Date().toDateString();
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;

      let buttonClassName =
        "w-10 h-10 flex items-center justify-center cursor-pointer text-sm relative";
      const wrapperClassName = "relative w-10 h-10";

      // Button text color
      if (isDisabled) {
        buttonClassName += " text-gray-300 cursor-not-allowed";
      } else if (isStart || isEnd) {
        buttonClassName += " text-white font-bold z-20";
      } else if (isMiddle) {
        buttonClassName += " text-primary font-medium";
      } else if (isWeekend) {
        buttonClassName += " text-red-500 hover:bg-gray-100 hover:rounded-full";
      } else {
        buttonClassName +=
          " text-gray-700 hover:bg-gray-100 hover:rounded-full";
      }

      days.push(
        <div key={day} className={wrapperClassName}>
          {/* Range background - only show when both dates are selected */}
          {checkIn && checkOut && (isStart || isMiddle || isEnd) && (
            <div className="absolute inset-0 pointer-events-none">
              {isStart && !isEnd && (
                <div
                  className="absolute top-0 h-10 bg-[#E3F2FD] rounded-l-full"
                  style={{
                    left: "0",
                    right: "-50%",
                    width: "calc(100% + 20px)",
                  }}
                ></div>
              )}
              {isEnd && !isStart && (
                <div
                  className="absolute top-0 h-10 bg-[#E3F2FD] rounded-r-full"
                  style={{
                    left: "-50%",
                    right: "0",
                    width: "calc(100% + 20px)",
                  }}
                ></div>
              )}
              {isMiddle && (
                <div
                  className="absolute top-0 h-10 bg-[#E3F2FD]"
                  style={{
                    left: "-50%",
                    right: "-50%",
                    width: "calc(100% + 40px)",
                  }}
                ></div>
              )}
              {(isStart || isEnd) && (
                <div className="absolute top-0 left-0 w-10 h-10 bg-primary rounded-full z-10"></div>
              )}
            </div>
          )}

          {/* Single date selection - only check-in selected */}
          {checkIn && !checkOut && isStart && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-0 w-10 h-10 bg-primary rounded-full z-10"></div>
            </div>
          )}

          {/* Button */}
          <button
            className={buttonClassName}
            onClick={() => handleDateClick(date)}
            disabled={isDisabled}
            style={{ position: "relative", zIndex: 20 }}
          >
            {day}
            {isToday && !isStart && !isEnd && (
              <div className="absolute bottom-1 w-1 h-1 bg-primary rounded-full"></div>
            )}
          </button>
        </div>
      );
    }

    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          {monthOffset === 0 ? (
            <button
              className="p-2 hover:bg-gray-100 rounded"
              onClick={() => handleMonthChange("prev")}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          ) : (
            <div className="w-9"></div>
          )}

          <h3 className="text-lg font-bold">
            {year}년 {monthNames[month]}
          </h3>

          {monthOffset === 1 ? (
            <button
              className="p-2 hover:bg-gray-100 rounded"
              onClick={() => handleMonthChange("next")}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          ) : (
            <div className="w-9"></div>
          )}
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-sm text-gray-500 mb-2">
          <div>일</div>
          <div>월</div>
          <div>화</div>
          <div>수</div>
          <div>목</div>
          <div>금</div>
          <div>토</div>
        </div>
        <div className="grid grid-cols-7">{days}</div>
      </div>
    );
  };

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
    console.log("검색:", {
      searchQuery,
      checkIn: formatDate(checkIn),
      checkOut: formatDate(checkOut),
      guests: guestCount,
    });

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
                className="mb-6 md:mb-8 text-center md:text-left text-[28px] md:text-[40px] lg:text-[48px] font-bold text-white leading-tight select-none pointer-events-none"
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
                className="w-full bg-white rounded-2xl shadow-xl p-4 md:p-5 max-w-[1200px] mx-auto"
                role="search"
                aria-labelledby="search-form-heading"
              >
                <ScreenReaderOnly>
                  <AccessibleHeading level={2} id="search-form-heading">
                    숙소 검색 폼
                  </AccessibleHeading>
                </ScreenReaderOnly>

                {/* Search Inputs */}
                <div className="flex flex-col md:flex-row gap-3">
                  {/* Location Search */}
                  <div className="flex-1 relative">
                    <div className="relative">
                      <svg
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                      <input
                        type="text"
                        placeholder="여행지나 숙소를 검색해보세요."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setShowSearchModal(true)}
                        onBlur={() => setShowSearchModal(false)}
                        className="w-full h-14 pl-12 pr-4 bg-gray-50 rounded-lg text-[15px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                        aria-label="지역 또는 숙소명 입력"
                        aria-required="true"
                      />

                      {/* Search Dropdown */}
                      {showSearchModal && (
                        <div
                          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-200 z-50"
                        >
                          <div className="p-6">
                            {/* Recent Searches */}
                            <div className="mb-6">
                              <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-gray-900">
                                  최근 검색 조건
                                </h3>
                                <button className="text-sm text-gray-500">
                                  전체삭제
                                </button>
                              </div>
                              <div className="space-y-3">
                                {recentSearches.map((search, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center justify-between"
                                  >
                                    <button
                                      className="flex items-center gap-3 flex-1 text-left hover:bg-gray-50 -ml-2 pl-2 py-1 rounded"
                                      onMouseDown={(e) => {
                                        e.preventDefault();
                                        setSearchQuery(search);
                                        setTimeout(() => {
                                          setShowSearchModal(false);
                                        }, 0);
                                      }}
                                    >
                                      <svg
                                        className="w-5 h-5 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                      </svg>
                                      <span className="text-[15px] text-gray-700">
                                        {search}
                                      </span>
                                    </button>
                                    <button className="text-gray-400 hover:text-gray-600 p-1">
                                      <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M6 18L18 6M6 6l12 12"
                                        />
                                      </svg>
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Popular Searches */}
                            <div>
                              <h3 className="text-lg font-bold text-gray-900 mb-4">
                                ServiceName 검색 순위
                              </h3>
                              <div className="space-y-3">
                                {popularSearches.map((search, index) => (
                                  <button
                                    key={index}
                                    className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 -mx-2 px-2 py-1 rounded w-full text-left"
                                    onMouseDown={(e) => {
                                      e.preventDefault();
                                      setSearchQuery(search);
                                      setTimeout(() => {
                                        setShowSearchModal(false);
                                      }, 0);
                                    }}
                                  >
                                    <span className="text-[15px] font-medium text-gray-900 w-4">
                                      {index + 1}
                                    </span>
                                    <span className="text-[15px] text-gray-700">
                                      {search}
                                    </span>
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Date Picker */}
                  <div className="md:w-[300px] relative">
                    <div className="relative">
                      <svg
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <input
                        type="text"
                        placeholder="08.16 토 - 08.17 일 (1박)"
                        value={formatDateRange()}
                        onFocus={() => setShowDateModal(true)}
                        onBlur={() => setShowDateModal(false)}
                        className="w-full h-14 pl-12 pr-4 bg-gray-50 rounded-lg text-[15px] placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                        aria-label="체크인 체크아웃 날짜 선택"
                        aria-required="true"
                        readOnly
                      />

                      {/* Date Dropdown */}
                      {showDateModal && (
                        <div
                          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-200 z-50 w-[600px]"
                          onMouseDown={(e) => e.preventDefault()}
                        >
                          <div className="p-6">
                            {/* Calendar */}
                            <div className="grid grid-cols-2 gap-8">
                              {renderCalendar(0)}
                              {renderCalendar(1)}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Guest Count */}
                  <div className="md:w-[120px] relative">
                    <div className="relative">
                      <svg
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <input
                        type="text"
                        placeholder="인원 2"
                        value={`인원 ${guestCount}`}
                        onFocus={() => setShowGuestModal(true)}
                        onBlur={() => setShowGuestModal(false)}
                        className="w-full h-14 pl-12 pr-4 bg-gray-50 rounded-lg text-[15px] placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                        aria-label="투숙 인원 선택"
                        readOnly
                      />

                      {/* Guest Dropdown */}
                      {showGuestModal && (
                        <div
                          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-200 z-50 w-[280px]"
                          onMouseDown={(e) => e.preventDefault()}
                        >
                          <div className="p-6">
                            {/* Guest Counter */}
                            <div>
                              <h3 className="text-lg font-bold text-gray-900 mb-2">
                                인원
                              </h3>
                              <p className="text-sm text-gray-500 mb-4">
                                유아 및 아동도 인원수에 포함해주세요.
                              </p>

                              <div className="flex items-center justify-between">
                                <button
                                  onClick={() =>
                                    setGuestCount(Math.max(1, guestCount - 1))
                                  }
                                  className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:border-gray-300"
                                >
                                  <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M20 12H4"
                                    />
                                  </svg>
                                </button>

                                <span className="text-2xl font-bold text-gray-900">
                                  {guestCount}
                                </span>

                                <button
                                  onClick={() => setGuestCount(guestCount + 1)}
                                  className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:border-gray-300"
                                >
                                  <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M12 4v16m8-8H4"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Search Button */}
                  <Button
                    type="submit"
                    className="h-14 px-8 text-[16px] font-bold rounded-lg bg-primary hover:bg-primary-hover text-white"
                  >
                    검색
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
