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
        <section className="py-24 bg-[var(--color-background)] text-[var(--color-text)] relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--color-primary)]/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[var(--color-cta)]/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <RevealOnScroll className="order-2 lg:order-1">
                        <h2 className="text-[var(--color-primary)] font-semibold uppercase tracking-[0.3em] text-xs mb-4">{title}</h2>

                        <div className="space-y-6 text-white/75 leading-relaxed font-sans text-lg">
                            {children}
                        </div>

                        <div className="mt-10 pt-10 border-t border-white/10">
                            <div className="font-handwriting text-3xl text-[var(--color-secondary)] font-heading italic">{signature}</div>
                        </div>
                    </RevealOnScroll>

                    <RevealOnScroll delay={0.2} className="order-1 lg:order-2 relative">
                        <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-[var(--shadow-xl)] transition-all duration-500 group hover:border-[var(--color-primary)]/20">
                            <div className="absolute inset-0 bg-[#0F172A]/40 mix-blend-multiply z-10 group-hover:bg-[#0F172A]/20 transition-colors" />
                            <img
                                src={imageUrl}
                                alt="Our Story"
                                className="w-full aspect-square object-cover transition-all duration-700 group-hover:scale-105"
                            />
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-[var(--color-primary)] rounded-full blur-2xl opacity-20" />
                    </RevealOnScroll>
                </div>
            </div>
        </section>
    );
}

