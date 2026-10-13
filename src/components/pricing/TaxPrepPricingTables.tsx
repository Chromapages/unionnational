import type { PricingTier } from "@/types/sanity";
import { AdvisoryPricingCards } from "./AdvisoryPricingCards";

export function TaxPrepPricingTables({ tiers, locale = "en" }: { tiers: PricingTier[]; locale?: string }) {
    return <AdvisoryPricingCards tiers={tiers.filter(tier => tier.category === "individual" || tier.category === "business")} locale={locale} />;
}
