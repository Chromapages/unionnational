"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Building2, Search } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";

interface HubHeroProps {
    title: string;
    subtitle: string;
    featuredPlaybooks?: any[];
    industryVerticals?: any[];
}

interface PlaybookCardProps {
    playbook: any;
    className?: string;
}

function PlaybookCard({ playbook, className }: PlaybookCardProps) {
    return (
        <Link
            href={`/hub/s-corp-playbook`}
            className={cn(
                "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-brand-950/40 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-gold",
                className
            )}
        >
            {playbook.coverImage ? (
                <div className="relative h-48 overflow-hidden">
                    <Image
                        src={urlFor(playbook.coverImage).url()}
                        alt={playbook.coverImage.alt || playbook.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/40 to-transparent" />
                </div>
            ) : (
                <div className="h-48 bg-brand-900/60" />
            )}
            <div className="flex flex-1 flex-col p-6">
                {playbook.isFeatured && (
                    <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-gold-500/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-gold-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                        Featured
                    </span>
                )}
                <h3 className="font-heading text-xl font-semibold text-white transition-colors duration-300 group-hover:text-gold-200">
                    {playbook.title}
                </h3>
                {playbook.description && (
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/70 font-sans">
                        {playbook.description}
                    </p>
                )}
                {playbook.chapterCount !== undefined && (
                    <p className="mt-auto pt-4 text-xs uppercase tracking-[0.15em] text-white/50">
                        {playbook.chapterCount} Chapters
                    </p>
                )}
            </div>
        </Link>
    );
}

interface IndustryCardProps {
    industry: any;
    className?: string;
}

function IndustryCard({ industry, className }: IndustryCardProps) {
    return (
        <Link
            href={`/hub/industries/${industry.slug}`}
            className={cn(
                "group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-brand-950/40 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-gold",
                className
            )}
        >
            <div>
                {industry.heroImage ? (
                    <div className="relative -mx-6 -mt-6 mb-4 h-32 overflow-hidden">
                        <Image
                            src={urlFor(industry.heroImage).url()}
                            alt={industry.heroImage.alt || industry.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-950 to-transparent" />
                    </div>
                ) : (
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-500/20">
                        <Building2 className="h-8 w-8 text-gold-400" />
                    </div>
                )}
                <h3 className="font-heading text-xl font-semibold text-white transition-colors duration-300 group-hover:text-gold-200">
                    {industry.title}
                </h3>
                {industry.description && (
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/70 font-sans">
                        {industry.description}
                    </p>
                )}
            </div>
            <div className="mt-6 flex items-center justify-between">
                {industry.painPoints && industry.painPoints.length > 0 && (
                    <span className="text-xs text-white/50">
                        {industry.painPoints.length} pain points addressed
                    </span>
                )}
                <span className="flex items-center gap-1 text-sm font-medium text-gold-200 transition-transform duration-300 group-hover:translate-x-1">
                    Explore
                    <ArrowRight className="h-4 w-4" />
                </span>
            </div>
        </Link>
    );
}

export function HubHero({ title, subtitle, featuredPlaybooks = [], industryVerticals = [] }: HubHeroProps) {
    return (
        <section className="relative overflow-hidden bg-forest-gradient pt-32 pb-20 text-white">
            <div className="absolute inset-0">
                <div className="absolute -top-32 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-brand-500/20 blur-[140px]" />
                <div className="absolute bottom-0 right-0 h-[260px] w-[260px] translate-x-1/3 translate-y-1/3 rounded-full bg-gold-500/15 blur-[120px]" />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-6">
                <RevealOnScroll>
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.3em] text-gold-100 font-sans">
                            <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                            Authority Hub
                        </div>
                        <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl lg:text-6xl font-heading">
                            {title}
                        </h1>
                        <p className="max-w-xl text-lg text-white/70 font-sans leading-relaxed">
                            {subtitle}
                        </p>
                        <div className="flex flex-wrap gap-4 pt-2">
                            <Link
                                href="/hub/s-corp-playbook"
                                className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-brand-950 transition-all hover:bg-gold-400"
                            >
                                <BookOpen className="h-4 w-4" />
                                Browse Playbooks
                            </Link>
                            <Link
                                href="/hub/industries"
                                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
                            >
                                <Building2 className="h-4 w-4" />
                                Industry Guides
                            </Link>
                        </div>
                    </div>
                </RevealOnScroll>

                {featuredPlaybooks.length > 0 && (
                    <RevealOnScroll>
                        <div className="mt-16">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-2xl font-semibold text-white font-heading">Featured Playbooks</h2>
                                <Link
                                    href="/hub/s-corp-playbook"
                                    className="flex items-center gap-1 text-sm font-medium text-gold-200 hover:underline"
                                >
                                    View All
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {featuredPlaybooks.map((playbook) => (
                                    <PlaybookCard key={playbook._id} playbook={playbook} />
                                ))}
                            </div>
                        </div>
                    </RevealOnScroll>
                )}

                {industryVerticals.length > 0 && (
                    <RevealOnScroll>
                        <div className="mt-16">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-2xl font-semibold text-white font-heading">Industry Guides</h2>
                                <Link
                                    href="/hub/industries"
                                    className="flex items-center gap-1 text-sm font-medium text-gold-200 hover:underline"
                                >
                                    View All
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                                {industryVerticals.map((industry) => (
                                    <IndustryCard key={industry._id} industry={industry} />
                                ))}
                            </div>
                        </div>
                    </RevealOnScroll>
                )}
            </div>
        </section>
    );
}
