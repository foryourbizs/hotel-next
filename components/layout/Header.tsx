"use client";

import { AccessibleButton, SkipLink } from "@/components/ui/Accessibility";
import { YeogiContainer } from "@/components/ui/Container";
import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [activeTab, setActiveTab] = useState("domestic");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tabs = [
    { id: "domestic", label: "국내 숙소" },
    { id: "overseas", label: "해외 숙소" },
    { id: "package", label: "패키지 여행", hasNew: true },
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
            <Link href="/" className="flex items-center">
              <Image
                src="/images/yeogi-logo.svg"
                alt="ServiceName"
                width={120}
                height={36}
                className="h-[28px] md:h-[36px] w-auto"
                priority
              />
            </Link>

            {/* Desktop Right Menu */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="text-[14px] text-[#616161] hover:text-black transition-colors">
                내주변 예약
              </button>
              <button className="text-[14px] text-[#616161] hover:text-black transition-colors">
                로그인
              </button>
            </div>

            {/* Mobile Menu Button */}
            <AccessibleButton
              variant="ghost"
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 12h18M3 6h18M3 18h18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </AccessibleButton>
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

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white border-t border-[#ebebeb] shadow-lg"
            >
              <div className="px-4 py-3 space-y-3">
                <button className="block w-full text-left text-[14px] text-[#616161] py-2">
                  내주변 예약
                </button>
                <button className="block w-full text-left text-[14px] text-[#616161] py-2">
                  로그인
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
