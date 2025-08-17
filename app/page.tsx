import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import EventBanner from "@/components/sections/EventBanner";
import HeroSection from "@/components/sections/HeroSection";
import HotelList from "@/components/sections/HotelList";
import PopularHotels from "@/components/sections/PopularHotels";
import QuickMenu from "@/components/sections/QuickMenu";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <QuickMenu />
        <EventBanner />
        <PopularHotels />
        <HotelList category="recommended" />
      </main>
      <Footer />
    </div>
  );
}
