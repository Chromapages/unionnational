"use client";

import Image from "next/image";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { Linkedin } from "lucide-react";

interface TeamMember {
    _id: string;
    name: string;
    role: string;
    credentials?: string;
    description?: string;
    image?: {
        asset: {
            url: string;
        };
    };
    linkedinUrl?: string;
}

interface TeamSectionProps {
    title?: string;
    subtitle?: string;
    members: TeamMember[];
}

export function TeamSection({ 
    title = "Architects of Your Wealth.",
    subtitle = "Our specialized team combines deep tax expertise with digital-first agility to protect your growth.",
    members 
}: TeamSectionProps) {
    if (!members || members.length === 0) return null;

    return (
        <section className="py-32 bg-slate-50 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/pattern-grid.svg')] bg-repeat opacity-[0.03] pointer-events-none" />
            
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <RevealOnScroll className="text-center mb-24 max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-400/20 text-gold-600 text-[10px] font-bold uppercase tracking-widest mb-6">
                        The Leadership
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold font-heading text-brand-950 tracking-tighter leading-[1.1] mb-8">
                        {title}
                    </h2>
                    <p className="text-xl text-slate-500 font-light leading-relaxed">
                        {subtitle}
                    </p>
                </RevealOnScroll>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {members.map((member, i) => (
                        <RevealOnScroll key={member._id} delay={i * 100}>
                            <div className="group relative bg-white rounded-[2.5rem] border border-slate-100 p-4 shadow-sm hover:shadow-2xl hover:border-gold-500/30 transition-all duration-500 overflow-hidden h-full flex flex-col">
                                {/* Member Image Container */}
                                <div className="relative aspect-square rounded-[2rem] overflow-hidden mb-8 bg-brand-900 shadow-inner">
                                    {member.image?.asset?.url ? (
                                        <Image
                                            src={member.image.asset.url}
                                            alt={member.name}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center bg-brand-900">
                                            <span className="text-white/20 text-4xl font-bold font-heading">
                                                {member.name.charAt(0)}
                                            </span>
                                        </div>
                                    )}
                                    
                                    {/* Overlay on Hover */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-brand-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8">
                                        <div className="flex gap-4">
                                            {member.linkedinUrl && (
                                                <a 
                                                    href={member.linkedinUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-12 h-12 rounded-full bg-white text-brand-950 flex items-center justify-center hover:bg-gold-500 hover:text-brand-950 transition-colors shadow-lg"
                                                    aria-label={`LinkedIn profile for ${member.name}`}
                                                >
                                                    <Linkedin size={20} />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="px-4 pb-4 flex-grow flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-gold-600 text-[10px] font-black uppercase tracking-[0.2em]">
                                            {member.credentials || "Strategic Advisor"}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-brand-950 font-heading tracking-tight mb-2">
                                        {member.name}
                                    </h3>
                                    <p className="text-slate-500 text-sm font-medium mb-6">
                                        {member.role}
                                    </p>
                                    
                                    {member.description && (
                                        <p className="text-slate-400 text-sm leading-relaxed font-light mb-6 flex-grow italic">
                                            &quot;{member.description}&quot;
                                        </p>
                                    )}

                                    <div className="pt-6 border-t border-slate-50 mt-auto">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                                                Active Status
                                            </span>
                                            <div className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Consulting</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                    ))}
                </div>

                {/* Optional Footer Text */}
                <RevealOnScroll delay={400} className="mt-20 text-center">
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.3em]">
                        Certified • Specialized • Compliant
                    </p>
                </RevealOnScroll>
            </div>
        </section>
    );
}
