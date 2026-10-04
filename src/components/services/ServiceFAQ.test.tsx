import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ServiceFAQ } from "./ServiceFAQ";

describe("service FAQ keyboard access", () => {
    it("keeps answers linked to their buttons and supports Enter and Space", async () => {
        const user = userEvent.setup();
        render(<ServiceFAQ items={[
            { question: "First test question", answer: "First fixture answer" },
            { question: "Second test question", answer: "Second fixture answer" },
        ]} />);
        const first = screen.getByRole("button", { name: "First test question" });
        const second = screen.getByRole("button", { name: "Second test question" });
        const firstPanel = document.getElementById(first.getAttribute("aria-controls")!);
        const secondPanel = document.getElementById(second.getAttribute("aria-controls")!);
        expect(firstPanel).toBeVisible();
        expect(secondPanel).not.toBeVisible();
        expect(secondPanel).toHaveAttribute("aria-labelledby", second.id);

        await user.tab();
        expect(first).toHaveFocus();
        await user.keyboard("{Enter}");
        expect(first).toHaveAttribute("aria-expanded", "false");
        expect(firstPanel).not.toBeVisible();
        await user.tab();
        expect(second).toHaveFocus();
        await user.keyboard(" ");
        expect(second).toHaveAttribute("aria-expanded", "true");
        expect(secondPanel).toBeVisible();
    });
});
