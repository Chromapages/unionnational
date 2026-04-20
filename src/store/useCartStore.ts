import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartLineItem } from "@/lib/shop/types";

interface CartStore {
    items: CartLineItem[];
    isOpen: boolean;
    totalItems: number;
    totalPrice: number;
    addItem: (item: Omit<CartLineItem, "quantity">) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    setIsOpen: (isOpen: boolean) => void;
    toggleCart: () => void;
}

const calculateCartTotals = (items: CartLineItem[]) => ({
    totalItems: items.reduce((acc, item) => acc + item.quantity, 0),
    totalPrice: items.reduce((acc, item) => acc + item.price * item.quantity, 0),
});

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,
            totalItems: 0,
            totalPrice: 0,

            addItem: (item) => {
                const currentItems = get().items;
                const existingItem = currentItems.find((i) => i.id === item.id);
                let newItems;

                if (existingItem) {
                    newItems = currentItems.map((i) =>
                        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                    );
                } else {
                    newItems = [...currentItems, { ...item, quantity: 1 }];
                }

                set({
                    items: newItems,
                    ...calculateCartTotals(newItems),
                });
            },

            removeItem: (id) => {
                const newItems = get().items.filter((i) => i.id !== id);
                set({
                    items: newItems,
                    ...calculateCartTotals(newItems),
                });
            },

            updateQuantity: (id, quantity) => {
                if (quantity <= 0) {
                    get().removeItem(id);
                    return;
                }
                const newItems = get().items.map((i) =>
                    i.id === id ? { ...i, quantity } : i
                );
                set({
                    items: newItems,
                    ...calculateCartTotals(newItems),
                });
            },

            clearCart: () => set({ items: [], totalItems: 0, totalPrice: 0 }),

            setIsOpen: (isOpen) => set({ isOpen }),

            toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
        }),
        {
            name: "union-national-cart",
        }
    )
);
