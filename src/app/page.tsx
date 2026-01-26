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
import { JsonLd } from "@/components/seo/JsonLd";
import { sanityFetch } from "@/sanity/lib/live";
import { HOME_PAGE_QUERY, SERVICES_QUERY, SITE_SETTINGS_QUERY, TESTIMONIALS_QUERY } from "@/sanity/lib/queries";
import type { Metadata } from "next";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import { urlFor } from "@/sanity/lib/image";

export async function generateMetadata(): Promise<Metadata> {
  const { data: homePageData } = await sanityFetch({ query: HOME_PAGE_QUERY });
  const seo = homePageData?.seo;

  if (!seo) {
    return {
      title: "Union National Tax",
    };
  }

  const ogImage = seo.openGraphImage
    ? urlFor(seo.openGraphImage).width(1200).height(630).url()
    : undefined;

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    openGraph: {
      ...(seo.metaTitle ? { title: seo.metaTitle } : {}),
      ...(seo.metaDescription ? { description: seo.metaDescription } : {}),
      ...(ogImage ? { images: [ogImage] } : {}),
    },
    twitter: {
      ...(seo.metaTitle ? { title: seo.metaTitle } : {}),
      ...(seo.metaDescription ? { description: seo.metaDescription } : {}),
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

export default async function Home() {
  const { data: homePageData } = await sanityFetch({ query: HOME_PAGE_QUERY });
  const { data: services } = await sanityFetch({ query: SERVICES_QUERY });
  const { data: testimonials } = await sanityFetch({ query: TESTIMONIALS_QUERY });
  const { data: siteSettings } = await sanityFetch({ query: SITE_SETTINGS_QUERY });

  return (
    <main className="min-h-dvh w-full bg-surface flex flex-col">
      <FAQPageSchema />
      <JsonLd siteSettings={siteSettings} homePageData={homePageData} />
      <HeaderWrapper />
      <div className="flex-1">
        <ErrorBoundary name="Hero Section">
          <VideoHero data={homePageData} />
        </ErrorBoundary>

        <ErrorBoundary name="Trust Bar">
          <TrustBar logos={homePageData?.trustLogos} />
        </ErrorBoundary>

        <DifferentiationSection />
        <NationwideServiceSection />

        <ErrorBoundary name="Services Section">
          <ServicesSection services={services} />
        </ErrorBoundary>

        <IndustriesSection />
        <BentoGridSection stats={homePageData?.stats} />

        <ErrorBoundary name="Testimonials">
          <TestimonialsSection testimonials={testimonials} />
        </ErrorBoundary>

        <FAQSection />
        <CTASection data={homePageData} />
      </div>
      <StickyCTABar data={homePageData} />
      <Footer />
    </main>
  );
}
