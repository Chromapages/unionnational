"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    CheckCircle2,
    TrendingDown,
    ShieldCheck,
    ArrowRight,
    Target as TargetIcon,
    Layers,
    BarChart3,
    Search,
    FileCheck,
    Handshake,
    ChevronDown,
    ChevronUp,
    ExternalLink,
    X,
    Check
} from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SCorpAdvantageClientProps {
    locale: string;
}

// ─── FAQ Accordion ───────────────────────────────────────────────────────────
const faqs = [
    {
        q: "How do I know if an S-Corp is right for me?",
        a: "The right answer depends on your business profit, the role you play in the company, how you pay yourself, and how the business is currently structured. That is why review comes first — before any assumptions or recommendations."
    },
    {
        q: "Is an S-Corp always the best tax strategy?",
        a: "No. It can be powerful in the right scenario, but it is not the right fit for every business. The decision should be based on actual business conditions, not internet hype or generic advice."
    },
    {
        q: "Do I need to already have an LLC?",
        a: "Not always. Your current setup will affect the next steps, but the right path depends on how your business is presently structured and what changes are needed."
    },
    {
        q: "Does this only help with filing Form 2553?",
        a: "No. Filing is only one part of the picture. The real value comes from assessing whether the strategy fits, implementing it correctly, and supporting the business afterward."
    },
    {
        q: "What happens after I book a call?",
        a: "You will speak with Union National Tax about your business, current structure, goals, and whether an S-Corp review makes sense as the next step."
    },
    {
        q: "Can this connect to bookkeeping or CFO support later?",
        a: "Yes. For many businesses, S-Corp strategy is the starting point that leads into stronger planning, cleaner reporting, and more ongoing financial support."
    }
];

const FAQItem = ({ q, a }: { q: string; a: string }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="border-b border-slate-100 last:border-b-0">
            <button
                onClick={() => setOpen(o => !o)}
                className="w-full flex justify-between items-center gap-4 py-6 text-left group"
                aria-expanded={open}
            >
                <span className="font-bold text-brand-900 font-heading text-lg leading-snug group-hover:text-gold-600 transition-colors">
                    {q}
                </span>
                <span className="shrink-0 w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:border-gold-500 group-hover:text-gold-500 transition-all">
                    {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </span>
            </button>
            {open && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="pb-6 text-slate-600 leading-relaxed font-body text-base"
                >
                    {a}
                </motion.div>
            )}
        </div>
    );
};

export default function SCorpAdvantageClient({ locale }: SCorpAdvantageClientProps) {
    return (
        <div className="bg-white">

            {/* ─── 1. HERO ─────────────────────────────────────────────────────── */}
            <section className="relative px-6 py-28 lg:py-48 bg-brand-900 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(212,175,55,0.08)_0%,_transparent_60%)]" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-500/5 rounded-full blur-[120px]" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-[10px] font-bold uppercase tracking-widest mb-10"
                        >
                            <span className="w-2 h-2 bg-gold-400 rounded-full animate-pulse" />
                            S-Corp Tax Strategy for Self-Employed Business Owners
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-6xl lg:text-9xl font-bold font-heading text-white leading-[0.85] tracking-tighter mb-10"
                        >
                            Stop Overpaying <br />
                            Yourself <span className="text-gold-500 italic">Into Higher Taxes.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl sm:text-2xl text-brand-50/75 mb-14 leading-relaxed max-w-3xl font-body"
                        >
                            The S-Corp Tax Advantage Program helps qualified business owners evaluate whether an S-Corp election could lower tax burden, improve compensation structure, and support smarter long-term growth.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-6"
                        >
                            <Link
                                href="/intake"
                                className="px-12 py-6 bg-gold-500 text-brand-900 font-bold rounded-2xl hover:bg-gold-400 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl shadow-gold-500/30 text-2xl flex items-center justify-center gap-4 group"
                            >
                                See If You Qualify
                                <ArrowRight size={28} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/book"
                                className="px-12 py-6 bg-transparent border-2 border-white/20 text-white font-bold rounded-2xl hover:bg-white/5 transition-all text-2xl flex items-center justify-center"
                            >
                                Strategy Call
                            </Link>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-10 text-[10px] font-bold uppercase tracking-widest text-brand-50/40"
                        >
                            Built for business owners who want more than generic filing — and want a clearer structure behind the numbers.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* ─── TRUST STRIP ──────────────────────────────────────────────────── */}
            <div className="bg-slate-50 border-y border-slate-100 py-12 px-6">
                <div className="max-w-7xl mx-auto flex flex-wrap justify-center lg:justify-between gap-12 text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                    {[
                        "IRS Enrolled Agent Prepared",
                        "Strategy-First Tax Guidance",
                        "Audit Protection Available",
                        "Built for Growth-Minded Owners",
                    ].map((item) => (
                        <div key={item} className="flex items-center gap-3">
                            <ShieldCheck size={18} className="text-gold-500/50" />
                            {item}
                        </div>
                    ))}
                </div>
            </div>

            {/* ─── 2. PROBLEM / AGITATION ───────────────────────────────────────── */}
            <section className="py-32 px-6 bg-white border-y border-slate-100">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <RevealOnScroll>
                            <div className="space-y-10">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-gold-600 block mb-4">The Structure Problem</span>
                                <h2 className="text-4xl lg:text-7xl font-bold text-brand-900 font-heading leading-[0.9] tracking-tighter">
                                    Why your current setup is <br /><span className="italic text-gold-600">costing you money.</span>
                                </h2>
                                <div className="space-y-6 text-2xl text-slate-600 leading-relaxed font-body font-light">
                                    <p>
                                        A lot of self-employed professionals and growing small business owners start as sole proprietors or single-member LLCs — and stay there far too long.
                                    </p>
                                    <p>
                                        As profit grows, the wrong structure can quietly create avoidable tax drag. You may be working hard, generating solid income, and still losing more to self-employment tax than necessary.
                                    </p>
                                    <p className="font-bold text-brand-900">
                                        The right S-Corp setup can create meaningful tax efficiency for the right business.
                                    </p>
                                </div>
                            </div>
                        </RevealOnScroll>

                        <RevealOnScroll delay={200}>
                            <div className="relative group p-1 bg-gradient-to-tr from-gold-500/20 to-transparent rounded-[2.5rem]">
                                <div className="relative bg-brand-900 p-10 lg:p-20 rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden flex flex-col justify-center">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-gold-400/5 rounded-full blur-3xl pointer-events-none" />
                                    <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">Illustrative Scenario</div>
                                    <h3 className="text-4xl font-bold text-white font-heading tracking-tight mb-12">How structure affects <br />your tax bill</h3>
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center p-6 rounded-2xl bg-white/5 border border-white/10">
                                            <span className="text-slate-300 font-medium">Business Profit</span>
                                            <span className="font-bold text-white font-heading text-2xl">$120,000</span>
                                        </div>
                                        <div className="flex justify-between items-center p-6 rounded-2xl bg-red-500/10 border border-red-500/20">
                                            <div>
                                                <div className="text-red-400 font-bold text-base">Sole Prop / LLC (15.3% SE Tax)</div>
                                                <div className="text-red-500/60 text-xs mt-1">Applied to full profit</div>
                                            </div>
                                            <span className="font-bold text-red-400 font-heading text-2xl">$18,360</span>
                                        </div>
                                        <div className="flex justify-between items-center p-6 rounded-2xl bg-green-500/10 border border-green-500/20">
                                            <div>
                                                <div className="text-green-400 font-bold text-base italic">S-Corp Structure (Optimized)</div>
                                                <div className="text-green-500/60 text-xs mt-1">SE tax applied to salary only</div>
                                            </div>
                                            <span className="font-bold text-green-400 font-heading text-2xl">$7,650</span>
                                        </div>
                                        <div className="pt-10 border-t border-white/10 text-center">
                                            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Potential Reduction</div>
                                            <div className="text-7xl font-bold text-gold-500 font-heading tracking-tighter leading-none">$10,710+</div>
                                            <div className="text-[10px] text-slate-500 mt-6 leading-relaxed uppercase tracking-widest font-bold">
                                                *Illustrative only. Assumes Reasonable Salary. Actual results vary.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </div>
                </div>
            </section>

            {/* ─── 3. WHAT THE PROGRAM IS ───────────────────────────────────────── */}
            <section className="py-32 px-6 bg-slate-50 italic">
                <div className="max-w-7xl mx-auto">
                    <RevealOnScroll>
                        <div className="text-center max-w-3xl mx-auto mb-24">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-gold-600 font-heading block mb-6">Vertical Focus</span>
                            <h2 className="text-4xl md:text-6xl font-bold text-brand-900 font-heading tracking-tighter leading-[1.1] mb-8 not-italic">
                                Strategic <span className="italic text-gold-500 underline decoration-gold-500/30">Advantage.</span>
                            </h2>
                            <p className="text-xl text-slate-500 font-light not-italic leading-relaxed font-body">
                                This is not a one-size-fits-all filing service. It is a structured advisory process designed to determine whether an S-Corp election makes sense for your business — and then help you implement and support it correctly.
                            </p>
                        </div>
                    </RevealOnScroll>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {[
                            {
                                icon: Search,
                                title: "Strategic Evaluation",
                                category: "Audit",
                                body: "We review your business structure, income profile, and owner compensation picture to assess whether an S-Corp election is likely to create real value."
                            },
                            {
                                icon: FileCheck,
                                title: "Entity & Election Guidance",
                                category: "Implementation",
                                body: "If the strategy is a fit, we help guide the transition and filing process, including the S-Corp election path and related setup considerations."
                            },
                            {
                                icon: Layers,
                                title: "Ongoing Tax Alignment",
                                category: "Strategy",
                                body: "An S-Corp is not just a form. It affects compensation, planning, and compliance. We help make sure the structure supports the bigger strategy."
                            },
                            {
                                icon: BarChart3,
                                title: "Financial Decision-Making",
                                category: "Leadership",
                                body: "The goal is not only tax savings. It is a cleaner, smarter financial setup that gives the owner more control over how the business runs and grows."
                            }
                        ].map((item, idx) => (
                            <RevealOnScroll key={idx} delay={idx * 150}>
                                <div className="h-full bg-white p-12 rounded-3xl border border-slate-200 hover:border-gold-500 transition-all group shadow-sm flex flex-col md:flex-row gap-8 items-start not-italic">
                                    <div className="w-16 h-16 bg-brand-900 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                        <item.icon size={28} className="text-gold-500" />
                                    </div>
                                    <div>
                                        <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-gold-600 mb-4 bg-gold-500/5 px-3 py-1 rounded-full">{item.category}</span>
                                        <h3 className="text-2xl font-bold text-brand-900 mb-4 font-heading tracking-tighter">{item.title}</h3>
                                        <p className="text-slate-500 leading-relaxed text-lg font-light font-body">{item.body}</p>
                                    </div>
                                </div>
                            </RevealOnScroll>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── 4. WHO IT'S FOR / NOT FOR ───────────────────────────────────── */}
            <section className="py-32 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-slate-50 rounded-[3rem] overflow-hidden border border-slate-100 p-1 lg:p-4 shadow-sm">
                        <div className="p-10 lg:p-20 space-y-12">
                            <h3 className="text-4xl font-bold text-brand-900 font-heading tracking-tighter underline decoration-gold-500/30 underline-offset-[12px]">Elite Strategy Fit</h3>
                            <ul className="space-y-6">
                                {[
                                    "Self-employed business owners with healthy profit",
                                    "Single-owner or owner-operated businesses",
                                    "Sole proprietors looking for better efficiency",
                                    "Owners who want proactive tax strategy",
                                    "Businesses seeking cleaner compensation structure"
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-4 text-slate-600 font-light leading-relaxed font-body text-xl">
                                        <CheckCircle2 size={24} className="text-gold-500 shrink-0 mt-1" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-brand-900 p-10 lg:p-20 text-white space-y-10 flex flex-col justify-center">
                            <h3 className="text-4xl font-bold font-heading tracking-tight">Who It’s <span className="text-gold-500 italic">Not</span> For</h3>
                            <p className="text-slate-300 font-light leading-relaxed text-2xl font-body">
                                If you are looking for a shortcut without compliance discipline, or if the business isn't yet at the right profit level—we aren't the right fit.
                            </p>
                            <p className="text-slate-400 font-light leading-relaxed text-lg font-body">
                                We specialize in businesses ready to integrate structure as part of a bigger business strategy.
                            </p>
                            <div className="pt-6">
                                <Link 
                                    href="/services" 
                                    className="text-gold-500 hover:text-gold-400 font-bold flex items-center gap-2 group tracking-widest text-[10px] uppercase underline decoration-gold-500/30 underline-offset-8"
                                >
                                    View Basic Filing Services <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── 5. PROCESS SECTION ───────────────────────────────────────────── */}
            <section className="py-32 px-6 bg-slate-50 italic">
                <div className="max-w-7xl mx-auto text-center mb-24">
                    <h2 className="text-4xl lg:text-7xl font-bold text-brand-900 font-heading mb-6 tracking-tighter not-italic">Phase-Based Installation.</h2>
                    <p className="text-2xl text-slate-500 font-light not-italic font-body">Strategy deployed in four institutional phases.</p>
                </div>
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                    <div className="absolute top-1/2 left-0 w-full h-px bg-slate-200 hidden lg:block -translate-y-1/2" />
                    {[
                        { step: "01", title: "Evaluate", desc: "We review your profit picture and role to determine S-Corp potential." },
                        { step: "02", title: "Recommend", desc: "If the numbers support it, we build a customized transition roadmap." },
                        { step: "03", title: "Election", desc: "We guide the filing path and handle the critical election process." },
                        { step: "04", title: "Support", desc: "Ongoing leadership to ensure the strategy works long-term." }
                    ].map((step, i) => (
                        <div key={i} className="relative z-10 bg-white p-10 rounded-3xl border border-slate-200 shadow-sm text-center group hover:border-gold-500 transition-all flex flex-col items-center">
                            <div className="w-14 h-14 rounded-full bg-brand-900 text-gold-500 flex items-center justify-center font-black mb-8 text-xl group-hover:scale-110 transition-transform">{step.step}</div>
                            <h3 className="text-2xl font-bold text-brand-900 mb-4 font-heading tracking-tight not-italic">{step.title}</h3>
                            <p className="text-slate-500 text-sm not-italic leading-relaxed font-light font-body">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── 6. COMPARISON TABLE ─────────────────────────────────────────── */}
            <section className="py-32 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-24">
                        <h2 className="text-4xl lg:text-7xl font-bold text-brand-900 font-heading mb-10 tracking-tighter leading-[0.9]">
                            Strategic Guidance <br /> vs. <span className="italic text-slate-300">Generic Prep.</span>
                        </h2>
                    </div>
                    
                    <div className="border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-2xl max-w-5xl mx-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-brand-900 text-white">
                                    <th className="p-8 lg:p-12 text-lg font-heading tracking-tight uppercase tracking-widest text-[10px]">Area of Focus</th>
                                    <th className="p-8 lg:p-12 text-lg font-heading tracking-tight text-slate-400">Generic Tax Prep</th>
                                    <th className="p-8 lg:p-12 text-lg font-heading tracking-tight text-gold-500 font-black">S-Corp strategy</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {[
                                    { f: "Business Structure", g: "Reactive filing", u: "Structure-First Review" },
                                    { f: "Relationship", g: "Seasonal/Transactional", u: "Ongoing Strategy" },
                                    { f: "Optimization", g: "Minimal attention", u: "Core Decision Point" },
                                    { f: "Audit Defense", g: "General support", u: "Specialized Guard" },
                                    { f: "Decision Making", g: "Compliance only", u: "Advisory-Led" }
                                ].map((row, i) => (
                                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                                        <td className="p-8 lg:px-12 font-bold text-brand-900 italic font-body text-lg border-r border-slate-50">{row.f}</td>
                                        <td className="p-8 lg:px-12 text-slate-500 font-light font-body">{row.g}</td>
                                        <td className="p-8 lg:px-12 font-bold text-brand-900 bg-gold-500/5 font-body">{row.u}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* ─── 7. FAQ SECTION ──────────────────────────────────────────────── */}
            <section className="py-32 px-6 bg-slate-50 italic">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-24 max-w-2xl mx-auto">
                        <h2 className="text-4xl lg:text-7xl font-bold text-brand-900 font-heading mb-6 tracking-tighter not-italic">
                            Honest <span className="italic text-gold-500 underline decoration-gold-500/30">Answers.</span>
                        </h2>
                        <p className="text-xl text-slate-500 font-light not-italic font-body">The decision should be based on conditions, not hype.</p>
                    </div>
                    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm px-10 py-4 not-italic">
                        {faqs.map((faq, i) => (
                            <FAQItem key={i} q={faq.q} a={faq.a} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── 8. FINAL CTA ────────────────────────────────────────────────── */}
            <section className="py-36 px-6 relative bg-brand-900 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/pattern-grid.svg')] bg-repeat opacity-[0.03] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
                
                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <RevealOnScroll>
                        <h2 className="text-6xl md:text-9xl font-bold text-white font-heading mb-12 tracking-tighter leading-[0.85]">
                            Manage <br />Your <span className="italic text-gold-500 underline decoration-white/10 decoration-wavy underline-offset-[20px]">Outcome.</span>
                        </h2>
                        <p className="text-2xl md:text-3xl text-brand-50/70 mb-20 leading-relaxed font-light mx-auto max-w-3xl font-body">
                            If profit has increased but your structure has not changed, it is time to review whether an S-Corp strategy makes sense.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-8 justify-center">
                            <Link 
                                href="/intake"
                                className="px-16 py-8 bg-gold-500 text-brand-900 font-bold rounded-2xl hover:bg-gold-400 hover:scale-[1.05] active:scale-[0.98] transition-all shadow-2xl text-3xl group flex items-center justify-center gap-6"
                            >
                                Get S-Corp Review <ArrowRight size={38} className="group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </div>
                        <p className="mt-16 text-[10px] font-bold uppercase tracking-widest text-brand-50/40">
                            No Generic Pitch • Strategy Review • Institutional Grade
                        </p>
                    </RevealOnScroll>
                </div>
            </section>
        </div>
    );
}
