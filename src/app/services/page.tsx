import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { Quote, ArrowRight } from "lucide-react";
import Link from "next/link";
import { CTASection } from "@/components/home/CTASection";
import { client } from "@/sanity/lib/client";
import { SERVICES_QUERY } from "@/sanity/lib/queries";
import * as Icons from "lucide-react";
import { Metadata } from "next";
import { ProcessTimeline } from "@/components/services/ProcessTimeline";
import { ServicesClient } from "@/components/services/ServicesClient";
import { PartnerProgramCard } from "@/components/services/PartnerProgramCard";

export const metadata: Metadata = {
    title: "Services | Union National Tax",
    description: "Comprehensive tax strategy, bookkeeping, and CFO services for modern businesses.",
};

export const revalidate = 60;

export default async function ServicesPage() {
    const services = await client.fetch(SERVICES_QUERY);

    // Schema.org Structured Data
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "AccountingService",
        "name": "Union National Tax",
        "description": "Modern tax strategy and financial services for the digital economy.",
        "url": "https://unionnationaltax.com/services",
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
                {/* Hero Section */}
                <section className="max-w-[90rem] mx-auto px-6 mb-32 relative">
                    {/* Radial Gradient Background */}
                    <div className="absolute top-0 left-1/2 w-[1000px] h-[800px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold-500/20 via-transparent to-transparent rounded-full blur-3xl -z-10 opacity-50 pointer-events-none -translate-x-1/2 -translate-y-1/3"></div>

                    <div className="text-center max-w-4xl mx-auto">
                        <RevealOnScroll>
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-gold-500/30 text-brand-900 text-[11px] font-bold uppercase tracking-widest mb-8 shadow-sm font-sans">
                                <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse"></span>
                                Elite Financial Infrastructure
                            </div>
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-brand-900 tracking-tight mb-8 leading-[1.1] font-heading">
                                Eliminate tax anxiety. <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-600 to-gold-400">Build true wealth.</span>
                            </h1>
                            <p className="text-xl text-brand-900/70 mb-12 leading-relaxed font-sans max-w-2xl mx-auto">
                                We replace the reactive &quot;once-a-year&quot; filing with a proactive, year-round financial system designed for high-growth contractors and S-Corp owners.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link
                                    href="/contact"
                                    className="w-full sm:w-auto px-8 py-4 bg-brand-900 text-white font-bold text-base rounded-xl hover:bg-brand-700 transition-all shadow-lg shadow-brand-900/10 flex items-center justify-center gap-2 font-heading tracking-wide"
                                >
                                    Schedule Consultation
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                                <a
                                    href="#services"
                                    className="w-full sm:w-auto px-8 py-4 bg-white text-brand-900 font-bold text-base rounded-xl border border-slate-200 hover:border-brand-300 hover:bg-slate-50 transition-all flex items-center justify-center gap-2 font-heading tracking-wide"
                                >
                                    Browse Services
                                </a>
                            </div>
                        </RevealOnScroll>
                    </div>
                </section>

                {/* Services Grid (Interactive) */}
                <div id="services" className="scroll-mt-32">
                    <ServicesClient services={services} />
                </div>

                {/* Featured Testimonial */}
                <section className="max-w-5xl mx-auto px-6 mb-32 text-center">
                    <RevealOnScroll>
                        <Quote className="w-12 h-12 text-gold-500/30 mx-auto mb-8" />
                        <blockquote className="text-3xl md:text-4xl font-bold text-brand-900 leading-tight mb-8 font-heading">
                            &quot;Union National Tax didn&apos;t just file my taxes; they completely restructured my business entity. <span className="text-gold-600 bg-gold-50 px-2 rounded-lg decoration-clone box-decoration-clone">We saved over $42,000 in the first year alone.</span>&quot;
                        </blockquote>
                        <div className="flex items-center justify-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden">
                                <div className="w-full h-full bg-brand-900 flex items-center justify-center text-white font-bold">MK</div>
                            </div>
                            <div className="text-left">
                                <div className="font-bold text-brand-900 font-sans">Michael Knight</div>
                                <div className="text-sm text-slate-500 font-sans">CEO, Knight Logistics</div>
                            </div>
                        </div>
                    </RevealOnScroll>
                </section>

                {/* Process Timeline */}
                <ProcessTimeline />

                {/* Featured Partner Programs */}
                <section className="max-w-[90rem] mx-auto px-6 mb-32">
                    <RevealOnScroll>
                        <h2 className="text-2xl font-bold text-brand-900 mb-8 font-heading">Specialized Partner Programs</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                            {/* Construction Card */}
                            <PartnerProgramCard
                                title="Construction CFO Partnership"
                                description="Stop bleeding cash on job costing & labor. The 'Hybrid CFO + COO' model for $1M-$10M contractors."
                                icon="HardHat"
                                colorTheme="emerald"
                                stats={[
                                    { value: 400, label: "Avg Savings", prefix: "$", suffix: "K+" },
                                    { value: 95, label: "Retention", suffix: "%" },
                                    { value: 90, label: "To Results", suffix: " Days" },
                                ]}
                                features={[
                                    "Job costing automation",
                                    "Real-time margin tracking",
                                    "Tax strategy optimization",
                                ]}
                                ctaUrl="/vsl/construction"
                                isFeatured={true}
                                backgroundImage="/images/construction-bg.jpg"
                            />

                            {/* Restaurant Card */}
                            <PartnerProgramCard
                                title="Restaurant CFO Partnership"
                                description="Stop profit leaks on food cost & labor. The 'Kitchen Command Center' system for $500K-$5M venues."
                                icon="UtensilsCrossed"
                                colorTheme="orange"
                                stats={[
                                    { value: 350, label: "Avg Savings", prefix: "$", suffix: "K+" },
                                    { value: 98, label: "Retention", suffix: "%" },
                                    { value: 90, label: "To Results", suffix: " Days" },
                                ]}
                                features={[
                                    "Inventory & COGS control",
                                    "Real-time P&L visibility",
                                    "Menu pricing strategy",
                                ]}
                                ctaUrl="/vsl/restaurants"
                                backgroundImage="/images/restaurant-bg.jpg"
                            />

                        </div>
                    </RevealOnScroll>
                </section>

                {/* Strong CTA */}
                <section className="max-w-[100rem] mx-auto px-6 mb-32">
                    <RevealOnScroll className="bg-brand-900 rounded-[2.5rem] p-8 sm:p-10 lg:py-12 lg:px-16 relative overflow-hidden border border-white/5 shadow-2xl shadow-black/20">
                        {/* Background Effects */}
                        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2 will-change-transform"></div>
                            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2 will-change-transform"></div>
                        </div>

                        <div className="relative z-10 w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 lg:gap-16">

                            {/* Left Block: Text Content */}
                            <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:flex-1 lg:max-w-2xl">
                                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-6">
                                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 backdrop-blur-sm shrink-0">
                                        <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
                                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-400">Ready to Start</span>
                                    </span>

                                    {["Tax Strategy", "Bookkeeping", "CFO Advisory"].map((pill) => (
                                        <span key={pill} className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-brand-100/70 text-[11px] font-medium backdrop-blur-sm whitespace-nowrap">
                                            {pill}
                                        </span>
                                    ))}
                                </div>

                                <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-white tracking-tight mb-4 font-heading leading-[1.1]">
                                    Premier Tax & Advisory Services
                                </h2>

                                <p className="text-brand-100/80 text-base md:text-lg leading-relaxed font-sans max-w-xl mx-auto lg:mx-0">
                                    From proactive tax strategy to real-time bookkeeping - services built to maximize savings.
                                </p>
                            </div>

                            {/* Center Block: Metrics */}
                            <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 lg:gap-8 lg:border-l lg:border-white/10 lg:pl-10">
                                <div className="text-center lg:text-left">
                                    <div className="text-3xl xl:text-4xl font-bold text-gold-400 font-heading mb-1 tracking-tight">$2M+</div>
                                    <div className="text-[10px] uppercase tracking-widest text-brand-200/60 font-bold whitespace-nowrap">Tax Savings</div>
                                </div>
                                <div className="hidden sm:block w-px h-10 bg-white/10 lg:hidden" />
                                <div className="text-center lg:text-left">
                                    <div className="text-3xl xl:text-4xl font-bold text-gold-400 font-heading mb-1 tracking-tight">500+</div>
                                    <div className="text-[10px] uppercase tracking-widest text-brand-200/60 font-bold whitespace-nowrap">Clients Serviced</div>
                                </div>
                                <div className="hidden sm:block w-px h-10 bg-white/10 lg:hidden" />
                                <div className="text-center lg:text-left">
                                    <div className="text-3xl xl:text-4xl font-bold text-gold-400 font-heading mb-1 tracking-tight">100%</div>
                                    <div className="text-[10px] uppercase tracking-widest text-brand-200/60 font-bold whitespace-nowrap">Satisfaction</div>
                                </div>
                            </div>

                            {/* Right Block: Actions */}
                            <div className="flex flex-col items-center lg:items-end gap-3 w-full lg:w-auto shrink-0">
                                <Link href="/contact" className="w-full sm:w-auto px-8 py-4 bg-gold-500 text-brand-900 font-bold text-base rounded-xl hover:bg-gold-400 transition-all shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] flex items-center justify-center gap-2 font-heading tracking-wide hover:-translate-y-1 duration-300 whitespace-nowrap">
                                    Schedule Consultation
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                                <div className="flex items-center justify-center lg:justify-end gap-2 text-[10px] text-brand-200/40 font-medium tracking-wide">
                                    <Icons.Lock className="w-3 h-3 text-gold-500/50" />
                                    <span>Free 30-Min Session</span>
                                </div>
                            </div>

                        </div>
                    </RevealOnScroll>
                </section>

                <CTASection />
            </main>

            <Footer />
        </div>
    );
}
