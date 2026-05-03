import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ArrowRight, Hammer, Utensils, Building2, ShoppingBag, type LucideIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "IndustriesPage" });

    return {
        title: "Industries We Serve | Union National Tax",
        description: "Specialized tax strategy and financial advisory for construction, restaurants, and growth-stage businesses.",
    };
}

type Industry = {
    id: string;
    title: string;
    description: string;
    icon: LucideIcon;
    href: string;
    color?: string;
    comingSoon?: boolean;
};

const industries: Industry[] = [
    {
        id: "construction",
        title: "Construction & Real Estate",
        description: "From job costing to S-Corp optimization, we help contractors keep more of their profits and scale with clarity.",
        icon: Hammer,
        href: "/industries/construction",
        color: "gold",
    },
    {
        id: "restaurants",
        title: "Restaurants & Hospitality",
        description: "Margin protection and tax strategy for high-volume operators who need better financial visibility.",
        icon: Utensils,
        href: "/industries/restaurants",
        color: "slate",
    },
    {
        id: "real-estate",
        title: "Real Estate Wealth Architect",
        description: "Strategic tax planning for high-net-worth portfolios, 1031 exchanges, and accelerated depreciation (Cost Segregation).",
        icon: Building2,
        href: "/industries/real-estate",
    },
    {
        id: "ecommerce",
        title: "E-commerce Growth CFO",
        description: "Modern tax solutions for the digital economy. Sales tax nexus (Wayfair), inventory tax, and multi-channel scale.",
        icon: ShoppingBag,
        href: "/industries/e-commerce",
    }
];

export default async function IndustriesHubPage(props: { params: Promise<{ locale: string }> }) {
    // const params = await props.params;
    // const locale = params.locale;

    return (
        <div className="min-h-dvh bg-surface flex flex-col font-sans text-brand-900 antialiased selection:bg-gold-500 selection:text-white overflow-x-hidden">
            <HeaderWrapper />

            <main id="main-content" className="flex-1">
                {/* Hero Section */}
                <section className="bg-brand-500 px-6 py-16 md:py-24 relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                    
                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="max-w-3xl">
                            <RevealOnScroll>
                                <div className="mb-4">
                                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-500 font-heading">
                                        Specialized Expertise
                                    </span>
                                </div>
                                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tighter mb-8 leading-[1.05] font-heading font-black">
                                    Industry-Specific <br />
                                    <span className="text-gold-500">Advisory.</span>
                                </h1>
                                <p className="text-xl text-brand-50/80 mb-12 leading-relaxed font-sans max-w-xl">
                                    Generalist accounting doesn&apos;t cut it for complex businesses. We provide deep, industry-specific strategy for those who demand more than simple filing.
                                </p>
                            </RevealOnScroll>
                        </div>
                    </div>
                </section>

                {/* Industry Grid */}
                <section className="py-20 px-6 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                            {industries.map((industry, index) => {
                                const IndustryIcon = industry.icon;

                                return (
                                <RevealOnScroll key={industry.id} delay={index * 100}>
                                    <div className={cn(
                                        "group relative h-full flex flex-col p-8 lg:p-10 rounded-2xl border transition-all duration-300",
                                        industry.comingSoon 
                                            ? "bg-slate-50 border-slate-100 grayscale-[0.5] opacity-80 cursor-default" 
                                            : "bg-white border-slate-200 hover:border-gold-500/50 hover:shadow-2xl hover:shadow-gold-500/10"
                                    )}>
                                        <div className={cn(
                                            "w-14 h-14 rounded-xl flex items-center justify-center mb-8 transition-colors duration-300",
                                            industry.comingSoon ? "bg-slate-200 text-slate-400" : "bg-gold-500/10 text-gold-600 group-hover:bg-gold-500 group-hover:text-brand-900"
                                        )}>
                                            <IndustryIcon size={28} />
                                        </div>

                                        <h2 className="text-2xl lg:text-3xl font-bold mb-4 font-heading text-brand-900 leading-tight">
                                            {industry.title}
                                        </h2>
                                        
                                        <p className="text-slate-600 mb-8 text-lg leading-relaxed flex-1">
                                            {industry.description}
                                        </p>

                                        {industry.comingSoon ? (
                                            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 inline-flex items-center gap-2">
                                                Coming Soon
                                            </span>
                                        ) : (
                                            <Link
                                                href={industry.href}
                                                className="inline-flex items-center gap-2 text-gold-600 font-bold group-hover:gap-4 transition-all"
                                            >
                                                Explore Industry Strategy <ArrowRight size={20} />
                                            </Link>
                                        )}
                                    </div>
                                </RevealOnScroll>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-20 bg-brand-900 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gold-500/5 pointer-events-none" />
                    <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                        <RevealOnScroll>
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-heading">
                                Don&apos;t see your industry?
                            </h2>
                            <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
                                We work with a variety of growth-minded business owners. Book a strategy call to see if our advisory-led approach is the right fit for your situation.
                            </p>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-3 px-10 py-5 bg-gold-500 text-brand-900 font-bold text-xl rounded-xl hover:bg-gold-600 transition-all shadow-lg shadow-gold-500/20"
                            >
                                Book a Tax Strategy Call <ArrowRight size={24} />
                            </Link>
                        </RevealOnScroll>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
