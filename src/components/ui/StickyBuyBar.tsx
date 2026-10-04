"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { ShoppingBag } from "lucide-react";
import { formatProductPrice } from "@/lib/shop/commerce";

interface StickyBuyBarProps {
    price: number;
    format: string;
    disabled?: boolean;
    onAddToCart: () => void;
}

export function StickyBuyBar({ price, format, disabled = false, onAddToCart }: StickyBuyBarProps) {
    const t = useTranslations("Shop.ProductHero");
    const [mainActionVisible, setMainActionVisible] = useState(false);
    const [footerVisible, setFooterVisible] = useState(false);

    useEffect(() => {
        const action = document.getElementById("product-add-to-cart");
        const footer = document.getElementById("site-footer");
        if (!action) return;
        const headerHeight = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-height")) || 80;
        const actionObserver = new IntersectionObserver(([entry]) => setMainActionVisible(entry.isIntersecting), { threshold: 0.5, rootMargin: "-" + headerHeight + "px 0px 0px 0px" });
        actionObserver.observe(action);
        const footerObserver = new IntersectionObserver(([entry]) => setFooterVisible(entry.isIntersecting));
        if (footer) footerObserver.observe(footer);
        const footerWatch = new MutationObserver(() => {
            const loadedFooter = document.getElementById("site-footer");
            if (loadedFooter) { footerObserver.observe(loadedFooter); footerWatch.disconnect(); }
        });
        if (!footer) footerWatch.observe(document.body, { childList: true, subtree: true });
        return () => { actionObserver.disconnect(); footerObserver.disconnect(); footerWatch.disconnect(); };
    }, []);

    if (mainActionVisible || footerVisible) return null;
    return <aside id="product-sticky-bar" aria-label={t("addToCart")} className="fixed inset-x-0 bottom-0 z-[95] border-t border-brand-700 bg-brand-900 px-4 pt-3 pb-[max(.75rem,env(safe-area-inset-bottom))] text-white shadow-lg">
        <div className="mx-auto flex w-full max-w-[94rem] items-center justify-between gap-4 sm:px-2 lg:px-4">
            <div className="min-w-0">
                <p className="text-sm font-semibold leading-snug text-white">{format}</p>
                <p data-sticky-price={price} className="mt-1 font-data text-xl font-bold tabular-nums">{formatProductPrice(price)}</p>
            </div>
            <button id="sticky-add-to-cart" type="button" disabled={disabled} onClick={onAddToCart} className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl border border-gold-800 bg-gold-500 px-5 py-3 font-heading text-base font-bold text-brand-950 hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-300">
                <ShoppingBag className="size-5" aria-hidden="true" />{t("addToCart")}
            </button>
        </div>
    </aside>;
}
