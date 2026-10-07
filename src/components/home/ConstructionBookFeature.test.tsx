import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { ComponentPropsWithoutRef } from "react";
import en from "@/messages/en.json";
import { ConstructionBookFeature } from "./ConstructionBookFeature";

vi.mock("next-intl/server", () => ({
    getTranslations: async () => (key: string) => key.split(".").reduce<unknown>((value, part) => (value as Record<string, unknown>)[part], en.ConsumerHome.constructionBook),
}));
vi.mock("@/i18n/navigation", () => ({ Link: (props: ComponentPropsWithoutRef<"a">) => <a {...props} /> }));

describe("construction book homepage feature", () => {
    it("offers only the existing product route with supplied copy and a full lazy cover", async () => {
        render(await ConstructionBookFeature());
        const section = screen.getByRole("region", { name: en.ConsumerHome.constructionBook.title });
        expect(within(section).getByRole("heading", { level: 2 })).toHaveTextContent(en.ConsumerHome.constructionBook.title);
        expect(within(section).getByText(en.ConsumerHome.constructionBook.body)).toBeVisible();
        expect(within(section).getByText(en.ConsumerHome.constructionBook.credit)).toBeVisible();
        expect(within(section).getByRole("list", { name: "Book topics" }).children).toHaveLength(4);
        expect(within(section).getByRole("list", { name: "What the book helps you explore" }).children).toHaveLength(3);
        expect(within(section).getAllByRole("link")).toHaveLength(1);
        expect(within(section).getByRole("link", { name: "Explore the Book" })).toHaveAttribute("href", "/shop/the-money-making-blueprint-for-construction-companies");
        const cover = within(section).getByRole("img", { name: en.ConsumerHome.constructionBook.coverAlt });
        expect(cover).toHaveAttribute("loading", "lazy");
        expect(cover).toHaveAttribute("width", "1620");
        expect(cover).toHaveAttribute("height", "1620");
        expect(cover).toHaveClass("object-contain");
        expect(cover).toHaveAttribute("src", expect.stringContaining("fa0de758c05a6ebc863e41bc185645feb27e3360"));
        expect(section.querySelector("form,input,button,h1")).toBeNull();
        expect(section.textContent).not.toMatch(/\$|Section 179|depreciation|S-Corp|1099|instant|download/i);
    });
});
