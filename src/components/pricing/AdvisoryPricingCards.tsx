import Link from "next/link";
import { Check } from "lucide-react";
import type { PricingTier } from "@/types/sanity";
import { formatOfferPrice, getOfferHref } from "@/lib/pricing/offers";

export function AdvisoryPricingCards({ tiers, locale = "en" }: { tiers: PricingTier[]; locale?: string }) {
    if (!tiers?.length) return null;

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {tiers.map((tier) => (
                <article key={tier._id} className="flex min-w-0 flex-col rounded-2xl border border-brand-100 bg-white p-6 text-brand-900 md:p-8">
                    <h3 className="text-2xl font-bold font-heading leading-tight">{tier.name}</h3>
                    {tier.tagline && <p className="mt-2 text-sm leading-relaxed text-brand-700">{tier.tagline}</p>}
                    <p className="mt-6 text-2xl font-bold font-data tabular-nums sm:text-3xl">{formatOfferPrice(tier, locale)}</p>
                    {tier.bestFor && <p className="mt-4 text-sm leading-relaxed text-brand-700">{tier.bestFor}</p>}
                    {tier.includes && <p className="mt-4 leading-relaxed">{tier.includes}</p>}
                    {!!tier.features?.length && (
                        <ul className="mt-4 space-y-3">
                            {tier.features.map((feature, index) => (
                                <li key={index} className="flex items-start gap-3 text-sm leading-relaxed">
                                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" aria-hidden="true" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                    {tier.priceNote && <p className="mt-5 border-t border-brand-100 pt-4 text-sm leading-relaxed text-brand-700">{tier.priceNote}</p>}
                    <div className="mt-auto pt-6">
                        <Link href={getOfferHref(tier, locale)} className="inline-flex min-h-11 items-center justify-center rounded-xl border border-brand-900 px-5 py-3 text-sm font-semibold text-brand-900 transition-colors hover:bg-brand-900 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-700">
                            {tier.ctaText || (locale === "es" ? "Consultar" : "Inquire")}
                        </Link>
                    </div>
                </article>
            ))}
        </div>
    );
}
