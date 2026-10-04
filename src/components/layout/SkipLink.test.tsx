import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SkipLink } from "./SkipLink";

describe("SkipLink", () => {
    it("moves focus to the main target when activated", () => {
        Object.defineProperty(HTMLElement.prototype, "scrollIntoView", { configurable: true, value: vi.fn() });
        render(<><SkipLink label="Skip to content" /><main id="main-content">Content</main></>);
        fireEvent.click(screen.getByRole("link", { name: "Skip to content" }));
        expect(document.activeElement).toBe(screen.getByRole("main"));
    });
});
