import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ArrowRight, Check, CheckCircle2, Phone } from "lucide-react";
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
                <section className="max-w-[90rem] mx-auto px-6 mb-24 relative">
                    <div className="absolute top-0 left-1/2 w-[800px] h-[600px] bg-gradient-to-b from-brand-900 to-transparent rounded-full blur-3xl -z-10 opacity-60 pointer-events-none -translate-x-1/2 -translate-y-1/4"></div>

                    <div className="text-center max-w-3xl mx-auto">
                        <RevealOnScroll>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-brand-900 text-[10px] font-semibold uppercase tracking-widest mb-6 shadow-sm font-sans">
                                <span className="w-1.5 h-1.5 rounded-full bg-gold-500"></span>
                                Comprehensive Financial Solutions
                            </div>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-900 tracking-tight mb-6 leading-[1.1] font-heading">
                                Beyond the tax return. <br />
                                <span className="text-gold-500">A system for wealth.</span>
                            </h1>
                            <p className="text-lg text-brand-900 mb-10 leading-relaxed font-sans">
                                We replace the transactional "once-a-year" accountant model with a proactive partnership designed for contractors, freelancers, and S-Corp owners.
                            </p>
                        </RevealOnScroll>
                    </div>
                </section>

                {/* Services Grid */}
                <section className="max-w-7xl mx-auto px-6 mb-32">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service: any, i: number) => (
                            <RevealOnScroll
                                key={service._id}
                                delay={i * 100}
                                className={`group relative rounded-[2rem] p-8 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full border overflow-hidden
                                    ${service.isPopular
                                        ? 'bg-brand-900 border-brand-900 text-white shadow-2xl shadow-brand-900/20'
                                        : 'bg-white border-slate-100 shadow-sm shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-200/80 hover:border-slate-200'
                                    }`}
                            >
                                <Link href={`/services/${service.slug?.current}`} className="absolute inset-0 z-10">
                                    <span className="sr-only">View {service.title}</span>
                                </Link>

                                {/* Top Border Accent */}
                                {!service.isPopular && (
                                    <div
                                        className="absolute top-0 left-0 right-0 h-1.5 opacity-80"
                                        style={{ backgroundColor: service.accentColor || '#D4AF37' }}
                                    />
                                )}

                                {/* Card Badge */}
                                {service.badge && (
                                    <div className={`absolute top-6 right-6 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest font-sans
                                        ${service.isPopular ? 'bg-gold-500 text-brand-900' : 'bg-slate-50 text-brand-900 border border-slate-100'}
                                    `}>
                                        {service.badge}
                                    </div>
                                )}

                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm
                                    ${service.isPopular ? 'bg-white/10 text-white' : 'bg-gold-50 text-gold-600'}
                                `}>
                                    <DynamicIcon name={service.icon} className="w-7 h-7" />
                                </div>

                                <h3 className={`text-2xl font-bold mb-4 tracking-tight font-heading
                                    ${service.isPopular ? 'text-white' : 'text-brand-900'}
                                `}>
                                    {service.title}
                                </h3>

                                <p className={`text-sm mb-8 leading-relaxed font-sans
                                    ${service.isPopular ? 'text-slate-300' : 'text-brand-900'}
                                `}>
                                    {service.shortDescription}
                                </p>

                                <div className="mt-auto space-y-6">
                                    {service.impactGoal && (
                                        <div className={`text-xs font-bold leading-tight uppercase tracking-wide font-sans
                                            ${service.isPopular ? 'text-white/90' : 'text-brand-500'}
                                        `}>
                                            <span className="block opacity-60 text-[10px] mb-1">Impact Goal</span>
                                            "{service.impactGoal}"
                                        </div>
                                    )}

                                    {/* Link UI */}
                                    <div className="pt-6 border-t border-white/10 dark:border-slate-100 flex items-center justify-between transition-all duration-300">
                                        <div className="flex items-center gap-2 group/btn">
                                            <span className={`text-xs font-bold uppercase tracking-widest transition-all duration-300 group-hover/btn:translate-x-1 font-sans
                                                ${service.isPopular ? 'text-white/70 group-hover:text-white' : 'text-brand-900/60 group-hover:text-brand-900'}
                                            `}>
                                                Learn More
                                            </span>
                                            <ArrowRight className={`w-4 h-4 transition-all duration-300 group-hover/btn:translate-x-2
                                                ${service.isPopular ? 'text-white' : 'text-gold-600'}
                                            `} />
                                        </div>
                                    </div>
                                </div>
                            </RevealOnScroll>
                        ))}
                    </div>
                </section>

                {/* Process Section - How We Work */}
                <section className="max-w-7xl mx-auto px-6 mb-32">
                    <RevealOnScroll className="text-center mb-16">
                        <h2 className="text-sm font-semibold text-gold-600 uppercase tracking-widest mb-3 font-heading">Our Process</h2>
                        <h3 className="text-3xl font-bold text-brand-900 tracking-tight font-heading">How we build your financial fortress.</h3>
                    </RevealOnScroll>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-slate-200 -z-10"></div>

                        {[
                            { title: "Discovery", desc: "We analyze your current tax situation, entity structure, and financial goals in a deep-dive session." },
                            { title: "Strategy", desc: "We design a custom tax plan, identifying every available deduction, credit, and optimization strategy." },
                            { title: "Implementation", desc: "We execute the plan—restructuring entities, setting up payroll, and recalibrating withholdings." },
                            { title: "Maintenance", desc: "We monitor your financials year-round, adjusting the strategy as your business grows and laws change." }
                        ].map((step, i) => (
                            <RevealOnScroll key={i} delay={i * 100} className="relative bg-surface">
                                <div className="w-24 h-24 mx-auto bg-white rounded-full border-4 border-surface flex items-center justify-center mb-6 relative z-10">
                                    <div className="w-20 h-20 bg-brand-900 rounded-full flex items-center justify-center text-white text-xl font-bold font-heading shadow-xl">
                                        {i + 1}
                                    </div>
                                </div>
                                <h4 className="text-lg font-bold text-brand-900 text-center mb-3 font-heading">{step.title}</h4>
                                <p className="text-sm text-brand-900/80 text-center leading-relaxed font-sans px-4">
                                    {step.desc}
                                </p>
                            </RevealOnScroll>
                        ))}
                    </div>
                </section>

                <CTASection />
            </main>

            <Footer />
        </div>
    );
}
