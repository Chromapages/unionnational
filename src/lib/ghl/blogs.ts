import { getGhlAccessToken } from "./auth";
import { getEnv } from "@/lib/config/env";
import { logger } from "@/lib/observability/logger";

const GHL_API_BASE = "https://services.leadconnectorhq.com";

export interface GhlBlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt?: string;
    content?: string;
    featuredImage?: string;
    publishedDate: string;
    authorName?: string;
    categories?: string[];
}

export interface GhlBlogResponse {
    posts: GhlBlogPost[];
    total: number;
}

interface GhlRawPost {
    id: string;
    title: string;
    slug: string;
    description?: string;
    excerpt?: string;
    body?: string;
    content?: string;
    imageUrl?: string;
    featuredImage?: string;
    publishedAt?: string;
    createdAt?: string;
    author?: {
        name: string;
    };
    categories?: (string | { name: string })[];
}

/**
 * GHL BLOG CLIENT
 * High-performance data fetching for GHL Blogs.
 */
export const getGhlPosts = async (blogId: string, limit = 10, offset = 0): Promise<GhlBlogResponse> => {
    const accessToken = await getGhlAccessToken();
    const locationId = getEnv("GHL_LOCATION_ID");

    if (!accessToken || !locationId) {
        if (process.env.NODE_ENV === "development") {
            logger.warn("GHL API credentials missing, returning mock data for development");
            return getMockGhlPosts(limit);
        }
        logger.error("GHL API credentials missing in production. Blog will be empty");
        return { posts: [], total: 0 };
    }

    try {
        const response = await fetch(`${GHL_API_BASE}/blogs/posts/all?blogId=${blogId}&locationId=${locationId}&limit=${limit}&offset=${offset}`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Version": "2021-07-28",
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        if (!response.ok) {
            logger.error("GHL blog fetch failed", data, { status: response.status });
            return { posts: [], total: 0 };
        }

        // Map GHL raw structure to our canonical GhlBlogPost interface
        const posts: GhlBlogPost[] = (data.posts || []).map((p: GhlRawPost) => ({
            id: p.id,
            title: p.title,
            slug: p.slug,
            excerpt: p.description || p.excerpt || "",
            content: p.body || p.content || "",
            featuredImage: p.imageUrl || p.featuredImage || "",
            publishedDate: p.publishedAt || p.createdAt || new Date().toISOString(),
            authorName: p.author?.name || "Union National Team",
            categories: (p.categories || []).map((c) => (typeof c === 'string' ? c : c.name)),
        }));

        return {
            posts,
            total: data.total || posts.length,
        };
    } catch (error) {
        logger.error("GHL blog API error", error);
        return { posts: [], total: 0 };
    }
};

/**
 * Single post resolution by slug.
 * Since GHL doesn't support direct slug lookup, we fetch and find.
 */
export const getGhlPostBySlug = async (blogId: string, slug: string): Promise<GhlBlogPost | null> => {
    const { posts } = await getGhlPosts(blogId, 50);
    return posts.find((p) => p.slug === slug) || null;
};

const MOCK_POSTS: GhlBlogPost[] = [
    {
        id: "1",
        title: "Why S-Corp Strategy is the Ultimate Tax Advantage in 2026",
        slug: "scorp-tax-advantage-2026",
        excerpt: "Learn how switching to an S-Corp can save you thousands in self-employment taxes while improving your business structure.",
        featuredImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800",
        publishedDate: new Date().toISOString(),
        authorName: "Eric B.",
        categories: ["Tax Strategy", "S-Corp"],
        content: "<p>The S-Corp remains one of the most powerful tools in the small business owner's arsenal...</p>"
    },
    {
        id: "2",
        title: "Tax Season Checklist: 5 Things Every LLC Owner Misses",
        slug: "tax-season-checklist-llc",
        excerpt: "Don't leave money on the table. Our comprehensive checklist ensures you maximize deductions before the filing deadline.",
        featuredImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800",
        publishedDate: new Date(Date.now() - 86400000 * 2).toISOString(),
        authorName: "Sarah M.",
        categories: ["Compliance", "Checklist"],
        content: "<p>Every year, we see business owners overlook critical deductions...</p>"
    },
    {
        id: "3",
        title: "Top 10 Tax Deductions for 1099 Contractors in 2026",
        slug: "top-10-tax-deductions-for-1099-contractors-in-2026",
        excerpt: "Maximize your take-home pay with these essential deductions every 1099 contractor should know about.",
        featuredImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800",
        publishedDate: new Date(Date.now() - 86400000 * 5).toISOString(),
        authorName: "Eric B.",
        categories: ["1099 Contractors", "Tax Deductions"],
        content: "<p>As a 1099 contractor, you have access to a wide range of deductions that can significantly reduce your tax burden...</p>"
    }
];

export const getGhlPostBySlugWithMock = async (blogId: string, slug: string): Promise<GhlBlogPost | null> => {
    const { posts } = await getGhlPosts(blogId, 50);
    const found = posts.find((p) => p.slug === slug);
    if (found) return found;
    const mockFound = MOCK_POSTS.find((p) => p.slug === slug);
    if (mockFound) return mockFound;
    return null;
};

/**
 * MOCK DATA GENERATOR
 * Ensures development can proceed without immediate API keys.
 */
const getMockGhlPosts = (limit: number): GhlBlogResponse => {
    const mockPosts: GhlBlogPost[] = [
        {
            id: "1",
            title: "Why S-Corp Strategy is the Ultimate Tax Advantage in 2026",
            slug: "scorp-tax-advantage-2026",
            excerpt: "Learn how switching to an S-Corp can save you thousands in self-employment taxes while improving your business structure.",
            featuredImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800",
            publishedDate: new Date().toISOString(),
            authorName: "Eric B.",
            categories: ["Tax Strategy", "S-Corp"],
            content: "<p>The S-Corp remains one of the most powerful tools in the small business owner's arsenal...</p>"
        },
        {
            id: "2",
            title: "Tax Season Checklist: 5 Things Every LLC Owner Misses",
            slug: "tax-season-checklist-llc",
            excerpt: "Don't leave money on the table. Our comprehensive checklist ensures you maximize deductions before the filing deadline.",
            featuredImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800",
            publishedDate: new Date(Date.now() - 86400000 * 2).toISOString(),
            authorName: "Sarah M.",
            categories: ["Compliance", "Checklist"],
            content: "<p>Every year, we see business owners overlook critical deductions...</p>"
        }
    ];

    return {
        posts: mockPosts.slice(0, limit),
        total: mockPosts.length
    };
};
