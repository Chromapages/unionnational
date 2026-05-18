import { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { ArrowRight, CheckCircle2, ChevronLeft } from "lucide-react";
import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { ConstructionBookForm } from "@/components/construction/profit-blueprint/ConstructionBookForm";
import { MarginFadeTable } from "@/components/construction/profit-blueprint/MarginFadeTable";
import { BlueprintPainPoints } from "@/components/construction/profit-blueprint/BlueprintPainPoints";
import { ContractorChecklist } from "@/components/construction/profit-blueprint/ContractorChecklist";
import { ControlSystemSection } from "@/components/construction/profit-blueprint/ControlSystemSection";
import { BlueprintFAQ } from "@/components/construction/profit-blueprint/BlueprintFAQ";
import { ExitIntentChecklist } from "@/components/construction/profit-blueprint/ExitIntentChecklist";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { FadeIn } from "@/components/ui/FadeIn";

export const metadata: Metadata = {
    title: "Money-Making Blueprint for Construction Companies | Job Costing & Profit Control Guide",
    description: "Download the free contractor blueprint from Union National Tax and learn how job costing, cash flow control, estimating discipline, and margin visibility help construction companies protect profit.",
    alternates: {
        canonical: "/construction/profit-blueprint",
    },
};

export default function ProfitBlueprintPage() {
    return (
        <div className="min-h-screen bg-surface flex flex-col font-sans text-brand-900 antialiased selection:bg-gold-500 selection:text-white overflow-x-hidden">
            <HeaderWrapper />
            <main id="main-content" className="flex-1">
            <ExitIntentChecklist />

            {/* Breadcrumb */}
            <div className="bg-brand-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 lg:pt-8 pb-2">
                    <Link
                        href="/construction"
                        className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-gold-400 transition-colors"
                    >
                        <ChevronLeft size={16} />
                        <span>Construction</span>
                    </Link>
                </div>
            </div>

            {/* Hero Section */}
            <section className="relative min-h-[70dvh] flex items-center bg-brand-900 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold-600/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
                    <div className="absolute inset-0 bg-[url('/images/pattern-grid.svg')] bg-repeat opacity-[0.03]" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-8 lg:py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                        {/* Left: Copy */}
                        <div className="lg:col-span-7">
                            <FadeIn delay={0.1}>
                                <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gold-500/10 border border-gold-400/20 shadow-lg shadow-gold-500/10 mb-8">
                                    <span className="flex h-2 w-2 relative">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-500"></span>
                                    </span>
                                    <span className="text-sm font-bold uppercase tracking-widest text-gold-400">
                                        Free Checklist Download
                                    </span>
                                </div>
                            </FadeIn>

                            <FadeIn delay={0.2}>
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold font-heading text-white leading-none mb-8 tracking-tight">
                                    Is Your Construction Company{" "}
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600 italic pr-2 pb-2 inline-block">
                                        Losing Money?
                                    </span>
                                </h1>
                            </FadeIn>

                            <FadeIn delay={0.3}>
                                <p className="text-lg md:text-xl text-slate-400 mb-10 leading-relaxed max-w-2xl font-light">
                                    If your crews are busy but profit still feels unpredictable, this blueprint shows where contractors usually lose control: job costing, cash flow, estimating, margin fade, and change orders.
                                </p>
                            </FadeIn>

                            <FadeIn delay={0.4}>
                                <ul className="space-y-4 mb-10">
                                    {[
                                        "Job costing systems that surface losing jobs early",
                                        "Cash flow forecasting to stop payroll surprises",
                                        "Estimating discipline that protects margin on every bid",
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-slate-300">
                                            <CheckCircle2 size={18} className="text-gold-500 shrink-0 mt-0.5" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </FadeIn>

                            <FadeIn delay={0.5}>
                                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                                    <div className="h-px w-8 bg-gold-500/30" />
                                    <span>By Jason Astwood, EA, FSCP, LUTCF</span>
                                </div>
                            </FadeIn>
                        </div>

                        {/* Right: Form + Book Visual */}
                        <div className="lg:col-span-5 relative hidden lg:block">
                            <FadeIn delay={0.3} direction="left">
                                <div className="relative space-y-6">


                                    {/* Form */}
                                    <div className="shadow-2xl shadow-brand-900/40 rounded-2xl overflow-hidden">
                                        <ConstructionBookForm />
                                    </div>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mobile Form Section */}
            <section className="lg:hidden bg-surface py-20 px-4">
                <div className="max-w-md mx-auto">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-heading font-bold text-brand-900 mb-2">
                            Get the Free Profit Leak Checklist
                        </h2>
                        <p className="text-slate-500 text-sm">
                            Enter your details and we&apos;ll send the checklist directly to your inbox.
                        </p>
                    </div>
                    <ConstructionBookForm />
                </div>
            </section>

            {/* Margin Fade Table */}
            <MarginFadeTable />

            {/* Pain Points */}
            <BlueprintPainPoints />

            {/* Contractor Checklist */}
            <ContractorChecklist />

            {/* Control System */}
            <ControlSystemSection />

            {/* Assessment CTA */}
            <RevealOnScroll>
                <section className="py-20 lg:py-24 bg-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-50 border border-gold-100 text-[10px] font-bold uppercase tracking-widest text-gold-600 mb-6">
                            Next Step
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-brand-900 tracking-tight mb-6">
                            Ready to Find Your Specific Profit Leaks?
                        </h2>
                        <p className="text-slate-500 text-lg max-w-2xl mx-auto mb-10">
                            After you get the checklist, take the Construction Profitability Assessment — a 25-question diagnostic that identifies exactly where your business is losing control.
                        </p>
                        <Link
                            href="/construction/profitability-assessment"
                            className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-gold-500 hover:bg-gold-600 text-brand-900 font-bold rounded-xl transition-colors text-sm uppercase tracking-widest"
                        >
                            Take the Assessment <ArrowRight size={18} />
                        </Link>
                    </div>
                </section>
            </RevealOnScroll>

            {/* FAQ */}
            <BlueprintFAQ />

            {/* Final CTA */}
            <RevealOnScroll>
                <section className="py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-brand-900 relative overflow-hidden">
                    <div className="absolute inset-0">
                        <div className="absolute top-0 left-0 w-96 h-96 bg-gold-600/5 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2" />
                        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-[100px] translate-y-1/2 translate-x-1/2" />
                        <div className="absolute inset-0 bg-[url('/images/pattern-grid.svg')] bg-repeat opacity-[0.03]" />
                    </div>

                    <div className="max-w-4xl mx-auto relative">
                        <div className="text-center">
                            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-heading tracking-tight mb-8">
                                Get the{" "}
                                <span className="italic text-gold-400">Profit Leak Checklist</span>
                            </h2>
                            <p className="text-xl text-slate-400 font-light leading-relaxed mb-12 max-w-2xl mx-auto">
                                Stop guessing whether your jobs are profitable. Get the 10-point checklist that shows you exactly where contractors lose control — delivered to your inbox.
                            </p>
                            <div className="max-w-md mx-auto">
                                <ConstructionBookForm />
                            </div>
                        </div>
                    </div>
                </section>
            </RevealOnScroll>
            </main>
            <Footer />
        </div>
    );
}