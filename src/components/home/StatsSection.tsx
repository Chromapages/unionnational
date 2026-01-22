"use client";

import Image from "next/image";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { Briefcase, Clock, Users } from "lucide-react";

interface StatsSectionProps {
    stats?: Array<{
        value: string;
        label: string;
    }>;
}

export function StatsSection({ stats }: StatsSectionProps) {
    const defaultStats = [
        { value: "$2M+", label: "Tax savings generated for our clients annually" },
        { value: "500+", label: "Clients Served" },
        { value: "15+", label: "Years of Experience" },
    ];

    const displayStats = stats && stats.length > 0 ? stats : defaultStats;
    const [featuredStat, ...otherStats] = displayStats;
    return (
        <section
            id="about"
            className="mb-0 py-20 bg-slate-50/50 border-y border-slate-100"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Split Header */}
                <RevealOnScroll className="grid lg:grid-cols-2 gap-12 items-end mb-20">
                    <div>
                        <span className="text-xs font-semibold uppercase tracking-widest block mb-4 text-gold-600 font-sans">Our Mission</span>
                        <h2 className="text-3xl lg:text-5xl font-bold tracking-tight leading-tight text-brand-900 font-heading">
                            Local Experts. <br className="hidden lg:block" />
                            National Results.
                        </h2>
                    </div>
                    <div>
                        <p className="text-brand-900 text-lg leading-relaxed max-w-xl lg:ml-auto font-sans">
                            We are strategic partners for contractors and e-commerce owners, providing the personalized attention of a local firm with the capabilities of a national enterprise.
                        </p>
                    </div>
                </RevealOnScroll>

                {/* Stats Section Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    {/* Featured Stat Card with BG Image */}
                    <RevealOnScroll className="lg:col-span-7 relative rounded-md overflow-hidden group min-h-[18rem] lg:min-h-[22rem] flex flex-col justify-end p-6 sm:p-10 shadow-lg border border-slate-100">
                        {/* Background Image with Overlay */}
                        <Image
                            src="/images/stat-bg.png"
                            alt="Tax Savings Background"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105 -z-10"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-brand-900/40 to-transparent -z-[5]" />

                        <div className="relative z-10">
                            <div className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 tracking-tight text-white font-sans">{featuredStat.value}</div>
                            <p className="text-lg sm:text-xl lg:text-2xl font-medium max-w-sm leading-tight text-white font-sans">
                                {featuredStat.label}
                            </p>
                        </div>
                    </RevealOnScroll>

                    {/* Secondary Stats Grid */}
                    <div className="lg:col-span-5 grid grid-cols-1 gap-6">
                        {/* Stat 1 */}
                        <RevealOnScroll className="bg-white rounded-md p-6 sm:p-8 border border-slate-100 shadow-sm flex items-center gap-6 group hover:border-gold-500/20 transition-colors">
                            <div className="text-4xl lg:text-5xl font-bold tracking-tight text-gold-600 font-heading">3,528+</div>
                            <div className="text-xs font-bold text-brand-900/60 uppercase tracking-widest leading-tight font-sans">Successful <br /> Cases</div>
                        </RevealOnScroll>

                        {/* Stat 2 */}
                        <RevealOnScroll delay={100} className="bg-white rounded-md p-6 sm:p-8 border border-slate-100 shadow-sm flex items-center gap-6 group hover:border-gold-500/20 transition-colors">
                            <div className="text-4xl lg:text-5xl font-bold tracking-tight text-gold-600 font-heading">48+</div>
                            <div className="text-xs font-bold text-brand-900/60 uppercase tracking-widest leading-tight font-sans">Years Combined <br /> Experience</div>
                        </RevealOnScroll>

                        {/* Stat 3 */}
                        <RevealOnScroll delay={200} className="bg-white rounded-md p-6 sm:p-8 border border-slate-100 shadow-sm flex items-center gap-6 group hover:border-gold-500/20 transition-colors">
                            <div className="text-4xl lg:text-5xl font-bold tracking-tight text-gold-600 font-heading">6+</div>
                            <div className="text-xs font-bold text-brand-900/60 uppercase tracking-widest leading-tight font-sans">Certified <br /> Experts</div>
                        </RevealOnScroll>
                    </div>
                </div>
            </div>
        </section>
    );
}
