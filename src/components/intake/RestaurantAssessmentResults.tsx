"use client";

import { motion } from "framer-motion";
import {
    CheckCircle2,
    AlertTriangle,
    ArrowRight,
    Calendar,
    TrendingDown,
    Zap,
    ShieldAlert,
    BarChart3,
    BookOpen,
    UtensilsCrossed,
    Users,
    DollarSign,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface RestaurantAssessmentResultsProps {
    score: number;
    label: string;
    urgency: string;
    highIntent: boolean;
}

export const RestaurantAssessmentResults = ({
    score,
    label,
    urgency,
    highIntent,
}: RestaurantAssessmentResultsProps) => {
    const router = useRouter();

    const getScoreColor = () => {
        if (score < 10) return "text-rose-500";
        if (score < 18) return "text-gold-500";
        return "text-emerald-500";
    };

    const getScoreBg = () => {
        if (score < 10) return "bg-rose-50";
        if (score < 18) return "bg-gold-50";
        return "bg-emerald-50";
    };

    const getScoreMeaning = () => {
        if (score < 10)
            return "Critical: Your restaurant is likely losing significant revenue to untracked prime costs, labor overruns, and missed tax credits. Immediate intervention is required to stop the bleeding.";
        if (score < 18)
            return "Needs Work: Your operations have a solid base, but gaps in food cost discipline, scheduling, or weekly financial rhythm are quietly eroding your margins.";
        return "Strong Foundation: You have strong operational discipline. Now is the time to optimize for tax efficiency, FICA tip credits, and scale your restaurant wealth through proactive strategy.";
    };

    const profitLeaks = [
        {
            icon: UtensilsCrossed,
            leak: "Uncaptured FICA Tip Credits (Section 45B) — up to $10,000/yr",
        },
        {
            icon: DollarSign,
            leak: "Food cost variance without recipe plate costing",
        },
        {
            icon: Users,
            leak: "Labor overtime from unoptimized scheduling",
        },
        {
            icon: TrendingDown,
            leak: "Menu prices not indexed to food cost changes",
        },
        {
            icon: BarChart3,
            leak: "Missing emergency fund or credit line for seasonal troughs",
        },
    ];

    const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL || "/restaurants/booking";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto space-y-8"
        >
            {/* Score Header */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-3xl overflow-hidden text-center p-12 lg:p-20">
                <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">
                        <Zap size={14} className="text-gold-500" /> Assessment Finalized
                    </div>

                    <div className="relative inline-block">
                        <div
                            className={`text-8xl md:text-9xl font-black font-heading ${getScoreColor()} tracking-tighter`}
                        >
                            {score}
                        </div>
                        <div className="absolute -top-4 -right-8 bg-brand-900 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                            Score / 28
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2
                            className={`text-3xl md:text-4xl font-bold uppercase tracking-tight font-heading ${getScoreColor()}`}
                        >
                            {label}
                        </h2>
                        <p className="text-brand-900/60 text-lg max-w-2xl mx-auto leading-relaxed italic">
                            &quot;{getScoreMeaning()}&quot;
                        </p>
                    </div>

                    {highIntent && (
                        <div className="mt-8 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-4 text-left max-w-xl mx-auto">
                            <ShieldAlert className="text-rose-500 shrink-0" size={32} />
                            <div>
                                <p className="text-rose-900 font-bold text-sm uppercase tracking-tight">
                                    High Priority Vulnerability
                                </p>
                                <p className="text-rose-700 text-xs italic">
                                    Your revenue scale combined with current visibility gaps creates a high risk
                                    for profit loss and tax overpayment.
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-16 flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => window.open(bookingUrl, "_blank")}
                        className="bg-brand-900 text-white font-black px-10 py-5 rounded-2xl flex items-center justify-center gap-4 hover:bg-gold-500 hover:text-brand-900 transition-all text-sm uppercase tracking-widest shadow-2xl shadow-brand-900/20 group"
                    >
                        Book Strategy Call Now{" "}
                        <Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    </button>
                    <button
                        onClick={() => router.push("/fractional-cfo")}
                        className="bg-white border-2 border-slate-100 text-brand-900 font-black px-10 py-5 rounded-2xl flex items-center justify-center gap-4 hover:border-gold-500 transition-all text-sm uppercase tracking-widest group"
                    >
                        Explore CFO Services <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>

            {/* Profit Leaks Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-brand-950 rounded-[2rem] p-10 text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-gold-500/10 transition-colors" />
                    <h3 className="text-xl font-bold font-heading uppercase tracking-widest text-gold-500 mb-8 flex items-center gap-3">
                        <TrendingDown className="w-6 h-6" /> Common Restaurant Profit Leaks
                    </h3>
                    <div className="space-y-4">
                        {profitLeaks.map((leak, i) => (
                            <div
                                key={i}
                                className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                            >
                                <div className="w-8 h-8 rounded-lg bg-gold-500/20 flex items-center justify-center text-gold-500 shrink-0">
                                    <leak.icon className="w-4 h-4" />
                                </div>
                                <p className="text-sm font-medium text-slate-300 leading-snug">{leak.leak}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-[2rem] border border-slate-100 p-10 flex flex-col justify-between">
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold font-heading uppercase tracking-widest text-brand-900 flex items-center gap-3">
                            <BarChart3 className="w-6 h-6 text-gold-500" /> Next Strategic Steps
                        </h3>
                        <p className="text-brand-900/60 text-sm leading-relaxed italic">
                            Your assessment results suggest you may be leaving 15%–25% of your potential profit on
                            the table through unchecked prime costs, labor overruns, and missed FICA tip credits.
                        </p>
                        <div className="space-y-3">
                            {[
                                "Audit food cost vs. theoretical variance",
                                "Capture Section 45B FICA Tip Credits",
                                "Build a weekly P&L rhythm",
                                "Implement manager-on-duty scheduling",
                            ].map((step, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-3 text-brand-900 font-bold text-xs uppercase tracking-widest"
                                >
                                    <CheckCircle2 className="text-emerald-500" size={18} /> {step}
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={() => window.open(bookingUrl, "_blank")}
                        className="mt-10 w-full py-4 border-2 border-brand-900 rounded-xl text-brand-900 font-black text-xs uppercase tracking-[0.2em] hover:bg-brand-900 hover:text-white transition-all flex items-center justify-center gap-3"
                    >
                        Schedule Strategy Session <ArrowRight size={16} />
                    </button>
                </div>
            </div>

            {/* Final Reassurance */}
            <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] py-8">
                Union National Tax — Restaurant Hospitality Division
            </p>
        </motion.div>
    );
};
