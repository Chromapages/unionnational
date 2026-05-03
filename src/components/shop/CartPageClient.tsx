"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, Lock } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Link, useRouter } from "@/i18n/navigation";

import { beginCheckout } from "@/lib/shop/checkout-client";
import { useCartStore } from "@/store/useCartStore";
import { trackMetaEvent } from "@/components/seo/MetaPixel";

interface CartPageClientProps {
    recoveryCta?: {
        title?: string;
        subtitle?: string;
        buttonText?: string;
        buttonUrl?: string;
    };
}

const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
    }).format(price);

export function CartPageClient({ recoveryCta }: CartPageClientProps) {
    const tCart = useTranslations("Shop.Cart");
    const router = useRouter();
    const searchParams = useSearchParams();
    const items = useCartStore((state) => state.items);
    const updateQuantity = useCartStore((state) => state.updateQuantity);
    const removeItem = useCartStore((state) => state.removeItem);
    const setIsOpen = useCartStore((state) => state.setIsOpen);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [checkoutMessage, setCheckoutMessage] = useState<string | null>(null);

    const subtotal = useMemo(
        () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
        [items]
    );

    const handleCheckout = async () => {
        setCheckoutMessage(null);
        setIsSubmitting(true);

        try {
            trackMetaEvent("InitiateCheckout", {
                value: subtotal,
                currency: "USD",
                num_items: items.length,
            });

            const result = await beginCheckout(items);
            if (result.ok && result.redirectUrl) {
                window.location.assign(result.redirectUrl);
                return;
            }

            setCheckoutMessage(result.message || "Unable to start checkout.");
        } catch {
            setCheckoutMessage("Unable to start checkout right now. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleContinueShopping = () => {
        setIsOpen(false);
        router.push("/shop");
    };

    return (
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-col gap-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-600">
                    Cart Review
                </p>
                <h1 className="text-3xl font-bold tracking-tight text-brand-900 sm:text-4xl">
                    Review your resources before checkout.
                </h1>
                <p className="max-w-2xl text-base leading-relaxed text-slate-600">
                    Confirm the resource, quantity, and format before continuing to secure checkout.
                </p>
                {searchParams.get("checkout") === "cancelled" && (
                    <div className="mt-4 max-w-2xl rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm font-medium text-amber-900">
                        Checkout was cancelled before payment. Your cart is still here when you are ready.
                    </div>
                )}
            </div>

            {items.length === 0 ? (
                <div className="rounded-3xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                        <ShoppingBag className="h-8 w-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-brand-900">
                        {tCart("empty")}
                    </h2>
                    <p className="mx-auto mt-3 max-w-xl text-slate-600">
                        Add a resource from the shop to start your purchase.
                    </p>

                    <div className="mt-8 flex flex-col items-center gap-4">
                        <button
                            onClick={handleContinueShopping}
                            className="inline-flex items-center gap-2 rounded-full bg-brand-900 px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-gold-400 transition-colors hover:bg-brand-800"
                        >
                            {tCart("continueShopping")}
                            <ArrowRight className="h-4 w-4" />
                        </button>

                        {recoveryCta?.buttonUrl && (
                            <div className="max-w-xl rounded-2xl border border-slate-200 bg-slate-50 px-6 py-5 text-left">
                                <p className="text-sm font-bold text-brand-900">
                                    {recoveryCta.title || "Need a different path?"}
                                </p>
                                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                                    {recoveryCta.subtitle || "Talk with our team if you need help choosing the right resource."}
                                </p>
                                <Link
                                    href={recoveryCta.buttonUrl}
                                    className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand-900 underline underline-offset-4"
                                >
                                    {recoveryCta.buttonText || "Contact Support"}
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
                    <div className="space-y-4">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="flex gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm"
                            >
                                <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-2xl bg-slate-50">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-contain p-2"
                                    />
                                </div>

                                <div className="flex min-w-0 flex-1 flex-col">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <Link
                                                href={`/shop/${item.slug}`}
                                                className="line-clamp-2 text-lg font-bold text-brand-900 hover:text-gold-600"
                                            >
                                                {item.title}
                                            </Link>
                                            <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                                                {item.format}
                                            </p>
                                        </div>

                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-50 hover:text-red-500"
                                            aria-label={`Remove ${item.title} from cart`}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>

                                    <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-4">
                                        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2 py-1">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="rounded-full p-1 text-slate-500 transition-colors hover:bg-white hover:text-brand-900"
                                                aria-label={`Decrease quantity for ${item.title}`}
                                            >
                                                <Minus className="h-3.5 w-3.5" />
                                            </button>
                                            <span className="w-8 text-center text-sm font-bold text-brand-900">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="rounded-full p-1 text-slate-500 transition-colors hover:bg-white hover:text-brand-900"
                                                aria-label={`Increase quantity for ${item.title}`}
                                            >
                                                <Plus className="h-3.5 w-3.5" />
                                            </button>
                                        </div>

                                        <div className="text-right">
                                            <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
                                                Line total
                                            </p>
                                            <p className="text-lg font-bold text-brand-900">
                                                {formatPrice(item.price * item.quantity)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
                        <h2 className="text-xl font-bold text-brand-900">Order summary</h2>
                        <div className="mt-6 space-y-3 text-sm">
                            <div className="flex items-center justify-between text-slate-600">
                                <span>{tCart("subtotal")}</span>
                                <span>{formatPrice(subtotal)}</span>
                            </div>
                            <div className="flex items-center justify-between text-slate-600">
                                <span>{tCart("shipping")}</span>
                                <span>{tCart("free")}</span>
                            </div>
                            <div className="border-t border-slate-200 pt-4">
                                <div className="flex items-center justify-between text-lg font-bold text-brand-900">
                                    <span>{tCart("total")}</span>
                                    <span>{formatPrice(subtotal)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                            <div className="flex items-center gap-3 mb-2">
                                <Lock className="w-4 h-4 text-emerald-600" />
                                <span className="text-xs font-bold uppercase tracking-widest text-brand-900">Secure Checkout</span>
                            </div>
                            <p className="text-xs leading-relaxed text-slate-500">
                                Your payment is encrypted and processed securely via Stripe. We do not store your credit card information.
                            </p>
                            <div className="mt-4 pt-4 border-t border-slate-200/60 flex items-center justify-between">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Powered by Stripe</span>
                                <div className="flex gap-2">
                                    <div className="w-8 h-5 bg-slate-200 rounded-sm" /> {/* Placeholder for card icons if needed */}
                                    <div className="w-8 h-5 bg-slate-200 rounded-sm" />
                                </div>
                            </div>
                        </div>

                        {checkoutMessage && (
                            <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                                {checkoutMessage}
                            </div>
                        )}

                        <button
                            onClick={handleCheckout}
                            disabled={isSubmitting}
                            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-900 px-6 py-3.5 text-sm font-bold uppercase tracking-[0.16em] text-gold-400 transition-colors hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isSubmitting ? "Starting checkout..." : tCart("checkout")}
                            <ArrowRight className="h-4 w-4" />
                        </button>

                        <button
                            onClick={handleContinueShopping}
                            className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-slate-200 px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-brand-900 transition-colors hover:bg-slate-50"
                        >
                            {tCart("continueShopping")}
                        </button>
                    </aside>
                </div>
            )}
        </section>
    );
}
