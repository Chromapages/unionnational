"use client";

import { useEffect } from "react";

import { useCartStore } from "@/store/useCartStore";

export function ClearCartAfterPurchase({ sessionId }: { sessionId: string }) {
    const clearCart = useCartStore((state) => state.clearCart);

    useEffect(() => {
        clearCart();
    }, [clearCart, sessionId]);

    return null;
}
