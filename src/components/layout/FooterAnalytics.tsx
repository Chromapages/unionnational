"use client";

import { useEffect } from "react";
import { trackFooterInteraction, type FooterInteractionEvent } from "@/lib/analytics/footerInteractions";

export function FooterAnalytics() {
    useEffect(() => {
        const footer = document.getElementById("site-footer");
        if (!footer) return;

        const handleClick = (event: MouseEvent) => {
            const target = event.target as Element | null;
            const link = target?.closest<HTMLAnchorElement>("a[data-footer-event][data-footer-destination-id]");
            if (!link || !footer.contains(link)) return;

            trackFooterInteraction(
                link.dataset.footerEvent as FooterInteractionEvent,
                link.dataset.footerDestinationId!,
                link.dataset.footerCategoryId,
            );
        };

        footer.addEventListener("click", handleClick);
        return () => footer.removeEventListener("click", handleClick);
    }, []);

    return null;
}
