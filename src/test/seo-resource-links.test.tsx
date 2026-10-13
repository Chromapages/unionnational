import { render, screen, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { evaluate, parse } from "groq-js";
import IndustryPage from "@/app/[locale]/hub/industries/[slug]/page";
import { HubHero } from "@/components/hub/HubHero";
import { BlogCard } from "@/components/blog/BlogCard";
import { INDUSTRY_VERTICAL_QUERY } from "@/sanity/lib/queries/resource-queries";
import { BLOG_POSTS_QUERY } from "@/sanity/lib/queries/blog-queries";

const fetchMock = vi.hoisted(() => vi.fn());
vi.mock("@/sanity/lib/live", () => ({ sanityFetch: fetchMock }));
vi.mock("@/components/layout/HeaderWrapper", () => ({ HeaderWrapper: () => null }));
vi.mock("@/components/layout/Footer", () => ({ Footer: () => null }));
vi.mock("@/components/hub/VerticalHero", () => ({ VerticalHero: () => null }));
vi.mock("@/components/ui/RevealOnScroll", () => ({ RevealOnScroll: ({ children }: { children: React.ReactNode }) => children }));
vi.mock("next/image", () => ({ default: () => null }));
vi.mock("next/link", () => ({ default: ({ children, ...props }: React.ComponentPropsWithoutRef<"a">) => <a {...props}>{children}</a> }));
vi.mock("@/i18n/navigation", () => ({ Link: ({ href, children, ...props }: React.ComponentPropsWithoutRef<"a">) => <a {...props} href={`/es${href}`}>{children}</a> }));

afterEach(cleanup);

describe("SEO resource links", () => {
    it("keeps articles beyond the first twelve discoverable in the archive query", async () => {
        const dataset = Array.from({ length: 13 }, (_, index) => ({
            _id: `post-${index}`, _type: "blogPost", title: `Article ${index}`, slug: { current: `article-${index}` }, publishedAt: "2026-10-01T00:00:00Z",
        }));
        const posts = await (await evaluate(parse(BLOG_POSTS_QUERY), { dataset, params: { locale: "en" } })).get();
        expect(posts).toHaveLength(13);
        expect(posts.map((post: { slug: string }) => post.slug)).toContain("article-12");
    });

    it("omits deleted category references instead of returning null categories to cards", async () => {
        const dataset = [
            { _id: "post", _type: "blogPost", title: "Tax Guide", slug: { current: "tax-guide" }, categories: ["deleted", "tax"].map(_ref => ({ _type: "reference", _ref })) },
            { _id: "tax", _type: "blogCategory", title: "Tax", slug: { current: "tax" } },
        ];
        const posts = await (await evaluate(parse(BLOG_POSTS_QUERY), { dataset, params: { locale: "en" } })).get();
        expect(posts[0].categories).toEqual([{ title: "Tax", slug: "tax" }]);
    });

    it("projects the owning published playbook and links string slugs to their localized canonical routes", async () => {
        const dataset = [
            { _id: "industry", _type: "industryVertical", isActive: true, slug: { current: "contractors" }, title: "Contractors", featuredPlaybookChapters: ["generic-chapter", "scorp-chapter", "orphan"].map(_ref => ({ _type: "reference", _ref })), relatedPlaybooks: ["generic", "scorp"].map(_ref => ({ _type: "reference", _ref })) },
            { _id: "generic", _type: "playbook", title: "Contractor Guide", slug: { current: "contractor-guide" }, chapters: [{ _type: "reference", _ref: "generic-chapter" }] },
            { _id: "scorp", _type: "playbook", title: "S-Corp Guide", slug: { current: "s-corp-playbook" }, chapters: [{ _type: "reference", _ref: "scorp-chapter" }] },
            { _id: "private", _type: "playbook", isPublished: false, slug: { current: "private" }, chapters: [{ _type: "reference", _ref: "orphan" }] },
            { _id: "generic-chapter", _type: "playbookChapter", title: "Deductions", slug: { current: "deductions" }, chapterNumber: 1 },
            { _id: "scorp-chapter", _type: "playbookChapter", title: "Compensation", slug: { current: "compensation" }, chapterNumber: 2 },
            { _id: "orphan", _type: "playbookChapter", title: "Orphan", slug: { current: "orphan" }, chapterNumber: 3 },
        ];
        const data = await (await evaluate(parse(INDUSTRY_VERTICAL_QUERY), { dataset, params: { locale: "es", slug: "contractors" } })).get();
        expect(data.featuredPlaybookChapters.map((chapter: { playbookSlug: string | null }) => chapter.playbookSlug)).toEqual(["contractor-guide", "s-corp-playbook", null]);
        fetchMock.mockResolvedValue({ data });
        render(await IndustryPage({ params: Promise.resolve({ locale: "es", slug: "contractors" }) }));
        expect(screen.getByRole("link", { name: /Deductions/ })).toHaveAttribute("href", "/es/hub/playbooks/contractor-guide/deductions");
        expect(screen.getByRole("link", { name: /Compensation/ })).toHaveAttribute("href", "/es/hub/s-corp-playbook/compensation");
        expect(screen.getByRole("link", { name: /Contractor Guide/ })).toHaveAttribute("href", "/es/hub/playbooks/contractor-guide");
        expect(screen.getByRole("link", { name: /S-Corp Guide/ })).toHaveAttribute("href", "/es/hub/s-corp-playbook");
        expect(screen.queryByRole("link", { name: /Orphan/ })).not.toBeInTheDocument();
    });

    it("links each featured playbook to its own locale-aware route", () => {
        render(<HubHero title="Guides" subtitle="Resources" featuredPlaybooks={[
            { _id: "generic", slug: "contractor-guide", title: "Contractor Guide" },
            { _id: "scorp", slug: "s-corp-playbook", title: "S-Corp Guide" },
        ]} />);
        expect(screen.getByRole("link", { name: "Contractor Guide" })).toHaveAttribute("href", "/es/hub/playbooks/contractor-guide");
        expect(screen.getByRole("link", { name: "S-Corp Guide" })).toHaveAttribute("href", "/es/hub/s-corp-playbook");
    });

    it("keeps blog archive article links in the current locale", () => {
        render(<BlogCard post={{ _id: "post", _type: "blogPost", _rev: "1", _createdAt: "2026-10-01T00:00:00Z", _updatedAt: "2026-10-01T00:00:00Z", title: "Tax Guide", slug: "tax-guide", publishedAt: "2026-10-01T00:00:00Z", excerpt: "Tax guidance" }} />);
        expect(screen.getByRole("link")).toHaveAttribute("href", "/es/blog/tax-guide");
    });
});
