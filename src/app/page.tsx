import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { VideoHero } from "@/components/home/VideoHero";
import { ServicesSection } from "@/components/home/ServicesSection";
import { BentoGridSection } from "@/components/home/BentoGridSection";

import { IndustriesSection } from "@/components/home/IndustriesSection";
import { StatsSection } from "@/components/home/StatsSection";
import { PricingPreview } from "@/components/home/PricingPreview";
import { CTASection } from "@/components/home/CTASection";

import { TrustBar } from "@/components/home/TrustBar";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-surface flex flex-col">
      <Header />
      <div className="flex-1">
        <VideoHero />
        <TrustBar />
        <ServicesSection />
        <IndustriesSection />
        <BentoGridSection />

        <StatsSection />
        <PricingPreview />
        <CTASection />
      </div>
      <Footer />
    </main>
  );
}
