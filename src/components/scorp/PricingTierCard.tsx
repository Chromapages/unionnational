// src/components/SCorp/PricingTierCard.tsx
interface PricingTierCardProps {
    tier: string;
    includes: string;
    price: string;
    isHighlighted?: boolean;
}

export function PricingTierCard({ tier, includes, price, isHighlighted = false }: PricingTierCardProps) {
    return (
        <article className={`relative overflow-hidden rounded-[1.75rem] border p-8 transition-all duration-300 hover:-translate-y-1 ${isHighlighted ? "border-gold-500 bg-white text-brand-950 shadow-[0_28px_90px_rgba(212,175,55,0.18)] ring-2 ring-gold-500/20" : "border-white/10 bg-white/[0.04] text-white shadow-premium hover:border-gold-500/25 hover:bg-white/[0.07]"}`}>
            <div className={`absolute inset-x-0 top-0 h-1 ${isHighlighted ? "bg-gold-500" : "bg-gradient-to-r from-gold-500/60 to-transparent"}`} />
            {isHighlighted && (
                <div className="mb-5 inline-flex rounded-full bg-gold-500 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-brand-950">
                    Most Popular
                </div>
            )}
            <h3 className={`font-heading text-xl font-bold tracking-tight ${isHighlighted ? "text-brand-950" : "text-white"}`}>{tier}</h3>
            <p className={`mt-4 min-h-24 font-light leading-relaxed ${isHighlighted ? "text-slate-600" : "text-slate-300"}`}>{includes}</p>
            <div className={`mt-8 border-t pt-6 ${isHighlighted ? "border-slate-200" : "border-white/10"}`}>
                <p className={`text-[10px] font-black uppercase tracking-widest ${isHighlighted ? "text-gold-700" : "text-gold-400"}`}>Investment</p>
                <p className={`mt-2 font-heading text-2xl font-bold ${isHighlighted ? "text-brand-950" : "text-white"}`}>{price}</p>
            </div>
        </article>
    );
}
