import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { SERVICES_QUERY, PRICING_TIERS_QUERY, SERVICES_PAGE_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import { Metadata } from "next";
import { cn } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import dynamic from "next/dynamic";

// Lazy load below-the-fold components
const ServicesClient = dynamic(() => import("@/components/services/ServicesClient").then(mod => ({ default: mod.ServicesClient })), {
  loading: () => <div className="h-64 animate-pulse bg-slate-100" />,
});

const PartnerProgramsSection = dynamic(() => import("@/components/services/PartnerProgramsSection").then(mod => ({ default: mod.PartnerProgramsSection })), {
  loading: () => <div className="h-64 animate-pulse bg-slate-100" />,
});

const PricingSection = dynamic(() => import("@/components/pricing/PricingSection").then(mod => ({ default: mod.PricingSection })), {
  loading: () => <div className="h-64 animate-pulse bg-slate-100" />,
});

const ProcessTimeline = dynamic(() => import("@/components/services/ProcessTimeline").then(mod => ({ default: mod.ProcessTimeline })), {
  loading: () => <div className="h-64 animate-pulse bg-slate-100" />,
});

const ServiceFAQ = dynamic(() => import("@/components/services/ServiceFAQ").then(mod => ({ default: mod.ServiceFAQ })), {
  loading: () => <div className="h-64 animate-pulse bg-slate-100" />,
});

const TravelIncentiveDisclaimer = dynamic(() => import("@/components/ui/TravelIncentiveDisclaimer").then(mod => ({ default: mod.TravelIncentiveDisclaimer })), {
  loading: () => <div className="h-32 animate-pulse bg-slate-100" />,
});

const LuxuryTravelIncentive = dynamic(() => import("@/components/ui/LuxuryTravelIncentive").then(mod => ({ default: mod.LuxuryTravelIncentive })), {
  loading: () => <div className="h-64 animate-pulse bg-slate-100" />,
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "ServicesPage.metadata" });
    
    const baseUrl = "https://unionnationaltax.com";
    const canonicalUrl = locale === "en" ? `${baseUrl}/services` : `${baseUrl}/${locale}/services`;

    return {
        title: t("title"),
        description: t("description"),
        alternates: {
            canonical: canonicalUrl,
            languages: {
                en: `${baseUrl}/services`,
                es: `${baseUrl}/es/services`,
            },
        },
    };
}

export const revalidate = 60;

// Generate static params for SSG
export async function generateStaticParams() {
    return [
        { locale: 'en' },
        { locale: 'es' },
    ];
}
export default async function ServicesPage(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const locale = params.locale;
    const t = await getTranslations({ locale, namespace: "ServicesPage" });
    const [{ data: services }, { data: pricingTiers }, { data: pageData }] = await Promise.all([
        sanityFetch({ query: SERVICES_QUERY, params: { locale } }),
        sanityFetch({ query: PRICING_TIERS_QUERY, params: { locale } }),
        sanityFetch({ query: SERVICES_PAGE_QUERY, params: { locale } })
    ]);

    // Pull FAQ items from translations (static; CMS schema doesn't have FAQ field yet)
    const faqItems = t.raw("FAQ.items") as Array<{ question: string; answer: string }>;

    // Schema.org Structured Data
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "AccountingService",
        "name": "Union National Tax",
        "description": "Modern tax strategy and financial services for the digital economy.",
        "url": `https://unionnationaltax.com${locale === 'en' ? '' : `/${locale}`}/services`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Tax & Financial Services",
            "itemListElement": (services as Array<{ title: string; shortDescription: string }>).map((service, index: number) => ({
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": service.title,
                    "description": service.shortDescription
                },
                "position": index + 1
            }))
        }
    };

    return (
        <div className="min-h-dvh bg-surface flex flex-col font-sans text-brand-900 antialiased selection:bg-gold-500 selection:text-white overflow-x-hidden">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <HeaderWrapper />

            <main id="main-content">
                {/* Hero Section - Above the fold with trust signals */}
                <section className="bg-brand-500 px-6 py-16 md:py-20 relative overflow-hidden">
                    {/* Decorative background element */}
                    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                    </div>

                    <div className="max-w-7xl mx-auto relative">
                        <div className="max-w-3xl">
                            <RevealOnScroll>
                                {/* H1 - outcome-focused headline */}
                                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tighter mb-6 leading-[0.9] font-heading">
                                    {t("Hero.title")}
                                </h1>

                                {/* Subtitle */}
                                <p className="text-xl text-brand-50/80 mb-10 leading-relaxed font-sans max-w-xl">
                                    {t("Hero.subtitle")}
                                </p>

                                {/* Trust bar - 3 key stats directly under subtitle */}
                                <div className="flex flex-wrap gap-x-8 gap-y-4 mb-10 pb-10 border-b border-white/20">
                                    <div>
                                        <div className="text-sm font-bold text-brand-50/60 uppercase tracking-wider mb-1">
                                            {t("Hero.trustBar.eaCredential")}
                                        </div>
                                        <div className="text-lg font-black text-white font-heading" style={{ color: "#D4AF37" }}>
                                            Highest IRS Credential
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-brand-50/60 uppercase tracking-wider mb-1">
                                            {t("Hero.trustBar.avgSavings")}
                                        </div>
                                        <div className="text-lg font-black text-white font-heading" style={{ color: "#D4AF37" }}>
                                            $2.4M+
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-brand-50/60 uppercase tracking-wider mb-1">
                                            {t("Hero.trustBar.clientsServed")}
                                        </div>
                                        <div className="text-lg font-black text-white font-heading" style={{ color: "#D4AF37" }}>
                                            1,000+
                                        </div>
                                    </div>
                                </div>

                                {/* CTAs - primary dominant, secondary as text link */}
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                                    <Link
                                        href="/intake"
                                        className={cn(
                                            "w-full sm:w-auto px-10 py-5 bg-gold-500 text-brand-900 font-bold text-lg rounded-md shadow-sm",
                                            "hover:bg-gold-600 transition-all duration-300",
                                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-500",
                                            "active:scale-95 flex items-center justify-center gap-3 font-heading tracking-tight"
                                        )}
                                    >
                                        {t("Hero.ctaPrimary")}
                                        <ArrowRight className="w-5 h-5" />
                                    </Link>
                                    <a
                                        href="#services"
                                        className={cn(
                                            "text-white/80 hover:text-white font-medium text-base",
                                            "underline underline-offset-4 hover:underline decoration-white/30 transition-colors duration-200",
                                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-500",
                                            "flex items-center gap-2"
                                        )}
                                    >
                                        {t("Hero.ctaSecondary")}
                                    </a>
                                </div>
                            </RevealOnScroll>
                        </div>
                    </div>
                </section>

                {/* Below the fold - lazy loaded */}
                <Suspense fallback={<div className="h-96 animate-pulse bg-slate-100" />}>
                    <div id="services" className="scroll-mt-32 mt-16">
                        <ServicesClient services={services} />
                    </div>
                </Suspense>

                {/* Proof band — key stats before partner programs */}
                <section className="bg-brand-900 py-14 mt-24">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            <div>
                                <div className="text-3xl md:text-4xl font-black text-white font-heading mb-1" style={{ color: "#D4AF37" }}>$400K+</div>
                                <div className="text-xs text-white/50 uppercase tracking-wider font-semibold">Avg. Construction Client Savings</div>
                            </div>
                            <div>
                                <div className="text-3xl md:text-4xl font-black text-white font-heading mb-1" style={{ color: "#D4AF37" }}>95%</div>
                                <div className="text-xs text-white/50 uppercase tracking-wider font-semibold">Client Retention Rate</div>
                            </div>
                            <div>
                                <div className="text-3xl md:text-4xl font-black text-white font-heading mb-1" style={{ color: "#D4AF37" }}>90 Days</div>
                                <div className="text-xs text-white/50 uppercase tracking-wider font-semibold">To First Measurable Results</div>
                            </div>
                            <div>
                                <div className="text-3xl md:text-4xl font-black text-white font-heading mb-1" style={{ color: "#D4AF37" }}>$2.4M+</div>
                                <div className="text-xs text-white/50 uppercase tracking-wider font-semibold">Total Client Savings Last Year</div>
                            </div>
                        </div>
                    </div>
                </section>

                <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100" />}>
                    <div className="pt-12 pb-20">
                        <PartnerProgramsSection />
                    </div>
                </Suspense>

                <Suspense fallback={<div className="h-96 animate-pulse bg-slate-100" />}>
                    <section className="bg-white/30">
                        <PricingSection
                            tiers={pricingTiers}
                            hideTaxPrep={true}
                            translations={{
                                eyebrow: t("PricingSection.eyebrow"),
                                title: t("PricingSection.title"),
                                subtitle: t("PricingSection.subtitle"),
                                comparisonTitle: t("PricingSection.comparisonTitle"),
                                comparisonSubtitle: t("PricingSection.comparisonSubtitle"),
                            }}
                        />
                    </section>
                </Suspense>

                <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100" />}>
                    <ProcessTimeline />
                </Suspense>

                {/* FAQ Section */}
                <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100" />}>
                    <section className="py-24 bg-white">
                        <div className="max-w-3xl mx-auto px-6">
                            <div className="text-center mb-12">
                                <div className="inline-block px-4 py-1.5 mb-4 text-[0.7rem] font-bold tracking-[0.2em] uppercase text-gold-600 bg-gold-50 rounded-full border border-gold-200">
                                    {t("FAQ.eyebrow")}
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-brand-900 tracking-tight font-heading">
                                    {t("FAQ.title")}
                                </h2>
                            </div>
                            <ServiceFAQ items={faqItems} />
                        </div>
                    </section>
                </Suspense>

                <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100" />}>
                    <LuxuryTravelIncentive />
                </Suspense>

                {/* Disclaimer — moved to after incentive content, not mid-flow */}
                <Suspense fallback={<div className="h-32 animate-pulse bg-slate-100" />}>
                    <TravelIncentiveDisclaimer />
                </Suspense>
            </main>

            <Footer />
        </div>
    );
}
