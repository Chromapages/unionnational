import { Quote } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

interface MissionStatementProps {
    mission: string;
    vision?: string;
}

export function MissionStatement({ mission, vision }: MissionStatementProps) {
    return (
        <section className="max-w-5xl mx-auto px-6 mb-32 text-center">
            <RevealOnScroll
                className="relative"
            >
                {/* Decorative Elements */}
                <Quote className="w-16 h-16 text-gold-500/10 absolute -top-8 -left-8 md:-left-16" />
                <Quote className="w-16 h-16 text-gold-500/10 absolute -bottom-8 -right-8 md:-right-16" />

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-900 leading-[1.1] mb-8 font-heading tracking-tighter relative z-10">
                    {mission}
                </h2>

                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mb-8" />

                {vision && (
                    <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        {vision}
                    </p>
                )}
            </RevealOnScroll>
        </section>
    );
}

