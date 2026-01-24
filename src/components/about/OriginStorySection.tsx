"use client";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

interface OriginStorySectionProps {
    title: string;
    signature: string;
    imageUrl: string;
    children: React.ReactNode;
}

export function OriginStorySection({ title, signature, imageUrl, children }: OriginStorySectionProps) {
    return (
        <section className="py-24 bg-brand-900 text-white relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-500/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <RevealOnScroll className="order-2 lg:order-1">
                        <h2 className="text-gold-500 font-bold uppercase tracking-widest text-sm mb-4">{title}</h2>

                        <div className="space-y-6 text-brand-100/80 leading-relaxed font-sans text-lg">
                            {children}
                        </div>

                        <div className="mt-10 pt-10 border-t border-white/10">
                            <div className="font-handwriting text-3xl text-gold-400 font-heading">{signature}</div>
                            {/* <div className="text-xs text-white/40 uppercase tracking-widest mt-2 font-bold">Founder & CEO</div> */}
                        </div>
                    </RevealOnScroll>

                    <RevealOnScroll delay={0.2} className="order-1 lg:order-2 relative">
                        <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl transition-shadow duration-500 group hover:shadow-[0_30px_80px_rgba(0,0,0,0.35)] hover:border-gold-500/20">
                            <div className="absolute inset-0 bg-brand-900/40 mix-blend-multiply z-10 group-hover:bg-brand-900/20 transition-colors" />
                            <img
                                src={imageUrl}
                                alt="Our Story"
                                className="w-full aspect-square object-cover transition-opacity duration-700 group-hover:opacity-95"
                            />
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gold-500 rounded-full blur-2xl opacity-20" />
                    </RevealOnScroll>
                </div>
            </div>
        </section>
    );
}
