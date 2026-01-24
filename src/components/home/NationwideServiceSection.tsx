"use client";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { Map, Video, Shield, Laptop, CheckCircle2 } from "lucide-react";

export function NationwideServiceSection() {
    return (
        <section className="py-20 sm:py-24 bg-brand-900 relative overflow-hidden">
            {/* Background Map Pattern (SVG) */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 1000 600" xmlns="http://www.w3.org/2000/svg">
                    <path d="M940.6,263.6c-5.8-5.2-13.6-5.8-19.1-10.7c-4.9-4.3-6.1-11.6-9.2-17.1c-3.1-5.5-8.6-9.5-14.7-10.7c-6.1-1.2-12.5,1.5-17.5,5.2c-5,3.7-8.3,9.5-13.8,11.9c-5.5,2.4-12.2,0.9-17.5-2.1c-5.3-3.1-8.9-8.6-14.4-10.4c-5.5-1.8-11.9,0.3-17.2,3.4c-5.3,3.1-8.9,8.6-14.4,10.4c-5.5,1.8-11.9,0.3-17.2,3.4c-5.3,3.1-8.9,8.6-14.4,10.4c-5.5,1.8-11.9,0.3-17.2,3.4c-5.3,3.1-8.9,8.6-14.4,10.4c-5.5,1.8-11.9,0.3-17.2,3.4c-5.3,3.1-8.9,8.6-14.4,10.4c-5.5,1.8-11.9,0.3-17.2,3.4c-5.3,3.1-8.9,8.6-14.4,10.4c-5.5,1.8-11.9,0.3-17.2,3.4c-5.3,3.1-8.9,8.6-14.4,10.4" fill="currentColor" className="text-white" />
                    {/* Simplified US Map Outline Placeholder - In production use a real SVG map */}
                    <rect x="100" y="100" width="800" height="400" rx="20" fill="currentColor" className="text-white opacity-20" />
                </svg>
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-brand-900/90 via-brand-900/80 to-brand-900/95"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    
                    {/* Text Content */}
                    <RevealOnScroll>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-bold uppercase tracking-wider mb-6">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse"></span>
                            Virtual First Service
                        </div>
                        
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 font-heading tracking-tight leading-[1.1]">
                            Serving Clients <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
                                Nationwide Virtually.
                            </span>
                        </h2>
                        
                        <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-xl font-sans">
                            No location barriers. We provide expert tax strategy to business owners in all 50 states through our secure digital platform.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-gold-500">
                                    <Video className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-sm mb-1 font-heading">Video Consultations</h4>
                                    <p className="text-slate-400 text-sm">Face-to-face strategy calls from the comfort of your office.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-gold-500">
                                    <Laptop className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-sm mb-1 font-heading">Digital Portal</h4>
                                    <p className="text-slate-400 text-sm">Securely upload documents and sign returns instantly.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-gold-500">
                                    <Map className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-sm mb-1 font-heading">Multi-State Expertise</h4>
                                    <p className="text-slate-400 text-sm">Navigating complex nexus and filing requirements across state lines.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-gold-500">
                                    <Shield className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-sm mb-1 font-heading">Consistent Advisor</h4>
                                    <p className="text-slate-400 text-sm">Work with the same dedicated expert, regardless of where you move.</p>
                                </div>
                            </div>
                        </div>
                    </RevealOnScroll>

                    {/* Visual / Map Representation */}
                    <RevealOnScroll delay={200} className="relative h-full min-h-[400px] flex items-center justify-center">
                        <div className="relative w-full aspect-square max-w-md">
                            {/* Abstract Map Circles */}
                            <div className="absolute inset-0 border border-white/10 rounded-full animate-[spin_60s_linear_infinite]"></div>
                            <div className="absolute inset-8 border border-white/5 rounded-full animate-[spin_40s_linear_infinite_reverse]"></div>
                            <div className="absolute inset-16 border border-gold-500/10 rounded-full animate-[spin_30s_linear_infinite]"></div>
                            
                            {/* Central Hub */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-brand-800 rounded-full border border-gold-500/30 flex items-center justify-center shadow-[0_0_50px_rgba(212,175,55,0.1)] z-20">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-white font-heading">50</div>
                                    <div className="text-[10px] font-bold text-gold-500 uppercase tracking-widest">States</div>
                                </div>
                            </div>

                            {/* Connection Nodes (Simulating clients across map) */}
                            {[...Array(8)].map((_, i) => (
                                <div 
                                    key={i}
                                    className="absolute w-3 h-3 bg-gold-500 rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)] animate-pulse"
                                    style={{
                                        top: `${50 + 35 * Math.sin(i * (Math.PI / 4))}%`,
                                        left: `${50 + 35 * Math.cos(i * (Math.PI / 4))}%`,
                                        animationDelay: `${i * 0.5}s`
                                    }}
                                >
                                    <div className="absolute top-1/2 left-1/2 w-24 h-[1px] bg-gradient-to-r from-gold-500/50 to-transparent origin-left -translate-y-1/2 rotate-[180deg]" 
                                         style={{ transform: `rotate(${i * 45 + 180}deg) translateY(-50%)`, width: '100px', left: '50%', top: '50%', transformOrigin: '0 0' }}
                                    ></div>
                                </div>
                            ))}
                        </div>
                    </RevealOnScroll>
                </div>
            </div>
        </section>
    );
}
