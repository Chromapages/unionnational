"use client";

import { useEffect } from "react";
import { trackMetaEvent } from "@/components/seo/MetaPixel";

const trackedOrders = new Set<string>();

interface ShopPurchaseEventProps {
    orderId: string;
    total: number;
    currency?: string;
    items?: Array<{
        name: string;
        id: string;
        price: number;
        quantity: number;
    }>;
}

export function ShopPurchaseEvent({ orderId, total, currency = "USD", items }: ShopPurchaseEventProps) {
    useEffect(() => {
        const key = `shop-purchase:${orderId}`;
        if (trackedOrders.has(key)) return;
        try {
            if (window.localStorage.getItem(key)) return;
            window.localStorage.setItem(key, "1");
        } catch {
            // Storage can be unavailable; the in-memory guard still handles remounts.
        }
        trackedOrders.add(key);
        try {
            trackMetaEvent("Purchase", {
                content_name: items?.map(i => i.name).join(", ") || "Order",
                content_ids: items?.map(i => i.id) || [orderId],
                content_type: "product",
                value: total,
                currency,
                order_id: orderId,
                num_items: items?.reduce((acc, i) => acc + i.quantity, 0) || 1,
            });
        } catch {
            trackedOrders.delete(key);
            try { window.localStorage.removeItem(key); } catch { /* storage unavailable */ }
        }
    }, [orderId, total, currency, items]);

    return null;
}
