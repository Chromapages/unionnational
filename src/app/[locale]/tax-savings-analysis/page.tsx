import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ArrowRight, Hammer, Utensils, Building2, TrendingUp, ShieldCheck, Clock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Metadata } from "next";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await props.params;
    const baseUrl = "https://unionnationaltax.com";
    const path = "/tax-savings-analysis";
    const canonicalUrl = locale === "en" ? `${baseUrl}${path}` : `${baseUrl}/${locale}${path}`;

    return {
        title: "Free Tax Savings Analysis | Union National Tax",
        description: "Get a free, industry-specific Tax Savings Analysis. Discover unclaimed deductions and optimize your business structure.",
        alternates: {
            canonical: canonicalUrl,
            languages: {
                en: `${baseUrl}${path}`,
                es: `${baseUrl}/es${path}`,
            },
        },
    };
}

const analysisTypes = [
    {
        id: "contractors",
        title: "Construction & Contractors",
        description: "Identify $20k–$80k in unclaimed deductions specific to job costing, equipment, and S-Corp optimization.",
        icon: Hammer,
        href: "/tax-savings-analysis/contractors",
        color: "gold",
    },
    {
        id: "hospitality",
        title: "Hospitality & Restaurants",
        description: "Margin-focused tax strategy for high-volume operators. Analysis for payroll, tips, and inventory efficiency.",
        icon: Utensils,
        href: "/tax-savings-analysis/hospitality",
        color: "slate",
    },
    {
        id: "real-estate",
        title: "Real Estate Investors",
        description: "Strategic analysis for portfolio scaling, cost segregation, and 1031 exchange planning.",
        icon: Building2,
        href: "/tax-savings-analysis/real-estate",
        color: "gold",
    }
];

const features = [
    {
        title: "No-Cost Analysis",
        description: "A professional review of your tax position at zero cost to your business.",
        icon: TrendingUp,
    },
    {
        title: "Industry Specific",
        description: "Not a generic checklist. We look for deductions that actually apply to your sector.",
        icon: ShieldCheck,
    },
    {
        title: "Rapid Turnaround",
        description: "Receive your segmented PDF analysis via email within 24–48 business hours.",
        icon: Clock,
    }
];

export default async function TaxSavingsAnalysisHub(props: { params: Promise<{ locale: string }> }) {
    const { locale } = await props.params;

    return (
        <div className="min-h-screen bg-brand-950 flex flex-col font-sans text-white antialiased selection:bg-gold-500 selection:text-white overflow-x-hidden">
            <HeaderWrapper />

            <main id="main-content" className="flex-1">
                {/* Hero Section */}
                <section className="px-6 py-20 lg:py-32 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10" />
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                    
                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="max-w-3xl">
                            <RevealOnScroll>
                                <div className="mb-6">
                                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-gold-500">
                                        Data-Driven Strategy
                                    </span>
                                </div>
                                <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tighter mb-8 leading-[0.9] font-heading">
                                    Tax Savings <br />
                                    <span className="text-gold-500 italic">Analyses.</span>
                                </h1>
                                <p className="text-xl text-slate-400 mb-12 leading-relaxed font-light max-w-xl">
                                    Most business owners are overpaying the IRS because they lack a segmented strategy. Select your industry to receive a professional analysis of your unclaimed tax opportunities.
                                </p>
                            </RevealOnScroll>
                        </div>
                    </div>
                </section>

                {/* Industry Cards Grid */}
                <section className="py-20 px-6 relative z-10">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {analysisTypes.map((type, index) => (
                                <RevealOnScroll key={type.id} delay={index * 100}>
                                    <Link
                                        href={type.href}
                                        className={cn(
                                            "group block h-full p-8 lg:p-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm",
                                            "hover:bg-white/10 hover:border-gold-500/30 transition-all duration-500 relative overflow-hidden"
                                        )}
                                    >
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-gold-500/10 transition-colors" />
                                        
                                        <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-gold-500 transition-all duration-500">
                                            <type.icon size={28} className="text-gold-500 group-hover:text-brand-900 transition-colors" />
                                        </div>

                                        <h2 className="text-2xl lg:text-3xl font-bold mb-4 font-heading text-white leading-tight">
                                            {type.title}
                                        </h2>
                                        
                                        <p className="text-slate-400 mb-10 text-lg leading-relaxed">
                                            {type.description}
                                        </p>

                                        <div className="flex items-center gap-2 text-gold-500 font-bold tracking-tight uppercase text-xs group-hover:gap-4 transition-all">
                                            Get Your Analysis <ArrowRight size={16} />
                                        </div>
                                    </Link>
                                </RevealOnScroll>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Value Props */}
                <section className="py-24 px-6 border-t border-white/5 bg-brand-950/50">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
                            {features.map((feature, index) => (
                                <RevealOnScroll key={index} delay={index * 100}>
                                    <div className="flex flex-col gap-6">
                                        <div className="w-12 h-12 rounded-full border border-gold-500/20 flex items-center justify-center text-gold-500">
                                            <feature.icon size={24} />
                                        </div>
                                        <h3 className="text-xl font-bold font-heading text-white">{feature.title}</h3>
                                        <p className="text-slate-500 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                </RevealOnScroll>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ Style Disclaimer */}
                <section className="py-24 px-6">
                    <div className="max-w-3xl mx-auto text-center">
                        <RevealOnScroll>
                            <h2 className="text-3xl font-bold font-heading text-white mb-8">Professional Integrity</h2>
                            <p className="text-slate-500 text-sm leading-relaxed italic">
                                These analyses are intended for informational purposes and are based on the data provided in the form. They do not constitute an official tax opinion or legal advice. Final strategy implementation should always be reviewed by a qualified professional in the context of your full financial picture.
                            </p>
                        </RevealOnScroll>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
