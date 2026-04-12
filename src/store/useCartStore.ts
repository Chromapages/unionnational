import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
    id: string;
    slug: string;
    title: string;
    price: number;
    image: string;
    format: string;
    quantity: number;
}

interface CartStore {
    items: CartItem[];
    isOpen: boolean;
    totalItems: number;
    totalPrice: number;
    addItem: (item: Omit<CartItem, "quantity">) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    setIsOpen: (isOpen: boolean) => void;
    toggleCart: () => void;
}

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
                    totalItems: newItems.reduce((acc, i) => acc + i.quantity, 0),
                    totalPrice: newItems.reduce((acc, i) => acc + i.price * i.quantity, 0)
                });
            },

            removeItem: (id) => {
                const newItems = get().items.filter((i) => i.id !== id);
                set({ 
                    items: newItems,
                    totalItems: newItems.reduce((acc, i) => acc + i.quantity, 0),
                    totalPrice: newItems.reduce((acc, i) => acc + i.price * i.quantity, 0)
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
                    totalItems: newItems.reduce((acc, i) => acc + i.quantity, 0),
                    totalPrice: newItems.reduce((acc, i) => acc + i.price * i.quantity, 0)
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
