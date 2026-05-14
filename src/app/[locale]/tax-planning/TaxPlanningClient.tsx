"use client";

import { motion } from "framer-motion";
import { 
    Target as TargetIcon, 
    ShieldCheck, 
    TrendingDown, 
    ArrowRight, 
    Calendar,
    Search,
    Lightbulb,
    Gem,
    Clock,
    CheckCircle2,
    ChevronDown,
    Zap,
    Scale,
    FileSearch,
    RefreshCw
} from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface TaxPlanningClientProps {
    locale: string;
}

const FAQ_ITEMS = [
    {
        question: "How is Tax Planning different from Tax Preparation?",
        answer: "Tax preparation is the process of looking backward to file what happened last year. Tax planning is the process of looking forward to ensure your operations, income, and structure are optimized throughout the year to legally minimize what you'll owe."
    },
    {
        question: "Is this for every business owner?",
        answer: "Tax planning is most valuable for business owners generating over $150k-$200k in net income or those with complex entity structures. If your business is profitable, you are almost certainly a candidate for strategy."
    },
    {
        question: "When is the best time to start planning?",
        answer: "Now. The tax year is 365 days long. The best strategies are implemented in real-time as you make hiring, equipment, and investment decisions, not during the 'scramble' in March."
    },
    {
        question: "Are these strategies legal and safe?",
        answer: "Everything we recommend is documented within the IRS tax code. We do not use 'grey area' gimmicks. We use sophisticated structure, timing, and deduction forensics that are legal but often overlooked by generalist firms."
    },
    {
        question: "Do I need to change my current accountant?",
        answer: "Not necessarily. We often act as the 'Strategy Layer' on top of your existing filing relationship. We provide the blueprint, and your CPA can file based on that blueprint—or we can handle both."
    },
    {
        question: "What is the ROI on tax planning?",
        answer: "While every case varies, most strategic engagements identify permanent tax savings that far exceed the cost of the advisory fee. Our goal is for the strategy to pay for itself multiple times over."
    }
];

export default function TaxPlanningClient() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <div className="bg-white text-brand-900 overflow-x-hidden">
            {/* 1. Hero Section */}
            <section className="relative px-6 py-28 lg:py-48 bg-brand-950 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/pattern-grid.svg')] bg-repeat opacity-[0.03] pointer-events-none" />
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                
                <div className="max-w-7xl mx-auto relative z-10 text-center lg:text-left">
                    <div className="max-w-4xl mx-auto lg:mx-0">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gold-500/10 border border-gold-400/20 text-gold-400 text-sm font-bold uppercase tracking-widest mb-10 shadow-lg"
                        >
                            <Calendar size={18} className="text-gold-500" />
                            Strategic Consulting Pillar
                        </motion.div>
                        
                        <motion.h1 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-6xl lg:text-9xl font-bold font-heading text-white leading-[0.85] tracking-tighter mb-10"
                        >
                            Filing is <br />
                            <span className="italic text-gold-400">Not</span> a Strategy.
                        </motion.h1>

                        <motion.p 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl sm:text-2xl text-slate-300 mb-14 leading-relaxed max-w-3xl font-light mx-auto lg:mx-0"
                        >
                            Most business owners lose thousands in the gap between &quot;earning&quot; and &quot;filing.&quot; We close that gap with a proactive planning system that catches savings while the year is still active.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start"
                        >
                            <Link 
                                href="/intake"
                                className="px-12 py-6 bg-gold-500 text-brand-950 font-black rounded-2xl hover:bg-gold-400 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl shadow-gold-500/30 text-2xl flex items-center justify-center gap-4 group"
                            >
                                Book Strategy Audit <ArrowRight size={28} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link 
                                href="/book"
                                className="px-12 py-6 bg-transparent border-2 border-white/20 text-white font-bold rounded-2xl hover:bg-white/5 transition-all text-2xl flex items-center justify-center"
                            >
                                Check Availability
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Trust Strip */}
            <div className="bg-brand-950/95 border-y border-white/5 py-12 px-6">
                <div className="max-w-7xl mx-auto flex flex-wrap justify-center lg:justify-between gap-12 text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                    <div className="flex items-center gap-3">
                        <TargetIcon size={18} className="text-gold-500/50" />
                        Advisory-Led
                    </div>
                    <div className="flex items-center gap-3">
                        <ShieldCheck size={18} className="text-gold-500/50" />
                        Year-Round Strategy
                    </div>
                    <div className="flex items-center gap-3">
                        <Zap size={18} className="text-gold-500/50" />
                        Maximized Savings
                    </div>
                    <div className="flex items-center gap-3">
                        <Scale size={18} className="text-gold-500/50" />
                        Wealth Logic
                    </div>
                </div>
            </div>

            {/* 2. Problem Section */}
            <section className="py-32 px-6 bg-white border-y border-slate-100">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <RevealOnScroll>
                            <div className="space-y-10">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-gold-600 block mb-4">The Compliance Trap</span>
                                <h2 className="text-4xl lg:text-7xl font-bold text-brand-950 font-heading leading-[0.9] tracking-tighter">
                                    The cost of <br /><span className="italic text-gold-600">waiting until April.</span>
                                </h2>
                                 <p className="text-2xl text-slate-600 leading-relaxed font-light">
                                    Accurate filing is just data entry. It&apos;s a record of what&apos;s already happened. By the time your returns are ready, <span className="text-brand-950 font-bold border-b-2 border-gold-500/30">the year is closed</span> and your options for legal tax reduction are gone.
                                </p>
                                <p className="text-xl text-slate-500 leading-relaxed font-light">
                                    Real wealth preservation happens in the operations, the investments, and the entities you build while the clock is still running.
                                </p>
                                
                                <div className="space-y-6 pt-6 text-lg">
                                    {[
                                        { title: "Surprise tax bills disrupting your cash flow", icon: TrendingDown },
                                        { title: "Missing out on industry-specific deductions", icon: Search },
                                        { title: "Outdated entity structures costing you money", icon: Lightbulb }
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-5 text-brand-900 font-bold group">
                                            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-gold-500/10 transition-all">
                                                <item.icon size={20} className="text-gold-600" />
                                            </div>
                                            {item.title}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </RevealOnScroll>

                        <RevealOnScroll delay={200}>
                            <div className="relative group p-1 bg-gradient-to-tr from-gold-500/20 to-transparent rounded-[3rem]">
                                <div className="relative bg-brand-950 p-10 lg:p-20 rounded-[3rem] border border-white/5 shadow-2xl overflow-hidden aspect-square flex flex-col justify-center">
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none" />
                                    <div className="text-center space-y-8">
                                        <div className="inline-block p-6 bg-gold-500 rounded-3xl mb-4">
                                            <RefreshCw size={48} className="text-brand-950 animate-spin-slow" />
                                        </div>
                                        <h3 className="text-4xl font-bold text-white font-heading tracking-tighter">The Planning Cycle</h3>
                                        <p className="text-slate-400 font-light leading-relaxed max-w-sm mx-auto">
                                            We review your situation quarterly to implement strategies in real-time.
                                        </p>
                                        <div className="pt-8 grid grid-cols-2 gap-4">
                                            {["Analyze", "Blueprint", "Implement", "Monitor"].map((s, i) => (
                                                <div key={i} className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-gold-400 font-bold text-xs tracking-widest uppercase">
                                                    {s}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </div>
                </div>
            </section>

            {/* 3. The Pillars (Strategic Pillars) */}
            <section className="py-32 px-6 bg-slate-50 italic">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-24 max-w-3xl mx-auto">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gold-600 block mb-6">Strategic Domains</span>
                        <h2 className="text-4xl md:text-6xl font-bold text-brand-950 font-heading mb-8 tracking-tighter leading-[0.9] not-italic">
                            Your Strategy <br /><span className="italic text-gold-500 underline decoration-gold-500/30">Architecture.</span>
                        </h2>
                        <p className="text-xl text-slate-500 font-light not-italic leading-relaxed">
                            We don&apos;t just &apos;find&apos; deductions; we build a permanent structure designed to protect your wealth and fuel your lifestyle.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            {
                                title: "Entity Optimization",
                                description: "Evaluating LLC, S-Corp, Partnership, or C-Corp elections to ensure your structure matches your expansion goals.",
                                icon: Gem,
                                category: "Structure"
                            },
                            {
                                title: "Deduction Forensic",
                                description: "We audit your operations to ensure you're capturing every legal write-off, from R&D credits to specialized incentives.",
                                icon: FileSearch,
                                category: "Operations"
                            },
                            {
                                title: "Capital Timing",
                                description: "Strategic timing of equipment acquisitions, hire dates, and retirement contributions to optimize tax liability.",
                                icon: Clock,
                                category: "Capital"
                            }
                        ].map((pillar, idx) => (
                            <RevealOnScroll key={idx} delay={idx * 150}>
                                <div className="h-full bg-white p-12 rounded-3xl border border-slate-200 hover:border-gold-500 transition-all group shadow-sm text-center">
                                    <div className="w-16 h-16 bg-brand-950 rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform mx-auto">
                                        <pillar.icon size={28} className="text-gold-500" />
                                    </div>
                                    <span className="inline-block text-[10px] font-black uppercase tracking-[0.2em] text-gold-600 mb-4 bg-gold-500/5 px-3 py-1 rounded-full">{pillar.category}</span>
                                    <h3 className="text-2xl font-bold text-brand-950 mb-6 font-heading tracking-tighter not-italic">{pillar.title}</h3>
                                    <p className="text-slate-500 leading-relaxed text-lg font-light not-italic">{pillar.description}</p>
                                </div>
                            </RevealOnScroll>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Outcomes / Benefits */}
            <section className="py-32 px-6 bg-brand-950 relative overflow-hidden">
                <div className="absolute inset-0 bg-gold-400/5 pointer-events-none" />
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <RevealOnScroll>
                            <div className="space-y-10">
                                <h2 className="text-4xl lg:text-7xl font-bold text-white font-heading leading-[0.95] tracking-tighter">
                                    Permanent <br /><span className="text-gold-400">Preservation.</span>
                                </h2>
                                <p className="text-xl text-slate-300 leading-relaxed font-light">
                                    Tax planning isn&apos;t just about saving this year—it&apos;s about creating a tax-efficient legacy that compounds over decades.
                                </p>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8">
                                    {[
                                        { title: "Permanent Savings", text: "Lock in legal structures that reduce your effective tax rate indefinitely." },
                                        { title: "Cash Liquidity", text: "Better forecasting means more working capital for your business needs." },
                                        { title: "Audit Confidence", text: "Every strategy is documented and backed by current tax code." },
                                        { title: "Wealth Acceleration", text: "Keep more of what you earn to fund your next big move or investment." }
                                    ].map((benefit, i) => (
                                        <div key={i} className="space-y-4">
                                            <div className="flex items-center gap-3 text-gold-500">
                                                <CheckCircle2 size={18} />
                                                <span className="font-bold uppercase tracking-widest text-[10px]">{benefit.title}</span>
                                            </div>
                                            <p className="text-slate-400 text-sm leading-relaxed font-light">{benefit.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </RevealOnScroll>

                        <div className="relative group">
                            <div className="absolute -inset-4 bg-gold-500/10 rounded-[2.5rem] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
                            <div className="relative bg-white/5 rounded-[3rem] border border-white/10 p-12 overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/10 rounded-full blur-2xl" />
                                <div className="space-y-12">
                                    <div className="flex items-center justify-between">
                                        <span className="text-white font-heading text-2xl">Wealth Retention</span>
                                        <span className="text-gold-400 font-bold">+18-24%</span>
                                    </div>
                                    <div className="h-48 w-full flex items-end justify-between gap-4">
                                        {[40, 60, 45, 90, 75, 100].map((h, i) => (
                                            <motion.div 
                                                key={i}
                                                initial={{ height: 0 }}
                                                whileInView={{ height: `${h}%` }}
                                                className="w-full bg-gradient-to-t from-gold-500 to-gold-300 rounded-t-lg shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                                            />
                                        ))}
                                    </div>
                                    <p className="text-center text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Strategic Planning Implementation</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Who It's For / Not For */}
            <section className="py-32 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-slate-50 rounded-[3rem] overflow-hidden border border-slate-100 p-1 lg:p-4 shadow-sm">
                        <div className="p-10 lg:p-20 space-y-8">
                            <h3 className="text-4xl font-bold text-brand-950 font-heading tracking-tighter underline decoration-gold-500/30 underline-offset-[12px]">Ideal Fit</h3>
                            <ul className="space-y-6">
                                {[
                                    "Profitable business owners doing $200k+ in net income",
                                    "Individuals with multiple entity or income streams",
                                    "Owners who feel their current CPA is &apos;only a historian&apos;",
                                    "Founders of high-growth tech or service firms",
                                    "High-net-worth operators looking for structural safety"
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-4 text-slate-600 font-light leading-relaxed">
                                        <CheckCircle2 size={24} className="text-gold-500 shrink-0 mt-1" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-brand-950 p-10 lg:p-20 text-white space-y-8 flex flex-col justify-center">
                            <h3 className="text-4xl font-bold font-heading tracking-tighter">Who It’s <span className="text-gold-500 italic">Not</span> For</h3>
                             <p className="text-slate-400 font-light leading-relaxed text-lg">
                                If you are looking for the cheapest annual filing possible, or if you only have a W-2 and no business activity, you likely won&apos;t see the ROI from advanced tax planning.
                            </p>
                            <p className="text-slate-400 font-light leading-relaxed mb-8">
                                We specialize in business-level complexity where structure creates real leverage. If you want strategy, we are your partner.
                            </p>
                            <div className="pt-6">
                                <Link 
                                    href="/services/tax-filing-and-preparation-services" 
                                    className="text-gold-400 hover:text-gold-300 font-bold flex items-center gap-2 group tracking-wide text-sm"
                                >
                                    View Basic Filing Services <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Process Section */}
            <section className="py-32 px-6 bg-slate-50 italic">
                <div className="max-w-7xl mx-auto text-center mb-24">
                    <h2 className="text-4xl lg:text-5xl font-bold text-brand-950 font-heading mb-6 tracking-tighter not-italic">The Planning Lifecycle.</h2>
                    <p className="text-xl text-slate-500 font-light not-italic">A continuous 365-day loop of optimization.</p>
                </div>
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                    <div className="absolute top-1/2 left-0 w-full h-px bg-slate-200 hidden md:block -translate-y-1/2" />
                    {[
                        { q: "Q1", title: "Assessment", desc: "Modeling last year&apos;s returns and setting annual saving benchmarks." },
                        { q: "Q2", title: "Monitoring", desc: "Reviewing mid-year performance and adjusting entity elections/salaries." },
                        { q: "Q3", title: "Implementation", desc: "Executing high-impact tax moves before the year-end deadline." },
                        { q: "Q4", title: "Finalization", desc: "Clean, strategy-aligned filing with zero &apos;surprise&apos; liabilities." }
                    ].map((step, i) => (
                        <div key={i} className="relative z-10 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center group hover:border-gold-500 transition-all">
                            <div className="w-12 h-12 rounded-full bg-brand-950 text-gold-500 flex items-center justify-center font-black mx-auto mb-6 group-hover:scale-110 transition-transform">{step.q}</div>
                            <h3 className="text-xl font-bold text-brand-950 mb-4 font-heading tracking-tighter not-italic">{step.title}</h3>
                            <p className="text-slate-500 text-xs not-italic leading-relaxed font-light">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 7. Comparison Table */}
            <section className="py-32 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                    <h2 className="text-4xl lg:text-6xl font-bold text-brand-950 font-heading mb-6 tracking-tighter leading-none">Strategy vs. <span className="italic text-slate-300">Reaction.</span></h2>
                    </div>
                    
                    <div className="border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-2xl max-w-5xl mx-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-brand-950 text-white">
                                    <th className="p-8 lg:p-12 text-lg font-heading tracking-tight">Focus Area</th>
                                    <th className="p-8 lg:p-12 text-lg font-heading tracking-tight text-slate-400">Traditional Prep</th>
                                    <th className="p-8 lg:p-12 text-lg font-heading tracking-tight text-gold-500 font-black">Our Planning</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {[
                                    { f: "Tax Window", g: "Once a year (April)", u: "Year-Round (365 Days)" },
                                    { f: "Goal", g: "Compliance only", u: "Minimized Liability" },
                                    { f: "Entity Setup", g: "Set it and forget it", u: "Quarterly Optimization" },
                                    { f: "Communication", g: "Reactive email", u: "Proactive Strategy Calls" },
                                    { f: "Outcome", g: "Historical Reporting", u: "Wealth Preservation" }
                                ].map((row, i) => (
                                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                                        <td className="p-8 lg:px-12 font-bold text-brand-950 italic">{row.f}</td>
                                        <td className="p-8 lg:px-12 text-slate-500 font-light">{row.g}</td>
                                        <td className="p-8 lg:px-12 font-bold text-brand-900 bg-gold-500/5">{row.u}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* 8. FAQ Section */}
            <section className="py-32 px-6 bg-slate-50">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl lg:text-5xl font-bold text-brand-950 font-heading mb-6 tracking-tighter">Common Questions</h2>
                    </div>
                    <div className="space-y-4">
                        {FAQ_ITEMS.map((faq, i) => (
                            <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                                <button 
                                    onClick={() => toggleFaq(i)}
                                    className="w-full flex items-center justify-between p-8 text-left group"
                                >
                                    <span className="text-xl font-bold text-brand-950 font-heading tracking-tighter group-hover:text-gold-600 transition-colors">{faq.question}</span>
                                    <ChevronDown className={cn("text-gold-500 transition-transform duration-300", openFaq === i && "rotate-180")} />
                                </button>
                                <div className={cn("overflow-hidden transition-all duration-300", openFaq === i ? "max-h-96" : "max-h-0")}>
                                    <div className="p-8 pt-0 text-slate-500 font-light leading-relaxed text-lg border-t border-slate-50">
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 9. Related Services */}
            <section className="py-32 px-6 bg-white border-t border-slate-100">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                        <div className="max-w-2xl text-center md:text-left">
                            <h2 className="text-4xl lg:text-6xl font-bold text-brand-950 font-heading tracking-tighter leading-none mb-6">Complete <br /> <span className="italic text-gold-600">Wealth Logic.</span></h2>
                            <p className="text-xl text-slate-500 font-light">Planning is stronger when integrated with the right entities and leadership.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            { title: "Fractional CFO", slug: "fractional-cfo", desc: "Institutional-grade financial leadership for growth-stage business owners." },
                            { title: "S-Corp Advantage", slug: "s-corp-tax-advantage", desc: "Optimization of your entity structure to reduce self-employment tax burden." }
                        ].map((s, i) => (
                            <Link key={i} href={`/services/${s.slug}`} className="group p-10 bg-slate-50 rounded-3xl border border-slate-100 hover:border-gold-500 hover:bg-white hover:shadow-xl transition-all">
                                <h3 className="text-2xl font-bold text-brand-950 mb-4 font-heading uppercase tracking-tighter">{s.title}</h3>
                                <p className="text-slate-500 mb-8 font-light line-clamp-2">{s.desc}</p>
                                <span className="inline-flex items-center gap-2 text-gold-600 font-black tracking-widest text-[10px] uppercase">
                                    Explore Service <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* 10. Final CTA */}
            <section className="py-32 px-6 relative bg-brand-950 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/pattern-grid.svg')] bg-repeat opacity-[0.03] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold-400/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
                
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <RevealOnScroll>
                        <h2 className="text-5xl md:text-8xl font-bold text-white font-heading mb-12 tracking-tighter leading-[0.85]">
                            Strategy <br />Starts <span className="italic text-gold-400 underline decoration-white/10 decoration-wavy underline-offset-[20px]">Now.</span>
                        </h2>
                        <p className="text-xl md:text-2xl text-slate-300 mb-16 leading-relaxed font-light mx-auto max-w-2xl">
                            Stop paying for a lack of planning. Book a Tax Strategy Audit to see exactly where your current structure is leaking capital.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Link 
                                href="/intake"
                                className="px-14 py-7 bg-gold-500 text-brand-950 font-black rounded-2xl hover:bg-gold-400 hover:scale-[1.05] active:scale-[0.98] transition-all shadow-2xl text-3xl group flex items-center justify-center gap-4"
                            >
                                Get Started <ArrowRight size={36} className="group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </div>
                        <p className="mt-12 text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px]">
                            Assessment • 100% Confidential • Advisor-Led
                        </p>
                    </RevealOnScroll>
                </div>
            </section>
        </div>
    );
}
