"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { formatProductPrice } from "@/lib/shop/commerce";

export interface ProductEdition {
    id: string;
    name: string;
    description?: string;
    price: number;
    format: string;
}

interface ProductOfferSelectorProps {
    editions: ProductEdition[];
    selectedId: string;
    groupId: string;
    onSelect: (id: string) => void;
}

export function ProductOfferSelector({ editions, selectedId, groupId, onSelect }: ProductOfferSelectorProps) {
    const t = useTranslations("Shop.ProductPage");
    return <fieldset role="radiogroup" aria-labelledby={groupId + "-legend"} className="min-w-0">
        <legend id={groupId + "-legend"} className="mb-3 font-heading text-lg font-bold text-brand-900">{t("chooseFormat")}</legend>
        <div className="grid gap-2.5">
            {editions.map(edition => {
                const selected = selectedId === edition.id;
                return <label key={edition.id} className={cn(
                    "relative flex min-h-20 min-w-0 cursor-pointer items-center gap-3 rounded-xl border bg-white px-4 py-3 text-brand-900 sm:gap-5 sm:px-5 focus-within:outline focus-within:outline-2 focus-within:outline-offset-4 focus-within:outline-gold-700",
                    selected ? "border-gold-700 bg-gold-50" : "border-slate-600 hover:border-brand-500",
                )}>
                    <input type="radio" name={groupId} value={edition.id} checked={selected} onChange={() => onSelect(edition.id)} data-edition-price={edition.price}
                        className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0" />
                    <span aria-hidden="true" className={cn("flex size-6 shrink-0 items-center justify-center rounded-full border-2", selected ? "border-gold-700 bg-gold-500" : "border-slate-600 bg-white")}>
                        {selected && <span className="size-2.5 rounded-full bg-brand-950" />}
                    </span>
                    <span className="min-w-0 flex-1">
                        <span className="block font-heading text-base font-bold leading-snug">{edition.name}</span>
                        {edition.description && <span className="mt-1 block text-sm leading-relaxed text-slate-700">{edition.description}</span>}
                        {selected && <span className="sr-only">{t("selected")}</span>}
                    </span>
                    <span className="shrink-0 font-data text-lg font-bold tabular-nums sm:text-xl">{formatProductPrice(edition.price)}</span>
                </label>;
            })}
        </div>
    </fieldset>;
}
