"use client";

import { motion } from "framer-motion";
import { Quote, CheckCircle2 } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ServiceSidebar } from "@/components/services/ServiceSidebar";
import { ComparisonTable } from "@/components/services/ComparisonTable";
import { ServiceFAQ } from "@/components/services/ServiceFAQ";
import { RelatedServices } from "@/components/services/RelatedServices";
import { TaxPrepGrid } from "@/components/pricing/TaxPrepGrid";
import { PortableText } from "@portabletext/react";
import { PortableTextComponents } from "@portabletext/react";
import VideoEmbed from "@/components/ui/VideoEmbed";
import { urlFor } from "@/sanity/lib/image";


// Portable Text Components
const ptComponents: PortableTextComponents = {
    block: {
        h2: ({ children }) => <h2 className="text-3xl font-bold text-brand-900 mt-12 mb-6 font-heading">{children}</h2>,
        h3: ({ children }) => <h3 className="text-2xl font-bold text-brand-900 mt-8 mb-4 font-heading">{children}</h3>,
        normal: ({ children }) => <p className="text-lg text-zinc-600 leading-relaxed mb-6">{children}</p>,
        blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-gold-500 pl-6 py-2 my-8 italic text-xl text-brand-800 bg-brand-50/50 rounded-r-lg">
                {children}
            </blockquote>
        ),
    },
    list: {
        bullet: ({ children }) => <ul className="space-y-3 mb-8 pl-4">{children}</ul>,
        number: ({ children }) => <ol className="space-y-3 mb-8 pl-4 list-decimal marker:text-gold-500 marker:font-bold">{children}</ol>,
    },
    listItem: {
        bullet: ({ children }) => (
            <li className="flex items-start gap-3 text-lg text-zinc-600">
                <CheckCircle2 className="w-5 h-5 text-gold-500 shrink-0 mt-1" />
                <span>{children}</span>
            </li>
        ),
    },
};

interface Service {
    title: string;
    slug?: { current: string };
    badge?: string;
    shortDescription: string;
    fullDescription?: any;
    features?: string[];
    icon: string;
    startingPrice?: string;
    comparisonPoints?: any[];
    faq?: any[];
    videoFileUrl?: string;
    videoThumbnail?: { asset?: unknown };
}

interface RelatedService {
    _id: string;
    title: string;
    slug: { current: string };
    icon: string;
    shortDescription: string;
}

interface PricingTier {
    _id: string;
    name: string;
    slug: { current: string };
    category: string;
    price?: string;
    billingPeriod?: string;
    tagline?: string;
    bestFor?: string;
    includes?: string;
    ctaText?: string;
    ctaUrl?: string;
    displayOrder?: number;
}

interface ServiceDetailClientProps {
    service: Service;
    relatedServices: RelatedService[];
    tiers?: PricingTier[];
}

export default function ServiceDetailClient({ service, relatedServices, tiers }: ServiceDetailClientProps) {
    return (
        <>
            {/* ===== HERO SECTION (Shorter) ===== */}
            <section className="relative min-h-[60vh] flex flex-col items-center justify-center px-6 py-24 bg-brand-900 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-brand-900 via-brand-900 to-brand-800" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 max-w-4xl mx-auto text-center w-full">
                    {service.badge && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-8 flex justify-center"
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-sm font-bold uppercase tracking-widest">
                                <span className="w-2 h-2 bg-gold-400 rounded-full animate-pulse" />
                                {service.badge}
                            </span>
                        </motion.div>
                    )}

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6 font-heading"
                    >
                        {service.title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg sm:text-xl text-brand-100/70 max-w-2xl mx-auto leading-relaxed"
                    >
                        {service.shortDescription}
                    </motion.p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* ===== LEFT CONTENT (Main) ===== */}
                    <div className="lg:col-span-8 space-y-24">

                        {/* Overview / Description */}
                        <section id="overview">
                            {service.fullDescription ? (
                                <div className="prose prose-lg max-w-none text-zinc-600 prose-headings:text-brand-900 prose-a:text-gold-600 hover:prose-a:text-gold-500">
                                    <PortableText value={service.fullDescription} components={ptComponents} />
                                </div>
                            ) : (
                                // Fallback content if fullDescription is missing
                                <div className="space-y-6">
                                    <h2 className="text-3xl font-bold text-brand-900 font-heading">Overview</h2>
                                    <p className="text-lg text-zinc-600 leading-relaxed">
                                        {service.shortDescription}
                                    </p>
                                    <ul className="space-y-4 mt-8">
                                        {service.features?.map((feature: string, i: number) => (
                                            <li key={i} className="flex items-start gap-3 text-lg text-zinc-600">
                                                <CheckCircle2 className="w-6 h-6 text-gold-500 shrink-0 mt-0.5" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </section>

                        {/* Tax Preparation Pricing - Only for Tax Filing service */}
                        {(service.slug?.current === 'tax-filing' || service.slug?.current === 'tax-filing-and-preparation-services') && tiers && tiers.length > 0 && (
                            <section id="pricing" className="scroll-mt-24">
                                <h2 className="text-3xl font-bold text-brand-900 mb-3 font-heading">
                                    Tax Preparation Pricing
                                </h2>
                                <p className="text-lg text-zinc-600 leading-relaxed mb-8">
                                    Transparent, flat-fee pricing for individual and business tax returns. No surprises, no hidden fees.
                                </p>
                                <TaxPrepGrid tiers={tiers} />
                            </section>
                        )}

                        {(service.videoFileUrl || service.videoThumbnail) && (
                            <section id="strategy-breakdown" className="scroll-mt-24">
                                <div className="flex flex-col gap-6">
                                    <div>
                                        <h2 className="text-3xl font-bold text-brand-900 mb-3 font-heading">
                                            Strategy Breakdown
                                        </h2>
                                        <p className="text-lg text-zinc-600 leading-relaxed">
                                            Walk through the strategy behind this service and see how we apply it in practice.
                                        </p>
                                    </div>
                                    <VideoEmbed
                                        videoUrl={service.videoFileUrl}
                                        posterImage={
                                            service.videoThumbnail?.asset
                                                ? urlFor(service.videoThumbnail.asset).width(1200).height(675).url()
                                                : undefined
                                        }
                                    />
                                </div>
                            </section>
                        )}

                        {/* Comparison Table */}
                        {service.comparisonPoints && service.comparisonPoints.length > 0 && (
                            <section id="comparison" className="scroll-mt-24">
                                <h2 className="text-3xl font-bold text-brand-900 mb-8 font-heading">
                                    Why Choose Union National?
                                </h2>
                                <ComparisonTable points={service.comparisonPoints} />
                            </section>
                        )}

                        {/* FAQ Section */}
                        {service.faq && service.faq.length > 0 && (
                            <section id="faq" className="scroll-mt-24">
                                <h2 className="text-3xl font-bold text-brand-900 mb-8 font-heading">
                                    Frequently Asked Questions
                                </h2>
                                <ServiceFAQ items={service.faq} />
                            </section>
                        )}

                        {/* Related Services */}
                        <RelatedServices services={relatedServices} />

                    </div>

                    {/* ===== RIGHT SIDEBAR (Sticky) ===== */}
                    <div className="lg:col-span-4">
                        <ServiceSidebar
                            title={service.title}
                            icon={service.icon}
                            startingPrice={service.startingPrice}
                            features={service.features || []}
                        />
                    </div>

                </div>
            </div>

            {/* Testimonial Section */}
            <section className="py-24 bg-zinc-50 border-t border-zinc-200 text-center px-6">
                <RevealOnScroll className="max-w-4xl mx-auto">
                    <Quote className="w-12 h-12 text-gold-500/20 mx-auto mb-6" />
                    <blockquote className="text-2xl md:text-3xl font-bold text-brand-900 leading-tight mb-8 font-heading">
                        &quot;This service completely transformed our financial operations. We finally have clarity and confidence in our numbers.&quot;
                    </blockquote>
                    <div className="flex items-center justify-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-brand-900 flex items-center justify-center text-white font-bold text-sm">
                            UN
                        </div>
                        <div className="text-left">
                            <div className="font-bold text-brand-900">Trusted Client</div>
                            <div className="text-sm text-zinc-500">Business Owner</div>
                        </div>
                    </div>
                </RevealOnScroll>
            </section>
        </>
    );
}
