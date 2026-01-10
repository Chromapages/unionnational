import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Users, Quote } from "lucide-react";
import Link from "next/link";
import { CTASection } from "@/components/home/CTASection";
import { client } from "@/sanity/lib/client";
import { SERVICES_QUERY } from "@/sanity/lib/queries";
import * as Icons from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Services | Union National Tax",
    description: "Comprehensive tax strategy, bookkeeping, and CFO services for modern businesses.",
};

export const revalidate = 60;

// Dynamic Icon Component
const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
    const Icon = (Icons as any)[name] || Icons.Briefcase;
    return <Icon className={className} />;
};

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
            "itemListElement": services.map((service: any, index: number) => ({
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
        <div className="min-h-screen bg-surface flex flex-col font-sans text-brand-900 antialiased selection:bg-gold-500 selection:text-white overflow-x-hidden">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Header />

            <main className="pt-32 pb-20">
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
                                We replace the reactive "once-a-year" filing with a proactive, year-round financial system designed for high-growth contractors and S-Corp owners.
                            </p>
                        </RevealOnScroll>
                    </div>
                </section>

                {/* Services Grid */}
                <section className="max-w-[90rem] mx-auto px-6 mb-32">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service: any, i: number) => (
                            <RevealOnScroll
                                key={service._id}
                                delay={i * 100}
                                className={`group relative rounded-[2.5rem] p-10 transition-all duration-500 hover:-translate-y-3 flex flex-col h-full border overflow-hidden
                                    ${service.isPopular
                                        ? 'bg-brand-900 border-brand-900 text-white shadow-2xl shadow-gold-500/20 ring-1 ring-white/10'
                                        : 'bg-white border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-slate-200/60 hover:border-gold-500/30'
                                    }`}
                            >
                                <Link href={`/services/${service.slug?.current}`} className="absolute inset-0 z-10">
                                    <span className="sr-only">View {service.title}</span>
                                </Link>

                                {/* Top Gradient Accent */}
                                <div
                                    className={`absolute top-0 left-0 right-0 h-1.5 opacity-100 transition-all duration-500 group-hover:h-2
                                        ${service.isPopular ? 'bg-gradient-to-r from-gold-400 to-gold-600' : 'bg-slate-100 group-hover:bg-gold-400'}`}
                                />

                                {/* Card Badge */}
                                {service.badge && (
                                    <div className={`absolute top-8 right-8 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest font-sans border-2
                                        ${service.isPopular
                                            ? 'bg-gold-500 border-gold-500 text-brand-900'
                                            : 'bg-white border-slate-100 text-slate-500 group-hover:border-gold-500/30 group-hover:text-gold-600 transition-colors'}
                                    `}>
                                        {service.badge}
                                    </div>
                                )}

                                {/* Icon Container */}
                                <div className={`w-16 h-16 rounded-[1.25rem] flex items-center justify-center mb-10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg
                                    ${service.isPopular
                                        ? 'bg-white/10 text-gold-400 ring-1 ring-white/20'
                                        : 'bg-gold-50 text-gold-600 group-hover:bg-gold-500 group-hover:text-white'}
                                `}>
                                    <DynamicIcon name={service.icon} className="w-8 h-8" />
                                </div>

                                <h3 className={`text-3xl font-bold mb-6 tracking-tight font-heading leading-tight
                                    ${service.isPopular ? 'text-white' : 'text-brand-900'}
                                `}>
                                    {service.title}
                                </h3>

                                <p className={`text-base mb-10 leading-relaxed font-sans flex-grow
                                    ${service.isPopular ? 'text-slate-300' : 'text-slate-600'}
                                `}>
                                    {service.shortDescription}
                                </p>

                                <div className="mt-auto space-y-8">
                                    {service.impactGoal && (
                                        <div className={`pl-4 border-l-2
                                            ${service.isPopular ? 'border-gold-500/50' : 'border-gold-500'}
                                        `}>
                                            <div className={`text-[10px] font-bold uppercase tracking-widest mb-1 font-sans
                                                 ${service.isPopular ? 'text-gold-400' : 'text-gold-600'}
                                            `}>
                                                Impact Goal
                                            </div>
                                            <div className={`text-sm font-medium italic font-sans
                                                ${service.isPopular ? 'text-white/90' : 'text-brand-900'}
                                            `}>
                                                "{service.impactGoal}"
                                            </div>
                                        </div>
                                    )}

                                    {/* Link UI */}
                                    <div className={`pt-8 border-t flex items-center justify-between transition-all duration-300
                                        ${service.isPopular ? 'border-white/10' : 'border-slate-100'}
                                    `}>
                                        <span className={`text-xs font-bold uppercase tracking-widest transition-all duration-300 group-hover:translate-x-1 font-sans
                                            ${service.isPopular ? 'text-white' : 'text-brand-900'}
                                        `}>
                                            Explore Service
                                        </span>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:translate-x-2 group-hover:bg-gold-500 group-hover:text-brand-900
                                            ${service.isPopular ? 'bg-white/10 text-white' : 'bg-slate-100 text-brand-900'}
                                        `}>
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </RevealOnScroll>
                        ))}
                    </div>
                </section>

                {/* The Union National Difference */}
                <section className="max-w-[90rem] mx-auto px-6 mb-32">
                    <div className="bg-brand-900 rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
                        {/* Abstract Shapes */}
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

                        <div className="relative z-10">
                            <RevealOnScroll className="text-center mb-16 max-w-2xl mx-auto">
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-heading">The Union National Standard</h2>
                                <p className="text-slate-300 text-lg font-sans">
                                    Most accountants just record history. We help you make it. Our proactive methodology is designed to maximize retention and minimize liability.
                                </p>
                            </RevealOnScroll>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                                {[
                                    { icon: Zap, title: "Proactive Strategy", desc: "We meet quarterly, not just annually, to adjust your plan before the year ends." },
                                    { icon: ShieldCheck, title: "Audit Defense", desc: "Our strategies are conservative, compliant, and defensible. Sleep soundly." },
                                    { icon: Users, title: "Dedicated Team", desc: "No call centers. You get a dedicated CPA and account manager who knows your name." }
                                ].map((feature, i) => (
                                    <RevealOnScroll key={i} delay={i * 100} className="text-center group">
                                        <div className="w-20 h-20 mx-auto bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center mb-6 group-hover:bg-gold-500 group-hover:text-brand-900 transition-all duration-500 shadow-lg">
                                            <feature.icon className="w-8 h-8 text-gold-500 group-hover:text-brand-900 transition-colors" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-4 font-heading">{feature.title}</h3>
                                        <p className="text-slate-400 font-sans leading-relaxed">{feature.desc}</p>
                                    </RevealOnScroll>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Testimonial */}
                <section className="max-w-5xl mx-auto px-6 mb-32 text-center">
                    <RevealOnScroll>
                        <Quote className="w-12 h-12 text-gold-500/30 mx-auto mb-8" />
                        <blockquote className="text-3xl md:text-4xl font-bold text-brand-900 leading-tight mb-8 font-heading">
                            "Union National Tax didn't just file my taxes; they completely restructured my business entity. <span className="text-gold-600 bg-gold-50 px-2 rounded-lg decoration-clone box-decoration-clone">We saved over $42,000 in the first year alone.</span>"
                        </blockquote>
                        <div className="flex items-center justify-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden">
                                {/* Placeholder for avatar or use a generic refined initial */}
                                <div className="w-full h-full bg-brand-900 flex items-center justify-center text-white font-bold">MK</div>
                            </div>
                            <div className="text-left">
                                <div className="font-bold text-brand-900 font-sans">Michael Knight</div>
                                <div className="text-sm text-slate-500 font-sans">CEO, Knight Logistics</div>
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
