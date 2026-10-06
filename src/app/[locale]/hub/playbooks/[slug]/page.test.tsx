import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import PlaybookPage, { generateMetadata } from "./page";
import ChapterPage from "./[chapter]/page";

const fetchMock = vi.hoisted(() => vi.fn());
const notFoundMock = vi.hoisted(() => vi.fn(() => { throw new Error("NEXT_NOT_FOUND"); }));
const permanentRedirectMock = vi.hoisted(() => vi.fn(() => { throw new Error("NEXT_REDIRECT"); }));

vi.mock("@/sanity/lib/live", () => ({ sanityFetch: fetchMock }));
vi.mock("@/sanity/lib/queries", () => ({ PLAYBOOK_QUERY: "playbook", PLAYBOOK_CHAPTER_QUERY: "chapter" }));
vi.mock("@/components/layout/HeaderWrapper", () => ({ HeaderWrapper: () => null }));
vi.mock("@/components/layout/Footer", () => ({ Footer: () => null }));
vi.mock("@/components/hub/PlaybookNav", () => ({ PlaybookNav: () => null }));
vi.mock("@/components/hub/ImpactCard", () => ({ KeyTakeaways: () => null, ToolReferences: () => null }));
vi.mock("@/components/blog/RichText", () => ({ RichText: ({ value }: { value: unknown }) => <div>{JSON.stringify(value)}</div> }));
vi.mock("next/image", () => ({ default: () => null }));
vi.mock("next/link", () => ({ default: ({ children, ...props }: React.ComponentPropsWithoutRef<"a">) => <a {...props}>{children}</a> }));
vi.mock("next/navigation", () => ({ notFound: notFoundMock, permanentRedirect: permanentRedirectMock }));

const playbooks = {
    "contractor-tax": {
        title: "Contractor Tax Guide",
        description: "Contractor guidance",
        chapters: [{ _id: "chapter-one", title: "Deductions", slug: "deductions", chapterNumber: 1 }],
    },
    "restaurant-margin": {
        title: "Restaurant Margin Playbook",
        description: "Restaurant guidance",
        chapters: [{ _id: "chapter-two", title: "Prime Cost", slug: "prime-cost", chapterNumber: 1, isGated: true }],
    },
};

const chapters = {
    deductions: { title: "Deductions", chapterNumber: 1, content: [], isGated: false },
    "prime-cost": { title: "Prime Cost", chapterNumber: 1, content: [], isGated: true, gatedContent: [{ secret: "Private worksheet" }] },
};

type PlaybookSlug = keyof typeof playbooks;
type ChapterSlug = keyof typeof chapters;

beforeEach(() => {
    fetchMock.mockReset();
    notFoundMock.mockClear();
    permanentRedirectMock.mockClear();
    fetchMock.mockImplementation(({ query, params }: { query: string; params: { slug: string } }) => Promise.resolve({
        data: query === "playbook" ? playbooks[params.slug as PlaybookSlug] ?? null : chapters[params.slug as ChapterSlug] ?? null,
    }));
});

describe("slug-specific playbook journey", () => {
    it.each([
        ["contractor-tax", "Contractor Tax Guide", "deductions"],
        ["restaurant-margin", "Restaurant Margin Playbook", "prime-cost"],
    ])("renders %s with its own chapter destination", async (slug, title, chapter) => {
        render(await PlaybookPage({ params: Promise.resolve({ locale: "en", slug }) }));

        expect(screen.getByRole("heading", { name: title, level: 1 })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: new RegExp(chapter === "deductions" ? "Deductions" : "Prime Cost") }))
            .toHaveAttribute("href", `/en/hub/playbooks/${slug}/${chapter}`);
        expect(fetchMock).toHaveBeenCalledWith({ query: "playbook", params: { slug, locale: "en" } });
    });

    it("uses the selected playbook title in metadata", async () => {
        const metadata = await generateMetadata({ params: Promise.resolve({ locale: "es", slug: "restaurant-margin" }) });
        expect(metadata.title).toBe("Restaurant Margin Playbook | Authority Hub");
        expect(metadata.alternates?.canonical).toBe("https://unionnationaltax.com/es/hub/playbooks/restaurant-margin");
    });

    it("returns a missing page for an unavailable playbook", async () => {
        await expect(PlaybookPage({ params: Promise.resolve({ locale: "en", slug: "unavailable" }) })).rejects.toThrow("NEXT_NOT_FOUND");
        expect(notFoundMock).toHaveBeenCalledOnce();
    });

    it("keeps S-Corp on its existing localized route", async () => {
        await expect(PlaybookPage({ params: Promise.resolve({ locale: "es", slug: "s-corp-playbook" }) })).rejects.toThrow("NEXT_REDIRECT");
        expect(permanentRedirectMock).toHaveBeenCalledWith("/es/hub/s-corp-playbook");
        expect(fetchMock).not.toHaveBeenCalled();
        const metadata = await generateMetadata({ params: Promise.resolve({ locale: "es", slug: "s-corp-playbook" }) });
        expect(metadata.alternates?.canonical).toBe("https://unionnationaltax.com/es/hub/s-corp-playbook");
    });

    it("keeps chapter navigation and optional guidance in the requested locale without exposing unused legacy content", async () => {
        render(await ChapterPage({ params: Promise.resolve({ locale: "es", slug: "restaurant-margin", chapter: "prime-cost" }) }));

        expect(screen.getByRole("heading", { name: "Prime Cost", level: 1 })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /Volver a la guía/ })).toHaveAttribute("href", "/es/hub/playbooks/restaurant-margin");
        expect(screen.getByRole("link", { name: "Solicitar orientación" })).toHaveAttribute("href", "/es/contact");
        expect(screen.queryByRole("status")).not.toBeInTheDocument();
        expect(screen.queryByText("Private worksheet")).not.toBeInTheDocument();
    });

    it("rejects a chapter from another playbook", async () => {
        await expect(ChapterPage({ params: Promise.resolve({ locale: "en", slug: "restaurant-margin", chapter: "deductions" }) }))
            .rejects.toThrow("NEXT_NOT_FOUND");
    });

    it("redirects a generic S-Corp chapter to the legacy chapter route", async () => {
        await expect(ChapterPage({ params: Promise.resolve({ locale: "en", slug: "s-corp-playbook", chapter: "deductions" }) }))
            .rejects.toThrow("NEXT_REDIRECT");
        expect(permanentRedirectMock).toHaveBeenCalledWith("/en/hub/s-corp-playbook/deductions");
    });
});
