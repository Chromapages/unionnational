import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { VideoHero } from "@/components/home/VideoHero";
import { ServicesSection } from "@/components/home/ServicesSection";
import { BentoGridSection } from "@/components/home/BentoGridSection";

import { IndustriesSection } from "@/components/home/IndustriesSection";
import { StatsSection } from "@/components/home/StatsSection";
import { PricingPreview } from "@/components/home/PricingPreview";
import { CTASection } from "@/components/home/CTASection";

import { TrustBar } from "@/components/home/TrustBar";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FAQSection } from "@/components/home/FAQSection";
import { FAQPageSchema } from "@/components/seo/FAQPageSchema";
import { sanityFetch } from "@/sanity/lib/live";
import { HOME_PAGE_QUERY } from "@/sanity/lib/queries";

export default async function Home() {
  const { data: homePageData } = await sanityFetch({ query: HOME_PAGE_QUERY });

  return (
    <main className="min-h-screen w-full bg-surface flex flex-col">
      <FAQPageSchema />
      <HeaderWrapper />
      <div className="flex-1">
        <VideoHero data={homePageData} />
        <TrustBar logos={homePageData?.trustLogos} />
        <ServicesSection />
        <IndustriesSection />
        <BentoGridSection />

        <StatsSection stats={homePageData?.stats} />
        <TestimonialsSection />
        <PricingPreview />
        <FAQSection />
        <CTASection data={homePageData} />
      </div>
      <Footer />
    </main>
  );
}
