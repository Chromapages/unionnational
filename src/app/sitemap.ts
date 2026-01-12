import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

// Base URL - ensure this is updated with your production URL
export const baseUrl = "https://unionnationaltax.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const routes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/services`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/pricing`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/faq`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.5,
        },
    ];

    // Fetch dynamic routes from Sanity
    const query = groq`{
    "services": *[_type == "service" && defined(slug.current)] { "slug": slug.current, _updatedAt },
    "posts": *[_type == "post" && defined(slug.current)] { "slug": slug.current, _updatedAt },
    "legals": *[_type == "legalPage" && defined(slug.current)] { "slug": slug.current, _updatedAt }
  }`;

    const { services, posts, legals } = await client.fetch(query);

    const serviceRoutes = services.map((service: any) => ({
        url: `${baseUrl}/services/${service.slug}`,
        lastModified: new Date(service._updatedAt),
        changeFrequency: "weekly" as const,
        priority: 0.7,
    }));

    const postRoutes = posts.map((post: any) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post._updatedAt),
        changeFrequency: "weekly" as const,
        priority: 0.6,
    }));

    const legalRoutes = legals.map((page: any) => ({
        url: `${baseUrl}/legal/${page.slug}`,
        lastModified: new Date(page._updatedAt),
        changeFrequency: "yearly" as const,
        priority: 0.3,
    }));

    return [...routes, ...serviceRoutes, ...postRoutes, ...legalRoutes];
}
