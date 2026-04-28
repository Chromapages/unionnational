"use client";

import { motion } from "framer-motion";
import { 
    CheckCircle2, 
    AlertTriangle, 
    ArrowRight, 
    Calendar, 
    ShoppingBag,
    TrendingDown,
    Zap,
    ShieldAlert,
    BarChart3,
    BookOpen
} from "lucide-react";
import { useRouter } from "next/navigation";

interface ConstructionResultsProps {
    score: number;
    label: string;
    urgency: string;
    highIntent: boolean;
}

export const ConstructionResults = ({ score, label, urgency, highIntent }: ConstructionResultsProps) => {
    const router = useRouter();

    const getScoreColor = () => {
        if (score < 35) return "text-rose-500";
        if (score < 60) return "text-gold-500";
        return "text-emerald-500";
    };

    const getScoreBg = () => {
        if (score < 35) return "bg-rose-50";
        if (score < 60) return "bg-gold-50";
        return "bg-emerald-50";
    };

    const getScoreMeaning = () => {
        if (score < 35) return "High Risk: Your business is likely experiencing significant profit leaks. Immediate intervention is required to stabilize margins and secure your cash flow.";
        if (score < 60) return "Profit Leaks Present: Your foundation is solid, but inefficiency in job costing and estimating is preventing you from reaching peak profitability.";
        return "Strong Foundation: You have excellent visibility. Now is the time to optimize for tax efficiency and scale your wealth through proactive strategy.";
    };

    const profitLeaks = [
        "Inaccurate estimating leading to margin erosion",
        "Lack of real-time job costing visibility",
        "Inefficient cash flow management cycles",
        "Overpayment of taxes due to poor structure",
        "Delayed financial reporting slowing decision making"
    ];

    const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL || "/book";

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
                        <div className={`text-8xl md:text-9xl font-black font-heading ${getScoreColor()} tracking-tighter`}>
                            {score}
                        </div>
                        <div className="absolute -top-4 -right-8 bg-brand-900 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                            Score / 80
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className={`text-3xl md:text-4xl font-bold uppercase tracking-tight font-heading ${getScoreColor()}`}>
                            {label}
                        </h2>
                        <p className="text-brand-900/60 text-lg max-w-2xl mx-auto leading-relaxed italic">
                            "{getScoreMeaning()}"
                        </p>
                    </div>

                    {highIntent && (
                        <div className="mt-8 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-4 text-left max-w-xl mx-auto">
                            <ShieldAlert className="text-rose-500 shrink-0" size={32} />
                            <div>
                                <p className="text-rose-900 font-bold text-sm uppercase tracking-tight">High Priority Vulnerability</p>
                                <p className="text-rose-700 text-xs italic">Your revenue scale combined with current visibility gaps creates a high risk for tax overpayment and cash flow instability.</p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-16 flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                        onClick={() => window.open(bookingUrl, '_blank')}
                        className="bg-brand-900 text-white font-black px-10 py-5 rounded-2xl flex items-center justify-center gap-4 hover:bg-gold-500 hover:text-brand-900 transition-all text-sm uppercase tracking-widest shadow-2xl shadow-brand-900/20 group"
                    >
                        Book Strategy Call Now <Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    </button>
                    <button 
                        onClick={() => router.push("/shop")}
                        className="bg-white border-2 border-slate-100 text-brand-900 font-black px-10 py-5 rounded-2xl flex items-center justify-center gap-4 hover:border-gold-500 transition-all text-sm uppercase tracking-widest group"
                    >
                        Buy the Blueprint Book <BookOpen className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </button>
                </div>
            </div>

            {/* Profit Leaks Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-brand-950 rounded-[2rem] p-10 text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-gold-500/10 transition-colors" />
                    <h3 className="text-xl font-bold font-heading uppercase tracking-widest text-gold-500 mb-8 flex items-center gap-3">
                        <TrendingDown className="w-6 h-6" /> Common Profit Leaks
                    </h3>
                    <div className="space-y-4">
                        {profitLeaks.map((leak, i) => (
                            <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                <div className="w-6 h-6 rounded-full bg-gold-500/20 flex items-center justify-center text-gold-500 font-black text-[10px] shrink-0">
                                    {i + 1}
                                </div>
                                <p className="text-sm font-medium text-slate-300 leading-snug">{leak}</p>
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
                            Your assessment results suggest you are leaving between 15% and 25% of your potential profit on the table due to operational and tax structural gaps.
                        </p>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-brand-900 font-bold text-xs uppercase tracking-widest">
                                <CheckCircle2 className="text-emerald-500" size={18} /> Review Job Costing Workflow
                            </div>
                            <div className="flex items-center gap-3 text-brand-900 font-bold text-xs uppercase tracking-widest">
                                <CheckCircle2 className="text-emerald-500" size={18} /> Audit S-Corp Tax Structure
                            </div>
                            <div className="flex items-center gap-3 text-brand-900 font-bold text-xs uppercase tracking-widest">
                                <CheckCircle2 className="text-emerald-500" size={18} /> Implement Weekly Cash Flow
                            </div>
                        </div>
                    </div>

                    <button 
                        onClick={() => window.open(bookingUrl, '_blank')}
                        className="mt-10 w-full py-4 border-2 border-brand-900 rounded-xl text-brand-900 font-black text-xs uppercase tracking-[0.2em] hover:bg-brand-900 hover:text-white transition-all flex items-center justify-center gap-3"
                    >
                        Schedule Audit <ArrowRight size={16} />
                    </button>
                </div>
            </div>

            {/* Final Reassurance */}
            <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] py-8">
                Union National Tax — Construction Strategy Division
            </p>
        </motion.div>
    );
};
