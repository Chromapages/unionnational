import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { GatedContentBox, GatedPdfButton } from "./GatedContentBox";

describe("playbook access controls", () => {
    it("does not claim that unavailable chapter content was unlocked or emailed", () => {
        render(<GatedContentBox locale="es" />);
        expect(screen.getByRole("status")).toHaveTextContent("no está disponible");
        expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
        expect(screen.queryByText(/unlocked|inbox/i)).not.toBeInTheDocument();
    });

    it("opens only an available PDF and makes no email-delivery claim", () => {
        const { rerender } = render(<GatedPdfButton pdfUrl="https://cdn.example.com/playbook.pdf" />);
        expect(screen.getByRole("link", { name: "Open PDF" })).toHaveAttribute("href", "https://cdn.example.com/playbook.pdf");
        expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
        rerender(<GatedPdfButton pdfUrl="javascript:alert(1)" />);
        expect(screen.queryByRole("link")).not.toBeInTheDocument();
        rerender(<GatedPdfButton />);
        expect(screen.queryByRole("link")).not.toBeInTheDocument();
    });
});
