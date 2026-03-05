"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Lock, ShieldCheck } from "lucide-react";

interface TransactionCardProps {
    price: number;
    compareAtPrice?: number;
    buyLink?: string;
    features?: string[];
}

export function TransactionCard({ price, compareAtPrice, buyLink, features = [] }: TransactionCardProps) {
    const primaryFeatures = features.slice(0, 4);

    return (
        <motion.aside
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="sticky top-24 h-fit rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-2xl shadow-slate-200/50 backdrop-blur-xl transition-all hover:shadow-gold-500/5"
        >
            <div className="flex items-end justify-between gap-3">
                <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Strategic Asset</div>
                    <div className="mt-2 text-4xl font-bold text-brand-900 font-heading tracking-tight">${price}</div>
                </div>
                {compareAtPrice && (
                    <div className="text-right">
                        <div className="text-sm font-medium text-slate-400 line-through decoration-slate-300 decoration-2">${compareAtPrice}</div>
                        <div className="mt-1 inline-flex items-center rounded-full bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-emerald-700">
                            Save ${(compareAtPrice - price).toFixed(0)}
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-8 grid gap-3">
                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white/50 px-4 py-3 text-[11px] font-bold uppercase tracking-widest text-slate-500 transition-colors hover:border-gold-200 hover:text-brand-900">
                    <Lock className="h-4 w-4 text-gold-500" /> Secure Checkout
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white/50 px-4 py-3 text-[11px] font-bold uppercase tracking-widest text-slate-500 transition-colors hover:border-gold-200 hover:text-brand-900">
                    <BadgeCheck className="h-4 w-4 text-gold-500" /> Lifetime Access
                </div>
            </div>

            {primaryFeatures.length > 0 && (
                <div className="mt-8">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">Included Materials</div>
                    <ul className="space-y-3">
                        {primaryFeatures.map((feature) => (
                            <li key={feature} className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-50 text-gold-600">
                                    <ShieldCheck className="h-3 w-3" />
                                </span>
                                <span className="leading-relaxed">{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="mt-8 pt-6 border-t border-slate-100">
                {buyLink ? (
                    <motion.a
                        href={buyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 px-6 py-4 text-sm font-bold uppercase tracking-widest text-brand-900 shadow-xl shadow-gold-500/20 transition-all hover:shadow-gold-500/40"
                    >
                        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                        <span className="relative flex items-center gap-2">
                            Secure Purchase <Lock className="w-3.5 h-3.5 opacity-50" />
                        </span>
                    </motion.a>
                ) : (
                    <div className="w-full rounded-xl bg-slate-100 px-6 py-4 text-center text-sm font-bold uppercase tracking-widest text-slate-400 cursor-not-allowed">
                        Coming Soon
                    </div>
                )}
                <p className="mt-4 text-center text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                    Instant Digital Delivery
                </p>
            </div>
        </motion.aside>
    );
}
