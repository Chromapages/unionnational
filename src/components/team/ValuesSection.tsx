import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { Scale, ShieldCheck, Handshake } from "lucide-react";

export function ValuesSection() {
    const values = [
        {
            icon: Scale,
            title: "Precision",
            description: "We don't deal in estimates or guesswork. Every strategy is calculated to the penny and backed by tax code."
        },
        {
            icon: ShieldCheck,
            title: "Integrity",
            description: "We operate with total transparency. Our strategies are aggressive but always compliant, designed to withstand scrutiny."
        },
        {
            icon: Handshake,
            title: "Partnership",
            description: "We aren't just your accountants; we are your financial co-pilots, proactive year-round rather than reactive at tax time."
        }
    ];

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
                    const Icon = value.icon;
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
