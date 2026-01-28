"use client";

import { useScroll, useTransform, motion, useSpring } from "framer-motion";
import { useRef } from "react";
import { ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
    {
        kicker: "Step 01",
        title: "The freelancer windfall",
        body: "Sarah cleared $180k in her first year of consulting and assumed a standard accountant would cover the details.",
        highlight: "Revenue surged, planning lagged.",
    },
    {
        kicker: "Step 02",
        title: "The tax bill shock",
        body: "Her return showed a $30k self-employment tax bill. Not income tax, just the cost of operating solo.",
        highlight: "The bill was bigger than her runway.",
    },
    {
        kicker: "Step 03",
        title: "The strategy unlock",
        body: "We restructured her entity, dialed in payroll, and mapped quarterly projections so she could reinvest confidently.",
        highlight: "Her tax bill shrank while cash flow grew.",
    },
];

export function ScrollyTellingSection() {
    return (
        <section className="relative bg-brand-950 py-32 overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-500/5 rounded-full blur-[120px] mix-blend-screen" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[100px] mix-blend-screen" />
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
            </div>

            <div className="relative mx-auto max-w-4xl px-6">
                <header className="mb-24 text-center">
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold-500 mb-6">Origin Story</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-white font-heading tracking-tight leading-tight">
                        The breakthrough that <br className="hidden md:block" /> changed our firm.
                    </h2>
                </header>

                <div className="relative border-l border-white/10 ml-4 md:ml-0 pl-8 md:pl-0 space-y-24 md:space-y-32">
                    {steps.map((step, index) => (
                        <StoryStep key={index} step={step} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function StoryStep({ step, index }: { step: typeof steps[0]; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center center"],
    });

    const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
    const x = useTransform(scrollYProgress, [0, 1], [-20, 0]);

    return (
        <motion.div
            ref={ref}
            style={{ opacity, x }}
            className="group relative md:pl-12"
        >
            {/* Mobile Timeline Indicator */}
            <div className="absolute -left-[33px] md:-left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-brand-900 border border-white/20 group-hover:border-gold-500 group-hover:bg-gold-500 transition-colors duration-500 md:block hidden" />

            <div className="max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold-500 mb-4">{step.kicker}</p>
                <h3 className="text-3xl md:text-4xl font-bold text-white font-heading mb-6">{step.title}</h3>
                <p className="text-lg md:text-xl text-brand-100/80 leading-relaxed font-sans">{step.body}</p>

                <div className="mt-8 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-emerald-400/90">
                    <ArrowDownRight className="h-4 w-4" />
                    {step.highlight}
                </div>
            </div>
        </motion.div>
    );
}
