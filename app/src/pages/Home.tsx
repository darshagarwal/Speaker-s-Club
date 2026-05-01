import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HeroSection from "@/sections/HeroSection";
import MissionVisionSection from "@/sections/MissionVisionSection";
import CoreValuesSection from "@/sections/CoreValuesSection";
import DifferenceSection from "@/sections/DifferenceSection";
import WhatYouGainSection from "@/sections/WhatYouGainSection";
import PromiseSection from "@/sections/PromiseSection";
import CTABannerSection from "@/sections/CTABannerSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <MissionVisionSection />
        <CoreValuesSection />
        <DifferenceSection />
        <WhatYouGainSection />
        <PromiseSection />
        <CTABannerSection />
      </main>
      <Footer />
    </div>
  );
}
