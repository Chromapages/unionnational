import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { VideoHero } from "@/components/home/VideoHero";
import { DifferentiationSection } from "@/components/home/DifferentiationSection";
import { NationwideServiceSection } from "@/components/home/NationwideServiceSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { BentoGridSection } from "@/components/home/BentoGridSection";
import { StickyCTABar } from "@/components/home/StickyCTABar";

import { IndustriesSection } from "@/components/home/IndustriesSection";
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
        <DifferentiationSection />
        <NationwideServiceSection />
        <ServicesSection />
        <IndustriesSection />
        <BentoGridSection />

        <TestimonialsSection />
        <FAQSection />
        <CTASection data={homePageData} />
      </div>
      <StickyCTABar data={homePageData} />
      <Footer />
    </main>
  );
}
