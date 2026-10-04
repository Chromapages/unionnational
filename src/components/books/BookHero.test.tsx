import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { Book } from "@/types/book";
import { BookHero } from "./BookHero";

vi.mock("framer-motion", () => ({ motion: { div: ({ children }: { children: React.ReactNode }) => <div>{children}</div> } }));
vi.mock("next/image", () => ({ default: () => null }));

const book: Book = { _id: "book", title: "Test book", slug: "test-book" };

describe("book hero rating", () => {
    it("shows the supplied fractional value and hides a missing value", () => {
        const { rerender } = render(<BookHero book={{ ...book, rating: 4.6 }} />);
        expect(screen.getByText("4.6 out of 5 Reader Rating")).toBeInTheDocument();
        rerender(<BookHero book={book} />);
        expect(screen.queryByText(/Reader Rating/)).not.toBeInTheDocument();
    });
});
