"use client";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { Link } from "@/i18n/navigation";
import {
    EyeOff,
    Clock,
    AlertTriangle,
    Check,
    ShieldCheck,
    Users,
    ArrowRight,
    TrendingDown,
    Zap
} from "lucide-react";

interface StatItem {
    value: string;
    label: string;
}

interface WhyUsSectionProps {
    data?: {
        problemTitle?: string;
        problemSubtitle?: string;
        differentiatorTitle?: string;
        differentiatorSubtitle?: string;
        stats?: StatItem[];
    };
}

export const WhyUsSection = ({ data }: WhyUsSectionProps) => {
    const problems = [
        {
            icon: EyeOff,
            title: "Flying Blind",
            description: "No real-time visibility into your tax position until April rolls around.",
        },
        {
            icon: Clock,
            title: "Tax Surprises",
            description: "April deadlines are too late to make meaningful savings happen.",
        },
        {
            icon: AlertTriangle,
            title: "Compliance Drag",
            description: "Your CPA spends more time checking boxes than building strategy.",
        },
    ];

    const differentiators = [
        {
            icon: Check,
            title: "Proactive Strategy",
            description: "Monthly checkpoints to save before the year ends.",
        },
        {
            icon: Users,
            title: "Direct Access",
            description: "Talk directly to your assigned tax expert, never a call center.",
        },
        {
            icon: ShieldCheck,
            title: "S-Corp Specialists",
            description: "We optimize entity structures to maximize tax savings.",
        },
    ];



    return (
        <section
            id="why-us-section"
            aria-labelledby="why-us-heading"
            className="relative overflow-hidden bg-slate-50 py-24 border-y border-slate-200"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <RevealOnScroll className="text-center mb-16 max-w-3xl mx-auto">
                    <span className="inline-block text-[10px] font-bold uppercase tracking-[0.15em] text-gold-600 mb-4">
                        Why Work With Us
                    </span>
                    <h2
                        id="why-us-heading"
                        className="text-4xl sm:text-5xl font-bold tracking-tighter text-brand-900 font-heading leading-none mb-6"
                    >
                        {data?.problemTitle || "Stop Overpaying. Start Planning."}
                    </h2>
                    <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-light">
                        {data?.problemSubtitle ||
                            "Most CPAs compile history. We build forward-looking strategy that protects your wealth."}
                    </p>
                </RevealOnScroll>

                {/* Comparative Section Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16 items-stretch">
                    {/* The Traditional CPA - Light Reactive Card */}
                    <RevealOnScroll delay={100} className="h-full">
                        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 sm:p-10 flex flex-col justify-between h-full relative group hover:border-slate-300 transition-all duration-300">
                            <div>
                                <div className="flex items-center gap-3.5 mb-6">
                                    <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-red-500 border border-red-100">
                                        <TrendingDown size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">The Status Quo</p>
                                        <h3 className="text-xl font-bold text-brand-900 font-heading">
                                            The Traditional CPA
                                        </h3>
                                    </div>
                                </div>
                                <p className="text-sm text-slate-500 mb-8 leading-relaxed">
                                    Reactive filing structures that document wealth loss rather than preventing it.
                                </p>

                                <ul className="space-y-6">
                                    {problems.map((prob) => (
                                        <li key={prob.title} className="flex gap-4">
                                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100 shrink-0">
                                                <prob.icon size={18} />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-brand-900 mb-1">{prob.title}</h4>
                                                <p className="text-xs text-slate-500 leading-relaxed">{prob.description}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </RevealOnScroll>

                    {/* The CFO Partnership - Dark Proactive Vault Card */}
                    <RevealOnScroll delay={200} className="h-full">
                        <div className="bg-brand-900 text-white rounded-2xl shadow-lg border border-brand-900/50 p-8 sm:p-10 flex flex-col justify-between h-full relative overflow-hidden group">
                            {/* Vault Grid Background overlay */}
                            <div className="absolute inset-0 z-0 bg-[url('/images/pattern-grid.svg')] bg-repeat opacity-[0.02]" />

                            <div className="relative z-10">
                                <div className="flex items-center gap-3.5 mb-6">
                                    <div className="w-10 h-10 rounded-lg bg-gold-500/10 flex items-center justify-center text-gold-500 border border-gold-500/20">
                                        <Zap size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-bold uppercase tracking-wider text-gold-500/80">Proactive Defense</p>
                                        <h3 className="text-xl font-bold text-white font-heading">
                                            The CFO Partnership
                                        </h3>
                                    </div>
                                </div>
                                <p className="text-sm text-slate-400 mb-8 leading-relaxed">
                                    Continuous strategizing, structuring, and reporting designed to build and preserve asset value.
                                </p>

                                <ul className="space-y-6">
                                    {differentiators.map((diff) => (
                                        <li key={diff.title} className="flex gap-4">
                                            <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-500 border border-gold-500/20 shrink-0">
                                                <diff.icon size={18} />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-white mb-1">{diff.title}</h4>
                                                <p className="text-xs text-slate-400 leading-relaxed">{diff.description}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>



                {/* Call to Action */}
                <RevealOnScroll delay={400}>
                    <div className="text-center bg-white border border-slate-200 rounded-2xl shadow-sm p-8 sm:p-10 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 hover:shadow-md transition-shadow">
                        <div className="text-left">
                            <h3 className="text-xl font-bold text-brand-900 font-heading mb-1">
                                {data?.differentiatorTitle || "Ready for a partner that actually plans?"}
                            </h3>
                            <p className="text-sm text-slate-500">
                                {data?.differentiatorSubtitle || "Analyze your structure and find potential leaks before tax season."}
                            </p>
                        </div>
                        <Link
                            href="/book"
                            tabIndex={0}
                            aria-label="Book your free strategy call"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold-500 hover:bg-gold-600 active:scale-95 text-brand-900 font-bold font-heading rounded-md shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 shrink-0 group"
                        >
                            Book Free Call
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
};