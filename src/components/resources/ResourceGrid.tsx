"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
import { BookOpen, FileText, Calculator, ChevronDown, X, ChevronRight, Download } from "lucide-react";
import { extractString } from "@/lib/utils";
import { InteractiveToolsList } from "./InteractiveToolsList";
import { ConstructionTaxChecklist } from "./lead-magnets/ConstructionTaxChecklist";

interface Category {
    _id: string;
    title: string;
    slug: string;
}

interface ResourceItem {
    _type: "playbook" | "blogPost";
    _id: string;
    title: string;
    slug: string;
    description?: string;
    excerpt?: string;
    coverImage?: {
        asset: {
            url: string;
        };
        alt?: string;
    };
    featuredImage?: {
        asset: {
            url: string;
        };
        alt?: string;
    };
    publishedAt?: string;
    readingTime?: number;
    chapterCount?: number;
    categories?: Category[];
}

interface ResourceGridProps {
    playbooks: ResourceItem[];
    blogPosts: ResourceItem[];
    categories: Category[];
    showLeadMagnets: boolean;
    showBlogPosts: boolean;
    showTools: boolean;
}

type FilterType = "leadMagnets" | "blogPosts" | "tools";

export function ResourceGrid({
    playbooks,
    blogPosts,
    categories,
    showLeadMagnets,
    showBlogPosts,
    showTools
}: ResourceGridProps) {
    const locale = useLocale();
    const [activeFilter, setActiveFilter] = useState<FilterType>("blogPosts");
    const [activeCategory, setActiveCategory] = useState<Category | null>(null);
    const [viewingLeadMagnet, setViewingLeadMagnet] = useState<string | null>(null);

    const filters: { key: FilterType; label: string; icon?: React.ReactNode }[] = [];

    if (showBlogPosts) {
        filters.push({ key: "blogPosts", label: "Blog Posts", icon: <FileText className="w-4 h-4" /> });
    }
    if (showLeadMagnets) {
        filters.push({ key: "leadMagnets", label: "Lead Magnets", icon: <BookOpen className="w-4 h-4" /> });
    }
    if (showTools) {
        filters.push({ key: "tools", label: "Interactive Tools", icon: <Calculator className="w-4 h-4" /> });
    }

    const allResources: ResourceItem[] = [];

    if (showLeadMagnets) {
        playbooks.forEach(p => allResources.push({ ...p, _type: "playbook" }));
    }
    if (showBlogPosts) {
        blogPosts.forEach(p => allResources.push({ ...p, _type: "blogPost" }));
    }

    const filteredResources = allResources.filter(resource => {
        const typeMatch =
            (activeFilter === "leadMagnets" && resource._type === "playbook") ||
            (activeFilter === "blogPosts" && resource._type === "blogPost");

        const categoryMatch = !activeCategory ||
            resource.categories?.some(cat => cat.slug === activeCategory.slug);

        return typeMatch && categoryMatch;
    });

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    return (
        <section className="bg-white py-16 lg:py-24">
            <div className="w-full px-4 sm:px-6">
                {!viewingLeadMagnet && (
                    <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-12">
                        {/* Segmented Control Filter */}
                        <div className="bg-slate-100/80 backdrop-blur-md p-1.5 rounded-full inline-flex items-center gap-1 border border-slate-200/60 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]">
                            {filters.map(filter => (
                                <button
                                    key={filter.key}
                                    onClick={() => setActiveFilter(filter.key)}
                                    className={`relative flex items-center gap-2 px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 z-10 ${activeFilter === filter.key
                                        ? "text-brand-900"
                                        : "text-slate-500 hover:text-slate-900"
                                        }`}
                                >
                                    {activeFilter === filter.key && (
                                        <div className="absolute inset-0 bg-white rounded-full shadow-sm ring-1 ring-slate-900/5 -z-10 animate-in fade-in zoom-in-95 duration-200" />
                                    )}
                                    {filter.icon && (
                                        <span className={activeFilter === filter.key ? "text-brand-900" : "text-slate-400"}>
                                            {filter.icon}
                                        </span>
                                    )}
                                    {filter.label}
                                </button>
                            ))}
                        </div>

                        {/* Category Dropdown Restyled */}
                        {categories.length > 0 && activeFilter !== "tools" && (
                            <div className="relative group min-w-[200px]">
                                <select
                                    value={activeCategory?.slug || ""}
                                    onChange={(e) => {
                                        const cat = categories.find(c => c.slug === e.target.value);
                                        setActiveCategory(cat || null);
                                    }}
                                    className="w-full appearance-none bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-full px-6 py-3 pr-12 text-slate-600 text-sm font-semibold cursor-pointer focus:outline-none focus:border-brand-300 focus:ring-4 focus:ring-brand-500/5 transition-all hover:bg-white hover:border-slate-300 shadow-sm"
                                >
                                    <option value="">All Categories</option>
                                    {categories.map(cat => (
                                        <option key={cat._id} value={cat.slug}>
                                            {extractString(cat.title, locale, 'Category')}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 p-1 pointer-events-none text-slate-400 group-hover:text-brand-900 transition-colors">
                                    <ChevronDown className="w-4 h-4" />
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {viewingLeadMagnet ? (
                    <div>
                        <div className="mb-8">
                            <button
                                onClick={() => setViewingLeadMagnet(null)}
                                className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-900 transition-colors font-medium"
                            >
                                <ChevronRight className="w-4 h-4 rotate-180" />
                                Back to resources
                            </button>
                        </div>
                        {viewingLeadMagnet === "construction-tax-checklist" && <ConstructionTaxChecklist />}
                    </div>
                ) : activeFilter === "tools" ? (
                    <InteractiveToolsList embedded />
                ) : (
                    <>
                        {filteredResources.length === 0 && activeFilter !== "leadMagnets" ? (
                            <div className="text-center py-16">
                                <p className="text-slate-500 text-lg">No resources found matching your criteria.</p>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                                {/* Internal Lead Magnets */}
                                {activeFilter === "leadMagnets" && !activeCategory && (
                                    <button
                                        onClick={() => setViewingLeadMagnet("construction-tax-checklist")}
                                        className="text-left group bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-gold-500/40 hover:shadow-xl hover:shadow-gold-500/10 transition-all duration-300"
                                    >
                                        <div className="relative aspect-video overflow-hidden bg-brand-900 flex items-center justify-center">
                                            <div className="absolute inset-0 opacity-20">
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-500 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                                            </div>
                                            <Download className="w-16 h-16 text-white/20 group-hover:scale-110 transition-transform duration-500" />
                                            <div className="absolute top-4 left-4">
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gold-500 text-brand-900">
                                                    <BookOpen className="w-3.5 h-3.5" />
                                                    Lead Magnet
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-lg font-bold text-brand-900 mb-2 group-hover:text-gold-600 transition-colors line-clamp-2 font-heading">
                                                Construction Tax Deduction Checklist
                                            </h3>
                                            <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                                                Never miss a deduction again — print and keep this in your truck. Hand-vetted for 2025/2026.
                                            </p>
                                            <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-4">
                                                <span>Full Checklist PDF</span>
                                                <span className="flex items-center gap-1 text-gold-600 font-bold">
                                                    Free Access
                                                    <ChevronRight className="w-3 h-3" />
                                                </span>
                                            </div>
                                        </div>
                                    </button>
                                )}

                                {filteredResources.map(resource => {
                                    const imageUrl = resource.coverImage?.asset?.url || resource.featuredImage?.asset?.url;
                                    const imageAlt = resource.coverImage?.alt || resource.featuredImage?.alt || extractString(resource.title, locale);
                                    const isLeadMagnet = resource._type === "playbook";

                                    return (
                                        <Link
                                            key={resource._id}
                                            href={isLeadMagnet ? `/hub/s-corp-playbook` : `/blog/${resource.slug}`}
                                            className="group bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-gold-500/40 hover:shadow-xl hover:shadow-gold-500/10 transition-all duration-300"
                                        >
                                            {imageUrl && (
                                                <div className="relative aspect-video overflow-hidden">
                                                    <Image
                                                        src={imageUrl}
                                                        alt={imageAlt}
                                                        fill
                                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                    <div className="absolute top-4 left-4">
                                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${isLeadMagnet
                                                            ? "bg-gold-500 text-brand-900"
                                                            : "bg-brand-900 text-white"
                                                            }`}>
                                                            {isLeadMagnet ? (
                                                                <>
                                                                    <BookOpen className="w-3.5 h-3.5" />
                                                                    Lead Magnet
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <FileText className="w-3.5 h-3.5" />
                                                                    Article
                                                                </>
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                            <div className="p-6">
                                                {!imageUrl && (
                                                    <div className="mb-4">
                                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${isLeadMagnet
                                                            ? "bg-gold-500/10 text-gold-600 border border-gold-500/20"
                                                            : "bg-brand-900/10 text-brand-700 border border-brand-900/20"
                                                            }`}>
                                                            {isLeadMagnet ? (
                                                                <>
                                                                    <BookOpen className="w-3.5 h-3.5" />
                                                                    Lead Magnet
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <FileText className="w-3.5 h-3.5" />
                                                                    Article
                                                                </>
                                                            )}
                                                        </span>
                                                    </div>
                                                )}
                                                <h3 className="text-lg font-bold text-brand-900 mb-2 group-hover:text-gold-600 transition-colors line-clamp-2 font-heading">
                                                    {extractString(resource.title, locale, 'Resource')}
                                                </h3>
                                                <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                                                    {extractString(resource.description || resource.excerpt, locale)}
                                                </p>
                                                <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-4">
                                                    {isLeadMagnet && resource.chapterCount ? (
                                                        <span>{resource.chapterCount} chapters</span>
                                                    ) : resource.readingTime ? (
                                                        <span>{resource.readingTime} min read</span>
                                                    ) : resource.publishedAt ? (
                                                        <span>{formatDate(resource.publishedAt)}</span>
                                                    ) : (
                                                        <span />
                                                    )}
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
}
