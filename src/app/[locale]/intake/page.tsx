import { StrategyIntakeForm } from "@/components/intake/StrategyIntakeForm";
import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { Briefcase, TrendingUp } from "lucide-react";

export const revalidate = 60; // Revalidate every minute

export const metadata = {
    title: "Tax Savings Assessment | Union National Tax",
    description: "Discover how much you could save with our 8-step Tax Strategy Assessment. Specialized for business owners and high-growth firms.",
};

export default async function IntakePage(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const locale = params.locale;
    
    return (
        <main className="min-h-screen bg-slate-50 relative overflow-hidden">
            <HeaderWrapper />

            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-[600px] bg-brand-900 pointer-events-none" />
            <div className="absolute top-40 right-[-10%] w-[50%] h-[600px] bg-gold-400/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-0 left-[-10%] w-[40%] h-[400px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
                {/* Header Text (Light on Dark for Hero effect) */}
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/20 border border-gold-500/30 text-gold-500 text-[10px] font-bold tracking-widest uppercase mb-6">
                        <TrendingUp className="w-3.5 h-3.5" />
                        ADVISORY-FIRST ASSESSMENT
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white font-heading tracking-tighter leading-[1.1] mb-6">
                        Start Your <span className="text-gold-500">Tax Strategy</span> Assessment
                    </h1>
                    <p className="text-brand-100/60 font-sans text-lg leading-relaxed">
                        Complete this brief profile and uncovered hidden tax savings that traditional accountants might miss.
                    </p>
                </div>

                <StrategyIntakeForm />
            </div>

            <Footer />
        </main>
    );
}
