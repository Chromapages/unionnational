import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import {
    Scale,
    ShieldCheck,
    Handshake,
    Target,
    Users,
    Lightbulb,
    LineChart,
    Award,
    Briefcase,
} from "lucide-react";

const ICON_MAP = {
    Scale,
    ShieldCheck,
    Handshake,
    Target,
    Users,
    Lightbulb,
    LineChart,
    Award,
    Briefcase,
};

interface ValueItem {
    title?: string;
    description?: string;
    iconName?: keyof typeof ICON_MAP | string;
}

interface ValuesSectionProps {
    values?: ValueItem[];
}

export function ValuesSection({ values = [] }: ValuesSectionProps) {
    if (!values || values.length === 0) return null;

    return (
        <section className="max-w-7xl mx-auto px-6 mb-32">
             <RevealOnScroll className="text-center mb-16">
                <h2 className="text-sm font-bold text-gold-600 uppercase tracking-widest mb-3 font-heading">Our Ethos</h2>
                <h3 className="text-3xl md:text-4xl font-bold text-brand-900 tracking-tight font-heading">
                    Built on three pillars.
                </h3>
            </RevealOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {values.map((value, i) => {
                    const Icon = ICON_MAP[value.iconName as keyof typeof ICON_MAP] || Scale;
                    return (
                        <RevealOnScroll key={i} delay={i * 100} className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-gold-500/30 hover:shadow-lg hover:shadow-brand-900/5 transition-all duration-300">
                             <div className="w-14 h-14 rounded-xl bg-brand-50 flex items-center justify-center text-brand-900 mb-6">
                                <Icon className="w-7 h-7" />
                            </div>
                            <h4 className="text-xl font-bold text-brand-900 mb-3 font-heading">{value.title}</h4>
                            <p className="text-slate-600 leading-relaxed font-sans text-sm">
                                {value.description}
                            </p>
                        </RevealOnScroll>
                    );
                })}
            </div>
        </section>
    );
}
