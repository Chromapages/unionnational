import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
import { ArrowRight, BookOpen, FileText } from "lucide-react";
import { extractString } from "@/lib/utils";

interface FeaturedResource {
    _type: string;
    _id: string;
    title: string;
    slug: string;
    description?: string;
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
    isFeatured?: boolean;
    chapterCount?: number;
}

interface ResourceHeroProps {
    title: string;
    subtitle: string;
    featuredResource?: FeaturedResource;
}

export function ResourceHero({ title, subtitle, featuredResource }: ResourceHeroProps) {
    const locale = useLocale();
    const imageUrl = featuredResource?.coverImage?.asset?.url || featuredResource?.featuredImage?.asset?.url;
    const imageAlt = featuredResource?.coverImage?.alt || featuredResource?.featuredImage?.alt || featuredResource?.title;
    const isLeadMagnet = featuredResource?._type === "playbook";

    return (
        <section className="relative bg-brand-900 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-900" />

            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="w-full h-full bg-[radial-gradient(#d4af37_1px,transparent_1px)] bg-[size:24px_24px]" />
            </div>

            <div className="relative w-full px-4 sm:px-6 py-20 lg:py-32">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-heading">
                        {title}
                    </h1>
                    <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
                        {subtitle}
                    </p>
                </div>

                {featuredResource && (
                    <div className="w-full">
                        <div className="bg-brand-800/50 backdrop-blur-sm border border-gold-500/20 rounded-2xl overflow-hidden">
                            <div className="grid lg:grid-cols-2 gap-0">
                                {imageUrl && (
                                    <div className="relative aspect-video lg:aspect-auto min-h-[280px]">
                                        <Image
                                            src={imageUrl}
                                            alt={imageAlt || ""}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-brand-900/60 to-transparent lg:bg-gradient-to-r" />
                                    </div>
                                )}
                                <div className="p-8 lg:p-12 flex flex-col justify-center">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-sm font-medium">
                                            {isLeadMagnet ? (
                                                <>
                                                    <BookOpen className="w-3.5 h-3.5" />
                                                    Lead Magnet
                                                </>
                                            ) : (
                                                <>
                                                    <FileText className="w-4 h-4" />
                                                    Blog Post
                                                </>
                                            )}
                                        </span>
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 font-heading">
                                        {extractString(featuredResource.title, locale, 'Featured Resource')}
                                    </h2>
                                    {featuredResource.description && (
                                        <p className="text-slate-300 mb-6 line-clamp-3">
                                            {extractString(featuredResource.description, locale)}
                                        </p>
                                    )}
                                    {isLeadMagnet && featuredResource.chapterCount && (
                                        <p className="mt-3 text-slate-500 text-sm font-medium">
                                            {featuredResource.chapterCount} Chapters
                                        </p>
                                    )}
                                    <div className="mt-8 flex flex-wrap gap-4">
                                        <Link
                                            href={isLeadMagnet ? `/hub/s-corp-playbook` : `/blog/${featuredResource.slug}`}
                                            className="inline-flex items-center justify-center rounded-xl bg-brand-900 px-6 py-3.5 text-sm font-bold uppercase tracking-widest text-white shadow-lg shadow-brand-900/20 transition hover:bg-gold-500 hover:text-brand-900"
                                        >
                                            {isLeadMagnet ? "Read Lead Magnet" : "Read Article"}
                                            <ArrowRight className="ml-2 w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
