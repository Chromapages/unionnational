"use client";

import { motion } from "framer-motion";

interface Author {
    name: string;
    role: string;
    credentials: string[];
    imageUrl: string;
}

interface AuthorBioProps {
    author?: Author;
}

const defaultAuthor: Author = {
    name: "Marcus Thorne",
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
        <section id="about-author" className="scroll-mt-24 py-12 bg-white border-b border-slate-100 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-slate-50 to-transparent pointer-events-none" />
            
            <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
                <h2 className="text-2xl font-bold text-brand-900 font-heading tracking-tight mb-8">
                    About the Author
                </h2>

                <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16">

                    {/* Left: Author Headshot */}
                    <div className="w-full lg:w-[220px] shrink-0 flex justify-center order-1">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative w-[220px] aspect-[3/4]"
                        >
                            <div className="relative w-full h-full rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-md">
                                {displayAuthor.imageUrl ? (
                                    <img
                                        src={displayAuthor.imageUrl}
                                        alt={displayAuthor.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-slate-200" />
                                )}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Bio Text */}
                    <div className="flex-1 order-2">
                        <motion.div
                            initial={{ opacity: 0, x: 16 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="space-y-4 text-sm text-slate-600 font-sans leading-relaxed">
                                {displayAuthor.credentials.map((paragraph, idx) => (
                                    <p key={idx}>{paragraph}</p>
                                ))}
                            </div>
                            <div className="mt-6 pt-6 border-t border-slate-100 flex items-center gap-3">
                                <div className="h-px w-6 bg-gold-400" />
                                <div>
                                    <p className="font-bold text-brand-900 font-heading">{displayAuthor.name}</p>
                                    <p className="text-xs text-slate-400 uppercase tracking-widest mt-0.5">{displayAuthor.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
