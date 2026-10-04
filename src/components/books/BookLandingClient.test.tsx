import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { Book } from "@/types/book";
import BookLandingClient from "./BookLandingClient";

vi.mock("framer-motion", () => ({ motion: { div: ({ children }: { children: React.ReactNode }) => <div>{children}</div> } }));
vi.mock("next/image", () => ({ default: () => null }));
vi.mock("./BookHero", () => ({ BookHero: () => null }));
vi.mock("./BookLeadForm", () => ({ BookLeadForm: () => null }));
vi.mock("@/components/ui/RevealOnScroll", () => ({ RevealOnScroll: ({ children }: { children: React.ReactNode }) => <>{children}</> }));
vi.mock("@/components/shop/LearningObjectives", () => ({ LearningObjectives: () => null }));
vi.mock("@/components/shop/AuthorBio", () => ({ AuthorBio: () => null }));
vi.mock("@/components/shop/TestimonialWall", () => ({ TestimonialWall: () => null }));
vi.mock("@/components/services/RelatedServices", () => ({ RelatedServices: () => null }));

const book: Book = { _id: "book", title: "Test book", slug: "test-book" };

describe("book proof", () => {
    it("does not invent a reader count or rating when CMS data is absent", () => {
        render(<BookLandingClient book={book} />);
        expect(screen.queryByText(/500\+|thousands|Reader Rating/i)).not.toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Request Your Free Copy" })).toBeInTheDocument();
        expect(screen.queryByText(/send the book directly to your inbox/i)).not.toBeInTheDocument();
    });

    it("preserves a fractional rating and page count", () => {
        render(<BookLandingClient book={{ ...book, rating: 4.6, pageCount: 64 }} />);
        expect(screen.getByText("4.6")).toBeInTheDocument();
        expect(screen.getByText("64 pp")).toBeInTheDocument();
    });

});
