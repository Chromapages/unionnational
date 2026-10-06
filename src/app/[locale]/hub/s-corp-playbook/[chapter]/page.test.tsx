import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ChapterPage, { generateMetadata } from "./page";

const fetchMock = vi.hoisted(() => vi.fn());
const notFoundMock = vi.hoisted(() => vi.fn(() => { throw new Error("NEXT_NOT_FOUND"); }));

vi.mock("@/sanity/lib/live", () => ({ sanityFetch: fetchMock }));
vi.mock("@/sanity/lib/queries", () => ({ PLAYBOOK_QUERY: "playbook", PLAYBOOK_CHAPTER_QUERY: "chapter" }));
vi.mock("@/sanity/lib/image", () => ({ urlFor: () => ({ url: () => "/thumbnail.jpg" }) }));
vi.mock("@/components/layout/HeaderWrapper", () => ({ HeaderWrapper: () => null }));
vi.mock("@/components/layout/Footer", () => ({ Footer: () => null }));
vi.mock("@/components/hub/PlaybookNav", () => ({ PlaybookNav: () => null }));
vi.mock("@/components/hub/ImpactCard", () => ({ KeyTakeaways: () => null, ToolReferences: () => null }));
vi.mock("@/components/blog/RichText", () => ({ RichText: ({ value }: { value: unknown }) => <div>{JSON.stringify(value)}</div> }));
vi.mock("next/image", () => ({ default: ({ alt, src }: React.ComponentPropsWithoutRef<"img">) => <img alt={alt} src={src} /> }));
vi.mock("next/link", () => ({ default: ({ children, ...props }: React.ComponentPropsWithoutRef<"a">) => <a {...props}>{children}</a> }));
vi.mock("next/navigation", () => ({ notFound: notFoundMock }));

const playbook = { title: "S-Corp Playbook", chapters: [{ _id: "one", slug: "one", title: "Chapter One", chapterNumber: 1 }] };
const chapter = { title: "Chapter One", chapterNumber: 1, content: [], isGated: false };

async function renderChapter(data: Record<string, unknown>) {
    fetchMock.mockImplementation((request?: { query?: string }) => Promise.resolve({ data: request?.query === "playbook" ? playbook : { ...chapter, ...data } }));
    render(await ChapterPage({ params: Promise.resolve({ locale: "en", chapter: "one" }) }));
}

describe("playbook chapter media and gate", () => {
    beforeEach(() => {
        fetchMock.mockReset();
        notFoundMock.mockClear();
    });

    it("rejects a published chapter that is not attached to the S-Corp playbook", async () => {
        fetchMock.mockImplementation(({ query }: { query: string }) => Promise.resolve({ data: query === "playbook" ? playbook : chapter }));
        const props = { params: Promise.resolve({ locale: "en", chapter: "another-playbooks-chapter" }) };

        await expect(ChapterPage(props)).rejects.toThrow("NEXT_NOT_FOUND");
        const metadata = await generateMetadata(props);
        expect(metadata.title).toBe("Chapter Not Found");
        expect(metadata.alternates).toBeUndefined();
    });

    it("keeps public metadata for a marketing guidance chapter", async () => {
        fetchMock.mockImplementation(({ query }: { query: string }) => Promise.resolve({ data: query === "playbook" ? playbook : { ...chapter, isGated: true } }));
        const metadata = await generateMetadata({ params: Promise.resolve({ locale: "es", chapter: "one" }) });

        expect(metadata.alternates?.canonical).toBe("https://unionnationaltax.com/es/hub/s-corp-playbook/one");
        expect(metadata.robots).toBeUndefined();
    });

    it("provides a titled, keyboard-reachable embed when a video URL exists", async () => {
        await renderChapter({ videoEmbed: "https://www.youtube.com/embed/dQw4w9WgXcQ" });
        expect(fetchMock).toHaveBeenCalledWith(expect.objectContaining({ query: "playbook" }));
        expect(screen.getByTitle("Chapter One — video")).toHaveAttribute("src", "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&rel=0");
    });

    it("shows a thumbnail as a still image without a false play control", async () => {
        await renderChapter({ videoThumbnail: { asset: { _ref: "image-ref" }, alt: "Chapter preview" } });
        expect(screen.getByAltText("Chapter preview")).toBeInTheDocument();
        expect(screen.getByText("Video unavailable for now.")).toBeInTheDocument();
        expect(screen.queryByRole("button", { name: /play/i })).not.toBeInTheDocument();
    });

    it("keeps gated text out of the page and explains missing media", async () => {
        await renderChapter({ isGated: true, gatedContent: [{ secret: "Protected chapter content" }] });
        expect(screen.getByText("No video is available for this chapter.")).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "Request guidance" })).toHaveAttribute("href", "/en/contact");
        expect(screen.queryByText(/Protected chapter content/)).not.toBeInTheDocument();
    });
});
