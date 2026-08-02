"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import type { MockBanner } from "@/lib/queries";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export function HeroSlider({ banners }: { banners: MockBanner[] }) {
  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      navigation
      loop
      className="mb-8 h-48 overflow-hidden rounded-2xl md:h-80 [&_.swiper-pagination-bullet-active]:bg-brand"
    >
      {banners.map((banner) => (
        <SwiperSlide key={banner.id}>
          <Link href={banner.link} className="block h-full w-full">
            {/* eslint-disable-next-line @next/next/no-img-element -- local SVG placeholder banner */}
            <img src={banner.image} alt={banner.title} className="h-full w-full object-cover" />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
