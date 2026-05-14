"use client";
import { SanityBlock } from "@/types/sanity";

import { PortableText } from "next-sanity";
import { Link as ScrollLink } from "react-scroll";
import { m, LazyMotion, domMax } from "framer-motion";
import { Info, ChevronRight, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface Heading {
    id: string;
    text: string;
    level: number;
}

interface LegalContentClientProps {
    body: SanityBlock[];
    title: string;
}

export function LegalContentClient({ body, title }: LegalContentClientProps) {
    const [activeId, setActiveId] = useState<string>("");
    const [isMobileTocOpen, setIsMobileTocOpen] = useState(false);

    // Extract headings for TOC
    const headings: Heading[] = (body || [])
        .filter((block) => block._type === "block" && /^h[1-4]$/.test(block.style || ""))
        .map((block) => {
            const text = block.children?.map((c) => c.text).join("") || "";
            const id = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
            return {
                id,
                text,
                level: parseInt((block.style || "h2").replace("h", ""), 10),
            };
        });

    // Custom components for PortableText to include IDs and "Plain Language" callouts
    const components = {
        block: {
            h2: ({ children, value }: any) => {
                const id = value.children?.map((c: any) => c.text).join("").toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
                return (
                    <h2 id={id} className="text-2xl font-bold text-brand-900 mt-12 mb-6 scroll-mt-24 font-heading">
                        {children}
                    </h2>
                );
            },
            h3: ({ children, value }: any) => {
                const id = value.children?.map((c: any) => c.text).join("").toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
                return (
                    <h3 id={id} className="text-xl font-bold text-brand-900 mt-8 mb-4 scroll-mt-24 font-heading">
                        {children}
                    </h3>
                );
            },
            normal: ({ children }: any) => {
                // Simple logic for "Plain Language" callouts: if text starts with "Plain Language:"
                const text = Array.isArray(children) ? children[0] : children;
                if (typeof text === 'string' && text.startsWith('Plain Language:')) {
                    return (
                        <div className="my-8 p-4 bg-gold-50/50 border-l-4 border-gold-500 rounded-r-lg flex gap-4">
                            <Info className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                            <div>
                                <span className="block text-[10px] font-bold uppercase tracking-wider text-gold-700 mb-1">In Plain English</span>
                                <p className="text-sm text-gold-900/80 leading-relaxed italic">{text.replace('Plain Language:', '').trim()}</p>
                            </div>
                        </div>
                    );
                }
                return <p className="mb-4 leading-relaxed text-brand-900/80">{children}</p>;
            }
        },
        list: {
            bullet: ({ children }: any) => <ul className="list-disc pl-6 mb-6 space-y-2 text-brand-900/80">{children}</ul>,
            number: ({ children }: any) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-brand-900/80">{children}</ol>,
        },
    };

    return (
        <LazyMotion features={domMax}>
            <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-12 items-start">
                {/* Main Content */}
                <div className="prose prose-slate max-w-none prose-headings:font-heading prose-p:font-sans">
                    <PortableText value={body} components={components} />
                </div>

                {/* Desktop Sidebar TOC */}
                <aside className="hidden lg:block sticky top-32 self-start border-l border-slate-200 pl-6 py-2">
                    <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 mb-6">Contents</h4>
                    <nav className="space-y-4">
                        {headings.map((heading) => (
                            <ScrollLink
                                key={heading.id}
                                to={heading.id}
                                spy={true}
                                smooth={true}
                                offset={-100}
                                duration={500}
                                onSetActive={() => setActiveId(heading.id)}
                                className={cn(
                                    "block text-sm cursor-pointer transition-all duration-300",
                                    heading.level > 2 ? "pl-4 text-xs" : "",
                                    activeId === heading.id
                                        ? "text-gold-600 font-semibold translate-x-1"
                                        : "text-slate-500 hover:text-brand-900"
                                )}
                            >
                                {heading.text}
                            </ScrollLink>
                        ))}
                    </nav>
                </aside>

                {/* Mobile Floating TOC Trigger */}
                <button
                    onClick={() => setIsMobileTocOpen(!isMobileTocOpen)}
                    className="lg:hidden fixed bottom-8 right-8 z-50 w-12 h-12 bg-brand-900 text-white rounded-full shadow-2xl flex items-center justify-center border border-white/10 active:scale-95 transition-transform"
                >
                    {isMobileTocOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>

                {/* Mobile TOC Overlay */}
                {isMobileTocOpen && (
                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="lg:hidden fixed inset-x-4 bottom-24 z-50 bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 max-h-[60vh] overflow-y-auto"
                    >
                        <h4 className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-6">Jump to section</h4>
                        <div className="grid gap-4">
                            {headings.map((heading) => (
                                <ScrollLink
                                    key={heading.id}
                                    to={heading.id}
                                    smooth={true}
                                    offset={-80}
                                    onClick={() => setIsMobileTocOpen(false)}
                                    className="flex items-center justify-between text-brand-900 font-medium py-2 border-b border-slate-50"
                                >
                                    <span>{heading.text}</span>
                                    <ChevronRight className="w-4 h-4 text-slate-400" />
                                </ScrollLink>
                            ))}
                        </div>
                    </m.div>
                )}
            </div>
        </LazyMotion>
    );
}
