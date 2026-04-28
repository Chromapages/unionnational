"use client";
// Force rebuild to resolve stale Target reference error

import { motion } from "framer-motion";
import { 
    Hammer, 
    HardHat, 
    TrendingUp, 
    ArrowRight, 
    Construction,
    BarChart3,
    ShieldCheck,
    Coins,
    CheckCircle2,
    ChevronDown,
    Zap,
    Scale,
    Clock,
    UserCheck,
    Truck,
    Target as TargetIcon
} from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { Link } from "@/i18n/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ConstructionIndustryClientProps {
    locale: string;
}

const FAQ_ITEMS = [
    {
        question: "How is a Construction CFO different from my bookkeeper?",
        answer: "A bookkeeper records what you spent. A Construction CFO tells you why you spent it, how it affected your labor burden, and what your real-time job costing looks like before the project is over. We look forward, not just backward."
    },
    {
        question: "Do you help with WIP (Work-In-Progress) reporting?",
        answer: "Yes. WIP reporting is the heart of construction finance. We install systems that provide accurate, weekly WIP updates so you can avoid the 'surprise loss' at the end of a project."
    },
    {
        question: "Can you help us lower our self-employment taxes?",
        answer: "Absolutely. Most contractors are set up as Sole Props or simple LLCs and are overpaying in self-employment tax. We integrate S-Corp optimization specifically for the high-asset needs of construction firms."
    },
    {
        question: "What size construction firms do you work with?",
        answer: "We specialize in mid-sized commercial and residential firms generating between $1M and $10M in annual revenue who have outgrown their 'home-office' accounting setup."
    },
    {
        question: "Do we need to switch our software to work with you?",
        answer: "Not necessarily. We work with most major construction stacks (QuickBooks, Procore, Buildertrend) but will recommend optimizations if your current setup is creating data lag."
    },
    {
        question: "How do you handle audit protection for contractors?",
        answer: "Construction is a high-scrutiny industry. We provide 3-year audit protection and ensure every strategy—from equipment depreciation to sub-contractor classification—is documented and defensible."
    }
];

const CONSTRUCTION_PILLARS = [
    {
        title: "Precision Job Costing",
        description: "We implement advanced tracking so you know exactly how much you're making on every crew, every job, every week.",
        icon: TargetIcon,
        category: "Operations"
    },
    {
        title: "WIP Mastery",
        description: "Automated Work-In-Progress reporting that eliminates the 'look-back' lag and protects your cash reserves.",
        icon: Clock,
        category: "Visibility"
    },
    {
        title: "Vendor & Cash Flow",
        description: "Managing draws, vendors, and payroll cycles to ensure you always have the liquidity needed for the next big job.",
        icon: Truck,
        category: "Liquidity"
    }
];

export default function ConstructionIndustryClient({ locale }: ConstructionIndustryClientProps) {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <div className="bg-white text-brand-900 overflow-x-hidden">
            {/* 1. Industry Hero */}
            <section className="relative px-6 py-28 lg:py-48 bg-brand-950 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/pattern-grid.svg')] bg-repeat opacity-[0.03] pointer-events-none" />
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                
                <div className="max-w-7xl mx-auto relative z-10">
                    <Breadcrumbs 
                        items={[
                            { label: "Industries", href: "/industries" },
                            { label: "Construction", href: "/industries/construction" }
                        ]} 
                    />
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gold-500/10 border border-gold-400/20 text-gold-400 text-sm font-bold uppercase tracking-widest mb-10 shadow-lg"
                        >
                            <HardHat size={18} className="text-gold-500" />
                            Industry Specialization
                        </motion.div>
                        
                        <motion.h1 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-6xl lg:text-9xl font-bold font-heading text-white leading-[0.85] tracking-tighter mb-10"
                        >
                            Job Costing <br />
                            is <span className="italic text-gold-400">Not</span> a Strategy.
                        </motion.h1>

                        <motion.p 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl sm:text-2xl text-slate-300 mb-14 leading-relaxed max-w-3xl font-light"
                        >
                            Generalist CPAs don't understand labor burden or WIP lag. We provide elite construction firms with the board-level leadership required to protect margins and scale with confidence.
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
                                Book Partner Audit <ArrowRight size={28} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link 
                                href="/book"
                                className="px-12 py-6 bg-transparent border-2 border-white/20 text-white font-bold rounded-2xl hover:bg-white/5 transition-all text-2xl flex items-center justify-center"
                            >
                                Strategy Call
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Trust Strip */}
            <div className="bg-brand-950/95 border-y border-white/5 py-12 px-6">
                <div className="max-w-7xl mx-auto flex flex-wrap justify-center lg:justify-between gap-12 text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                    <div className="flex items-center gap-3">
                        <BarChart3 size={18} className="text-gold-500/50" />
                        WIP Performance
                    </div>
                    <div className="flex items-center gap-3">
                        <UserCheck size={18} className="text-gold-500/50" />
                        Labor Burden Clarity
                    </div>
                    <div className="flex items-center gap-3">
                        <ShieldCheck size={18} className="text-gold-500/50" />
                        Audit Defense
                    </div>
                    <div className="flex items-center gap-3">
                        <TrendingUp size={18} className="text-gold-500/50" />
                        High-Margin Growth
                    </div>
                </div>
            </div>

            {/* 2. Problem Section */}
            <section className="py-32 px-6 bg-white border-y border-slate-100 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <RevealOnScroll>
                            <div className="space-y-10">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-gold-600 block mb-4">The Contractor Gap</span>
                                <h2 className="text-4xl lg:text-7xl font-bold text-brand-950 font-heading leading-[0.9] tracking-tighter">
                                    Why most contractors <br /><span className="italic text-gold-600">lose money in the field.</span>
                                </h2>
                                <p className="text-2xl text-slate-600 leading-relaxed font-light">
                                    You can build anything, but can you <span className="text-brand-950 font-bold decoration-gold-500 underline underline-offset-8 decoration-2">predict your profit</span> on a job before it starts? Most firms find out they lost money 30 days after the project is done.
                                </p>
                                <p className="text-xl text-slate-500 leading-relaxed font-light">
                                    That 'WIP lag' is the silent killer of construction firms. Without institutional-grade leadership, you're just trading dollars for stress.
                                </p>
                                
                                <div className="space-y-6 pt-6 text-lg">
                                    {[
                                        { icon: Zap, text: "Mystery cash-flow issues despite high revenue" },
                                        { icon: Coins, text: "Uncalculated labor burden eating your overhead" },
                                        { icon: ShieldCheck, text: "Surprise year-end tax debt with no cash to pay it" }
                                    ].map((item, i) => {
                                        const ItemIcon = item.icon;

                                        return (
                                        <div key={i} className="flex items-center gap-5 text-brand-900 font-bold group">
                                            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-gold-500/10 transition-all">
                                                <ItemIcon size={20} className="text-gold-600" />
                                            </div>
                                            {item.text}
                                        </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </RevealOnScroll>

                        <RevealOnScroll delay={200}>
                            <div className="relative group p-1 bg-gradient-to-tr from-gold-500/20 to-transparent rounded-[2.5rem]">
                                <div className="relative bg-brand-950 p-10 lg:p-20 rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden aspect-square flex flex-col justify-center">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-gold-400/5 rounded-full blur-3xl pointer-events-none" />
                                    <div className="text-center space-y-10">
                                        <div className="inline-block p-6 bg-gold-500 rounded-3xl mb-4">
                                            <Hammer size={48} className="text-brand-950" />
                                        </div>
                                        <h3 className="text-4xl font-bold text-white font-heading tracking-tight">The Contractor OS</h3>
                                        <div className="space-y-6 max-w-sm mx-auto">
                                            {[
                                                { label: "Job Costing Precision", level: 95 },
                                                { label: "Labor Burden Analysis", level: 90 },
                                                { label: "Tax Asset Optimization", level: 85 }
                                            ].map((bar, i) => (
                                                <div key={i} className="space-y-2 text-left">
                                                    <div className="flex justify-between text-[10px] font-black uppercase text-slate-400 tracking-widest">
                                                        <span>{bar.label}</span>
                                                        <span className="text-gold-400">Deployed</span>
                                                    </div>
                                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                                        <motion.div 
                                                            initial={{ width: 0 }}
                                                            whileInView={{ width: `${bar.level}%` }}
                                                            className="h-full bg-gold-500 rounded-full"
                                                        />
                                                    </div>
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

            {/* 3. The Pillars (The Construction Strategy OS) */}
            <section className="py-32 px-6 bg-slate-50 italic">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-24 max-w-3xl mx-auto">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gold-600 block mb-6">Vertical Focus</span>
                        <h2 className="text-4xl md:text-6xl font-bold text-brand-950 font-heading mb-8 tracking-tighter leading-[1.1] not-italic">
                            Financial <span className="italic text-gold-500 underline decoration-gold-500/30">Force.</span>
                        </h2>
                        <p className="text-xl text-slate-500 font-light not-italic leading-relaxed">
                            We don't just 'keep books.' We install the high-level financial strategy that generalist firms aren't built to provide for elite contractors.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {CONSTRUCTION_PILLARS.map((pillar, idx) => {
                            const PillarIcon = pillar.icon;

                            return (
                            <RevealOnScroll key={idx} delay={idx * 150}>
                                <div className="h-full bg-white p-12 rounded-3xl border border-slate-200 hover:border-gold-500 transition-all group shadow-sm text-center">
                                    <div className="w-16 h-16 bg-brand-950 rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform mx-auto">
                                        <PillarIcon size={28} className="text-gold-500" />
                                    </div>
                                    <span className="inline-block text-[10px] font-black uppercase tracking-[0.2em] text-gold-600 mb-4 bg-gold-500/5 px-3 py-1 rounded-full">{pillar.category}</span>
                                    <h3 className="text-2xl font-bold text-brand-950 mb-6 font-heading tracking-tighter not-italic">{pillar.title}</h3>
                                    <p className="text-slate-500 leading-relaxed text-lg font-light not-italic">{pillar.description}</p>
                                </div>
                            </RevealOnScroll>
                            );
                        })}
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
                                    Defensive <br /><span className="text-gold-400">Growth.</span>
                                </h2>
                                <p className="text-xl text-slate-300 leading-relaxed font-light">
                                    In construction, your biggest risk isn't lack of sales—it's lack of control. We provide the control required to scale without overexposure.
                                </p>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8">
                                    {[
                                        { title: "Margin Defense", text: "Identify job-level margin erosion and fix it while the field crew is still active." },
                                        { title: "Clean Costing", text: "Granular visibility into labor burden, equipment depreciation, and overhead." },
                                        { title: "Strategic Growth", text: "Calculated hiring and equipment acquisition based on predictive models." },
                                        { title: "Zero Surprises", text: "Proactive tax planning prevents the 'cash-crunch' of year-end liabilities." }
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
                            <div className="absolute -inset-4 bg-gold-500/10 rounded-[4rem] blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />
                            <img 
                                src="/images/construction-cfo-field.jpg" 
                                alt="Construction Strategic Review"
                                className="relative rounded-[3rem] border border-white/10 shadow-2xl object-cover aspect-video"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Who It's For / Not For */}
            <section className="py-32 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-slate-50 rounded-[3rem] overflow-hidden border border-slate-100 p-1 lg:p-4 shadow-sm">
                        <div className="p-10 lg:p-20 space-y-8">
                            <h3 className="text-3xl font-bold text-brand-950 font-heading tracking-tight underline decoration-gold-500/30 underline-offset-[12px]">Elite Contractor Fit</h3>
                            <ul className="space-y-6">
                                {[
                                    "Commercial or residential firms doing $1M-$10M revenue",
                                    "Owners who feel their current setup creates 'data lag'",
                                    "Teams using Procore, Buildertrend, or advanced QB setups",
                                    "Field-service businesses with high labor burden complexity",
                                    "Founders looking for institutional-grade audit defense"
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-4 text-slate-600 font-light leading-relaxed">
                                        <CheckCircle2 size={24} className="text-gold-500 shrink-0 mt-1" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-brand-950 p-10 lg:p-20 text-white space-y-8 flex flex-col justify-center">
                            <h3 className="text-3xl font-bold font-heading tracking-tight">Who It’s <span className="text-gold-500 italic">Not</span> For</h3>
                            <p className="text-slate-400 font-light leading-relaxed text-lg">
                                If you are a solo sub-contractor without a crew, or if you are looking for simple once-a-year tax prep with no ongoing strategic interest—we aren't the right partner.
                            </p>
                            <p className="text-slate-400 font-light leading-relaxed mb-8">
                                We specialize in high-overhead, high-complexity construction firms that need real-time leadership.
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
                    <h2 className="text-4xl lg:text-5xl font-bold text-brand-950 font-heading mb-6 tracking-tighter not-italic">Institutional Installation.</h2>
                    <p className="text-xl text-slate-500 font-light not-italic">Elite leadership installed in three strategic phases.</p>
                </div>
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    <div className="absolute top-1/2 left-0 w-full h-px bg-slate-200 hidden md:block -translate-y-1/2" />
                    {[
                        { step: "01", title: "Diagnostic Audit", desc: "We review your WIP history, labor burden models, and entity structure to identify margin leaks." },
                        { step: "02", title: "CFO Setup", desc: "We deploy your new dashboards, forecasting models, and construction-specific KPI trackers." },
                        { step: "03", title: "Active Partnership", desc: "Regular strategy review meetings and leadership guidance to navigate your next expansion." }
                    ].map((step, i) => (
                        <div key={i} className="relative z-10 bg-white p-10 rounded-3xl border border-slate-200 shadow-sm text-center group hover:border-gold-500 transition-all">
                            <div className="w-14 h-14 rounded-full bg-brand-950 text-gold-500 flex items-center justify-center font-black mx-auto mb-8 text-xl group-hover:scale-110 transition-transform">{step.step}</div>
                            <h3 className="text-2xl font-bold text-brand-950 mb-4 font-heading tracking-tight not-italic">{step.title}</h3>
                            <p className="text-slate-500 text-sm not-italic leading-relaxed font-light">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 7. Comparison Table */}
            <section className="py-32 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                    <h2 className="text-4xl lg:text-6xl font-bold text-brand-950 font-heading mb-6 tracking-tighter leading-none">Construction CFO <br /> vs. <span className="italic text-slate-300">Generic CPAs.</span></h2>
                    </div>
                    
                    <div className="border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-2xl max-w-5xl mx-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-brand-950 text-white">
                                    <th className="p-8 lg:p-12 text-lg font-heading tracking-tight">Area of Focus</th>
                                    <th className="p-8 lg:p-12 text-lg font-heading tracking-tight text-slate-400">Generic Accounting</th>
                                    <th className="p-8 lg:p-12 text-lg font-heading tracking-tight text-gold-500 font-black">Contractor CFO</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {[
                                    { f: "Job Costing", g: "Basic after-the-fact", u: "Weekly Proactive Analysis" },
                                    { f: "WIP Reporting", g: "Rarely performed", u: "Automated Weekly Flow" },
                                    { f: "Labor Burden", g: "Estimated/Guessed", u: "Mathematically Verified" },
                                    { f: "Audit Defense", g: "General representation", u: "Specialized Construction Guard" },
                                    { f: "Strategic Leadership", g: "Compliance only", u: "Board-Level Partnership" }
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
                        <h2 className="text-4xl lg:text-5xl font-bold text-brand-950 font-heading mb-6 tracking-tighter">Industry FAQs</h2>
                    </div>
                    <div className="space-y-4">
                        {FAQ_ITEMS.map((faq, i) => (
                            <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                                <button 
                                    onClick={() => toggleFaq(i)}
                                    className="w-full flex items-center justify-between p-8 text-left group"
                                >
                                    <span className="text-xl font-bold text-brand-950 font-heading tracking-tight group-hover:text-gold-600 transition-colors">{faq.question}</span>
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
                            <h2 className="text-4xl lg:text-6xl font-bold text-brand-950 font-heading tracking-tighter leading-none mb-6">Strategic <br /> <span className="italic text-gold-600">Specialization.</span></h2>
                            <p className="text-xl text-slate-500 font-light">Industry-specific leadership powered by tax optimization.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            { title: "Tax Planning", slug: "tax-planning", desc: "Year-round strategy to maximize legal tax reduction and protect contractor wealth." },
                            { title: "Fractional CFO", slug: "fractional-cfo", desc: "The core financial OS that drives construction firm profitability." }
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
                            Protect <br />Your <span className="italic text-gold-400 underline decoration-white/10 decoration-wavy underline-offset-[20px]">Profits.</span>
                        </h2>
                        <p className="text-xl md:text-2xl text-slate-300 mb-16 leading-relaxed font-light mx-auto max-w-2xl">
                            Stop guessing at your job costing. Join the elite firms using the Construction CFO Partnership to protect margins and scale.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Link 
                                href="/intake"
                                className="px-14 py-7 bg-gold-500 text-brand-950 font-black rounded-2xl hover:bg-gold-400 hover:scale-[1.05] active:scale-[0.98] transition-all shadow-2xl text-3xl group flex items-center justify-center gap-4"
                            >
                                Book Partner Audit <ArrowRight size={36} className="group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </div>
                        <p className="mt-12 text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px]">
                            Strategic Audit • Construction Specialized • Board-Level
                        </p>
                    </RevealOnScroll>
                </div>
            </section>
        </div>
    );
}
