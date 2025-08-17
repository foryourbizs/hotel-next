"use client";

import { SkipLink } from "@/components/ui/Accessibility";
import { YeogiContainer } from "@/components/ui/Container";
import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";

export default function Header() {
  const [activeTab, setActiveTab] = useState("domestic");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const tabs = [
    { id: "domestic", label: "국내 숙소" },
    { id: "overseas", label: "해외 숙소" },
    { id: "package", label: "패키지 여행", hasNew: true },
  ];

  const menuItems = [
    "국내숙소",
    "해외숙소",
    "패키지 여행",
    "항공",
    "항공+숙소",
    "렌터카갓",
    "펜션카",
    "공간대여",
    "",
    "버킷템 예약조회",
    "",
    "이벤트",
    "",
    "고객센터",
  ];

  return (
    <>
      <SkipLink href="#main-content">메인 콘텐츠로 바로가기</SkipLink>
      <header
        className="fixed top-0 z-50 w-full bg-white shadow-sm"
        role="banner"
      >
        <YeogiContainer className="px-0">
          {/* Top Navigation */}
          <div className="flex items-center justify-between h-[60px] md:h-[72px] px-4 md:px-0">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center text-2xl font-bold text-[#1D8BFF]"
            >
              ServiceName
            </Link>

            {/* Right Menu - 로그인/회원가입과 햄버거 메뉴 */}
            <div className="flex items-center gap-2 relative">
              <Link href="/login">
                <Button>로그인 / 회원가입</Button>
              </Link>

              {/* Hamburger Menu Button */}
              <button
                className="p-2"
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

                    {/* Dropdown Menu */}
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-2 bg-white z-[50] rounded-lg shadow-xl border border-gray-200 w-[240px]"
                    >
                      <div className="py-2.5">
                        {/* Menu Items */}
                        <nav>
                          {menuItems.map((item, index) => {
                            if (item === "") {
                              return (
                                <div
                                  key={index}
                                  className="h-px bg-gray-200 my-1"
                                />
                              );
                            }
                            return (
                              <button
                                key={index}
                                className="block w-full text-left text-[14px] text-gray-700 hover:bg-gray-50 px-4 py-2.5 transition-colors"
                              >
                                {item}
                              </button>
                            );
                          })}
                        </nav>

                        {/* Mobile Only - Login/SignUp */}
                        <div className="md:hidden border-t border-gray-200 pt-2 mt-2 px-4 pb-2">
                          <button className="w-full py-2 text-[14px] text-gray-700 text-left">
                            로그인
                          </button>
                          <button className="w-full py-2 text-[14px] text-[#1D8BFF] text-left">
                            회원가입
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Tab Navigation */}
          <div className="md:hidden border-b border-[#ebebeb] overflow-x-auto">
            <div className="flex min-w-max">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "px-6 py-3 text-[14px] font-medium relative whitespace-nowrap transition-colors",
                    activeTab === tab.id ? "text-[#1D8BFF]" : "text-[#616161]"
                  )}
                >
                  <span className="relative">
                    {tab.label}
                    {tab.hasNew && (
                      <span className="absolute -top-1 -right-4 bg-red-500 text-white text-[9px] px-1 rounded">
                        N
                      </span>
                    )}
                  </span>

                  <AnimatePresence>
                    {activeTab === tab.id && (
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        exit={{ scaleX: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1D8BFF] origin-center"
                      />
                    )}
                  </AnimatePresence>
                </button>
              ))}
            </div>
          </div>
        </YeogiContainer>
      </header>
    </>
  );
}
