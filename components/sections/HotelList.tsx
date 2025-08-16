"use client";

import HotelCard from "@/components/cards/HotelCard";
import { ChevronRight } from "lucide-react";

// 샘플 데이터
const sampleHotels = {
  recommended: [
    {
      id: 1,
      name: "그랜드 하얏트 서울",
      location: "서울 용산구",
      rating: 4.8,
      reviewCount: 1234,
      price: 250000,
      originalPrice: 350000,
      discount: 30,
      image: "https://image.goodchoice.kr/images/goods/normal/5/6/5/4/1/I0000056541_s7.jpg",
      type: "호텔",
      grade: "5성급",
      badge: "베스트",
      tags: ["무료WiFi", "주차가능"],
    },
    {
      id: 2,
      name: "롯데호텔 제주",
      location: "제주 서귀포시",
      rating: 4.7,
      reviewCount: 892,
      price: 180000,
      originalPrice: 220000,
      discount: 20,
      image: "https://image.goodchoice.kr/images/goods/normal/1/1/5/0/2/I0000115026_s7.jpg",
      type: "호텔",
      grade: "5성급",
      tags: ["오션뷰", "풀"],
    },
    {
      id: 3,
      name: "부산 파크 하얏트",
      location: "부산 해운대구",
      rating: 4.9,
      reviewCount: 567,
      price: 280000,
      image: "https://image.goodchoice.kr/images/goods/normal/1/8/3/6/8/I0000183687_s7.jpg",
      type: "호텔",
      grade: "5성급",
      tags: ["해변", "스파"],
    },
    {
      id: 4,
      name: "시그니엘 서울",
      location: "서울 송파구",
      rating: 4.9,
      reviewCount: 2341,
      price: 450000,
      image: "https://image.goodchoice.kr/images/goods/normal/1/7/2/0/1/I0000172014_s7.jpg",
      type: "호텔",
      grade: "5성급",
      badge: "럭셔리",
      tags: ["시닰뷰", "라운지"],
    },
  ],
  special: [
    {
      id: 5,
      name: "신라호텔 서울",
      location: "서울 중구",
      rating: 4.8,
      reviewCount: 1567,
      price: 320000,
      originalPrice: 450000,
      discount: 35,
      image: "/images/hotel5.jpg",
      type: "5성급 호텔",
      amenities: ["wifi", "parking", "breakfast"],
      badge: "특가",
    },
    {
      id: 6,
      name: "힐튼 경주",
      location: "경주시",
      rating: 4.6,
      reviewCount: 432,
      price: 150000,
      originalPrice: 200000,
      discount: 25,
      image: "/images/hotel6.jpg",
      type: "4성급 호텔",
      amenities: ["wifi", "parking"],
      badge: "특가",
    },
    {
      id: 7,
      name: "메이필드 호텔",
      location: "서울 강서구",
      rating: 4.5,
      reviewCount: 789,
      price: 120000,
      originalPrice: 160000,
      discount: 25,
      image: "/images/hotel7.jpg",
      type: "4성급 호텔",
      amenities: ["wifi", "parking", "breakfast"],
    },
    {
      id: 8,
      name: "베스트웨스턴 제주",
      location: "제주시",
      rating: 4.4,
      reviewCount: 234,
      price: 95000,
      originalPrice: 130000,
      discount: 30,
      image: "/images/hotel8.jpg",
      type: "3성급 호텔",
      amenities: ["wifi", "parking"],
      badge: "특가",
    },
  ],
  new: [
    {
      id: 9,
      name: "페어필드 바이 메리어트",
      location: "서울 영등포구",
      rating: 4.7,
      reviewCount: 123,
      price: 180000,
      image: "/images/hotel9.jpg",
      type: "4성급 호텔",
      amenities: ["wifi", "parking", "breakfast"],
      badge: "신규 오픈",
    },
    {
      id: 10,
      name: "몬드리안 서울 이태원",
      location: "서울 용산구",
      rating: 4.8,
      reviewCount: 89,
      price: 220000,
      image: "/images/hotel10.jpg",
      type: "5성급 호텔",
      amenities: ["wifi", "parking"],
      badge: "신규 오픈",
    },
    {
      id: 11,
      name: "안다즈 강남",
      location: "서울 강남구",
      rating: 4.9,
      reviewCount: 45,
      price: 380000,
      image: "/images/hotel11.jpg",
      type: "5성급 호텔",
      amenities: ["wifi", "parking", "breakfast"],
      badge: "신규 오픈",
    },
    {
      id: 12,
      name: "AC 호텔 서울 강남",
      location: "서울 강남구",
      rating: 4.6,
      reviewCount: 67,
      price: 160000,
      image: "/images/hotel12.jpg",
      type: "4성급 호텔",
      amenities: ["wifi", "parking"],
      badge: "신규 오픈",
    },
  ],
};

interface HotelListProps {
  title: string;
  category: "recommended" | "special" | "new";
  showMore?: boolean;
}

export default function HotelList({ title, category, showMore = true }: HotelListProps) {
  const hotels = sampleHotels[category];

  if (!title) {
    // When used as inline grid items
    return (
      <>
        {hotels.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </>
    );
  }

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
          {showMore && (
            <button className="text-sm text-gray-600 hover:text-pink-500 flex items-center">
              더보기
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {hotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </div>
    </section>
  );
}