import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { SERVICES_QUERY, PRICING_TIERS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import { Metadata } from "next";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TrustStack } from "@/components/ui/TrustStack";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import dynamic from "next/dynamic";

// Lazy load below-the-fold components
const ServicesClient = dynamic(() => import("@/components/services/ServicesClient").then(mod => ({ default: mod.ServicesClient })), {
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
    const [{ data: services }, { data: pricingTiers }] = await Promise.all([
        sanityFetch({ query: SERVICES_QUERY, params: { locale } }),
        sanityFetch({ query: PRICING_TIERS_QUERY, params: { locale } })
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
                <section className="bg-brand-500 px-5 py-8 sm:px-6 sm:py-16 md:py-20 relative overflow-hidden">
                    {/* Decorative background element */}
                    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                    </div>

                    <div className="max-w-7xl mx-auto relative">
                        <div className="max-w-3xl">
                            <RevealOnScroll>
                                {/* H1 - outcome-focused headline */}
                                <h1 className="text-[2.125rem] sm:text-6xl lg:text-7xl font-bold text-white tracking-tighter mb-4 sm:mb-6 leading-[0.98] sm:leading-[0.9] font-heading">
                                    <span className="sm:hidden">
                                        {t("Hero.titleLine1")}
                                        <span className="block">{t("Hero.titleLine2")}</span>
                                    </span>
                                    <span className="hidden sm:inline">{t("Hero.title")}</span>
                                </h1>

                                {/* Subtitle */}
                                <p className="text-base sm:text-xl text-brand-50/80 mb-6 sm:mb-10 leading-relaxed font-sans max-w-xl">
                                    {t("Hero.subtitle")}
                                </p>

                                <div className="flex flex-col">
                                    {/* CTAs lead on mobile; desktop retains the existing proof-then-action rhythm. */}
                                    <div className="order-1 sm:order-2 flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-6">
                                        <Link
                                            href="/intake"
                                            className={cn(
                                                "w-full sm:w-auto min-h-11 px-6 sm:px-10 py-3 sm:py-5 bg-gold-500 text-brand-900 font-bold text-base sm:text-lg rounded-md shadow-sm",
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
                                                "min-h-11 px-1 text-white/80 hover:text-white font-medium text-base",
                                                "underline underline-offset-4 hover:underline decoration-white/30 transition-colors duration-200",
                                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-500",
                                                "flex items-center gap-2"
                                            )}
                                        >
                                            {t("Hero.ctaSecondary")} <span aria-hidden="true">→</span>
                                        </a>
                                    </div>

                                    {/* Supporting proof is compact below the mobile actions and remains above them on desktop. */}
                                    <TrustStack
                                        ariaLabel="Union National Tax credentials"
                                        className="order-2 mt-6 grid-cols-3 gap-2 border-white/20 pt-6 sm:order-1 sm:mt-0 sm:mb-10 sm:grid-cols-3 sm:gap-8 sm:border-t-0 sm:border-b sm:pb-10"
                                        items={[
                                            { value: "Highest IRS Credential", label: t("Hero.trustBar.eaCredential") },
                                            { value: "$2.4M+", label: t("Hero.trustBar.avgSavings") },
                                            { value: "1,000+", label: t("Hero.trustBar.clientsServed") },
                                        ]}
                                    />
                                </div>
                            </RevealOnScroll>
                        </div>
                    </div>
                </section>

                {/* Below the fold - lazy loaded */}
                <Suspense fallback={<div className="h-96 animate-pulse bg-slate-100" />}>
                    <div id="services" className="scroll-mt-[var(--header-height)] mt-16">
                        <ServicesClient services={services} />
                    </div>
                </Suspense>

                {/* Support levels and return protections */}
                <Suspense fallback={<div className="h-96 animate-pulse bg-slate-100" />}>
                    <section className="bg-white/30 py-4 md:py-8">
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
                    <section id="services-faq" className="bg-white py-16 md:py-24">
                        <div className="max-w-3xl mx-auto px-6">
                            <SectionHeader label={t("FAQ.eyebrow")} heading={t("FAQ.title")} className="mb-10" />
                            <ServiceFAQ items={faqItems} />
                        </div>
                    </section>
                </Suspense>

                {/* Disclaimer — moved to after incentive content, not mid-flow */}
                <section className="bg-brand-900 px-6 py-16 text-center md:py-24">
                    <div className="mx-auto max-w-3xl">
                        <h2 className="font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">
                            {t("ClosingCTA.title")}
                        </h2>
                        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
                            {t("ClosingCTA.subtitle")}
                        </p>
                        <Link
                            href="/intake"
                            className="mt-8 inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-gold-500 px-6 py-3 font-heading font-bold text-brand-900 transition-colors hover:bg-gold-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400"
                        >
                            {t("ClosingCTA.cta")}
                            <ArrowRight className="h-5 w-5" aria-hidden="true" />
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
