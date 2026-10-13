"use client";

import { useLocale } from "next-intl";
import type { PricingTier } from "@/types/sanity";
import { TaxPrepPricingTables } from "./TaxPrepPricingTables";

export function TaxPrepGrid({ tiers }: { tiers: PricingTier[] }) {
    const locale = useLocale();
    return <TaxPrepPricingTables tiers={tiers} locale={locale} />;
}
