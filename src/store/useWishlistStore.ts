"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistItem {
    id: string;
    slug: string;
    title: string;
    price: number;
    image: string;
    format: string;
}

interface WishlistStore {
    items: WishlistItem[];
    addItem: (item: WishlistItem) => void;
    removeItem: (id: string) => void;
    toggleItem: (item: WishlistItem) => void;
    isWishlisted: (id: string) => boolean;
}

export const useWishlistStore = create<WishlistStore>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (item) => {
                const exists = get().items.some((i) => i.id === item.id);
                if (exists) return;
                set((state) => ({ items: [...state.items, item] }));
            },

            removeItem: (id) => {
                set((state) => ({ items: state.items.filter((i) => i.id !== id) }));
            },

            toggleItem: (item) => {
                const exists = get().items.some((i) => i.id === item.id);
                if (exists) {
                    get().removeItem(item.id);
                } else {
                    get().addItem(item);
                }
            },

            isWishlisted: (id) => get().items.some((i) => i.id === id),
        }),
        {
            name: "unt-wishlist",
        }
    )
);
