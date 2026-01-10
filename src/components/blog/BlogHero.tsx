import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

interface BlogHeroProps {
    title: string;
    subtitle: string;
}

export function BlogHero({ title, subtitle }: BlogHeroProps) {
    return (
        <section className="relative pt-32 pb-20 overflow-hidden bg-surface">
            {/* Background elements (similar to other pages) */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-200/50 to-transparent" />
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                <RevealOnScroll>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-brand-100 text-brand-600 text-[10px] font-bold uppercase tracking-widest mb-6 shadow-sm font-sans mx-auto">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-500"></span>
                        Insights & Updates
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-brand-900 font-heading mb-6">
                        {title}
                    </h1>
                    <p className="text-lg text-brand-900 leading-relaxed max-w-2xl mx-auto font-sans">
                        {subtitle}
                    </p>
                </RevealOnScroll>
            </div>

            <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white to-transparent" />
        </section>
    );
}
