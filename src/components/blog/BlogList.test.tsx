import { fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { expect, it } from "vitest";
import en from "@/messages/en.json";
import es from "@/messages/es.json";
import type { SanityBlogPost } from "@/types/sanity";
import { BlogList } from "./BlogList";

it.each([
    { locale: "en", messages: en, title: "No articles published yet." },
    { locale: "es", messages: es, title: "Aún no hay artículos publicados." },
])("shows the catalog empty message without filter controls ($locale)", ({ locale, messages, title }) => {
    render(<NextIntlClientProvider locale={locale} messages={messages}><BlogList initialPosts={[]} /></NextIntlClientProvider>);

    expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
    expect(screen.queryByPlaceholderText("Search articles...")).not.toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
});

it("lets readers clear a no-match search and recover a published article", () => {
    const post: SanityBlogPost = {
        _id: "fixture",
        _type: "blogPost",
        _createdAt: "2026-01-01T00:00:00Z",
        _updatedAt: "2026-01-01T00:00:00Z",
        _rev: "fixture",
        title: "Tax records checklist",
        slug: "tax-records-checklist",
        publishedAt: "2026-01-01T00:00:00Z",
    };
    render(<NextIntlClientProvider locale="en" messages={en}><BlogList initialPosts={[post]} /></NextIntlClientProvider>);

    const search = screen.getByPlaceholderText("Search articles...");
    const title = /Tax records checklist/;
    expect(screen.getByRole("link", { name: title })).toHaveAttribute("href", "/blog/tax-records-checklist");

    fireEvent.change(search, { target: { value: "not in the catalog" } });
    expect(screen.queryByRole("link", { name: title })).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "No insights found." })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "All Strategy" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Clear Filters" }));
    expect(search).toHaveValue("");
    expect(screen.getByRole("link", { name: title })).toBeInTheDocument();
});
