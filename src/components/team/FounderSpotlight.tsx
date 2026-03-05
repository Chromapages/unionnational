import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { Linkedin, Quote, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

interface FounderSpotlightProps {
    founder: any;
    title: string;
}

export function FounderSpotlight({ founder, title }: FounderSpotlightProps) {
    if (!founder) return null;

    return (
        <section id="founder" className="max-w-7xl mx-auto px-6 mb-32 -mt-10 relative z-20">
            <RevealOnScroll>
                <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 md:p-12 lg:p-16 shadow-2xl shadow-brand-900/5 flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">

                    {/* Image Column */}
                    <div className="w-full lg:w-5/12 relative">
                        <div className="aspect-[4/5] rounded-2xl overflow-hidden relative shadow-lg">
                            {founder.image && (
                                <img
                                    src={urlFor(founder.image).width(800).url()}
                                    alt={founder.name}
                                    className="w-full h-full object-cover"
                                />
                            )}

                            {/* Overlay Badge */}
                            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-4 rounded-xl border border-slate-200/50 shadow-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-brand-900 rounded-full flex items-center justify-center text-gold-500">
                                        <ShieldCheck className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-brand-900 uppercase tracking-wide">IRS Enrolled Agent</div>
                                        <div className="text-[10px] text-slate-500">Highest Credential Awarded</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Decorative background element */}
                        <div className="absolute -top-6 -right-6 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl -z-10"></div>
                        <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-brand-900/5 rounded-full blur-2xl -z-10"></div>
                    </div>

                    {/* Content Column */}
                    <div className="flex-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-600 text-[10px] font-bold uppercase tracking-widest mb-6">
                            {title}
                        </div>

                        <h2 className="text-4xl lg:text-5xl font-bold text-brand-900 mb-2 font-heading">
                            {founder.name}
                        </h2>
                        <div className="text-gold-600 font-medium text-lg mb-8 font-sans flex items-center gap-2">
                            {founder.role}
                            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                            <span className="text-slate-500">{founder.credentials}</span>
                        </div>

                        {/* Enrolled Agent Difference */}
                        <div className="mb-10 rounded-2xl border border-gold-500/25 bg-gold-500/5 p-6 shadow-sm">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-brand-900 flex items-center justify-center text-gold-500 shadow-lg shadow-brand-900/10">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-lg font-bold text-brand-900 font-heading">The Enrolled Agent Difference</h3>
                                    <p className="text-sm text-slate-600 leading-relaxed mt-1">
                                        An EA is federally licensed by the U.S. Treasury with unlimited practice rights before the IRS in all 50 states.
                                    </p>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        <span className="px-3 py-1.5 rounded-full bg-white text-brand-900 text-xs font-bold uppercase tracking-wide border border-slate-200">IRS Representation</span>
                                        <span className="px-3 py-1.5 rounded-full bg-white text-brand-900 text-xs font-bold uppercase tracking-wide border border-slate-200">Audit-Ready Strategy</span>
                                        <span className="px-3 py-1.5 rounded-full bg-white text-brand-900 text-xs font-bold uppercase tracking-wide border border-slate-200">Code-Backed Planning</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative mb-8">
                            <Quote className="absolute -top-4 -left-6 w-8 h-8 text-gold-500/20 transform -scale-x-100" />
                            <p className="text-lg text-slate-600 leading-relaxed italic relative z-10 font-serif">
                                &quot;We don&apos;t just file taxes; we build financial fortresses. My mission is to give every business owner the same advanced strategies used by the ultra-wealthy, simplified and executed with precision.&quot;
                            </p>
                        </div>

                        {founder.description && (
                            <div className="prose prose-slate text-slate-600 mb-8 font-sans">
                                <p>{founder.description}</p>
                            </div>
                        )}

                        <div className="flex flex-wrap gap-3 mb-8">
                            {founder.tags?.map((tag: string, i: number) => (
                                <span key={i} className="px-3 py-1.5 bg-slate-50 text-brand-900 text-xs font-bold uppercase tracking-wide rounded-lg border border-slate-100">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {founder.linkedinUrl && (
                            <Link
                                href={founder.linkedinUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-brand-900 font-bold border-b-2 border-gold-500 hover:text-gold-600 hover:border-gold-600 transition-colors pb-1"
                            >
                                <Linkedin className="w-4 h-4" />
                                Connect on LinkedIn
                            </Link>
                        )}
                    </div>
                </div>
            </RevealOnScroll>
        </section>
    );
}
