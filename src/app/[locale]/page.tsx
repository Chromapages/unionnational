import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { VideoHero } from "@/components/home/VideoHero";
import { TrustBar } from "@/components/home/TrustBar";
import { DifferentiationSection } from "@/components/home/DifferentiationSection";
import { CTASection } from "@/components/home/CTASection";
import { ExitIntentModal } from "@/components/home/ExitIntentModal";
import { FloatingTaxButton } from "@/components/home/FloatingTaxButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { sanityFetch } from "@/sanity/lib/live";
import { HOME_PAGE_QUERY, SERVICES_QUERY, SITE_SETTINGS_QUERY, TESTIMONIALS_QUERY } from "@/sanity/lib/queries";
import type { Metadata } from "next";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import { urlFor } from "@/sanity/lib/image";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

import ProblemSection from "@/components/home/ProblemSection";

// Lazy load below-the-fold components
const NationwideServiceSection = dynamic(() => import("@/components/home/NationwideServiceSection").then(mod => ({ default: mod.NationwideServiceSection })), {
  loading: () => <div className="h-96 animate-pulse bg-slate-100" />,
});

const ServicesSection = dynamic(() => import("@/components/home/ServicesSection").then(mod => ({ default: mod.ServicesSection })), {
  loading: () => <div className="h-64 animate-pulse bg-slate-100" />,
});

const BentoGridSection = dynamic(() => import("@/components/home/BentoGridSection").then(mod => ({ default: mod.BentoGridSection })), {
  loading: () => <div className="h-64 animate-pulse bg-slate-100" />,
});

const TestimonialsSection = dynamic(() => import("@/components/home/TestimonialsSection").then(mod => ({ default: mod.TestimonialsSection })), {
  loading: () => <div className="h-64 animate-pulse bg-slate-50" />,
});

export const dynamicParams = true;

// Revalidate data every 60 seconds ( ISR )
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

export default async function Home(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const locale = params.locale;
  const t = await getTranslations({ locale, namespace: "HomePage.HealthCheckSection" });

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
      <FloatingTaxButton />
      <main id="main-content" className="min-h-dvh w-full bg-surface flex flex-col">
        <JsonLd siteSettings={siteSettingsData} homePageData={homeData} />
        <HeaderWrapper />
        <div className="flex-1">
          {/* Above the fold - load immediately */}
          <ErrorBoundary name="Hero Section">
            <VideoHero data={homeData} />
          </ErrorBoundary>

          <ErrorBoundary name="Trust Bar">
            <TrustBar logos={homeData?.trustLogos} />
          </ErrorBoundary>

          {/* Tax Health Check Section - Under Trust Bar */}
          <ErrorBoundary name="Health Check Survey">
            <section className="py-16 bg-gradient-to-b from-white to-slate-50">
              <div className="max-w-4xl mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-4 tracking-tighter leading-[1.1]">
                  {t("title")}
                </h2>
                <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
                  {t("subtitle")}
                </p>
                <Link
                  href="/health-check"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gold-500 hover:bg-gold-600 text-brand-900 font-bold rounded-xl transition-all text-lg"
                >
                  {t("cta")} <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </Link>
              </div>
            </section>
          </ErrorBoundary>

          <ErrorBoundary name="Problem Framing">
            <ProblemSection />
          </ErrorBoundary>

          <ErrorBoundary name="Differentiation Section">
            <DifferentiationSection data={homeData} />
          </ErrorBoundary>

          {/* Below the fold - lazy loaded */}
          <Suspense fallback={<div className="h-96 animate-pulse bg-slate-100" />}>
            <ErrorBoundary name="Nationwide Service Section">
              <NationwideServiceSection data={homeData} />
            </ErrorBoundary>
          </Suspense>

          <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100" />}>
            <ErrorBoundary name="Services Section">
              <ServicesSection services={servicesData} data={homeData} />
            </ErrorBoundary>
          </Suspense>

          <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100" />}>
            <BentoGridSection
              stats={homeData?.stats}
              backgroundImage={homeData?.bentoGridBackgroundImage}
            />
          </Suspense>

          <Suspense fallback={<div className="h-64 animate-pulse bg-slate-50" />}>
            <ErrorBoundary name="Testimonials">
              <TestimonialsSection testimonials={testimonialsData} />
            </ErrorBoundary>
          </Suspense>

          <CTASection data={homeData} />
        </div>
        <Footer />
      </main>
    </ExitIntentModal>
  );
}
