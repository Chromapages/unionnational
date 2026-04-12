"use client";

import { motion } from "framer-motion";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { 
    AlertTriangle, 
    XCircle, 
    TrendingDown, 
    Clock, 
    EyeOff,
    ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function ProblemSection() {
    const problems = [
        {
            icon: EyeOff,
            title: "Flying Blind",
            description: "You're making major growth decisions without knowing your real-time profit per project or overhead burden."
        },
        {
            icon: Clock,
            title: "Tax season surprises",
            description: "You find out your tax bill in April, when it's already too late to apply the strategies that could have saved you thousands."
        },
        {
            icon: AlertTriangle,
            title: "Compliance drag",
            description: "Paperwork and bookkeeping are a black hole for your time, pulling you away from high-level business leadership."
        }
    ];

    return (
        <section className="py-24 lg:py-36 px-6 bg-slate-50 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-500/5 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <RevealOnScroll>
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-600 text-xs font-black uppercase tracking-widest">
                                <XCircle size={14} />
                                The Gap in Growth
                            </div>
                            <h2 className="text-4xl md:text-6xl font-bold text-brand-950 font-heading leading-[1.1] tracking-tighter">
                                Scaling should feel <br />
                                <span className="text-gold-600 italic">Clear,</span> not chaotic.
                            </h2>
                            <p className="text-xl text-slate-600 leading-relaxed font-light max-w-xl">
                                Most generalist CPAs are looking in the rearview mirror—reporting on what happened last year. <span className="text-brand-950 font-bold underline decoration-gold-500/30">Boutique Advisory</span> looks through the windshield, planning for the revenue you're going to build.
                            </p>
                            
                            <div className="pt-6">
                                <Link 
                                    href="/services/s-corp-tax-advantage"
                                    className="inline-flex items-center gap-2 text-brand-950 font-black uppercase tracking-widest text-sm hover:text-gold-600 transition-colors group"
                                >
                                    See the Strategy Difference 
                                    <ArrowRight size={18} className="text-gold-500 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </RevealOnScroll>

                    <div className="grid grid-cols-1 gap-6">
                        {problems.map((prob, idx) => (
                            <RevealOnScroll key={idx} delay={idx * 150}>
                                <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-gold-500/20 transition-all flex gap-8 group">
                                    <div className="w-16 h-16 shrink-0 rounded-2xl bg-brand-950 flex items-center justify-center text-gold-500 group-hover:scale-110 transition-transform shadow-lg shadow-black/10">
                                        <prob.icon size={28} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-brand-900 mb-2 font-heading">{prob.title}</h3>
                                        <p className="text-slate-500 leading-relaxed text-sm font-light">
                                            {prob.description}
                                        </p>
                                    </div>
                                </div>
                            </RevealOnScroll>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
