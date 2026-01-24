import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ShieldCheck, Calendar, Users } from "lucide-react";
import { TeamTrustBar } from "./TeamTrustBar";

interface TeamHeroProps {
    badge: string;
    title: string;
    subtitle: string;
}

export function TeamHero({ badge, title, subtitle }: TeamHeroProps) {
    return (
        <section className="relative bg-brand-900 pt-32 pb-20 px-6 overflow-hidden">
             {/* Background Effects */}
             <div className="absolute top-0 left-1/2 w-[1000px] h-[800px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold-500/10 via-transparent to-transparent rounded-full blur-3xl -z-10 opacity-50 pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
             
             <div className="max-w-4xl mx-auto text-center relative z-10">
                <RevealOnScroll>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gold-400 text-[10px] font-semibold uppercase tracking-widest mb-8 shadow-sm font-sans backdrop-blur-sm">
                        {badge}
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white tracking-tight mb-8 leading-[1.1] font-heading">
                        {title.split("strategy").length > 1 ? (
                            <>
                                {title.split("strategy")[0]}
                                <span className="text-gold-500">strategy</span>
                                {title.split("strategy")[1]}
                            </>
                        ) : (
                            title
                        )}
                    </h1>

                    {/* Trust Bar (Credentials) */}
                    <div className="mb-10">
                        <TeamTrustBar />
                    </div>

                    <p className="text-xl text-brand-100/80 leading-relaxed max-w-2xl mx-auto font-sans mb-12">
                        {subtitle}
                    </p>

                    {/* Trust Metrics */}
                    <div className="flex flex-wrap justify-center gap-4 sm:gap-12 border-t border-white/10 pt-12">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gold-500">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                                <div className="text-2xl font-bold text-white font-heading">100%</div>
                                <div className="text-[10px] uppercase tracking-wider text-brand-200 font-sans">Audit Compliant</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gold-500">
                                <Calendar className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                                <div className="text-2xl font-bold text-white font-heading">15+</div>
                                <div className="text-[10px] uppercase tracking-wider text-brand-200 font-sans">Years Experience</div>
                            </div>
                        </div>
                         <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gold-500">
                                <Users className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                                <div className="text-2xl font-bold text-white font-heading">500+</div>
                                <div className="text-[10px] uppercase tracking-wider text-brand-200 font-sans">Active Clients</div>
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
}
