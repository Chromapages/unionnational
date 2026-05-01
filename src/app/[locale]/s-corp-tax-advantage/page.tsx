import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { Metadata } from "next";
import { SERVICE_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import { notFound } from "next/navigation";
import { urlFor } from "@/sanity/lib/image";
import { 
    CheckCircle2, 
    TrendingDown, 
    ShieldCheck, 
    ArrowRight, 
    Target as TargetIcon, 
    Layers, 
    BarChart3, 
    Search, 
    FileCheck,
    Check
} from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { FadeIn } from "@/components/ui/FadeIn";
import { ScorpHeroActions } from "@/components/scorp/ScorpHeroActions";
import { ScorpEstimatorShell } from "@/components/scorp/ScorpEstimatorShell";
import { ScorpFAQSection } from "@/components/scorp/ScorpFAQSection";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { ShopViewContent } from "@/components/seo/ShopViewContent";
import {
    FALLBACK_FAQS,
    FALLBACK_ROADMAP,
    FALLBACK_CRITERIA_PROS,
    FALLBACK_CRITERIA_CONS,
    FALLBACK_COMPARISON,
    FALLBACK_TRUST_SIGNALS
} from "./fallbackData";

const SLUG = "s-corp-tax-advantage";
// Force refresh for hydration sync


export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const { data: service } = await sanityFetch({ query: SERVICE_QUERY, params: { slug: SLUG, locale } });
    
    const baseUrl = "https://unionnationaltax.com";
    const path = locale === "en" ? `/${SLUG}` : `/${locale}/${SLUG}`;
    const canonicalUrl = `${baseUrl}${path}`;

    if (!service) {
        return {
            title: "S-Corp Tax Advantage Program | Union National Tax",
            description: "Evaluate whether an S-Corp election could lower tax burden and support smarter growth.",
            alternates: {
                canonical: canonicalUrl,
            }
        };
    }

    const { seo } = service;
    const metaTitle = seo?.metaTitle || `${service.title} | Union National Tax`;
    const metaDescription = seo?.metaDescription || service.shortDescription;

    let ogImageUrl = "";
    if (seo?.openGraphImage?.asset) {
        ogImageUrl = urlFor(seo.openGraphImage).width(1200).height(630).url();
    }

    return {
        title: metaTitle,
        description: metaDescription,
        keywords: seo?.keywords || [],
        alternates: {
            canonical: canonicalUrl,
            languages: {
                en: `${baseUrl}/${SLUG}`,
                es: `${baseUrl}/es/${SLUG}`,
            }
        },
        openGraph: {
            title: metaTitle,
            description: metaDescription,
            images: ogImageUrl ? [{ url: ogImageUrl }] : [],
        },
    };
}

export default async function SCorpAdvantagePage(props: { params: Promise<{ locale: string }> }) {
    const { locale } = await props.params;

    const { data: service } = await sanityFetch({ 
        query: SERVICE_QUERY, 
        params: { slug: SLUG, locale } 
    });

    if (!service) {
        notFound();
    }

    // Resolve Dynamic Data
    const faqs = (service?.faq?.length > 0 ? service.faq : FALLBACK_FAQS).map((item: any, i: number) => ({
        q: item.q || item.question || FALLBACK_FAQS[i]?.q,
        a: item.a || item.answer || FALLBACK_FAQS[i]?.a
    }));

    const roadmap = (service?.roadmap?.length > 0 ? service.roadmap : FALLBACK_ROADMAP).map((step: any, i: number) => ({
        stepNumber: step.stepNumber || FALLBACK_ROADMAP[i]?.stepNumber || (i + 1).toString().padStart(2, '0'),
        title: step.title || FALLBACK_ROADMAP[i]?.title,
        description: step.description || FALLBACK_ROADMAP[i]?.description
    }));

    const criteriaPros = service?.eligibilityPros?.length > 0 ? service.eligibilityPros : FALLBACK_CRITERIA_PROS;
    const criteriaCons = service?.eligibilityCons?.length > 0 ? service.eligibilityCons : FALLBACK_CRITERIA_CONS;
    
    const comparisonPoints = (service?.comparisonPoints?.length > 0 ? service.comparisonPoints : FALLBACK_COMPARISON).map((item: any, i: number) => ({
        ...FALLBACK_COMPARISON[i],
        ...item
    }));

    const trustSignals = service?.trustSignals?.length > 0 ? service.trustSignals : FALLBACK_TRUST_SIGNALS;

    const heroTitle = service?.title || "Stop Overpaying Yourself Into Higher Taxes.";
    const heroDescription = service?.shortDescription || "The S-Corp Tax Advantage Program helps qualified business owners evaluate whether an S-Corp election could lower tax burden, improve compensation structure, and support smarter long-term growth.";
    const impactGoal = service?.impactGoal || "Strategic Tax Optimization";

    const agitationTitle = (service?.problemAgitation?.title) || "Why your current setup is costing you money.";
    const agitationDesc = (service?.problemAgitation?.description) || "A lot of self-employed professionals and growing small business owners start as sole proprietors or single-member LLCs — and stay there far too long.";

    return (
        <div className="min-h-screen bg-surface flex flex-col font-sans text-brand-900 antialiased selection:bg-gold-500 selection:text-white overflow-x-hidden">
            <ShopViewContent 
                productName={heroTitle}
                productId={SLUG}
                price={0}
            />
            <HeaderWrapper />
            <main id="main-content" className="bg-white overflow-hidden">
                {/* 1. HERO SECTION */}
                <section className="relative min-h-[90dvh] pt-20 flex items-center bg-brand-900 border-b border-white/5 overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
                        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold-600/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
                        <div className="absolute inset-0 bg-[url('/images/pattern-grid.svg')] bg-repeat opacity-[0.03]" />
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-20 lg:py-0">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                            <div className="lg:col-span-7">
                                <FadeIn delay={0.1} direction="down">
                                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
                                        <span className="flex h-2 w-2 relative">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-500"></span>
                                        </span>
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-gold-400">
                                            {impactGoal}
                                        </span>
                                    </div>
                                </FadeIn>

                                <FadeIn delay={0.2}>
                                    <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold font-heading text-white leading-[1.1] mb-8 tracking-tighter">
                                        {heroTitle.split("Into").length > 1 ? (
                                            <>
                                                {heroTitle.split("Into")[0]} <br />
                                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600 italic">Into {heroTitle.split("Into")[1]}</span>
                                            </>
                                        ) : heroTitle}
                                    </h1>
                                </FadeIn>

                                <FadeIn delay={0.3}>
                                    <p className="text-lg md:text-xl text-slate-400 mb-10 leading-relaxed max-w-2xl font-light">
                                        {heroDescription}
                                    </p>
                                </FadeIn>

                                <ScorpHeroActions estimatorId="estimator-section" />

                                <FadeIn delay={0.5} direction="none">
                                    <div className="mt-12 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                                        <div className="h-px w-8 bg-gold-500/30" />
                                        Built for Growth-Minded Owners
                                    </div>
                                </FadeIn>
                            </div>

                            <div className="lg:col-span-5 relative hidden lg:block">
                                <FadeIn delay={0.4} direction="left">
                                    <div className="relative rounded-[2.5rem] bg-brand-900 border border-gold-500/30 p-1 shadow-premium overflow-hidden group">
                                        <div className="absolute inset-0 bg-gradient-to-br from-gold-500/10 via-transparent to-transparent opacity-50" />
                                        <div className="relative bg-brand-950 rounded-[2.2rem] p-8 lg:p-10">
                                            <div className="flex items-center justify-between mb-8">
                                                <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-500">
                                                    <TrendingDown size={24} />
                                                </div>
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Industry Standard Estimate</span>
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-2 font-heading tracking-tight">Tax Drag Reduction</h3>
                                            <p className="text-slate-400 text-sm mb-8 font-light">Typical high-profit owner potential</p>
                                            
                                            <div className="space-y-6">
                                                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 group-hover:border-gold-500/30 transition-all">
                                                    <div className="flex justify-between items-end mb-2">
                                                        <span className="text-xs text-slate-500 uppercase tracking-widest font-bold font-heading">Estimated Savings</span>
                                                        <span className="text-2xl font-bold text-gold-500 font-heading">$12,000+</span>
                                                    </div>
                                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                                        <div className="h-full bg-gold-500 rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)] w-3/4" />
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3 text-xs text-slate-400 px-2 font-light">
                                                    <CheckCircle2 size={14} className="text-gold-500" />
                                                    <span>Institutional Grade Structure</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </FadeIn>
                            </div>
                        </div>
                    </div>
                </section>

                {/* TRUST STRIP */}
                <div className="bg-white border-y border-slate-100 py-10 relative z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                            {trustSignals.map((item: string, idx: number) => (
                                <div key={idx} className="flex items-center justify-center gap-3 group">
                                    <div className="w-8 h-8 rounded-lg bg-gold-500/5 flex items-center justify-center text-gold-500 group-hover:bg-gold-500 group-hover:text-brand-900 transition-all duration-300">
                                        <ShieldCheck size={16} />
                                    </div>
                                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500 group-hover:text-brand-900 transition-colors">
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 2. PROBLEM / AGITATION */}
                <section id="estimator-section" className="py-20 lg:py-24 bg-surface relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                            <div className="lg:col-span-6">
                                <RevealOnScroll>
                                    <div className="mb-6">
                                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 text-[10px] font-bold uppercase tracking-widest text-gold-600">
                                            The Structure Problem
                                        </span>
                                    </div>
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-brand-900 font-heading leading-[1.1] mb-8">
                                        {agitationTitle.split("costing").length > 1 ? (
                                            <>
                                                {agitationTitle.split("costing")[0]} <br />
                                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-gold-700 italic">costing {agitationTitle.split("costing")[1]}</span>
                                            </>
                                        ) : agitationTitle}
                                    </h2>
                                    <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-sans font-light">
                                        <p>{agitationDesc}</p>
                                        <p className="font-bold text-brand-900">
                                            The right S-Corp setup can create meaningful tax efficiency for the right business.
                                        </p>
                                    </div>
                                </RevealOnScroll>
                            </div>

                            <div className="lg:col-span-6 relative">
                                <RevealOnScroll delay={200}>
                                    <div className="relative rounded-3xl bg-white border border-slate-200 shadow-xl overflow-hidden p-1">
                                        <ScorpEstimatorShell />
                                    </div>
                                </RevealOnScroll>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. WHAT THE PROGRAM IS */}
                <section className="py-20 lg:py-24 bg-white relative">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
                            <RevealOnScroll>
                                <div className="mb-6">
                                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 text-[10px] font-bold uppercase tracking-widest text-gold-600">
                                        Vertical Focus
                                    </span>
                                </div>
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-brand-900 font-heading leading-[1.1] mb-8">
                                    Strategic <span className="italic text-gold-500">Advantage.</span>
                                </h2>
                                <p className="text-lg text-slate-500 font-light leading-relaxed font-sans">
                                    This is not a one-size-fits-all filing service. It is a structured advisory process designed to determine whether an S-Corp election makes sense for your business.
                                </p>
                            </RevealOnScroll>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                            {[
                                {
                                    icon: Search,
                                    title: "Strategic Evaluation",
                                    category: "Tax Audit",
                                    body: "We review your business structure, income profile, and owner compensation picture to assess whether an S-Corp election is likely to create real value."
                                },
                                {
                                    icon: FileCheck,
                                    title: "Entity & Election Guidance",
                                    category: "Implementation",
                                    body: "If the strategy is a fit, we help guide the transition and filing process, including the S-Corp election path and related setup considerations."
                                },
                                {
                                    icon: Layers,
                                    title: "Ongoing Tax Alignment",
                                    category: "Long-term Strategy",
                                    body: "An S-Corp is not just a form. It affects compensation, planning, and compliance. We help make sure the structure supports the bigger strategy."
                                },
                                {
                                    icon: BarChart3,
                                    title: "Financial Decision-Making",
                                    category: "Executive Leadership",
                                    body: "The goal is not only tax savings. It is a cleaner, smarter financial setup that gives the owner more control over how the business runs and grows."
                                }
                            ].map((item, idx) => (
                                <RevealOnScroll key={idx} delay={idx * 100}>
                                    <div className="h-full bg-white p-8 lg:p-10 rounded-2xl border border-slate-200 hover:border-gold-500/40 hover:shadow-soft transition-all group flex gap-6 lg:gap-8 items-start">
                                        <div className="w-12 lg:w-14 h-12 lg:h-14 rounded-xl bg-gold-500/10 flex items-center justify-center shrink-0 text-gold-500 group-hover:bg-gold-500 group-hover:text-brand-900 transition-all duration-300">
                                            <item.icon size={24} />
                                        </div>
                                        <div>
                                            <span className="block text-[10px] font-bold uppercase tracking-widest text-gold-600 mb-2">{item.category}</span>
                                            <h3 className="text-xl font-bold text-brand-900 mb-3 font-heading tracking-tight">{item.title}</h3>
                                            <p className="text-slate-500 leading-relaxed text-base font-light font-sans">{item.body}</p>
                                        </div>
                                    </div>
                                </RevealOnScroll>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 4. WHO IT'S FOR / NOT FOR */}
                <section className="py-20 lg:py-24 bg-surface">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm">
                            <div className="p-8 lg:p-16 space-y-10">
                                <div className="space-y-4">
                                <div className="mb-4">
                                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 text-[10px] font-bold uppercase tracking-widest text-gold-600">Candidate Criteria</span>
                                </div>
                                    <h3 className="text-3xl font-bold text-brand-900 font-heading tracking-tight">Elite Strategy Fit</h3>
                                </div>
                                <ul className="space-y-5">
                                    {criteriaPros.map((item: string, i: number) => (
                                        <li key={i} className="flex gap-4 text-slate-600 font-light leading-relaxed font-sans">
                                            <CheckCircle2 size={20} className="text-gold-500 shrink-0 mt-1" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-brand-900 p-8 lg:p-16 text-white relative overflow-hidden flex flex-col justify-center">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-[80px]" />
                                <div className="relative space-y-8">
                                    <h3 className="text-3xl font-bold font-heading tracking-tight">Who It’s <span className="text-gold-500 italic">Not</span> For</h3>
                                    {criteriaCons.map((item: string, idx: number) => (
                                        <p key={idx} className="text-slate-400 font-light leading-relaxed text-lg font-sans">
                                            {item}
                                        </p>
                                    ))}
                                    <div className="pt-4">
                                        <Link 
                                            href="/services" 
                                            className="inline-flex items-center gap-2 text-gold-500 hover:text-gold-400 font-bold transition-all text-sm uppercase tracking-widest font-heading"
                                        >
                                            View Basic Filing Services <ArrowRight size={16} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 5. PROCESS SECTION */}
                <section className="py-20 lg:py-24 bg-white relative">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16 lg:mb-20">
                            <RevealOnScroll>
                                <div className="mb-6">
                                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 text-[10px] font-bold uppercase tracking-widest text-gold-600">The Roadmap</span>
                                </div>
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-brand-900 font-heading leading-[1.1] mb-8">
                                    Phase-Based <span className="italic text-gold-500">Installation.</span>
                                </h2>
                                <p className="text-lg text-slate-500 font-light font-sans max-w-2xl mx-auto">
                                    Strategy deployed in four institutional phases, ensuring every component of your new structure is optimized.
                                </p>
                            </RevealOnScroll>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                            <div className="absolute top-[45px] left-8 right-8 h-px bg-slate-100 hidden lg:block" />
                            {roadmap.map((step: any, i: number) => (
                                <RevealOnScroll key={i} delay={i * 100}>
                                    <div className="relative z-10 bg-white p-8 lg:p-10 rounded-2xl border border-slate-200 shadow-sm text-center group hover:border-gold-500/40 transition-all flex flex-col items-center">
                                        <div className="w-10 h-10 rounded-full bg-brand-900 border border-gold-500/30 text-gold-500 flex items-center justify-center font-bold mb-6 text-sm group-hover:scale-110 transition-transform duration-300">
                                            {step.stepNumber}
                                        </div>
                                        <h3 className="text-xl font-bold text-brand-900 mb-3 font-heading tracking-tight">{step.title}</h3>
                                        <p className="text-slate-500 text-sm leading-relaxed font-light font-sans">{step.description}</p>
                                    </div>
                                </RevealOnScroll>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 6. COMPARISON TABLE */}
                <section className="py-20 lg:py-24 bg-surface">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16 lg:mb-20">
                            <RevealOnScroll>
                                <div className="mb-6">
                                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600 font-heading">Comparison</span>
                                </div>
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-brand-900 font-heading leading-[1.1] mb-8">
                                    Institutional Strategy <br />
                                    <span className="text-slate-400 italic">vs. Generic Prep.</span>
                                </h2>
                            </RevealOnScroll>
                        </div>
                        
                        <RevealOnScroll>
                            <div className="bg-white border border-slate-200 rounded-3xl shadow-xl overflow-hidden max-w-5xl mx-auto">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-brand-900 text-white">
                                                <th className="p-6 lg:p-10 text-xs font-bold font-heading uppercase tracking-[0.2em] text-slate-400 border-r border-white/5">Focus Area</th>
                                                <th className="p-6 lg:p-10 text-xs font-bold font-heading uppercase tracking-[0.2em] text-slate-400 border-r border-white/5">Generic Tax Prep</th>
                                                <th className="p-6 lg:p-10 text-xs font-bold font-heading uppercase tracking-[0.2em] text-gold-500">S-Corp strategy</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {comparisonPoints.map((row: any, i: number) => (
                                                <tr key={i} className="hover:bg-slate-50 transition-colors group">
                                                    <td className="p-6 lg:p-10 font-bold text-brand-900 font-heading text-sm sm:text-base border-r border-slate-100">{row.feature}</td>
                                                    <td className="p-6 lg:p-10 text-brand-900/70 font-normal text-sm sm:text-base border-r border-slate-100">{row.diy || row.bigFirm ? "Generic Prep" : "Reactive filing"}</td>
                                                    <td className="p-6 lg:p-10 text-brand-900 font-medium bg-gold-500/[0.03] text-sm sm:text-base group-hover:bg-gold-500/5 transition-colors">
                                                        <div className="flex items-center gap-3 font-heading font-bold">
                                                            <Check size={18} className="text-gold-500 shrink-0" />
                                                            {row.unionNational || "S-Corp strategy"}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </div>
                </section>

                {/* 7. FAQ SECTION */}
                <ScorpFAQSection faqs={faqs} />

                {/* 8. FINAL CTA SECTION */}
                <section className="py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
                    <div className="max-w-7xl mx-auto relative">
                        <RevealOnScroll>
                            <div className="relative rounded-[2.5rem] bg-brand-950 px-6 py-20 lg:py-28 text-center overflow-hidden">
                                <div className="absolute top-0 left-0 w-96 h-96 bg-gold-600/5 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2" />
                                <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-[100px] translate-y-1/2 translate-x-1/2" />
                                <div className="absolute inset-0 bg-[url('/images/pattern-grid.svg')] bg-repeat opacity-[0.03]" />

                                <div className="relative z-10 max-w-4xl mx-auto">
                                    <div className="mb-8">
                                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 text-[10px] font-bold uppercase tracking-widest text-gold-500">
                                            Take Control of Your Strategy
                                        </span>
                                    </div>
                                    <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white font-heading tracking-tight leading-[1.1] mb-10">
                                        Manage Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600 italic">Outcome.</span>
                                    </h2>
                                    <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed mb-14 max-w-2xl mx-auto">
                                        If profit has increased but your structure has not changed, it is time to review whether an S-Corp strategy makes sense.
                                    </p>
                                    
                                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                        <Link 
                                            id="final-scorp-playbook-btn"
                                            href="/shop/the-s-corp-playbook"
                                            className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-gold-500 hover:bg-gold-600 text-brand-900 font-bold rounded-xl shadow-lg shadow-gold-500/20 transition-all text-xl"
                                        >
                                            Get The Playbook
                                            <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                        <Link
                                            id="final-strategy-call-btn"
                                            href="/book"
                                            className="inline-flex items-center justify-center gap-2 px-10 py-5 border border-white/20 text-white font-bold rounded-xl hover:bg-white/10 transition-all text-xl"
                                        >
                                            Strategy Call
                                        </Link>
                                    </div>

                                    <div className="mt-16 flex items-center justify-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                                        <div className="h-px w-8 bg-gold-500/30" />
                                        <span>Institutional Grade • Advisory-Led</span>
                                        <div className="h-px w-8 bg-gold-500/30" />
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
