import type { SanityBlock, SanityImage } from "@/types/sanity";

export type ChapterSummary = {
    _id: string;
    title: string;
    slug: string;
    chapterNumber: number;
    isGated?: boolean;
};

export type PlaybookData = {
    title: string;
    description?: string;
    coverImage?: SanityImage;
    gatedPdfUrl?: string;
    seo?: { noIndex?: boolean };
    chapters?: ChapterSummary[];
};

export type ChapterData = {
    title: string;
    chapterNumber: number;
    content?: SanityBlock[];
    videoEmbed?: string;
    videoThumbnail?: SanityImage;
    keyTakeaways?: string[];
    tools?: string[];
    isGated?: boolean;
};
