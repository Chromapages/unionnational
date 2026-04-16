"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";

interface Author {
    name: string;
    role: string;
    credentials: string[];
    imageUrl: string;
    bioShort?: string;
}

interface AuthorBioProps {
    author?: Author;
}

const defaultAuthor: Author = {
    name: "Marcus Thorne, CPA, LL.M",
    role: "Founder & Principal Strategist",
    credentials: [
        "Marcus Thorne is the Principal Architect at Sovereign Tax & Advisory. With over two decades of experience in bespoke financial structuring, he has advised ultra-high-net-worth families across four continents.",
        "His methodology focuses on jurisdictional agility and capital preservation in an increasingly volatile regulatory landscape."
    ],
    imageUrl: "" // Placeholder
};

export function AuthorBio({ author: propAuthor }: AuthorBioProps) {
    const displayAuthor = propAuthor || defaultAuthor;

    return (
        <section id="about-author" className="scroll-mt-24 py-16 sm:py-24 bg-white border-b border-slate-100 px-4 sm:px-6">
            <div className="container mx-auto max-w-7xl">
                <div className="relative w-full rounded-[2rem] bg-brand-900 p-8 sm:p-12 md:p-16 lg:p-20 overflow-hidden shadow-2xl">
                    {/* Background Texture/Accent */}
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
                    
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        
                        {/* Left: Bio Text */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex flex-col"
                        >
                            <h2 className="text-3xl sm:text-4xl font-bold text-white font-heading tracking-tight mb-8">
                                About the Author
                            </h2>

                            <div className="space-y-6 text-base sm:text-lg text-slate-300 font-sans leading-relaxed max-w-xl">
                                {displayAuthor.bioShort ? (
                                    displayAuthor.bioShort.split('\n').filter(Boolean).map((paragraph, idx) => (
                                        <p key={idx}>{paragraph}</p>
                                    ))
                                ) : (
                                    (displayAuthor.credentials || []).map((paragraph, idx) => (
                                        <p key={idx}>{paragraph}</p>
                                    ))
                                )}
                            </div>
                            
                            <div className="mt-10 flex items-center gap-6">
                                <div className="h-0.5 w-12 bg-emerald-500/40" />
                                <div className="flex flex-col">
                                    <p className="font-black text-white font-heading text-sm sm:text-base uppercase tracking-[0.2em]">
                                        {displayAuthor.name}
                                    </p>
                                    <p className="text-[10px] text-slate-400 uppercase tracking-[0.15em] mt-1 font-bold">
                                        {displayAuthor.role}
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right: Author Image (Tilted Card Style) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, rotate: 0 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: 3 }}
                            viewport={{ once: true }}
                            className="relative w-full max-w-sm mx-auto lg:ml-auto"
                        >
                            <div className="aspect-[4/5] sm:aspect-square relative group">
                                {/* Back Glow */}
                                <div className="absolute -inset-4 bg-emerald-500/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                
                                <div className="relative h-full w-full rounded-2xl overflow-hidden border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.3)] bg-slate-800 transition-all duration-500 group-hover:scale-[1.02]">
                                    {displayAuthor.imageUrl ? (
                                        <img
                                            src={displayAuthor.imageUrl}
                                            alt={displayAuthor.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-full gap-4 text-slate-500">
                                            <User className="w-16 h-16" strokeWidth={0.5} />
                                            <span className="text-xs font-black uppercase tracking-[0.2em] opacity-40">Profile Image</span>
                                        </div>
                                    )}
                                    
                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-brand-950/40 via-transparent to-transparent pointer-events-none" />
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </div>
        </section>
    );
}
