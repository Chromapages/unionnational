"use client";

import { useEffect } from "react";
import { trackMetaEvent } from "@/components/seo/MetaPixel";

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
        // Track Purchase event when success page loads
        trackMetaEvent("Purchase", {
            content_name: items?.map(i => i.name).join(", ") || "Order",
            content_ids: items?.map(i => i.id) || [orderId],
            content_type: "product",
            value: total,
            currency: currency,
            order_id: orderId,
            num_items: items?.reduce((acc, i) => acc + i.quantity, 0) || 1,
        });
    }, [orderId, total, currency, items]);

    return null;
}
