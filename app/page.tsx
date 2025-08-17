import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import HeroSection from "@/components/sections/HeroSection";
import HotelList from "@/components/sections/HotelList";
import PopularHotels from "@/components/sections/PopularHotels";
import QuickMenu from "@/components/sections/QuickMenu";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      <main>
        <HeroSection />
        <QuickMenu />
        <HotelList category="recommended" />
        <PopularHotels />
      </main>
      <Footer />
    </div>
  );
}
