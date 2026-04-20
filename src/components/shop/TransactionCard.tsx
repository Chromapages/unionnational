"use client";

import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Lock, ShieldCheck, ShoppingCart, Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import { trackMetaEvent } from "@/components/seo/MetaPixel";
import { useCartStore } from "@/store/useCartStore";
import { useState } from "react";
import { buildCartItemKey } from "@/lib/shop/types";

interface TransactionCardProps {
    id?: string;
    slug: string;
    title: string;
    image: string;
    format: string;
    price: number;
    compareAtPrice?: number;
    buyLink?: string;
    features?: string[];
}

export function TransactionCard({ 
    id, 
    slug, 
    title, 
    image, 
    format, 
    price, 
    compareAtPrice, 
    buyLink, 
    features = [] 
}: TransactionCardProps) {
    const t = useTranslations("Shop.TransactionCard");
    const { addItem, toggleCart } = useCartStore();
    const [isAdded, setIsAdded] = useState(false);
    const primaryFeatures = features.slice(0, 4);

    const formatPrice = (p: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
        }).format(p);
    };

    return (
        <motion.aside
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="sticky top-24 h-fit rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-2xl shadow-slate-200/50 backdrop-blur-xl transition-all hover:shadow-gold-500/5"
        >
            <div className="flex items-end justify-between gap-3">
                <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{t("strategicAsset")}</div>
                    <div className="mt-2 text-4xl font-bold text-brand-900 font-heading tracking-tight">{formatPrice(price)}</div>
                </div>
                {compareAtPrice && (
                    <div className="text-right">
                        <div className="text-sm font-medium text-slate-400 line-through decoration-slate-300 decoration-2">{formatPrice(compareAtPrice)}</div>
                        <div className="mt-1 inline-flex items-center rounded-full bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-emerald-700">
                             {t("save")} {formatPrice(compareAtPrice - price)}
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-8 grid gap-3">
                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white/50 px-4 py-3 text-[11px] font-bold uppercase tracking-widest text-slate-500 transition-colors hover:border-gold-200 hover:text-brand-900">
                    <Lock className="h-4 w-4 text-gold-500" /> {t("secureCheckout")}
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white/50 px-4 py-3 text-[11px] font-bold uppercase tracking-widest text-slate-500 transition-colors hover:border-gold-200 hover:text-brand-900">
                    <BadgeCheck className="h-4 w-4 text-gold-500" /> {t("lifetimeAccess")}
                </div>
            </div>

            {primaryFeatures.length > 0 && (
                <div className="mt-8">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">Included Materials</div>
                    <ul className="space-y-3">
                        {primaryFeatures.filter(Boolean).map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-50 text-gold-600">
                                    <ShieldCheck className="h-3 w-3" />
                                </span>
                                <span className="leading-relaxed">{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="mt-8 pt-6 border-t border-slate-100 space-y-3">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                        addItem({
                            id: buildCartItemKey(id || slug),
                            productId: id || slug,
                            slug,
                            title,
                            image,
                            format,
                            price,
                            buyLink,
                        });
                        setIsAdded(true);
                        trackMetaEvent("AddToCart", { 
                            content_id: slug, 
                            content_type: "product",
                            value: price,
                            currency: "USD"
                        });
                        // Automatically open cart after short delay
                        setTimeout(() => toggleCart(), 500);
                    }}
                    className="group relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 px-6 py-4 text-sm font-bold uppercase tracking-widest text-brand-900 shadow-xl shadow-gold-500/20 transition-all hover:shadow-gold-500/40"
                >
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                    <span className="relative flex items-center gap-2">
                        {isAdded ? "Added to Cart" : t("securePurchase")} <ShoppingCart className="w-3.5 h-3.5 mb-0.5" />
                    </span>
                </motion.button>

                {isAdded && (
                    <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={() => toggleCart()}
                        className="w-full py-3 px-6 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                    >
                        View Cart <ArrowRight className="w-3 h-3" />
                    </motion.button>
                )}
                
                <p className="mt-4 text-center text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                    {t("instantDelivery")}
                </p>
            </div>
        </motion.aside>
    );
}
