"use client";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { FileCheck, Building2, BarChart3, LineChart, Notebook, Rocket, ArrowRight, Briefcase } from "lucide-react";
import Link from "next/link";

// Map Sanity icon names to Lucide components
const ICON_MAP: Record<string, React.ReactNode> = {
    Notebook: <Notebook className="w-5 h-5" />,
    BarChart3: <BarChart3 className="w-5 h-5" />,
    Building2: <Building2 className="w-5 h-5" />,
    LineChart: <LineChart className="w-5 h-5" />,
    FileCheck: <FileCheck className="w-5 h-5" />,
    Rocket: <Rocket className="w-5 h-5" />,
    Briefcase: <Briefcase className="w-5 h-5" />,
};

interface Service {
    _id?: string;
    title?: string;
    slug?: { current?: string };
    shortDescription?: string;
    icon?: string;
}

interface ServiceProps {
    services: Service[];
}

export function ServicesSection({ services = [] }: ServiceProps) {
    // If no services provided, return null or fallback
    if (!services || services.length === 0) return null;

    return (
        <section
            id="services"
            className="relative py-20 sm:py-24 lg:py-32 bg-slate-50 overflow-hidden"
        >
            {/* Background Texture/Noise */}
            <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-100/40 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <RevealOnScroll>
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16 sm:mb-20">
                        <div className="max-w-2xl">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="h-px w-8 bg-gold-500"></span>
                                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600 font-heading">
                                    Our Expertise
                                </span>
                            </div>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-brand-900 font-heading leading-[1.1]">
                                Comprehensive <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-gold-700">
                                    Financial Solutions.
                                </span>
                            </h2>
                        </div>
                        <p className="text-slate-600 leading-relaxed font-sans max-w-md text-base md:text-lg">
                            Design a financial operating system that works for your business. From basic compliance to strategic growth tools.
                        </p>
                    </div>
                </RevealOnScroll>

                {/* Mobile: Horizontal Scroll | Desktop: Grid */}
                <div className="flex overflow-x-auto snap-x snap-mandatory pb-8 -mx-4 px-4 space-x-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 lg:gap-8 md:space-x-0 md:pb-0 md:mx-0 md:px-0 no-scrollbar items-stretch">
                    {services.map((service, index) => {
                        const Icon = ICON_MAP[service.icon || ""] || ICON_MAP["Briefcase"];

                        return (
                            <div key={service._id || index} className="shrink-0 snap-center w-[280px] sm:w-[340px] md:w-auto h-auto">
                                <RevealOnScroll delay={index * 100} className="h-full">
                                    <div className="group relative h-full bg-white border border-slate-200 rounded-2xl p-6 hover:-translate-y-1 hover:shadow-xl hover:shadow-gold-500/10 hover:border-gold-500/30 transition-all duration-300 flex flex-col justify-between">
                                        <div className="relative z-10 flex flex-col h-full">
                                            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-brand-50 border border-brand-100 text-gold-600 group-hover:scale-110 group-hover:bg-brand-900 group-hover:text-gold-500 transition-all duration-300 shrink-0">
                                                {Icon}
                                            </div>

                                            <h3 className="text-lg font-bold mb-3 text-brand-900 font-heading shrink-0 leading-tight">
                                                {service.title}
                                            </h3>

                                            <p className="text-sm text-slate-600 leading-relaxed mb-5 font-sans border-t border-slate-100 pt-4 group-hover:border-slate-200 flex-grow">
                                                {service.shortDescription}
                                            </p>

                                            <Link
                                                href={`/services/${service.slug?.current || '#'}`}
                                                className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-600 group-hover:gap-3 group-hover:text-gold-700 transition-all mt-auto shrink-0"
                                            >
                                                Learn More <ArrowRight className="w-3.5 h-3.5" />
                                            </Link>
                                        </div>
                                    </div>
                                </RevealOnScroll>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
