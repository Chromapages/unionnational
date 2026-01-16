"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Check,
    ChevronRight,
    ArrowRight,
    TrendingUp,
    ShieldAlert,
    BarChart3,
    PieChart,
    RefreshCw,
    LucideIcon,
    ArrowLeft,
    CheckCircle2
} from "lucide-react";
import Link from "next/link";

// --- Types ---

type Category = 'entity' | 'compliance' | 'operations';
type Tier = 'critical' | 'stable' | 'growth';

interface Option {
    label: string;
    value: number;
    description?: string;
}

interface Question {
    id: number;
    category: Category;
    question: string;
    description?: string;
    options: Option[];
}

interface Scores {
    total: number;
    entity: number;
    compliance: number;
    operations: number;
}

// --- Data ---

const QUESTIONS: Question[] = [
    {
        id: 1, category: 'entity',
        question: "What type of business entity do you operate?",
        description: "Your entity structure determines your tax liability and protection level.",
        options: [
            { label: "S-Corp", value: 15, description: "Pass-through taxation, potential SE tax savings" },
            { label: "LLC (Single or Partnership)", value: 10, description: "Flexible, but potentially higher SE taxes" },
            { label: "C-Corp", value: 8, description: "Double taxation potential, but good for scaling" },
            { label: "Sole Proprietorship", value: 3, description: "Simplest, but highest personal liability & tax" },
            { label: "Not sure / Other", value: 0, description: "Let's figure this out immediately" },
        ]
    },
    {
        id: 2, category: 'compliance',
        question: "Have you filed all federal & state tax returns for the last 3 years?",
        description: "Consistency with the IRS is the foundation of financial health.",
        options: [
            { label: "Yes, all filed on time", value: 20 },
            { label: "Filed, but some were late", value: 10 },
            { label: "Missing 1-2 returns", value: 0 },
            { label: "Missing more than 2 returns", value: -10 },
            { label: "Not sure", value: 0 },
        ]
    },
    {
        id: 3, category: 'compliance',
        question: "Do you currently owe back taxes to the IRS or state?",
        options: [
            { label: "No outstanding tax debt", value: 15 },
            { label: "Yes, under $10k", value: 10 },
            { label: "Yes, $10k - $50k", value: 5 },
            { label: "Yes, over $50k", value: 0 },
            { label: "Not sure", value: 3 },
        ]
    },
    {
        id: 4, category: 'operations',
        question: "How often do you review your financial statements?",
        description: "You can't manage what you don't measure.",
        options: [
            { label: "Monthly", value: 15 },
            { label: "Quarterly", value: 10 },
            { label: "Annually (at tax time)", value: 5 },
            { label: "Rarely / Never", value: 0 },
        ]
    },
    {
        id: 5, category: 'operations',
        question: "Do you separate personal and business expenses?",
        options: [
            { label: "Always (separate accounts)", value: 12 },
            { label: "Usually (rarely mixed)", value: 8 },
            { label: "Sometimes (occasional mixing)", value: 4 },
            { label: "No (completely mixed)", value: 0 },
        ]
    },
    {
        id: 6, category: 'operations',
        question: "What system do you use to track business expenses?",
        options: [
            { label: "Accounting Software (QBO, Xero)", value: 12 },
            { label: "Spreadsheets", value: 8 },
            { label: "Shoebox / Receipts", value: 3 },
            { label: "No system", value: 0 },
        ]
    },
    {
        id: 7, category: 'operations',
        question: "Do you engage in proactive tax planning?",
        description: "Tax planning happens *before* year-end, not after.",
        options: [
            { label: "Year-round with a pro", value: 11 },
            { label: "Some year-end planning", value: 6 },
            { label: "No proactive planning", value: 0 },
        ]
    },
];

// --- Animation Variants ---

const slideVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 50 : -50,
        opacity: 0,
        filter: "blur(8px)"
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
        filter: "blur(0px)"
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? 50 : -50,
        opacity: 0,
        filter: "blur(8px)"
    })
};

// --- Extracted Sub-Components ---

const HeroStep = ({ onStart }: { onStart: () => void }) => (
    <>
        {/* Left Panel - Dark */}
        <div className="md:col-span-5 bg-brand-900 text-white p-5 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light"></div>
            <div className="absolute top-0 right-0 p-8">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                    <TrendingUp className="w-8 h-8 text-gold-400" />
                </div>
            </div>

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-4 md:mb-6 leading-tight">
                    Financial<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-500">
                        Health Check
                    </span>
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-brand-100/90 leading-relaxed font-light max-w-sm">
                    Discover your business's true potential in under 2 minutes. Professional grade analysis, zero cost.
                </p>
            </motion.div>
        </div>

        {/* Right Panel - Light */}
        <div className="md:col-span-7 bg-slate-50 p-5 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center relative">
            <div className="max-w-xl mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white p-5 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-xl shadow-brand-900/5 border border-slate-100"
                >
                    <h3 className="text-lg font-bold text-brand-900 mb-6 uppercase tracking-wider text-center">What We Analyze</h3>
                    <div className="space-y-4 mb-8">
                        {[
                            { label: "Entity Structure Efficiency", icon: PieChart },
                            { label: "IRS Compliance Status", icon: ShieldAlert },
                            { label: "Operational Maturity", icon: BarChart3 },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-brand-500 mr-4">
                                    <item.icon className="w-5 h-5" />
                                </div>
                                <span className="font-bold text-slate-700">{item.label}</span>
                                <CheckCircle2 className="w-5 h-5 ml-auto text-green-500" />
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={onStart}
                        className="w-full group relative inline-flex items-center justify-center px-6 md:px-8 py-4 md:py-5 text-lg md:text-xl font-bold text-white transition-all duration-300 bg-brand-900 font-heading rounded-xl md:rounded-2xl hover:bg-brand-800 shadow-xl shadow-brand-900/20 hover:-translate-y-1"
                    >
                        Start Assessment
                        <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <p className="text-center text-xs text-slate-400 mt-4 uppercase tracking-widest">No Credit Card Required</p>
                </motion.div>
            </div>
        </div>
    </>
);

interface QuestionStepProps {
    step: number;
    question: Question;
    onSelect: (qId: number, value: number) => void;
    onBack: () => void;
    direction: number;
}

const QuestionStep = ({ step, question, onSelect, onBack, direction }: QuestionStepProps) => {
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

    return (
        <>
            {/* Left Panel: Context (Dark) */}
            <div className="md:col-span-5 bg-brand-900 text-white p-5 sm:p-8 md:p-10 lg:p-12 flex flex-col relative overflow-hidden">
                <div className="flex-1 flex flex-col justify-center z-10">
                    <motion.div
                        key={step}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ opacity: { duration: 0.2 }, x: { type: "spring", stiffness: 300, damping: 30 } }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold tracking-widest uppercase mb-8 text-gold-400">
                            <span>Question {step}</span>
                            <span className="w-px h-3 bg-white/20"></span>
                            <span>{question.category}</span>
                        </div>

                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-4 md:mb-6 leading-tight">
                            {question.question}
                        </h2>

                        {question.description && (
                            <p className="text-lg text-brand-100/80 leading-relaxed font-light border-l-2 border-gold-500/50 pl-6">
                                {question.description}
                            </p>
                        )}
                    </motion.div>
                </div>

                {/* Background Decor */}
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-brand-800 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute top-1/2 right-0 w-32 h-96 bg-gradient-to-b from-transparent via-white/5 to-transparent blur-xl"></div>
            </div>

            {/* Right Panel: Options (Light) */}
            <div className="md:col-span-7 bg-slate-50 p-5 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center items-center relative overflow-y-auto">
                <div className="w-full max-w-2xl">
                    <motion.div
                        key={step}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ opacity: { duration: 0.2 }, x: { type: "spring", stiffness: 300, damping: 30 }, delay: 0.1 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                        {question.options.map((opt, idx) => (
                            <button
                                key={idx}
                                onClick={() => { setSelectedIdx(idx); onSelect(question.id, opt.value); }}
                                className={`
                                    group relative p-4 sm:p-5 md:p-6 text-left rounded-xl md:rounded-2xl border-2 transition-all duration-200
                                    ${idx === question.options.length - 1 && question.options.length % 2 !== 0 ? 'md:col-span-2' : ''}
                                    ${selectedIdx === idx
                                        ? 'border-gold-500 bg-gold-50 scale-[1.02] ring-2 ring-gold-500/20 z-10'
                                        : 'bg-white border-slate-200 hover:border-gold-500 hover:shadow-xl hover:shadow-gold-500/10 active:scale-[0.98]'
                                    }
                                `}
                            >
                                <div className={`absolute top-4 right-4 w-4 h-4 rounded-full border-2 transition-colors ${selectedIdx === idx ? 'border-gold-500' : 'border-slate-200 group-hover:border-gold-500'}`}>
                                    <div className={`w-full h-full rounded-full bg-gold-500 transition-transform ${selectedIdx === idx ? 'scale-100' : 'scale-0 group-hover:scale-75'}`}></div>
                                </div>

                                <span className={`block text-lg font-bold mb-1 pr-6 transition-colors ${selectedIdx === idx ? 'text-brand-900' : 'text-slate-800 group-hover:text-brand-900'}`}>{opt.label}</span>
                                {opt.description && (
                                    <span className={`block text-sm transition-colors ${selectedIdx === idx ? 'text-slate-600' : 'text-slate-400 group-hover:text-slate-500'}`}>
                                        {opt.description}
                                    </span>
                                )}
                            </button>
                        ))}
                    </motion.div>

                    <div className="mt-12 flex justify-start">
                        <button
                            onClick={onBack}
                            className={`
                                flex items-center text-slate-400 hover:text-brand-900 transition-colors text-sm font-bold uppercase tracking-widest
                                ${step === 1 ? 'invisible' : ''}
                            `}
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" /> Previous Question
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

interface LeadCaptureStepProps {
    formData: { firstName: string; lastName: string; email: string; phone: string };
    setFormData: React.Dispatch<React.SetStateAction<{ firstName: string; lastName: string; email: string; phone: string }>>;
    onSubmit: (e: React.FormEvent) => void;
    isSubmitting: boolean;
}

const LeadCaptureStep = ({ formData, setFormData, onSubmit, isSubmitting }: LeadCaptureStepProps) => (
    <>
        <div className="md:col-span-5 bg-brand-900 text-white p-5 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center items-center text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light"></div>
            <div className="mb-8 relative">
                <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center animate-pulse">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-brand-900 shadow-lg">
                        <Check className="w-8 h-8" />
                    </div>
                </div>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading mb-4">Analysis Complete</h2>
            <p className="text-brand-100/80 text-lg max-w-sm">
                We've processed your implementation data. Your personalized roadmap is ready to view.
            </p>
        </div>

        <div className="md:col-span-7 bg-slate-50 p-5 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center items-center">
            <div className="w-full max-w-md bg-white p-5 sm:p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-[2.5rem] shadow-2xl shadow-brand-900/5 border border-slate-100">
                <form onSubmit={onSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-brand-900 uppercase tracking-widest mb-2 ml-1">First Name</label>
                            <input type="text" required value={formData.firstName} onChange={e => setFormData(prev => ({ ...prev, firstName: e.target.value }))} className="w-full px-5 py-4 rounded-xl bg-slate-50 border-2 border-slate-100 focus:bg-white focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10 outline-none transition-all font-bold text-brand-900 placeholder:font-medium" placeholder="Michael" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-brand-900 uppercase tracking-widest mb-2 ml-1">Last Name</label>
                            <input type="text" required value={formData.lastName} onChange={e => setFormData(prev => ({ ...prev, lastName: e.target.value }))} className="w-full px-5 py-4 rounded-xl bg-slate-50 border-2 border-slate-100 focus:bg-white focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10 outline-none transition-all font-bold text-brand-900 placeholder:font-medium" placeholder="Johnson" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-brand-900 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                        <input type="email" required value={formData.email} onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))} className="w-full px-5 py-4 rounded-xl bg-slate-50 border-2 border-slate-100 focus:bg-white focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10 outline-none transition-all font-bold text-brand-900 placeholder:font-medium" placeholder="michael@company.com" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-brand-900 uppercase tracking-widest mb-2 ml-1">Phone Number</label>
                        <input type="tel" required value={formData.phone} onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))} className="w-full px-5 py-4 rounded-xl bg-slate-50 border-2 border-slate-100 focus:bg-white focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10 outline-none transition-all font-bold text-brand-900 placeholder:font-medium" placeholder="(555) 000-0000" />
                    </div>
                    <button type="submit" disabled={isSubmitting} className="w-full py-4 md:py-5 bg-brand-900 text-white font-bold font-heading rounded-xl hover:bg-gold-500 hover:text-brand-900 transition-all shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center text-base sm:text-lg mt-2 group">
                        {isSubmitting ? <RefreshCw className="w-6 h-6 animate-spin" /> : <>Unlock Full Report <ChevronRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" /></>}
                    </button>
                    <p className="text-[10px] text-center text-slate-400 mt-4">100% Secure. No spam, ever.</p>
                </form>
            </div>
        </div>
    </>
);

interface BreakdownCardProps { title: string; score: number; max: number; icon: LucideIcon; color: 'blue' | 'purple' | 'emerald'; }

const BreakdownCard = ({ title, score, max, icon: Icon, color }: BreakdownCardProps) => {
    const percentage = Math.max(0, (score / max) * 100);
    const colorStyles = {
        blue: { bg: 'bg-blue-50', text: 'text-blue-600', bar: 'bg-blue-500', border: 'border-blue-100' },
        purple: { bg: 'bg-purple-50', text: 'text-purple-600', bar: 'bg-purple-500', border: 'border-purple-100' },
        emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', bar: 'bg-emerald-500', border: 'border-emerald-100' },
    }[color];

    return (
        <div className={`bg-white p-6 rounded-2xl border ${colorStyles.border} shadow-sm flex flex-col h-full hover:shadow-md transition-shadow duration-300`}>
            {/* Top Row: Icon and Score */}
            <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-xl ${colorStyles.bg} ${colorStyles.text} flex items-center justify-center`}>
                    <Icon className="w-6 h-6" />
                </div>
                <div className="text-right">
                    <div className="flex items-baseline gap-1 justify-end">
                        <span className="text-3xl font-bold font-heading text-brand-900 leading-none">{score}</span>
                        <span className="text-sm font-bold text-slate-400">/{max}</span>
                    </div>
                </div>
            </div>

            {/* Bottom Content: Title and Bar */}
            <div className="mt-auto">
                <h3 className="font-bold text-slate-700 text-base mb-3">{title}</h3>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                        className={`h-full ${colorStyles.bar} rounded-full`}
                    />
                </div>
            </div>
        </div>
    );
};

interface ResultsStepProps { scores: Scores; tier: Tier; name: string; }

const ResultsStep = ({ scores, tier, name }: ResultsStepProps) => {
    const tierContent = {
        critical: { color: "text-red-500", bg: "bg-red-50", border: "border-red-100", icon: ShieldAlert, title: "Urgent Attention Needed", desc: "Critical vulnerabilities detected.", ctaText: "Get Tax Resolution", ctaLink: "/contact?topic=resolution", upsell: "Tax Resolution" },
        stable: { color: "text-amber-500", bg: "bg-amber-50", border: "border-amber-100", icon: BarChart3, title: "Stable but Stagnant", desc: "Leaving money on the table.", ctaText: "Get Tax Strategy", ctaLink: "/contact?topic=strategy", upsell: "Tax Strategy" },
        growth: { color: "text-emerald-500", bg: "bg-emerald-50", border: "border-emerald-100", icon: TrendingUp, title: "Ready for Scale", desc: "Optimized for growth.", ctaText: "Explore Fractional CFO", ctaLink: "/services", upsell: "Fractional CFO" }
    }[tier];

    return (
        <>
            {/* Left Panel: Score (Dark) */}
            <div className="md:col-span-5 bg-brand-900 text-white p-5 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center items-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-brand-800 to-brand-950"></div>

                <div className="relative z-10 text-center">
                    <p className="text-brand-200 text-sm uppercase tracking-widest mb-8 font-bold">Overall Health Score</p>
                    <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 mx-auto mb-6 md:mb-8">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="none" stroke="#1e293b" strokeWidth="6" /><motion.circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className={tierContent.color} initial={{ strokeDasharray: "0 283" }} animate={{ strokeDasharray: `${(scores.total / 100) * 283} 283` }} transition={{ duration: 1.5, ease: "easeOut" }} /></svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-5xl sm:text-6xl md:text-7xl font-bold font-heading">{scores.total}</span>
                        </div>
                    </div>
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide bg-white/10 border border-white/10 ${tierContent.color}`}>
                        {tierContent.icon && <tierContent.icon className="w-4 h-4" />}
                        {tierContent.title}
                    </div>
                </div>
            </div>

            {/* Right Panel: Details (Light) */}
            <div className="md:col-span-7 bg-slate-50 p-5 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center overflow-y-auto">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-heading text-brand-900 mb-4 md:mb-6">Diagnostic Report for {name}</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <BreakdownCard title="Structuring" score={scores.entity} max={15} icon={PieChart} color="blue" />
                    <BreakdownCard title="Compliance" score={scores.compliance} max={35} icon={ShieldAlert} color="purple" />
                    <BreakdownCard title="Operations" score={scores.operations} max={50} icon={TrendingUp} color="emerald" />
                </div>

                <div className="bg-white rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-8 border border-slate-200 shadow-xl shadow-brand-900/5">
                    <h3 className="text-lg font-bold text-brand-900 uppercase tracking-widest mb-4">Recommended Action Plan</h3>
                    <p className="text-slate-600 mb-6 text-lg">{tierContent.desc}</p>

                    <div className="flex flex-col sm:flex-row gap-4 items-center bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <div className="flex-1">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Service Match</span>
                            <div className="text-xl font-bold text-brand-900">{tierContent.upsell}</div>
                        </div>
                        <Link href={tierContent.ctaLink} className="w-full sm:w-auto px-8 py-4 bg-brand-900 text-white font-bold rounded-xl hover:bg-gold-500 hover:text-brand-900 transition-colors shadow-lg flex items-center justify-center">
                            {tierContent.ctaText} <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

// --- Main Component ---

export function HealthCheckSurvey() {
    const [step, setStep] = useState(0);
    const [direction, setDirection] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", phone: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const scores = useMemo<Scores>(() => {
        let total = 0, entity = 0, compliance = 0, operations = 0;
        Object.entries(answers).forEach(([qId, score]) => {
            const q = QUESTIONS.find(q => q.id === parseInt(qId));
            if (!q) return;
            total += score;
            if (q.category === 'entity') entity += score;
            if (q.category === 'compliance') compliance += score;
            if (q.category === 'operations') operations += score;
        });
        return { total: Math.max(0, total), entity, compliance, operations };
    }, [answers]);

    const tier = useMemo<Tier>(() => {
        if (scores.total <= 40) return 'critical';
        if (scores.total <= 70) return 'stable';
        return 'growth';
    }, [scores.total]);

    const handleStart = useCallback(() => {
        setDirection(1);
        setStep(1);
    }, []);

    const handleOptionSelect = useCallback((qId: number, value: number) => {
        setAnswers(prev => ({ ...prev, [qId]: value }));
        setDirection(1);
        setTimeout(() => setStep(prev => prev + 1), 450);
    }, []);

    const handleBack = useCallback(() => {
        if (step > 0) {
            setDirection(-1);
            setStep(prev => prev - 1);
        }
    }, [step]);

    const handleFormSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/survey', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    phone: formData.phone,
                    answers: answers,
                    score: scores.total,
                }),
            });

            const data = await response.json();

            if (!data.success) {
                console.error('Survey submission failed:', data.error);
                // Still show results even if CRM sync fails
            }
        } catch (error) {
            console.error('Survey submission error:', error);
            // Still show results even on network error
        }

        setIsSubmitting(false);
        setDirection(1);
        setStep(9);
    }, [formData, answers, scores.total]);

    return (
        <div className="w-full max-w-[1400px] mx-auto py-8 px-4 md:px-8">
            <div className="relative grid grid-cols-1 md:grid-cols-12 min-h-fit md:min-h-[600px] lg:min-h-[700px] bg-white rounded-2xl sm:rounded-3xl lg:rounded-[3rem] shadow-2xl overflow-hidden border border-slate-200">
                {/* Global Progress Bar */}
                {step > 0 && step <= QUESTIONS.length && (
                    <div className="absolute top-0 inset-x-0 h-2 bg-slate-100 z-50">
                        <motion.div
                            className="h-full bg-gold-400"
                            initial={{ width: 0 }}
                            animate={{ width: `${(step / QUESTIONS.length) * 100}%` }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                    </div>
                )}

                <AnimatePresence mode="wait" initial={false}>
                    {step === 0 && <HeroStep key="hero" onStart={handleStart} />}
                    {step > 0 && step <= QUESTIONS.length && (
                        <QuestionStep
                            key={`q-${step}`}
                            step={step}
                            question={QUESTIONS[step - 1]}
                            onSelect={handleOptionSelect}
                            onBack={handleBack}
                            direction={direction}
                        />
                    )}
                    {step === 8 && <LeadCaptureStep key="capture" formData={formData} setFormData={setFormData} onSubmit={handleFormSubmit} isSubmitting={isSubmitting} />}
                    {step === 9 && <ResultsStep key="results" scores={scores} tier={tier} name={formData.firstName} />}
                </AnimatePresence>
            </div>
        </div>
    );
}
