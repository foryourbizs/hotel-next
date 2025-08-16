import Header from "@/components/layout/Header";
import HeroSection from "@/components/sections/HeroSection";
import QuickMenu from "@/components/sections/QuickMenu";
import EventBanner from "@/components/sections/EventBanner";
import HotelList from "@/components/sections/HotelList";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <QuickMenu />
        <EventBanner />
        <div className="bg-white py-8">
          <div className="max-w-[1200px] mx-auto px-5 md:px-10">
            <h2 className="text-[20px] font-bold mb-6">추천 숙소</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <HotelList 
                title="" 
                category="recommended"
                showMore={false}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}