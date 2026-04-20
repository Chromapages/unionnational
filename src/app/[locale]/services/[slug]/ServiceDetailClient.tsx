"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
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
    whyChooseUsTitle?: string;
    whyChooseUsDescription?: string;
    faq?: any[];
    videoFileUrl?: string;
    videoThumbnail?: { asset?: unknown };
    impactGoal?: string;
    targetAudience?: string;
    keyBenefit?: string;
    eligibility?: string;
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
            {/* ===== HERO SECTION (Standard Detail) ===== */}
            <section className="relative pt-32 pb-20 px-6 bg-zinc-50 border-b border-zinc-200 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gold-400/5 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center">
                    {service.badge && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6"
                        >
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-600 text-xs font-bold uppercase tracking-widest">
                                {service.badge}
                            </span>
                        </motion.div>
                    )}

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold text-brand-900 leading-tight mb-6 font-heading tracking-tight"
                    >
                        {String(service.title)}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-zinc-600 max-w-3xl mx-auto leading-relaxed mb-8"
                    >
                        {String(service.shortDescription)}
                    </motion.p>

                    {service.keyBenefit && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white border border-gold-200 shadow-sm"
                                >
                                    <div className="w-2 h-2 bg-gold-500 rounded-full" />
                                    <p className="text-lg font-bold text-brand-900 font-heading italic">
                                        &quot;{typeof service.keyBenefit === 'string' ? service.keyBenefit : (service as any).keyBenefit?.en || ''}&quot;
                                    </p>
                                </motion.div>
                            )}
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* ===== LEFT CONTENT (Main) ===== */}
                    <div className="lg:col-span-8 space-y-24">

                        {/* Overview / Description */}
                        <section id="overview" className="scroll-mt-24">
                            {service.impactGoal && (
                                <div className="mb-12 p-8 rounded-3xl bg-gold-50/50 border border-gold-200/50 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <CheckCircle2 className="w-24 h-24 text-gold-500" />
                                    </div>
                                    <div className="relative z-10">
                                        <p className="text-sm font-bold text-gold-600 uppercase tracking-widest mb-2">The Goal</p>
                                        <h3 className="text-2xl md:text-3xl font-bold text-brand-900 font-heading leading-tight">
                                            {typeof service.impactGoal === 'string' ? service.impactGoal : (service as any).impactGoal?.en || ''}
                                        </h3>
                                    </div>
                                </div>
                            )}

                            {service.eligibility && (
                                <div className="mb-12 space-y-4">
                                    <h3 className="text-xl font-bold text-brand-900 font-heading">Is this right for you?</h3>
                                    <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200 text-zinc-600 leading-relaxed italic">
                                        &quot;{typeof service.eligibility === 'string' ? service.eligibility : (service as any).eligibility?.en || ''}&quot;
                                    </div>
                                </div>
                            )}

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
                        {(service.whyChooseUsTitle || service.whyChooseUsDescription || (service.comparisonPoints && service.comparisonPoints.length > 0)) && (
                            <section id="comparison" className="scroll-mt-24">
                                <h2 className="text-3xl font-bold text-brand-900 mb-4 font-heading">
                                    {service.whyChooseUsTitle || "Why Choose Union National?"}
                                </h2>
                                {service.whyChooseUsDescription && (
                                    <p className="text-lg text-zinc-600 leading-relaxed mb-8">
                                        {service.whyChooseUsDescription}
                                    </p>
                                )}
                                {service.comparisonPoints && service.comparisonPoints.length > 0 && (
                                    <ComparisonTable points={service.comparisonPoints} />
                                )}
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
                            targetAudience={service.targetAudience}
                            keyBenefit={service.keyBenefit}
                            hasOverview={!!service.fullDescription || !!service.shortDescription}
                            hasComparison={!!service.whyChooseUsTitle || !!service.whyChooseUsDescription || (!!service.comparisonPoints && service.comparisonPoints.length > 0)}
                            hasFaq={!!service.faq && service.faq.length > 0}
                        />
                    </div>

                </div>
            </div>

        </>
    );
}
