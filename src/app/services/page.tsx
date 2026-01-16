import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
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
            <HeaderWrapper />

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

                {/* Featured Partner Programs */}
                <section className="max-w-[90rem] mx-auto px-6 mb-16 space-y-8">
                    <RevealOnScroll>
                        <h2 className="text-2xl font-bold text-brand-900 mb-8 font-heading">Specialized Partner Programs</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                            {/* Construction Card */}
                            <Link href="/vsl/construction" className="block group h-full">
                                <div className="relative h-full rounded-[2.5rem] bg-gradient-to-r from-brand-900 via-brand-800 to-brand-900 p-8 sm:p-10 border border-brand-700 overflow-hidden hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 flex flex-col">
                                    {/* Gradient accent bar */}
                                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400" />

                                    {/* Badge */}
                                    <div className="inline-flex self-start items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6">
                                        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                                        For Construction Firms
                                    </div>

                                    <div className="flex flex-col gap-6 flex-grow">
                                        <div className="flex items-center gap-6">
                                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white shadow-lg flex-shrink-0">
                                                <Icons.HardHat className="w-8 h-8" />
                                            </div>
                                            <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading group-hover:text-emerald-400 transition-colors">
                                                Construction CFO Partnership
                                            </h3>
                                        </div>

                                        <p className="text-brand-200 text-lg flex-grow">
                                            Stop bleeding cash on job costing & labor. The "Hybrid CFO + COO" model for $1M–$10M contractors.
                                        </p>

                                        <div className="flex items-center text-emerald-400 font-bold uppercase tracking-widest text-sm mt-auto">
                                            Apply Now <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            {/* Restaurant Card */}
                            <Link href="/vsl/restaurants" className="block group h-full">
                                <div className="relative h-full rounded-[2.5rem] bg-gradient-to-r from-brand-900 via-brand-800 to-brand-900 p-8 sm:p-10 border border-brand-700 overflow-hidden hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 flex flex-col">
                                    {/* Gradient accent bar */}
                                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-400 via-red-400 to-orange-400" />

                                    {/* Badge */}
                                    <div className="inline-flex self-start items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-widest mb-6">
                                        <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
                                        For Restaurants
                                    </div>

                                    <div className="flex flex-col gap-6 flex-grow">
                                        <div className="flex items-center gap-6">
                                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white shadow-lg flex-shrink-0">
                                                <Icons.UtensilsCrossed className="w-8 h-8" />
                                            </div>
                                            <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading group-hover:text-orange-400 transition-colors">
                                                Restaurant CFO Partnership
                                            </h3>
                                        </div>

                                        <p className="text-brand-200 text-lg flex-grow">
                                            Stop profit leaks on food cost & labor. The "Kitchen Command Center" system for $500K–$5M venues.
                                        </p>

                                        <div className="flex items-center text-orange-400 font-bold uppercase tracking-widest text-sm mt-auto">
                                            Apply Now <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </Link>

                        </div>
                    </RevealOnScroll>
                </section>

                {/* Services Grid */}
                <section className="max-w-[90rem] mx-auto px-6 mb-32">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services?.map((service: any, i: number) => (
                            <RevealOnScroll key={service._id} delay={i * 50} className={`rounded-[2.5rem] border p-8 sm:p-10 hover:shadow-2xl hover:shadow-gold-500/10 transition-all duration-300 flex flex-col h-full group relative overflow-hidden
                                ${service.isPopular ? 'bg-brand-900 border-brand-900' : 'bg-white border-slate-100 hover:border-gold-500/30'}`}>

                                <Link href={`/services/${service.slug?.current}`} className="absolute inset-0 z-20">
                                    <span className="sr-only">View {service.title}</span>
                                </Link>

                                {/* Top Gradient Accent */}
                                <div className={`absolute top-0 left-0 right-0 h-1.5 transition-all duration-500 group-hover:h-2
                                    ${service.isPopular ? 'bg-gradient-to-r from-gold-400 to-gold-600' : 'bg-slate-100 group-hover:bg-gold-400'}`}
                                />

                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg relative z-10
                                    ${service.isPopular ? 'bg-white/10 text-gold-500 ring-1 ring-white/20' : 'bg-gold-50 text-gold-600 group-hover:bg-gold-500 group-hover:text-white'}`}>
                                    <DynamicIcon name={service.icon} className="w-7 h-7" />
                                </div>

                                <h3 className={`text-2xl font-bold mb-4 font-heading transition-colors relative z-10
                                    ${service.isPopular ? 'text-white' : 'text-brand-900 group-hover:text-gold-600'}`}>
                                    {service.title}
                                </h3>

                                <p className={`text-base leading-relaxed mb-8 flex-grow font-sans relative z-10
                                    ${service.isPopular ? 'text-white/80' : 'text-brand-900/70'}`}>
                                    {service.shortDescription}
                                </p>

                                <div className={`pt-6 border-t mt-auto relative z-10 flex items-center justify-between
                                    ${service.isPopular ? 'border-white/10' : 'border-slate-100'}`}>
                                    <span className={`text-sm font-bold uppercase tracking-widest transition-colors font-sans
                                        ${service.isPopular ? 'text-gold-400 group-hover:text-white' : 'text-brand-900 group-hover:text-gold-600'}`}>
                                        Learn More
                                    </span>
                                    <ArrowRight className={`w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 ${service.isPopular ? 'text-gold-400' : 'text-brand-900'}`} />
                                </div>
                            </RevealOnScroll>
                        ))}
                    </div>
                </section>

                {/* Process / Methodology */}
                <section className="max-w-7xl mx-auto px-6 mb-32">
                    <RevealOnScroll className="bg-brand-900 rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden text-center">
                        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>
                            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2"></div>
                        </div>

                        <div className="relative z-10 max-w-3xl mx-auto">
                            <h2 className="text-3xl font-bold text-white tracking-tight mb-6 font-heading">
                                Ready to upgrade your financial infrastructure?
                            </h2>
                            <p className="text-slate-300 text-lg leading-relaxed mb-10 font-sans">
                                Stop overpaying taxes and start building wealth. Schedule a discovery call with our team today.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link href="/contact" className="w-full sm:w-auto px-8 py-4 bg-gold-500 text-brand-900 font-bold rounded-xl hover:bg-white transition-all shadow-lg shadow-gold-500/20 flex items-center justify-center gap-2 font-sans">
                                    Book a Discovery Call
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                                <Link href="/about" className="w-full sm:w-auto px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 backdrop-blur-sm transition-all flex items-center justify-center gap-2 font-sans">
                                    Learn About Us
                                </Link>
                            </div>
                        </div>
                    </RevealOnScroll>
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
