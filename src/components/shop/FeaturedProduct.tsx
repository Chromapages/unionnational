"use client";

import { ArrowRight, Check, ShieldCheck, Zap, Award, ShoppingCart, Users, Trophy } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { useCartStore } from "@/store/useCartStore";
import { normalizeProductEdition } from "@/lib/shop/commerce";
import { buildCartItemKey } from "@/lib/shop/types";

interface FeaturedProductProps {
    product: {
        _id: string;
        title: string;
        slug: string;
        imageUrl: string;
        format: string;
        price: number;
        compareAtPrice?: number;
        shortDescription: string;
        features?: string[];
        buyLink?: string;
        stripeProductId?: string;
        stripePriceId?: string;
        editions?: Array<{
            _key?: string;
            id?: string;
            name: string;
            price: number;
            format: string;
            description?: string;
            stripePriceId?: string;
        }>;
    };
}

export function FeaturedProduct({ product }: FeaturedProductProps) {
    const { addItem, toggleCart } = useCartStore();
    
    if (!product) return null;

    const savings = product.compareAtPrice ? product.compareAtPrice - product.price : 0;
    const savingsPercentage = product.compareAtPrice ? Math.round((savings / product.compareAtPrice) * 100) : 0;
    const normalizedEditions = product.editions?.map((edition) => normalizeProductEdition(product._id, edition)) || [];
    const defaultEdition = normalizedEditions.length === 1 ? normalizedEditions[0] : null;
    const shouldChooseFormatOnDetail = normalizedEditions.length > 1;

    const handleAddToCart = () => {
        const edition = defaultEdition;
        addItem({
            id: buildCartItemKey(product._id, edition?.id),
            productId: product._id,
            editionId: edition?.id,
            editionName: edition?.name,
            slug: product.slug,
            title: edition ? `${product.title} - ${edition.name}` : product.title,
            image: product.imageUrl,
            format: edition?.format || product.format,
            fulfillmentType: edition?.fulfillmentType,
            requiresShipping: edition?.requiresShipping,
            price: edition?.price ?? product.price,
            buyLink: product.buyLink,
            stripeProductId: product.stripeProductId,
            stripePriceId: edition?.stripePriceId || product.stripePriceId,
        });
        toggleCart();
    };

    return (
        <section id="featured" className="relative w-full overflow-hidden bg-brand-900 py-24 lg:py-32">
            {/* Minimalist Grid Background */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-5">
                <div 
                    className="h-full w-full" 
                    style={{ 
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 40 0 L 0 0 0 40' fill='none' stroke='white' stroke-width='0.5' opacity='0.5'/%3E%3C/svg%3E")`,
                        backgroundSize: '40px 40px'
                    }} 
                />
            </div>
            
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* 2-Column Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    
                    {/* LEFT COLUMN: Product Pedestal */}
                    <div className="lg:col-span-5 relative order-2 lg:order-1 flex flex-col items-center justify-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="relative w-full max-w-md"
                        >
                            {/* Inner Pedestal Card */}
                            <div className="relative z-10 bg-brand-500 rounded-lg p-8 lg:p-12 border border-brand-500/50 shadow-2xl flex justify-center items-center">
                                <img
                                    src={product.imageUrl}
                                    alt={product.title}
                                    loading="lazy"
                                    className="w-[280px] sm:w-[340px] h-auto object-contain bg-white rounded-md shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
                                />
                            </div>

                            {/* Solid Stats Badge (Replaces floating glass badge) */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="absolute -bottom-6 left-1/2 -translate-x-1/2 lg:-left-6 lg:translate-x-0 z-30 bg-white border border-slate-200 px-6 py-4 rounded-md shadow-soft sm:flex hidden items-center gap-4"
                            >
                                <div className="bg-brand-50 p-2 rounded shrink-0">
                                    <Users className="w-5 h-5 text-brand-900" />
                                </div>
                                <div className="flex flex-col">
                                    <div className="text-brand-900 font-bold text-lg leading-none font-sans tracking-tight">2,400+</div>
                                    <div className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">Professionals</div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* RIGHT COLUMN: The Vault Card */}
                    <div className="lg:col-span-7 order-1 lg:order-2">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            className="bg-white border border-slate-200 rounded-lg shadow-soft p-8 lg:p-12 relative overflow-hidden"
                        >
                            {/* Vault Card Header */}
                            <div className="mb-8">
                                <div className="inline-flex items-center gap-2 mb-4">
                                    <span className="text-xs font-bold text-gold-600 uppercase tracking-widest flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-gold-500" />
                                        Featured Release
                                    </span>
                                </div>
                                <h2 className="text-3xl lg:text-5xl font-bold text-brand-900 font-heading tracking-tighter leading-tight mb-4">
                                    {product.title}
                                </h2>
                                <p className="text-slate-600 text-lg leading-relaxed font-sans max-w-2xl">
                                    {product.shortDescription}
                                </p>
                            </div>

                            {/* Features Grid */}
                            {product.features && (
                                <div className="mb-10">
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                                        {product.features.map((feature: string, idx: number) => (
                                            <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 font-sans">
                                                <Check className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" strokeWidth={2.5} />
                                                <span className="font-medium">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Pricing & CTA Block */}
                            <div className="bg-slate-50 rounded-md p-6 lg:p-8 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                                <div className="flex flex-col">
                                    <div className="flex items-end gap-3 mb-1">
                                        <span className="text-4xl font-bold text-brand-900 font-sans tracking-tight tabular-nums leading-none">
                                            ${product.price}
                                        </span>
                                        {product.compareAtPrice && (
                                            <span className="text-lg text-slate-400 line-through font-sans tracking-tight tabular-nums leading-none pb-1">
                                                ${product.compareAtPrice}
                                            </span>
                                        )}
                                    </div>
                                    {savings > 0 ? (
                                        <div className="text-emerald-600 text-xs font-bold uppercase tracking-wider mt-2">
                                            Save ${savings.toFixed(0)} ({savingsPercentage}% Off)
                                        </div>
                                    ) : (
                                        <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mt-2">
                                            {product.format === "Digital" ? "Instant Access" : "Standard Pricing"}
                                        </div>
                                    )}
                                </div>

                                {shouldChooseFormatOnDetail ? (
                                    <Link
                                        href={`/shop/${product.slug}`}
                                        className="w-full sm:w-auto bg-gold-500 text-brand-900 px-8 py-4 rounded-md text-sm font-bold uppercase tracking-widest hover:bg-gold-600 active:scale-95 transition-all shadow-sm flex items-center justify-center gap-3 shrink-0"
                                    >
                                        <ShoppingCart className="w-4 h-4" />
                                        Choose Format
                                    </Link>
                                ) : (
                                    <button
                                        onClick={handleAddToCart}
                                        className="w-full sm:w-auto bg-gold-500 text-brand-900 px-8 py-4 rounded-md text-sm font-bold uppercase tracking-widest hover:bg-gold-600 active:scale-95 transition-all shadow-sm flex items-center justify-center gap-3 shrink-0"
                                    >
                                        <ShoppingCart className="w-4 h-4" />
                                        Add to Vault
                                    </button>
                                )}
                            </div>

                            {/* Trust Strip */}
                            <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-3 gap-4">
                                <div className="flex flex-col items-center text-center gap-2">
                                    <ShieldCheck className="w-5 h-5 text-slate-400" />
                                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Secure</span>
                                </div>
                                <div className="flex flex-col items-center text-center gap-2">
                                    <Zap className="w-5 h-5 text-slate-400" />
                                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Instant</span>
                                </div>
                                <div className="flex flex-col items-center text-center gap-2">
                                    <Award className="w-5 h-5 text-slate-400" />
                                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Verified</span>
                                </div>
                            </div>

                            <Link 
                                href={`/shop/${product.slug}`} 
                                className="mt-8 pt-6 border-t border-slate-100 w-full inline-flex items-center justify-center gap-2 text-brand-900 hover:text-gold-600 transition-colors text-xs font-bold uppercase tracking-widest group"
                            >
                                View full resource details 
                                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Social Proof Ribbon Bottom Overlay (Solid) */}
            <div className="absolute bottom-0 left-0 right-0 h-14 bg-brand-900 border-t border-brand-500/50 z-20 flex items-center overflow-hidden">
                <div 
                    className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center whitespace-nowrap overflow-x-auto gap-12 [ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                    <div className="flex items-center gap-2 text-slate-400">
                        <Trophy className="w-4 h-4 text-gold-600" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">#1 Ranked Strategy Book 2024</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                        <Users className="w-4 h-4 text-gold-600" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Join 2,400+ Satisfied Professionals</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                        <ShieldCheck className="w-4 h-4 text-gold-600" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">100% Tax Accuracy Guarantee</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
