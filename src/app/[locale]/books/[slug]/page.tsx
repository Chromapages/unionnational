import { BOOK_LANDING_QUERY, BOOK_SLUGS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import { client } from "@/sanity/lib/client";
import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import BookLandingClient from "@/components/books/BookLandingClient";
import { Book } from "@/types/book";

export const revalidate = 60;

interface BookSlugRecord {
    slug: string;
}

export async function generateStaticParams() {
    const books = await client.fetch<BookSlugRecord[]>(BOOK_SLUGS_QUERY);
    const locales = ["en", "es"];

    return books.flatMap((book) =>
        locales.map((locale) => ({
            locale,
            slug: book.slug,
        }))
    );
}

export async function generateMetadata(props: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
    const { slug, locale } = await props.params;
    const { data: book } = await sanityFetch({ query: BOOK_LANDING_QUERY, params: { slug, locale } });

    const typedBook = book as Book | null;
    if (!typedBook) return { title: "Book Not Found" };

    const { seo } = typedBook;
    const metaTitle = seo?.metaTitle || `${typedBook.title} — Free Download | Union National Tax`;
    const metaDescription = seo?.metaDescription || typedBook.shortDescription || `Get your free copy of ${typedBook.title} and start building real tax strategy.`;

    let ogImageUrl = "";
    if (seo?.openGraphImage?.asset) {
        ogImageUrl = `https://cdn.sanity.io/images/production/${seo.openGraphImage.asset._ref.replace("image-", "").replace("-png", ".png").replace("-jpg", ".jpg")}`;
    } else {
        const ogUrl = new URL(`https://unionnationaltax.com/api/og`);
        ogUrl.searchParams.set("title", typedBook.title);
        ogUrl.searchParams.set("subtitle", "Free Tax Strategy Guide");
        ogUrl.searchParams.set("type", "book");
        ogImageUrl = ogUrl.toString();
    }

    return {
        title: metaTitle,
        description: metaDescription,
        openGraph: {
            title: seo?.metaTitle || `${typedBook.title} — Free Download`,
            description: metaDescription,
            type: "article",
            url: `https://unionnationaltax.com/books/${slug}`,
            images: [
                {
                    url: ogImageUrl,
                    width: 1200,
                    height: 630,
                    alt: typedBook.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: seo?.metaTitle || typedBook.title,
            description: metaDescription,
            images: [ogImageUrl],
        },
    };
}

export default async function BookPage(props: { params: Promise<{ locale: string; slug: string }> }) {
    const { slug, locale } = await props.params;

    const { data: book } = await sanityFetch({ query: BOOK_LANDING_QUERY, params: { slug, locale } });
    const typedBook = book as Book | null;

    if (!typedBook) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-surface flex flex-col font-sans text-brand-900 antialiased selection:bg-gold-500 selection:text-white overflow-x-hidden">
            <HeaderWrapper />

            <main id="main-content">
                <BookLandingClient book={typedBook} />
            </main>

            <Footer />
        </div>
    );
}
