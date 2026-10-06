import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { GatedContentBox, GatedPdfButton } from "./GatedContentBox";

describe("playbook marketing resources", () => {
    it.each(["en", "es"])("offers a truthful guidance request in %s without an unlock or email promise", locale => {
        render(<GatedContentBox locale={locale} />);
        expect(screen.getByRole("link")).toHaveAttribute("href", `/${locale}/contact`);
        expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
        expect(screen.queryByText(/unlock|inbox|desbloque|bandeja/i)).not.toBeInTheDocument();
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
