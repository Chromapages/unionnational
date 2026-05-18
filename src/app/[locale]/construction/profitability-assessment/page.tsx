import { Metadata } from "next";
import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { ProfitabilityAssessmentForm } from "@/components/construction/profitability-assessment/ProfitabilityAssessmentForm";
import { FadeIn } from "@/components/ui/FadeIn";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export const metadata: Metadata = {
    title: "Construction Profitability Assessment | Job Costing & Margin Control Diagnostic",
    description: "Take the free Construction Profitability Assessment to identify where your contracting business is leaking profit through job costing, cash flow, and margin problems.",
    alternates: {
        canonical: "/construction/profitability-assessment",
    },
};

export default function ProfitabilityAssessmentPage() {
    return (
        <div className="min-h-screen bg-surface flex flex-col">
            <HeaderWrapper />
            <main className="flex-1 py-16 lg:py-24">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Intro */}
                    <FadeIn>
                        <div className="text-center mb-12 lg:mb-16">
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-900/5 border border-brand-900/10 text-[10px] font-bold uppercase tracking-widest text-brand-900 mb-6">
                                Construction Profitability Assessment
                            </span>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-brand-900 tracking-tight mb-6">
                                Find Out Where Your Construction Company Is{" "}
                                <span className="italic text-gold-500">Leaking Profit</span>
                            </h1>
                            <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
                                This 6-section diagnostic identifies gaps in job costing, estimating, cash flow, margin visibility, and project financial control. Answer honestly — there are no wrong answers.
                            </p>
                        </div>
                    </FadeIn>

                    {/* Form */}
                    <RevealOnScroll>
                        <ProfitabilityAssessmentForm />
                    </RevealOnScroll>

                    {/* Trust note */}
                    <FadeIn>
                        <div className="mt-12 text-center">
                            <p className="text-slate-400 text-xs">
                                Your information is private. No spam. No pressure. Union National Tax does not share your data.
                            </p>
                        </div>
                    </FadeIn>
                </div>
            </main>
            <Footer />
        </div>
    );
}