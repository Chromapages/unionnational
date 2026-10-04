import { describe, expect, it, vi } from "vitest";
import { sanityFetch } from "@/sanity/lib/live";
import { generateMetadata } from "./page";

vi.mock("@/sanity/lib/live", () => ({ sanityFetch: vi.fn() }));

describe("book social image metadata", () => {
    it.each(["png", "jpg", "webp"])("builds a valid Sanity %s asset URL", async (extension) => {
        vi.mocked(sanityFetch).mockResolvedValue({
            data: {
                title: "Test Book",
                shortDescription: "A guide",
                seo: { noIndex: true, openGraphImage: { asset: { _ref: `image-abc123-1200x630-${extension}` } } },
            },
        } as never);

        const metadata = await generateMetadata({ params: Promise.resolve({ locale: "es", slug: "test-book" }) });
        const image = metadata.openGraph?.images;
        expect(Array.isArray(image) ? image[0] : image).toMatchObject({
            url: expect.stringMatching(new RegExp(`^https://cdn\\.sanity\\.io/images/[^/]+/[^/]+/abc123-1200x630\\.${extension}`)),
            width: 1200,
            height: 630,
        });
        expect(metadata.openGraph?.url).toBe("https://unionnationaltax.com/es/books/test-book");
        expect(metadata.robots).toEqual({ index: false, follow: false });
    });
});
