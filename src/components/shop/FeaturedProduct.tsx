"use client";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ArrowRight, Check, Star, ShieldCheck, Zap, Award, ShoppingCart, Users, Trophy } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { useCartStore } from "@/store/useCartStore";
import { buildCartItemKey } from "@/lib/shop/types";
import { cn } from "@/lib/utils";

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
    };
}

export function FeaturedProduct({ product }: FeaturedProductProps) {
    const { addItem, toggleCart } = useCartStore();
    
    if (!product) return null;

    const savings = product.compareAtPrice ? product.compareAtPrice - product.price : 0;
    const savingsPercentage = product.compareAtPrice ? Math.round((savings / product.compareAtPrice) * 100) : 0;

    const handleAddToCart = () => {
        addItem({
            id: buildCartItemKey(product._id),
            productId: product._id,
            slug: product.slug,
            title: product.title,
            image: product.imageUrl,
            format: product.format,
            price: product.price,
            buyLink: product.buyLink,
        });
        toggleCart();
    };

    return (
        <section id="featured" className="relative w-full overflow-hidden bg-brand-900 py-24 lg:py-32 transform-gpu">
            {/* Background Aesthetic Elements - Optimized SVG */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-10">
                <div 
                    className="h-full w-full" 
                    style={{ 
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 20 0 L 0 0 0 20' fill='none' stroke='white' stroke-width='0.5' opacity='0.2'/%3E%3C/svg%3E")`,
                        backgroundSize: '20px 20px'
                    }} 
                />
            </div>
            
            {/* Reduced Blurs - Using radial gradients instead of blur filters for better performance */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none" />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(212,175,55,0.04)_0%,transparent_70%)] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    
                    {/* LEFT COLUMN: Book Visual */}
                    <div className="relative order-2 lg:order-1 flex justify-center lg:justify-end">
                        {/* Ambient Glow behind the book - Optimized with gradient */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(212,175,55,0.15)_0%,transparent_70%)] scale-110 transform -translate-y-8 pointer-events-none" />
                        
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, rotateY: -20 }}
                            whileInView={{ opacity: 1, scale: 1, rotateY: -10 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="relative group [perspective:1000px] will-change-transform"
                        >
                            <motion.div
                                className="relative z-20 shadow-2xl rounded-lg overflow-hidden transform-gpu will-change-transform"
                            >
                                <img
                                    src={product.imageUrl}
                                    alt={product.title}
                                    loading="lazy"
                                    className="w-[300px] sm:w-[400px] h-auto object-contain bg-white rounded-lg"
                                />
                                {/* Glossy Overlay Effect - Solid Gradient instead of heavy opacity */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.02] to-white/[0.08] pointer-events-none" />
                            </motion.div>

                            {/* Floating Stats Badge - Reduced blur */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                                className="absolute -bottom-6 -left-6 z-30 bg-brand-800/40 border border-white/10 p-4 rounded-2xl shadow-xl hidden sm:block transform-gpu"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="bg-gold-500 p-2 rounded-lg">
                                        <Users className="w-5 h-5 text-brand-900" />
                                    </div>
                                    <div>
                                        <div className="text-white font-bold text-lg leading-none">2,400+</div>
                                        <div className="text-white/60 text-[10px] uppercase tracking-wider font-bold">Readers</div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Rating Badge - Reduced blur */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 }}
                                className="absolute -top-6 -right-6 z-30 bg-brand-800/40 border border-white/10 p-4 rounded-2xl shadow-xl hidden sm:block transform-gpu"
                            >
                                <div className="flex items-center gap-1 mb-1">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <Star key={s} className="w-3 h-3 fill-gold-500 text-gold-500" />
                                    ))}
                                </div>
                                <div className="text-white/80 text-[10px] font-bold uppercase tracking-widest">
                                    Top Rated 2024
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* RIGHT COLUMN: Content */}
                    <div className="order-1 lg:order-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-500 text-[11px] font-black uppercase tracking-[0.2em] mb-8">
                                <span className="flex h-2 w-2 rounded-full bg-gold-500 animate-pulse" />
                                Featured Release
                            </div>

                            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8 font-heading leading-tight tracking-tighter">
                                {product.title}
                            </h2>

                            <p className="text-white/70 text-lg leading-relaxed mb-10 font-sans max-w-xl">
                                {product.shortDescription}
                            </p>

                            {product.features && (
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-12">
                                    {product.features.map((feature: string, idx: number) => (
                                        <motion.li 
                                            key={idx}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 * idx }}
                                            className="flex items-start gap-3 text-sm text-slate-200 font-sans"
                                        >
                                            <div className="bg-gold-500 rounded-full p-1 mt-0.5">
                                                <Check className="w-2.5 h-2.5 text-brand-900 stroke-[3px]" />
                                            </div>
                                            <span className="font-medium">{feature}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            )}

                            {/* Pricing & CTA Block - Removed backdrop-blur for performance */}
                            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 relative overflow-hidden group/cta transform-gpu">
                                {/* Shimmer Effect Background - Optimized timing */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-full group-hover/cta:translate-x-full transition-transform duration-700 ease-in-out" />
                                
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 relative z-10">
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-4xl font-black text-white font-sans tracking-tight">${product.price}</span>
                                            {product.compareAtPrice && (
                                                <span className="text-lg text-white/40 line-through font-sans tracking-tight">${product.compareAtPrice}</span>
                                            )}
                                        </div>
                                        {savings > 0 && (
                                            <div className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-wider w-fit">
                                                Save ${savings.toFixed(0)} ({savingsPercentage}%)
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        onClick={handleAddToCart}
                                        className="w-full sm:w-auto bg-gold-500 text-brand-900 px-10 py-5 rounded-2xl text-base font-black hover:bg-gold-400 transition-all shadow-xl shadow-gold-500/10 active:scale-95 flex items-center justify-center gap-3 font-sans group/btn transform-gpu"
                                    >
                                        <ShoppingCart className="w-5 h-5" />
                                        ADD TO VAULT
                                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                </div>

                                {/* Trust Strip within card */}
                                <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-3 gap-4">
                                    <div className="flex flex-col items-center text-center gap-2">
                                        <ShieldCheck className="w-5 h-5 text-gold-500/70" />
                                        <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Secure</span>
                                    </div>
                                    <div className="flex flex-col items-center text-center gap-2">
                                        <Zap className="w-5 h-5 text-gold-500/70" />
                                        <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Instant</span>
                                    </div>
                                    <div className="flex flex-col items-center text-center gap-2">
                                        <Award className="w-5 h-5 text-gold-500/70" />
                                        <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Verified</span>
                                    </div>
                                </div>
                            </div>

                            <Link 
                                href={`/shop/${product.slug}`} 
                                className="mt-8 inline-flex items-center gap-2 text-white/40 hover:text-gold-500 transition-colors text-xs font-bold uppercase tracking-widest group"
                            >
                                View full resource details 
                                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Social Proof Ribbon Bottom Overlay - Removed backdrop-blur */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-brand-950/80 border-t border-white/5 z-20 flex items-center overflow-hidden">
                <div 
                    className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center whitespace-nowrap overflow-x-auto gap-12 [ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden transform-gpu"
                >
                    <div className="flex items-center gap-3 text-white/60">
                        <Trophy className="w-4 h-4 text-gold-500" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">#1 Ranked Strategy Book 2024</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/60">
                        <Users className="w-4 h-4 text-gold-500" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Join 2,400+ Satisfied Readers</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/60">
                        <ShieldCheck className="w-4 h-4 text-gold-500" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">100% Tax Accuracy Guarantee</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
