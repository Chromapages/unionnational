"use client";

import React from "react";

import { ArrowRight } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

interface Author {
    name: string;
    role: string;
    credentials: string[];
    imageUrl: string;
    bioShort?: string;
}

interface BlueprintAuthorBioProps {
    author?: Author;
}

export const BlueprintAuthorBio: React.FC<BlueprintAuthorBioProps> = ({ author }) => {
    const stats = [
        { value: "$25M+", label: "Client Tax Savings" },
        { value: "1,000+", label: "Business Owners Served" },
        { value: "10+", label: "Years in Practice" }
    ];

    const tags = [
        { label: "EA", primary: true },
        { label: "MBA", primary: false },
        { label: "FSCP", primary: false },
        { label: "LUTCF", primary: false }
    ];

    const details = [
        "IRS Enrolled Agent",
        "Est. 2012 - Orem, UT",
        "Licensed in all 50 states"
    ];

    
    return (
        <section
            id="about-author"
            className="scroll-mt-24 py-20 lg:py-28 bg-[#0B1210] text-white px-4 sm:px-6 lg:px-8 border-t border-brand-900/40 relative overflow-hidden"
            aria-label="About the Author"
        >
            <div className="absolute inset-0 z-0 bg-[url('/images/pattern-grid.svg')] bg-repeat opacity-[0.02]" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

                    {/* Left Column: Eyebrow, Portrait, Tags, Details */}
                    <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
                        <RevealOnScroll className="w-full">
                            <span className="text-rose-500 font-bold uppercase tracking-widest text-xs mb-6 block font-sans">
                                About the Author
                            </span>
                        </RevealOnScroll>

                        <RevealOnScroll className="w-full" delay={100}>
                            {/* Portrait Photo with Coral/Red Border */}
                            <div className="relative max-w-[320px] w-full aspect-[4/5] overflow-hidden border-[3px] border-rose-500/80 shadow-2xl bg-slate-900 rounded-none mb-6 mx-auto lg:mx-0">
                                <img
                                    src={author?.imageUrl || "/images/jason_astwood.png"}
                                    alt="Jason Astwood"
                                    className="w-full h-full object-cover"
                                    suppressHydrationWarning
                                />
                            </div>
                        </RevealOnScroll>

                        <RevealOnScroll className="w-full" delay={150}>
                            {/* Credentials Chips */}
                            <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-6">
                                {tags.map((tag) => (
                                    <span
                                        key={tag.label}
                                        className={
                                            tag.primary
                                                ? "bg-rose-600 text-white font-bold text-[11px] px-3 py-1 uppercase tracking-wide rounded-none"
                                                : "bg-white/5 border border-white/10 text-slate-300 font-bold text-[11px] px-3 py-1 uppercase tracking-wide rounded-none"
                                        }
                                    >
                                        {tag.label}
                                    </span>
                                ))}
                            </div>
                        </RevealOnScroll>

                        <RevealOnScroll className="w-full" delay={200}>
                            {/* Meta Information */}
                            <ul className="space-y-2 text-slate-500 font-semibold text-xs tracking-wider uppercase">
                                {details.map((detail, idx) => (
                                    <li key={idx}>
                                        {detail}
                                    </li>
                                ))}
                            </ul>
                        </RevealOnScroll>
                    </div>

                    {/* Right Column: Title, Subtitle, Bio Paragraphs, Statistics, Link */}
                    <div className="lg:col-span-7 flex flex-col">
                        <RevealOnScroll>
                            <h2 className="text-white font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05] mb-2 uppercase font-heading">
                                Jason Astwood, EA
                            </h2>

                            <span className="text-gold-500 text-xs sm:text-sm font-bold uppercase tracking-wider mb-8 block font-sans">
                                Enrolled Agent · MBA · Founder, Union National Tax
                            </span>
                        </RevealOnScroll>

                        <RevealOnScroll className="space-y-6 text-slate-300 text-base leading-relaxed font-sans max-w-2xl" delay={100}>
                            <p>
                                Jason Astwood is an IRS Enrolled Agent, MBA, and the founder of{" "}
                                <strong className="text-white font-bold">Union National Tax</strong> — a firm built from the ground up to serve contractors, construction companies, and trade businesses. Since 2012, his firm has helped{" "}
                                <strong className="text-white font-bold">1,000+ business owners</strong> save an average of{" "}
                                <strong className="text-white font-bold">$23,420 per year</strong> in taxes — totaling over $25 million in documented client savings.
                            </p>
                            <p>
                                As one of the few federally licensed tax specialists focused exclusively on the construction industry, Jason understands the unique financial challenges contractors face — from job costing and cash flow gaps to crew costs and equipment write-offs. He&apos;s not a generalist who files for flower shops and construction companies alike.{" "}
                                <strong className="text-white font-bold">This is all he does.</strong>
                            </p>
                            <p>
                                As the author of <em className="italic text-slate-200">The S-Corp Playbook</em> and now{" "}
                                <em className="italic text-slate-200">The Money-Making Blueprint for Construction Companies</em>, Jason distills a decade of frontline advisory work into an actionable framework any contractor can implement — whether they&apos;re doing $500K or $10M a year.
                            </p>
                        </RevealOnScroll>

                        <RevealOnScroll className="grid grid-cols-3 gap-4 sm:gap-6 pt-10 border-t border-white/5 mt-10 max-w-xl" delay={150}>
                            {stats.map((stat, idx) => (
                                <div key={idx} className="flex flex-col">
                                    <span className="text-gold-500 text-2xl sm:text-3xl font-black font-heading tracking-tight leading-none">
                                        {stat.value}
                                    </span>
                                    <span className="text-slate-500 font-semibold text-[9px] sm:text-[10px] tracking-wider uppercase leading-snug mt-2">
                                        {stat.label}
                                    </span>
                                </div>
                            ))}
                        </RevealOnScroll>

                                            </div>

                </div>
            </div>
        </section>
    );
};
