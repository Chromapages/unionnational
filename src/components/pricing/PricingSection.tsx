import Link from "next/link";
import type { PricingTier } from "@/types/sanity";
import { AdvisoryPricingCards } from "./AdvisoryPricingCards";
import { TaxPrepPricingTables } from "./TaxPrepPricingTables";
import { PricingCarousel } from "./PricingCarousel";

export type { PricingTier } from "@/types/sanity";

export function PricingSection({ tiers, locale = "en" }: { tiers: PricingTier[]; locale?: string }) {
    return (
        <section className="mx-auto max-w-7xl px-6 py-12 md:py-16">
            {tiers?.length ? (
                <PricingCarousel
                    locale={locale}
                    advisoryView={<AdvisoryPricingCards tiers={tiers} locale={locale} />}
                    taxPrepView={<TaxPrepPricingTables tiers={tiers} locale={locale} />}
                    hideTaxPrep={!tiers.some(tier => tier.category === "individual" || tier.category === "business")}
                />
            ) : (
                <p className="text-lg leading-relaxed">
                    <Link href={`/${locale}/contact`} className="underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">
                        {locale === "es" ? "Contáctanos para conocer los precios." : "Contact us for pricing."}
                    </Link>
                </p>
            )}
        </section>
    );
}
