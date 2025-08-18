"use client";

import { SkipLink } from "@/components/ui/Accessibility";
import { ServiceContainer } from "@/components/ui/Container";
import { AnimatePresence, motion } from "framer-motion";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";

export default function Header() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  // Disable body scroll when mobile menu is open
  useEffect(() => {
    if (isSideMenuOpen && window.innerWidth < 768) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isSideMenuOpen]);

  const menuItems = [
    { text: "국내숙소", hasArrow: true },
    { text: "해외숙소", hasArrow: true },
    { text: "패키지 여행", hasArrow: true, badge: "new" },
    { text: "항공", hasArrow: true },
    { text: "항공+숙소", hasArrow: true },
    { text: "레저·티켓", hasArrow: true },
    { text: "렌터카", hasArrow: true },
    { text: "공간대여", hasArrow: true },
    { text: "divider", hasArrow: false },
    { text: "비회원 예약조회", hasArrow: false },
    { text: "이벤트", hasArrow: false },
    { text: "고객센터", hasArrow: false },
  ];

  return (
    <>
      <SkipLink href="#main-content">메인 콘텐츠로 바로가기</SkipLink>
      <header
        className="fixed top-0 z-50 w-full bg-white shadow-sm"
        role="banner"
      >
        <ServiceContainer className="px-0">
          {/* Top Navigation */}
          <div className="flex items-center justify-between h-[60px] md:h-[72px] px-4 md:px-0">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center text-2xl font-bold text-primary"
            >
              ServiceName
            </Link>

            {/* Right Menu - 로그인/회원가입과 햄버거 메뉴 */}
            <div className="flex items-center gap-4 relative">
              <Link href="/login" className="hidden md:block">
                <Button>로그인 / 회원가입</Button>
              </Link>

              {/* Hamburger Menu Button */}
              <button
                onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}
                aria-label={isSideMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
                aria-expanded={isSideMenuOpen}
              >
                <Menu className="w-6 h-6" />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isSideMenuOpen && (
                  <>
                    {/* Backdrop */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="fixed inset-0 z-[45]"
                      onClick={() => setIsSideMenuOpen(false)}
                    />

                    {/* Dropdown Menu - Mobile fullscreen, Desktop dropdown */}
                    <motion.div
                      initial={{ opacity: 0, x: "100%" }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: "100%" }}
                      transition={{ duration: 0.2 }}
                      className="fixed md:hidden top-0 right-0 bottom-0 w-full bg-white z-[50] overflow-y-auto"
                    >
                      {/* Mobile close button */}
                      <div className="md:hidden flex items-center justify-end p-4">
                        <button
                          onClick={() => setIsSideMenuOpen(false)}
                          className="p-2"
                          aria-label="메뉴 닫기"
                        >
                          <svg
                            className="w-6 h-6"
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

                      <div className="h-full md:h-auto overflow-y-auto">
                        {/* Mobile Login/Signup Button */}
                        <div className="md:hidden px-4 mb-4">
                          <button className="w-full bg-primary text-white py-3 rounded-lg font-medium text-[16px]">
                            회원가입 / 로그인
                          </button>
                        </div>

                        {/* Main Menu Header */}
                        <div className="px-4 pb-2">
                          <span className="text-[12px] text-gray-500">
                            모든 여행
                          </span>
                        </div>

                        {/* Menu Items */}
                        <nav>
                          {menuItems.map((item, index) => {
                            if (item.text === "divider") {
                              return (
                                <div
                                  key={index}
                                  className="h-px bg-gray-200 my-2"
                                />
                              );
                            }
                            return (
                              <button
                                key={index}
                                className="block w-full text-left text-[16px] md:text-[15px] text-gray-800 hover:bg-gray-50 px-4 py-3 md:py-2.5 transition-colors flex items-center justify-between"
                              >
                                <div className="flex items-center">
                                  <span>{item.text}</span>
                                  {item.badge === "new" && (
                                    <span className="ml-2 text-[10px] text-primary font-bold">
                                      new
                                    </span>
                                  )}
                                </div>
                                {item.hasArrow && (
                                  <svg
                                    className="w-4 h-4 text-gray-400"
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
                                )}
                              </button>
                            );
                          })}
                        </nav>
                      </div>
                    </motion.div>

                    {/* Desktop Menu - No animation */}
                    <div className="hidden md:block absolute top-full right-0 mt-2 w-[320px] bg-white z-[50] rounded-lg shadow-xl border border-gray-200">
                      <div className="h-auto overflow-y-auto">
                        {/* Main Menu Header */}
                        <div className="px-4 pb-2 pt-4">
                          <span className="text-[12px] text-gray-500">
                            모든 여행
                          </span>
                        </div>

                        {/* Menu Items */}
                        <nav>
                          {menuItems.map((item, index) => {
                            if (item.text === "divider") {
                              return (
                                <div
                                  key={index}
                                  className="h-px bg-gray-200 my-2"
                                />
                              );
                            }
                            return (
                              <button
                                key={index}
                                className="block w-full text-left text-[15px] text-gray-800 hover:bg-gray-50 px-4 py-2.5 transition-colors flex items-center justify-between"
                              >
                                <div className="flex items-center">
                                  <span>{item.text}</span>
                                  {item.badge === "new" && (
                                    <span className="ml-2 text-[10px] text-primary font-bold">
                                      new
                                    </span>
                                  )}
                                </div>
                                {item.hasArrow && (
                                  <svg
                                    className="w-4 h-4 text-gray-400"
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
                                )}
                              </button>
                            );
                          })}
                        </nav>
                      </div>
                    </div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </ServiceContainer>
      </header>
    </>
  );
}
