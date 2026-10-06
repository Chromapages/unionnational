"use client";

import { useEffect } from "react";

import { useCartStore } from "@/store/useCartStore";

interface PurchasedItem {
    productId: string;
    editionId?: string;
    quantity: number;
}

const completedSessions = new Set<string>();

export function ClearCartAfterPurchase({ sessionId, purchasedItems }: { sessionId: string; purchasedItems: PurchasedItem[] }) {
    useEffect(() => {
        if (!/^order_[a-f0-9]{32}$/.test(sessionId) || purchasedItems.length === 0 || completedSessions.has(sessionId)) return;
        const storageKey = `union-national-cart-completed:${sessionId}`;
        try {
            if (localStorage.getItem(storageKey)) return;
            localStorage.setItem(storageKey, "1");
        } catch {
            // Keep replay protection in this page lifetime when browser storage is unavailable.
        }
        completedSessions.add(sessionId);

        const cart = useCartStore.getState();
        for (const purchase of purchasedItems) {
            const item = useCartStore.getState().items.find(line =>
                line.productId === purchase.productId && (line.editionId || "") === (purchase.editionId || ""),
            );
            if (item) cart.updateQuantity(item.id, item.quantity - purchase.quantity);
        }
    }, [purchasedItems, sessionId]);

    return null;
}
