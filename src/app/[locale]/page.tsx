import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { VideoHero } from "@/components/home/VideoHero";
import { TrustBar } from "@/components/home/TrustBar";
import { CTASection } from "@/components/home/CTASection";
import { ExitIntentModal } from "@/components/home/ExitIntentModal";
import { JsonLd } from "@/components/seo/JsonLd";
import { sanityFetch } from "@/sanity/lib/live";
import { HOME_PAGE_QUERY, SERVICES_QUERY, SITE_SETTINGS_QUERY, TESTIMONIALS_QUERY } from "@/sanity/lib/queries";
import type { Metadata } from "next";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import { urlFor } from "@/sanity/lib/image";
import { Suspense } from "react";

import { WhyUsSection } from "@/components/home/WhyUsSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";

export const dynamicParams = true;

export const revalidate = 60;

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const { data: homePageData } = await sanityFetch({ query: HOME_PAGE_QUERY, params: { locale } });
  const seo = homePageData?.seo;

  if (!seo) {
    return {
      title: "Union National Tax",
    };
  }

  const ogImage = seo.openGraphImage
    ? urlFor(seo.openGraphImage).width(1200).height(630).url()
    : undefined;

  const baseUrl = "https://unionnationaltax.com";
  const canonicalUrl = `${baseUrl}/${locale}`;

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${baseUrl}/en`,
        es: `${baseUrl}/es`,
      },
    },
    openGraph: {
      ...(seo.metaTitle ? { title: seo.metaTitle } : {}),
      ...(seo.metaDescription ? { description: seo.metaDescription } : {}),
      ...(ogImage ? { images: [ogImage] } : {}),
      url: canonicalUrl,
    },
    twitter: {
      ...(seo.metaTitle ? { title: seo.metaTitle } : {}),
      ...(seo.metaDescription ? { description: seo.metaDescription } : {}),
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

export default async function Home(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const locale = params.locale;

  // Fetch critical data in parallel
  const [homePageData, services, testimonials, siteSettings] = await Promise.all([
    sanityFetch({ query: HOME_PAGE_QUERY, params: { locale } }),
    sanityFetch({ query: SERVICES_QUERY, params: { locale } }),
    sanityFetch({ query: TESTIMONIALS_QUERY, params: { locale } }),
    sanityFetch({ query: SITE_SETTINGS_QUERY, params: { locale } }),
  ]);

  const homeData = homePageData.data;
  const servicesData = services.data;
  const testimonialsData = testimonials.data;
  const siteSettingsData = siteSettings.data;


  return (
    <ExitIntentModal>
      <main id="main-content" className="min-h-dvh w-full bg-surface flex flex-col">
        <JsonLd siteSettings={siteSettingsData} homePageData={homeData} />
        <HeaderWrapper />
        <div className="flex-1">
          {/* Hero with simplified calculator and single CTA */}
          <ErrorBoundary name="Hero Section">
            <VideoHero data={homeData} />
          </ErrorBoundary>

          <ErrorBoundary name="Trust Bar">
            <TrustBar logos={homeData?.trustLogos} />
          </ErrorBoundary>

          {/* Why Us Section - merged Problem + Differentiation + Nationwide */}
          <ErrorBoundary name="Why Us Section">
            <WhyUsSection data={homeData} />
          </ErrorBoundary>

          {/* Services Section - already shows 2 priority services */}
          <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100" />}>
            <ErrorBoundary name="Services Section">
              <ServicesSection services={servicesData} data={homeData} />
            </ErrorBoundary>
          </Suspense>

          {/* Testimonials - 3 cards, no marquee */}
          <Suspense fallback={<div className="h-64 animate-pulse bg-slate-50" />}>
            <ErrorBoundary name="Testimonials">
              <TestimonialsSection testimonials={testimonialsData} />
            </ErrorBoundary>
          </Suspense>

          {/* Final CTA - single button */}
          <CTASection data={homeData} variant="homepageWireframe" />
        </div>
        <Footer />
      </main>
    </ExitIntentModal>
  );
}
