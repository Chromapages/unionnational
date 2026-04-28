"use client";

import { motion } from "framer-motion";
import { 
    Utensils, 
    ChefHat, 
    TrendingUp, 
    ArrowRight, 
    BarChart3,
    ShieldCheck,
    Coins,
    Timer,
    Wine,
    CheckCircle2,
    ChevronDown,
    Zap,
    Scale,
    Clock,
    LayoutDashboard,
    UtensilsCrossed,
    Users
} from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { Link } from "@/i18n/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface RestaurantIndustryClientProps {
    locale: string;
}

const FAQ_ITEMS = [
    {
        question: "How is a Hospitality CFO different from a standard accountant?",
        answer: "A standard accountant gives you a P&L 30 days after the month ends. A Hospitality CFO helps you manage Prime Costs (Labor + COGS) in real-time, ensuring you stay below the 60% threshold required for sustainable profitability."
    },
    {
        question: "What is the FICA Tip Credit, and how do you recover it?",
        answer: "The Section 45B credit allows restaurant owners to get a dollar-for-dollar tax credit for the employer portion of FICA taxes paid on employee tips. Many generalist CPAs miss this or miscalculate it; we ensure it's fully maximized."
    },
    {
        question: "Do you help with multi-unit expansion?",
        answer: "Yes. Scaling from one location to three is the most dangerous phase for a restaurant. We build the financial infrastructure, unit-economic models, and capital acquisition plans required for successful multi-unit rollouts."
    },
    {
        question: "Can you help lower our food and liquor costs?",
        answer: "While we don't manage your kitchen, we provide the visibility. We implement 'Actual vs. Theoretical' food cost reporting so you can see exactly where inventory leak or waste is hitting your bottom line."
    },
    {
        question: "Which POS systems do you work with?",
        answer: "We integrate with all major hospitality stacks (Toast, Square, Clover, Aloha) to pull real-time sales data into our financial forecasting models."
    },
    {
        question: "What is your Audit Protection for restaurants?",
        answer: "The hospitality industry faces frequent sales tax and labor audits. We provide 3-year audit protection and ensure your tip-reporting and labor practices are fully compliant and defensible."
    }
];

export default function RestaurantIndustryClient({ locale }: RestaurantIndustryClientProps) {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <div className="bg-white text-brand-900 overflow-x-hidden">
            {/* 1. Industry Hero */}
            <section className="relative px-6 py-28 lg:py-48 bg-brand-950 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/pattern-grid.svg')] bg-repeat opacity-[0.03] pointer-events-none" />
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                
                <div className="max-w-7xl mx-auto relative z-10 text-center lg:text-left">
                    <Breadcrumbs 
                        items={[
                            { label: "Industries", href: "/industries" },
                            { label: "Hospitality", href: "/industries/restaurants" }
                        ]} 
                    />
                    <div className="max-w-4xl mx-auto lg:mx-0">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gold-500/10 border border-gold-400/20 text-gold-400 text-sm font-bold uppercase tracking-widest mb-10 shadow-lg"
                        >
                            <ChefHat size={18} className="text-gold-500" />
                            Industry Specialization
                        </motion.div>
                        
                        <motion.h1 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-6xl lg:text-9xl font-bold font-heading text-white leading-[0.85] tracking-tighter mb-10"
                        >
                            Margins are <br />
                            <span className="italic text-gold-400">Not</span> a Guess.
                        </motion.h1>

                        <motion.p 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl sm:text-2xl text-slate-300 mb-14 leading-relaxed max-w-3xl font-light mx-auto lg:mx-0"
                        >
                            In the restaurant business, 1% is the difference between profit and loss. We provide high-volume operators with the financial leadership required to protect their bottom line and scale with precision.
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
                        Prime Cost Optimized
                    </div>
                    <div className="flex items-center gap-3">
                        <Coins size={18} className="text-gold-500/50" />
                        FICA Credit Recovery
                    </div>
                    <div className="flex items-center gap-3">
                        <Timer size={18} className="text-gold-500/50" />
                        Cash Visibility
                    </div>
                    <div className="flex items-center gap-3">
                        <TrendingUp size={18} className="text-gold-500/50" />
                        Scalable Infrastructure
                    </div>
                </div>
            </div>

            {/* 2. Problem Section */}
            <section className="py-32 px-6 bg-white border-y border-slate-100 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <RevealOnScroll>
                            <div className="space-y-10">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-gold-600 block mb-4">The Operator Dilemma</span>
                                <h2 className="text-4xl lg:text-7xl font-bold text-brand-950 font-heading leading-[0.9] tracking-tighter">
                                    Why most restaurants <br /><span className="italic text-gold-600">bleed pennies until empty.</span>
                                </h2>
                                <p className="text-2xl text-slate-600 leading-relaxed font-light">
                                    A busy dining room does not guarantee a profitable bank account. Most operators bleed cash in the <span className="text-brand-950 font-bold decoration-gold-500 underline underline-offset-8 decoration-2">invisible margins</span>—untracked waste, labor spirals, and missed tax assets.
                                </p>
                                <p className="text-xl text-slate-500 leading-relaxed font-light">
                                    Without institutional-grade visibility, you aren't running a business—you're managing a chaotic cash-flow engine that can fail at any moment.
                                </p>
                                
                                <div className="space-y-6 pt-6 text-lg">
                                    {[
                                        { icon: UtensilsCrossed, text: "Food costs creeping up without a corresponding price adjustment" },
                                        { icon: Users, text: "Labor burden exceeding 30% with no productivity oversight" },
                                        { icon: ShieldCheck, text: "Missing out on $10k+ in Section 45B FICA Tip Credits" }
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
                                            <Utensils size={48} className="text-brand-950" />
                                        </div>
                                        <h3 className="text-4xl font-bold text-white font-heading tracking-tight">The Hospitality OS</h3>
                                        <div className="space-y-6 max-w-sm mx-auto">
                                            {[
                                                { label: "Prime Cost Control", level: 98 },
                                                { label: "Inventory Leak Tracking", level: 92 },
                                                { label: "Tip Credit Capture", level: 100 }
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

            {/* 3. The Pillars (The Hospitality Strategy OS) */}
            <section className="py-32 px-6 bg-slate-50 italic">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-24 max-w-3xl mx-auto">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gold-600 block mb-6">Vertical Focus</span>
                        <h2 className="text-4xl md:text-6xl font-bold text-brand-950 font-heading mb-8 tracking-tighter leading-[1.1] not-italic">
                            Financial <span className="italic text-gold-500 underline decoration-gold-500/30">Intelligence.</span>
                        </h2>
                        <p className="text-xl text-slate-500 font-light not-italic leading-relaxed">
                            Generic bookkeeping fails hospitality operators. We install the specialized financial controls required to scale a restaurant group from one unit to ten.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            {
                                title: "Prime Cost Control",
                                description: "Real-time monitoring of COGS and Labor so you can make staffing and pricing adjustments before the month is over.",
                                icon: LayoutDashboard,
                                category: "Operations"
                            },
                            {
                                title: "FICA Tip Credit",
                                description: "We maximize the Section 45B credit to recover thousands in taxes literally 'left on the table' by standard accountants.",
                                icon: Coins,
                                category: "Tax Asset"
                            },
                            {
                                title: "Unit Expansion",
                                description: "Unit-economic modeling and capital planning for groups looking to replicate their success in new locations.",
                                icon: Wine,
                                category: "Scale"
                            }
                        ].map((pillar, idx) => {
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
                                    Absolute <br /><span className="text-gold-400">Visibility.</span>
                                </h2>
                                <p className="text-xl text-slate-300 leading-relaxed font-light">
                                    The restaurant business moves in seconds, not months. We provide the 24/7 financial dashboarding required to lead with numbers, not feelings.
                                </p>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8">
                                    {[
                                        { title: "Margin Protection", text: "Identify menu or menu-item erosion and adjust pricing to maintain the 'Gold Zone'." },
                                        { title: "Tax Asset Recovery", text: "Identify and claim FICA credits, ERTC leftovers, and specialized hospitality assets." },
                                        { title: "Growth Strategy", text: "Calculated unit expansion based on cash-flow models and capital readiness." },
                                        { title: "24/7 Visibility", text: "Cloud-based financial stacks integrating your POS, payroll, and banking into one view." }
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
                                src="/images/hospitality-cfo-kitchen.jpg" 
                                alt="Hospitality Strategic Review"
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
                            <h3 className="text-3xl font-bold text-brand-950 font-heading tracking-tight underline decoration-gold-500/30 underline-offset-[12px]">Ideal Operator Fit</h3>
                            <ul className="space-y-6">
                                {[
                                    "High-volume single units or multi-unit restaurant groups",
                                    "Operators who feel they 'never have cash' despite sales",
                                    "Teams using Toast, Square, or advanced POS setups",
                                    "Owners looking to scale beyond two locations",
                                    "Hospitality founders seeking elite audit protection"
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
                                If you are a single-person food truck or a very small mom-and-pop shop with no growth interest, or if you simply want a 'tax filer'—we aren't the right fit.
                            </p>
                            <p className="text-slate-400 font-light leading-relaxed mb-8">
                                We specialize in high-overhead, high-volume hospitality where 1% makes or breaks the year.
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
                        { step: "01", title: "Diagnostic Audit", desc: "We review your Prime Cost history, tip credit eligibility, and unit economics to identify margin leaks." },
                        { step: "02", title: "CFO Setup", desc: "We deploy your new dashboards, real-time COGS trackers, and hospitality KPI models." },
                        { step: "03", title: "Active Partnership", desc: "Regular strategy review meetings to optimize menu engineering and expansion capital." }
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
                    <h2 className="text-4xl lg:text-6xl font-bold text-brand-950 font-heading mb-6 tracking-tighter leading-none">Hospitality CFO <br /> vs. <span className="italic text-slate-300">Generic CPAs.</span></h2>
                    </div>
                    
                    <div className="border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-2xl max-w-5xl mx-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-brand-950 text-white">
                                    <th className="p-8 lg:p-12 text-lg font-heading tracking-tight">Strategy Area</th>
                                    <th className="p-8 lg:p-12 text-lg font-heading tracking-tight text-slate-400">Standard Accounting</th>
                                    <th className="p-8 lg:p-12 text-lg font-heading tracking-tight text-gold-500 font-black">Hospitality CFO</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {[
                                    { f: "Prime Cost Visibility", g: "Monthly P&L lag", u: "Weekly Real-Time View" },
                                    { f: "FICA Tip Credit", g: "Often missed/under-claimed", u: "Full Capture Strategy" },
                                    { f: "Food Cost Control", g: "Basic COGS reporting", u: "Waste & Yield Analysis" },
                                    { f: "Audit Defense", g: "Generalist support", u: "Hospitality Specialized Guard" },
                                    { f: "Expansion Strategy", g: "Tax-only view", u: "Capital & Unit-Economic Planning" }
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
                        <h2 className="text-4xl lg:text-5xl font-bold text-brand-950 font-heading mb-6 tracking-tighter">Hospitality FAQs</h2>
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
                            <h2 className="text-4xl lg:text-6xl font-bold text-brand-950 font-heading tracking-tighter leading-none mb-6">Sector <br /> <span className="italic text-gold-600">Specialization.</span></h2>
                            <p className="text-xl text-slate-500 font-light">Hospitality leadership backed by advanced tax optimization.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            { title: "Tax Planning", slug: "tax-planning", desc: "Strategy to maximize FICA credits and protect restaurant operator wealth." },
                            { title: "Fractional CFO", slug: "fractional-cfo", desc: "The core financial leadership that drives Hospitality group success." }
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
                            Manage <br />Your <span className="italic text-gold-400 underline decoration-white/10 decoration-wavy underline-offset-[20px]">Margins.</span>
                        </h2>
                        <p className="text-xl md:text-2xl text-slate-300 mb-16 leading-relaxed font-light mx-auto max-w-2xl">
                            Stop bleeding pennies in the invisible margins. Join the high-volume groups using the Restaurant CFO Partnership.
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
                            Hospitality Specialized • Advisory-Led • Multi-Unit Ready
                        </p>
                    </RevealOnScroll>
                </div>
            </section>
        </div>
    );
}
