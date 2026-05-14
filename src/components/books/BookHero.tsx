"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, ShieldCheck, Award, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Book } from "@/types/book";

interface BookHeroProps {
    book: Book;
    className?: string;
}

export function BookHero({ book, className }: BookHeroProps) {
    const starCount = Math.round(book.rating || 5);

    return (
        <section className={cn("bg-brand-950 relative overflow-hidden", className)}>
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-950 via-brand-900 to-brand-950" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.08),transparent_60%)]" />

            <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10 py-16 sm:py-20 lg:py-28">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">

                    {/* LEFT: Book Cover */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="w-full max-w-sm mx-auto lg:mx-0 lg:max-w-none lg:w-[40%] flex-shrink-0"
                    >
                        <div className="relative group">
                            {/* Glow behind book */}
                            <div className="absolute -inset-4 bg-gold-500/10 blur-3xl rounded-full opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                            <div className="relative aspect-[3/4] max-w-[280px] mx-auto rounded-xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.5)] border border-white/10">
                                {book.imageUrl ? (
                                    <Image
                                        src={book.imageUrl}
                                        alt={book.title}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                ) : (
                                    <div className="w-full h-full bg-brand-800 flex items-center justify-center">
                                        <span className="text-slate-500 text-sm font-bold uppercase tracking-widest">
                                            Cover Image
                                        </span>
                                    </div>
                                )}
                                {/* Overlay gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/40 via-transparent to-transparent" />
                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT: Book Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
                        className="flex-1 text-center lg:text-left"
                    >
                        {book.badge && (
                            <span className="inline-block text-[10px] font-black uppercase tracking-[0.3em] text-gold-500 mb-6 bg-gold-500/10 px-4 py-1.5 rounded-full border border-gold-500/20">
                                {book.badge}
                            </span>
                        )}

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-heading leading-[1.05] tracking-tight mb-6">
                            {book.title}
                        </h1>

                        {book.shortDescription && (
                            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                                {book.shortDescription}
                            </p>
                        )}

                        {/* Author + Rating */}
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 mb-10">
                            {book.author?.name && (
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gold-500/20 border border-gold-500/30 flex items-center justify-center text-gold-500 font-bold text-sm">
                                        {book.author.name.charAt(0)}
                                    </div>
                                    <div className="flex flex-col text-left">
                                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-none mb-1">By</span>
                                        <span className="text-sm text-white font-bold">{book.author.name}</span>
                                    </div>
                                </div>
                            )}

                            {book.rating && (
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-0.5" aria-label={`${starCount} out of 5 stars`}>
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <Star
                                                key={s}
                                                className={cn(
                                                    "w-4 h-4",
                                                    s <= starCount ? "fill-gold-500 text-gold-500" : "fill-slate-700 text-slate-700"
                                                )}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-xs text-slate-400 font-medium">{starCount}.0 Reader Rating</span>
                                </div>
                            )}
                        </div>

                        {/* CTA Button */}
                        <a
                            href="#get-copy"
                            className="inline-flex items-center gap-3 bg-gold-500 text-brand-900 px-8 py-4 rounded-xl font-black text-sm uppercase tracking-[0.15em] shadow-[0_10px_30px_rgba(212,175,55,0.3)] hover:bg-gold-400 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all"
                        >
                            <Zap className="w-5 h-5" />
                            Get Your Free Copy
                        </a>

                        {/* Trust Elements */}
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 mt-10 pt-10 border-t border-white/10">
                            <div className="flex flex-col items-center gap-1.5">
                                <ShieldCheck className="w-5 h-5 text-gold-500" />
                                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Secure Delivery</span>
                            </div>
                            <div className="flex flex-col items-center gap-1.5">
                                <Award className="w-5 h-5 text-gold-500" />
                                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Expert Author</span>
                            </div>
                            <div className="flex flex-col items-center gap-1.5">
                                <Zap className="w-5 h-5 text-gold-500" />
                                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Instant Access</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
