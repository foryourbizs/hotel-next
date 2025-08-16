"use client";

import { useState } from "react";

const domesticDestinations = [
  { id: 1, name: "제주", image: "/images/jeju.jpg" },
  { id: 2, name: "서울", image: "/images/seoul.jpg" },
  { id: 3, name: "부산", image: "/images/busan.jpg" },
  { id: 4, name: "강릉", image: "/images/gangneung.jpg" },
  { id: 5, name: "경주", image: "/images/gyeongju.jpg" },
  { id: 6, name: "여수", image: "/images/yeosu.jpg" },
  { id: 7, name: "전주", image: "/images/jeonju.jpg" },
  { id: 8, name: "가평", image: "/images/gapyeong.jpg" },
];

const overseasDestinations = [
  { id: 1, name: "오사카", image: "/images/osaka.jpg" },
  { id: 2, name: "도쿄", image: "/images/tokyo.jpg" },
  { id: 3, name: "방콕", image: "/images/bangkok.jpg" },
  { id: 4, name: "싱가포르", image: "/images/singapore.jpg" },
  { id: 5, name: "파리", image: "/images/paris.jpg" },
  { id: 6, name: "뉴욕", image: "/images/newyork.jpg" },
  { id: 7, name: "하와이", image: "/images/hawaii.jpg" },
  { id: 8, name: "발리", image: "/images/bali.jpg" },
];

export default function PopularDestinations() {
  const [activeTab, setActiveTab] = useState<"domestic" | "overseas">("domestic");
  const destinations = activeTab === "domestic" ? domesticDestinations : overseasDestinations;

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-bold mb-4">인기 여행지</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("domestic")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === "domestic" 
                  ? "bg-pink-500 text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              국내
            </button>
            <button
              onClick={() => setActiveTab("overseas")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === "overseas" 
                  ? "bg-pink-500 text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              해외
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {destinations.map((destination) => (
            <div
              key={destination.id}
              className="cursor-pointer group"
            >
              <div className="relative overflow-hidden rounded-lg">
                <div 
                  className="h-20 md:h-24 bg-cover bg-center"
                  style={{ 
                    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.4)), url('${destination.image}')`,
                    backgroundColor: '#e0e0e0'
                  }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                </div>
                {destination.id <= 3 && (
                  <div className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1 py-0.5 rounded">
                    HOT
                  </div>
                )}
              </div>
              <p className="text-center text-sm mt-2 font-medium text-gray-700">
                {destination.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}