"use client";

import Image from 'next/image';

const events = [
  {
    id: 1,
    title: "오늘은 쿠폰 받고",
    subtitle: "내일은 할인 받고",
    bgColor: "#B6E3FF",
    image: "https://picsum.photos/400/140?random=event1",
  },
  {
    id: 2,
    title: "포인트 2배 리뷰",
    subtitle: "리뷰 쓰고 최대 2,000P",
    bgColor: "#FFE3E1",
    image: "https://picsum.photos/400/140?random=event2",
  },
  {
    id: 3,
    title: "예약 안심보장제",
    subtitle: "안심하고 예약하세요",
    bgColor: "#E1F5EA",
    image: "https://picsum.photos/400/140?random=event3",
  },
];

export default function EventBanner() {
  return (
    <section className="py-8">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <h2 className="text-[20px] font-bold mb-6">이벤트</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="relative overflow-hidden rounded-[8px] cursor-pointer hover:shadow-lg transition-shadow"
              style={{ backgroundColor: event.bgColor }}
            >
              <div className="h-[140px] relative">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
