"use client";

import { motion } from "framer-motion";
import { 
    BarChart3, 
    TrendingUp, 
    ShieldCheck, 
    ArrowRight, 
    Lightbulb, 
    Eye,
    Zap,
    Scale,
    LineChart,
    PieChart,
    ChevronDown,
    Building2,
    CheckCircle2,
    Target as TargetIcon,
    Compass
} from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface FractionalCFOClientProps {
    locale: string;
}

const FAQ_ITEMS = [
    {
        question: "When does a business typically need a Fractional CFO?",
        answer: "Most businesses reach out to us when they hit the $1M-$2M revenue mark. At this stage, complex issues like job costing, multi-state growth, and cash-flow management become too risky to handle based on 'gut feel' alone."
    },
    {
        question: "How is this different from my current bookkeeper or CPA?",
        answer: "A bookkeeper records what already happened. A CPA helps you file for the previous year. A Fractional CFO looks forward—helping you predict cash needs, optimize margins for future growth, and build financial models to support better decision-making today."
    },
    {
        question: "Do we have to replace our current accounting team?",
        answer: "No. We often work alongside your existing team to provide the strategic layer they may not be equipped to offer. We turn their data into your roadmap."
    },
    {
        question: "What is the typical time commitment?",
        answer: "Your time commitment is low. We spend 1-2 hours per month in strategic review meetings. Our team does the heavy lifting on the data modeling and system build-out in the background."
    },
    {
        question: "Can you help us get ready for a loan or sale?",
        answer: "Absolutely. One of our core functions is 'Capital Readiness'—ensuring your books and models are institutional-grade and ready for the scrutiny of banks or potential buyers."
    },
    {
        question: "Is there a minimum revenue requirement?",
        answer: "While we specialize in businesses generating $1M+, we work with earlier-stage, high-growth companies that need a solid financial foundation built early to avoid structural debt later."
    }
];

export default function FractionalCFOClient({ locale }: FractionalCFOClientProps) {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <div className="bg-white text-brand-900 overflow-x-hidden">
            {/* 1. Hero Section */}
            <section className="relative px-6 py-28 lg:py-48 bg-brand-950 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/pattern-grid.svg')] bg-repeat opacity-[0.03] pointer-events-none" />
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gold-500/10 border border-gold-400/20 text-gold-400 text-sm font-bold uppercase tracking-widest mb-10 shadow-lg shadow-black/20"
                        >
                            <Scale size={18} className="text-gold-500" />
                            Premium Advisory Pillar
                        </motion.div>
                        
                        <motion.h1 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-6xl lg:text-9xl font-bold font-heading text-white leading-[0.85] tracking-tighter mb-10"
                        >
                            Architecture <br />
                            for <span className="italic text-gold-400">Growth.</span>
                        </motion.h1>

                        <motion.p 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl sm:text-2xl text-slate-300 mb-14 leading-relaxed max-w-3xl font-light"
                        >
                            Stop making decisions in the dark. Our Fractional CFO partnership provides the visibility, strategy, and leadership you need to scale with precision—without the expense of a full-time executive seat.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-6"
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
                                Direct Booking
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Trust Strip */}
            <div className="bg-brand-950/95 border-y border-white/5 py-12 px-6">
                <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-12 text-slate-400 font-bold uppercase tracking-widest text-xs">
                    <div className="flex items-center gap-3">
                        <TargetIcon size={20} className="text-gold-500/50" />
                        Strategic Foresight
                    </div>
                    <div className="flex items-center gap-3">
                        <LineChart size={20} className="text-gold-500/50" />
                        Margin Optimization
                    </div>
                    <div className="flex items-center gap-3">
                        <ShieldCheck size={20} className="text-gold-500/50" />
                        Capital Readiness
                    </div>
                    <div className="flex items-center gap-3">
                        <Building2 size={20} className="text-gold-500/50" />
                        Board-Level Support
                    </div>
                </div>
            </div>

            {/* 2. Problem Section */}
            <section className="py-32 px-6 bg-white border-y border-slate-100 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <RevealOnScroll>
                            <div className="space-y-10">
                                <span className="text-xs font-black uppercase tracking-[0.3em] text-gold-600 block mb-4">The Decision Gap</span>
                                <h2 className="text-4xl lg:text-7xl font-bold text-brand-950 font-heading leading-[0.9] tracking-tighter">
                                    The cost of <br /><span className="italic text-gold-600">flying blind.</span>
                                </h2>
                                <p className="text-2xl text-slate-600 leading-relaxed font-light">
                                    You have sales. You have a team. But do you know the <span className="text-brand-950 font-bold decoration-gold-500 underline underline-offset-8 decoration-2">true ROI</span> of your next hire? Can you predict your cash position 90 days from now?
                                </p>
                                <p className="text-xl text-slate-500 leading-relaxed font-light">
                                    Growth without visibility is a gamble. Most business owners plateau because their financial architecture cannot support the weight of their ambition.
                                </p>
                                
                                <div className="space-y-6 pt-6 text-lg">
                                    {[
                                        { icon: Zap, text: "Reacting to cash flow emergencies after they happen" },
                                        { icon: PieChart, text: "Unclear visibility into real project profitability" },
                                        { icon: TrendingUp, text: "Surprise tax bills disrupting growth capital" }
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-5 text-brand-900 font-bold group">
                                            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-gold-500/10 group-hover:border-gold-500 transition-all">
                                                <item.icon size={20} className="text-gold-600 transition-colors" />
                                            </div>
                                            {item.text}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </RevealOnScroll>

                        <RevealOnScroll delay={200}>
                            <div className="relative p-1 bg-gradient-to-tr from-gold-500/20 to-transparent rounded-[2.5rem]">
                                <div className="relative bg-brand-950 p-10 lg:p-14 rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-gold-400/5 rounded-full blur-3xl pointer-events-none" />
                                    <div className="flex items-center gap-6 mb-12">
                                        <div className="p-4 bg-gold-500 rounded-2xl">
                                            <BarChart3 size={32} className="text-brand-950" />
                                        </div>
                                        <h3 className="text-3xl font-bold text-white font-heading tracking-tighter">The Growth Dashboard</h3>
                                    </div>
                                    <div className="space-y-10">
                                        {[
                                            { label: "Cash Flow Visibility", level: 98, color: "bg-gold-500" },
                                            { label: "Predictive Margin Analysis", level: 92, color: "bg-gold-500" },
                                            { label: "Strategic Capital Utilization", level: 85, color: "bg-gold-500" }
                                        ].map((bar, i) => (
                                            <div key={i} className="space-y-3">
                                                <div className="flex justify-between text-brand-50 font-bold text-sm tracking-wide">
                                                    <span>{bar.label.toUpperCase()}</span>
                                                    <span className="text-gold-400">OPTIMIZED</span>
                                                </div>
                                                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                                    <motion.div 
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: `${bar.level}%` }}
                                                        viewport={{ once: true }}
                                                        transition={{ duration: 1, delay: i * 0.2 }}
                                                        className={cn("h-full rounded-full shadow-[0_0_15px_rgba(212,175,55,0.3)]", bar.color)} 
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="mt-12 text-sm text-brand-100/30 italic leading-relaxed text-center">
                                        *Real-time visibility transforms uncertainty into confidence.
                                    </p>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </div>
                </div>
            </section>

            {/* 3. The Pillars (The CFO Advisory OS) */}
            <section className="py-32 px-6 bg-slate-50 italic">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-24 max-w-3xl mx-auto">
                        <span className="text-xs font-black uppercase tracking-[0.3em] text-gold-600 block mb-6">Execution Strategy</span>
                        <h2 className="text-4xl md:text-6xl font-bold text-brand-950 font-heading mb-8 tracking-tighter leading-[0.9]">
                            The Advisory OS.
                        </h2>
                        <p className="text-xl text-slate-500 font-light not-italic leading-relaxed">
                            We don't just report numbers; we install a financial operating system designed for aggressive, stable growth.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            {
                                title: "Visibility",
                                description: "Monthly management reporting and customized KPIs that tell the true story of your business performance.",
                                icon: Eye,
                                bullet: "Predictive Reporting"
                            },
                            {
                                title: "Strategy",
                                description: "Deep modeling, forecasting, and 'what-if' scenario planning for the major pivots of scaling.",
                                icon: Compass,
                                bullet: "Forward Modeling"
                            },
                            {
                                title: "Leadership",
                                description: "An executive partner to guide board meetings, bank negotiations, and internal financial systems.",
                                icon: ShieldCheck,
                                bullet: "Executive Presence"
                            }
                        ].map((pillar, idx) => (
                            <RevealOnScroll key={idx} delay={idx * 150}>
                                <div className="h-full bg-white p-12 rounded-3xl border border-slate-200 hover:border-gold-500 transition-all group shadow-sm">
                                    <div className="w-16 h-16 bg-brand-950 rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
                                        <pillar.icon size={28} className="text-gold-500" />
                                    </div>
                                    <span className="inline-block text-[10px] font-black uppercase tracking-[0.2em] text-gold-600 mb-4 bg-gold-500/5 px-3 py-1 rounded-full">{pillar.bullet}</span>
                                    <h3 className="text-3xl font-bold text-brand-950 mb-6 font-heading tracking-tighter not-italic">{pillar.title}</h3>
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
                                    Predictable <br /><span className="text-gold-400">Performance.</span>
                                </h2>
                                <p className="text-xl text-slate-300 leading-relaxed font-light">
                                    When you have board-level financial leadership, the anxiety of 'not knowing' is replaced by the speed of 'calculated action.'
                                </p>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8">
                                    {[
                                        { title: "Profitability Control", text: "Identify margin leaks and fix them before they affect your bottom line." },
                                        { title: "Optimized Cash Flow", text: "Predict cash peaks and valleys to fund growth without credit stress." },
                                        { title: "Capital Readiness", text: "Institutional-grade books ready for bank loans, investors, or sale." },
                                        { title: "Strategic Discipline", text: "Regular review meetings that keep your leadership team aligned with the plan." }
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

                        <div className="relative group grayscale hover:grayscale-0 transition-all duration-1000">
                            <div className="absolute -inset-4 bg-gold-500/10 rounded-[2.5rem] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
                            <img 
                                src="/images/fractional-cfo-dashboard.jpg" 
                                alt="CFO Strategic Overview"
                                className="relative rounded-[2rem] border border-white/10 shadow-2xl object-cover aspect-[4/3]"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Who It's For / Not For */}
            <section className="py-32 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-slate-50 rounded-[3rem] overflow-hidden border border-slate-100 p-1 lg:p-4">
                        <div className="p-10 lg:p-20 space-y-8">
                            <h3 className="text-3xl font-bold text-brand-950 font-heading tracking-tighter underline decoration-gold-500/30 underline-offset-[12px]">Who This Is For</h3>
                            <ul className="space-y-6">
                                {[
                                    "Growth-stage businesses doing $1M-$10M in annual revenue",
                                    "Owners who feel like they've outgrown their current tax person",
                                    "Industries with high complexity (Construction, Real Estate, Prof. Services)",
                                    "Founders planning for a major expansion or exit in 2-3 years",
                                    "Teams that value data-driven clarity over gut-based decisions"
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-4 text-slate-600 font-light leading-relaxed">
                                        <CheckCircle2 size={24} className="text-gold-500 shrink-0 mt-1" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-brand-950 p-10 lg:p-20 text-white space-y-8 flex flex-col justify-center">
                            <h3 className="text-3xl font-bold font-heading tracking-tighter">Who It’s <span className="text-gold-500 italic">Not</span> For</h3>
                            <p className="text-slate-400 font-light leading-relaxed text-lg">
                                If you are a brand new startup with no revenue yet, or if you are looking for basic, one-time tax filing without any ongoing strategy—we aren’t the right fit.
                            </p>
                            <p className="text-slate-400 font-light leading-relaxed mb-8">
                                We are built for established operators who are ready to invest in serious financial leadership to reach the next tier of their business.
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
                    <h2 className="text-4xl lg:text-5xl font-bold text-brand-950 font-heading mb-6 tracking-tighter not-italic">The Path to Clarity.</h2>
                    <p className="text-xl text-slate-500 font-light not-italic">Institutional-grade leadership installed in three phases.</p>
                </div>
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    <div className="absolute top-1/2 left-0 w-full h-px bg-slate-200 hidden md:block -translate-y-1/2" />
                    {[
                        { step: "01", title: "Diagnostic Audit", desc: "We perform a deep-dive review of your historical books, margins, and entity structure to identify immediate leaks." },
                        { step: "02", title: "OS Implementation", desc: "We build your dashboards, forecasting models, and KPI trackers. Your new financial system is deployed." },
                        { step: "03", title: "Active Partnership", desc: "Regular strategic review meetings, performance monitoring, and leadership guidance to navigate growth." }
                    ].map((step, i) => (
                        <div key={i} className="relative z-10 bg-white p-10 rounded-3xl border border-slate-200 shadow-sm text-center group hover:border-gold-500 transition-all">
                            <div className="w-14 h-14 rounded-full bg-brand-950 text-gold-500 flex items-center justify-center font-black mx-auto mb-8 text-xl group-hover:scale-110 transition-transform">{step.step}</div>
                            <h3 className="text-2xl font-bold text-brand-950 mb-4 font-heading tracking-tighter not-italic">{step.title}</h3>
                            <p className="text-slate-500 text-sm not-italic leading-relaxed font-light">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 7. Comparison Section */}
            <section className="py-32 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl lg:text-6xl font-bold text-brand-950 font-heading mb-6 tracking-tighter leading-none">Advisory vs. <span className="italic text-slate-300">Compliance.</span></h2>
                    </div>
                    
                    <div className="border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-2xl">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-brand-950 text-white">
                                    <th className="p-8 lg:p-12 text-lg font-heading tracking-tight">Feature / Service</th>
                                    <th className="p-8 lg:p-12 text-lg font-heading tracking-tight text-slate-400">Generic Bookkeeping</th>
                                    <th className="p-8 lg:p-12 text-lg font-heading tracking-tight text-gold-500">Union National CFO</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {[
                                    { f: "Forward-Looking Strategy", g: "Historical records only", u: "Predictive modeling and forecasting" },
                                    { f: "Margin & Profit Analysis", g: "Basic P&L statement", u: "Deep dive into project/service ROI" },
                                    { f: "Strategic Meetings", g: "Once-a-year filing", u: "Regular advisory and leadership review" },
                                    { f: "Cash Flow Management", g: "Manual checkbooks", u: "90-day rolling cash flow forecasting" },
                                    { f: "Executive Leadership", g: "Data entry clerk", u: "Board-level advisory partnership" }
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
                        <div className="max-w-2xl">
                            <h2 className="text-4xl lg:text-6xl font-bold text-brand-950 font-heading tracking-tighter leading-none mb-6">Complete <span className="italic text-gold-600">Strategic Alignment.</span></h2>
                            <p className="text-xl text-slate-500 font-light">Advisory is stronger when integrated with planning and structure.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            { title: "Tax Planning", slug: "tax-planning", desc: "Year-round strategy to maximize legal tax reduction and protect wealth." },
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
                            Ready for <br /><span className="italic text-gold-400 underline decoration-white/10 decoration-wavy underline-offset-[20px]">Clarity?</span>
                        </h2>
                        <p className="text-xl md:text-2xl text-slate-300 mb-16 leading-relaxed font-light mx-auto max-w-2xl">
                            Take the first step toward institutional-grade financial leadership. See if our Fractional CFO partnership is the right fit for your next stage of growth.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Link 
                                href="/intake"
                                className="px-14 py-7 bg-gold-500 text-brand-950 font-black rounded-2xl hover:bg-gold-400 hover:scale-[1.05] active:scale-[0.98] transition-all shadow-[0_15px_60px_rgba(212,175,55,0.3)] text-3xl group flex items-center justify-center gap-4"
                            >
                                Get Started <ArrowRight size={36} className="group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </div>
                        <p className="mt-12 text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px]">
                            Strategy Audit • 100% Confidential • Professional Grade
                        </p>
                    </RevealOnScroll>
                </div>
            </section>
        </div>
    );
}
