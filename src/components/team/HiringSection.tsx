import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";

interface HiringSectionProps {
    settings: any;
}

export function HiringSection({ settings }: HiringSectionProps) {
    return (
        <section className="max-w-7xl mx-auto px-6 mb-24">
            <RevealOnScroll className="relative rounded-[2.5rem] overflow-hidden border border-white/20 shadow-2xl">
                {/* Background Image with Blur */}
                <div className="absolute inset-0">
                    <img 
                         src={settings.hiringImage ? urlFor(settings.hiringImage).width(1200).url() : "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200"}
                         alt="Background"
                         className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-brand-900/90 backdrop-blur-md"></div>
                </div>

                <div className="relative z-10 p-8 sm:p-16 lg:p-20 flex flex-col items-center text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-gold-400 text-[10px] font-bold uppercase tracking-widest mb-8 backdrop-blur-sm">
                        {settings.hiringBadge}
                    </div>
                    
                    <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6 font-heading max-w-2xl leading-tight">
                        {settings.hiringTitle}
                    </h2>
                    
                    <p className="text-brand-100/80 text-lg leading-relaxed mb-10 max-w-2xl font-sans">
                        {settings.hiringDescription}
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                         {settings.hiringBenefits.map((benefit: string, i: number) => (
                            <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white text-sm font-sans backdrop-blur-sm">
                                <CheckCircle2 className="w-4 h-4 text-gold-500" />
                                {benefit}
                            </div>
                        ))}
                    </div>

                    <a 
                        href={settings.hiringCtaUrl} 
                        className="group bg-gold-500 text-brand-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-gold-400 hover:scale-105 transition-all duration-300 shadow-lg shadow-gold-500/20 flex items-center gap-2"
                    >
                        {settings.hiringCtaText}
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </RevealOnScroll>
        </section>
    );
}
