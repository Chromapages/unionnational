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
                <section className="max-w-[90rem] mx-auto px-6 mb-24">
                    <RevealOnScroll>
                        <h2 className="text-2xl font-bold text-brand-900 mb-8 font-heading">Specialized Partner Programs</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                            {/* Construction Card */}
                            <Link href="/vsl/construction" className="block group h-full">
                                <div className="relative h-full rounded-[2.5rem] bg-brand-500 p-8 sm:p-10 border border-emerald-500/10 hover:border-emerald-500/30 overflow-hidden hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 flex flex-col group-hover:-translate-y-1">
                                    {/* Badge */}
                                    <div className="inline-flex self-start items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-8">
                                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                                        For Construction Firms
                                    </div>

                                    <div className="flex flex-col flex-grow">
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-6">
                                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 flex-shrink-0">
                                                <Icons.HardHat className="w-8 h-8" />
                                            </div>
                                            <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading group-hover:text-emerald-400 transition-colors">
                                                Construction CFO Partnership
                                            </h3>
                                        </div>

                                        <p className="text-brand-100/70 text-lg mb-8 leading-relaxed">
                                            Stop bleeding cash on job costing & labor. The "Hybrid CFO + COO" model for $1M–$10M contractors.
                                        </p>

                                        {/* Features */}
                                        <div className="space-y-3 mb-8">
                                            <div className="flex items-center gap-3 text-brand-100/90">
                                                <Icons.Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                                                <span className="text-sm font-medium">Job costing automation</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-brand-100/90">
                                                <Icons.Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                                                <span className="text-sm font-medium">Real-time margin tracking</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-brand-100/90">
                                                <Icons.Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                                                <span className="text-sm font-medium">Tax strategy optimization</span>
                                            </div>
                                        </div>

                                        {/* Divider */}
                                        <div className="h-px w-full bg-gradient-to-r from-emerald-500/0 via-emerald-500/20 to-emerald-500/0 mb-8" />

                                        {/* Stats */}
                                        <div className="grid grid-cols-3 gap-4 mb-8">
                                            <div>
                                                <div className="text-2xl font-bold text-emerald-400">$400K+</div>
                                                <div className="text-[10px] uppercase tracking-wider text-brand-100/50 mt-1">Avg Savings</div>
                                            </div>
                                            <div>
                                                <div className="text-2xl font-bold text-emerald-400">95%</div>
                                                <div className="text-[10px] uppercase tracking-wider text-brand-100/50 mt-1">Retention</div>
                                            </div>
                                            <div>
                                                <div className="text-2xl font-bold text-emerald-400">90 Days</div>
                                                <div className="text-[10px] uppercase tracking-wider text-brand-100/50 mt-1">To Results</div>
                                            </div>
                                        </div>

                                        <div className="mt-auto">
                                            <div className="w-full py-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold uppercase tracking-widest text-sm flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                                                Apply Now <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            {/* Restaurant Card */}
                            <Link href="/vsl/restaurants" className="block group h-full">
                                <div className="relative h-full rounded-[2.5rem] bg-brand-500 p-8 sm:p-10 border border-orange-500/10 hover:border-orange-500/30 overflow-hidden hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 flex flex-col group-hover:-translate-y-1">
                                    {/* Badge */}
                                    <div className="inline-flex self-start items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-bold uppercase tracking-widest mb-8">
                                        <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" />
                                        For Restaurants
                                    </div>

                                    <div className="flex flex-col flex-grow">
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-6">
                                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white shadow-lg shadow-orange-500/20 flex-shrink-0">
                                                <Icons.UtensilsCrossed className="w-8 h-8" />
                                            </div>
                                            <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading group-hover:text-orange-400 transition-colors">
                                                Restaurant CFO Partnership
                                            </h3>
                                        </div>

                                        <p className="text-brand-100/70 text-lg mb-8 leading-relaxed">
                                            Stop profit leaks on food cost & labor. The "Kitchen Command Center" system for $500K–$5M venues.
                                        </p>

                                        {/* Features */}
                                        <div className="space-y-3 mb-8">
                                            <div className="flex items-center gap-3 text-brand-100/90">
                                                <Icons.Check className="w-5 h-5 text-orange-400 flex-shrink-0" />
                                                <span className="text-sm font-medium">Inventory & COGS control</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-brand-100/90">
                                                <Icons.Check className="w-5 h-5 text-orange-400 flex-shrink-0" />
                                                <span className="text-sm font-medium">Real-time P&L visibility</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-brand-100/90">
                                                <Icons.Check className="w-5 h-5 text-orange-400 flex-shrink-0" />
                                                <span className="text-sm font-medium">Menu pricing strategy</span>
                                            </div>
                                        </div>

                                        {/* Divider */}
                                        <div className="h-px w-full bg-gradient-to-r from-orange-500/0 via-orange-500/20 to-orange-500/0 mb-8" />

                                        {/* Stats */}
                                        <div className="grid grid-cols-3 gap-4 mb-8">
                                            <div>
                                                <div className="text-2xl font-bold text-orange-400">$350K+</div>
                                                <div className="text-[10px] uppercase tracking-wider text-brand-100/50 mt-1">Avg Savings</div>
                                            </div>
                                            <div>
                                                <div className="text-2xl font-bold text-orange-400">98%</div>
                                                <div className="text-[10px] uppercase tracking-wider text-brand-100/50 mt-1">Retention</div>
                                            </div>
                                            <div>
                                                <div className="text-2xl font-bold text-orange-400">90 Days</div>
                                                <div className="text-[10px] uppercase tracking-wider text-brand-100/50 mt-1">To Results</div>
                                            </div>
                                        </div>

                                        <div className="mt-auto">
                                            <div className="w-full py-4 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 font-bold uppercase tracking-widest text-sm flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                                                Apply Now <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                            </div>
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
                            <RevealOnScroll key={service._id} delay={i * 50} className="group relative bg-white rounded-[2rem] p-8 border border-slate-200 hover:border-gold-500/20 shadow-sm hover:shadow-2xl hover:shadow-gold-500/5 transition-all duration-300 flex flex-col h-full overflow-hidden hover:-translate-y-1">
                                <Link href={`/services/${service.slug.current}`} className="absolute inset-0 z-20">
                                    <span className="sr-only">View {service.title}</span>
                                </Link>

                                {/* Hover Gradient Glow */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-gold-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                <div className="relative w-16 h-16 rounded-2xl bg-brand-900 flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-105 transition-transform duration-300">
                                    <DynamicIcon name={service.icon} className="w-8 h-8 opacity-90" />
                                </div>

                                <div className="relative flex-grow">
                                    <h3 className="text-2xl font-bold text-brand-900 mb-3 font-heading group-hover:text-gold-600 transition-colors">
                                        {service.title}
                                    </h3>

                                    <p className="text-slate-600 leading-relaxed mb-6 font-sans">
                                        {service.shortDescription}
                                    </p>

                                    {/* Features List */}
                                    {service.features && service.features.length > 0 && (
                                        <>
                                            <div className="h-px w-full bg-slate-100 mb-6" />
                                            <ul className="space-y-3 mb-8">
                                                {service.features.slice(0, 3).map((feature: string, idx: number) => (
                                                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                                                        <div className="mt-0.5 rounded-full bg-emerald-500/10 p-1 shrink-0">
                                                            <Icons.Check className="w-3 h-3 text-emerald-500" />
                                                        </div>
                                                        <span className="leading-snug">{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    )}
                                </div>

                                <div className="mt-auto pt-6 border-t border-slate-100 relative flex items-center justify-between">
                                    <span className="text-gold-600 font-bold uppercase tracking-widest text-xs group-hover:text-gold-500 transition-colors">Explore Service</span>
                                    <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-gold-500 group-hover:translate-x-1 transition-all" />
                                </div>
                            </RevealOnScroll>
                        ))}
                    </div>
                </section>

                {/* Process / Methodology */}
                {/* Process / Methodology - Redesigned CTA (Wide Strip) */}
                <section className="max-w-[100rem] mx-auto px-6 mb-32">
                    <RevealOnScroll className="bg-brand-900 rounded-[2.5rem] p-8 sm:p-10 lg:py-12 lg:px-16 relative overflow-hidden border border-white/5 shadow-2xl shadow-black/20">
                        {/* Background Effects */}
                        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2 will-change-transform"></div>
                            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2 will-change-transform"></div>
                        </div>

                        <div className="relative z-10 w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 lg:gap-16">

                            {/* Left Block: Text Content (40%) */}
                            <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:flex-1 lg:max-w-2xl">
                                {/* Badge & Pills - Inline */}
                                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-6">
                                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 backdrop-blur-sm shrink-0">
                                        <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
                                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-400">Explore Services</span>
                                    </span>

                                    {['Tax Strategy', 'Bookkeeping', 'CFO Advisory'].map((pill) => (
                                        <span key={pill} className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-brand-100/70 text-[11px] font-medium backdrop-blur-sm whitespace-nowrap">
                                            {pill}
                                        </span>
                                    ))}
                                </div>

                                <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-white tracking-tight mb-4 font-heading leading-[1.1]">
                                    Premier Tax & Advisory Services
                                </h2>

                                <p className="text-brand-100/80 text-base md:text-lg leading-relaxed font-sans max-w-xl mx-auto lg:mx-0">
                                    From proactive tax strategy to real-time bookkeeping—services built to maximize savings.
                                </p>
                            </div>

                            {/* Center Block: Metrics (35%) */}
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

                            {/* Right Block: Actions (25%) */}
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
