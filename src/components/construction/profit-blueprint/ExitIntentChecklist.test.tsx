import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ExitIntentChecklist } from "./ExitIntentChecklist";

afterEach(() => {
    sessionStorage.clear();
    vi.unstubAllGlobals();
});

describe("ExitIntentChecklist", () => {
    it("opens from its keyboard trigger and restores focus after closing", async () => {
        const user = userEvent.setup();
        render(<ExitIntentChecklist />);
        const trigger = screen.getByRole("button", { name: "Request the Contractor Profit Leak Checklist" });
        trigger.focus();
        await user.keyboard("{Enter}");
        expect(screen.getByRole("dialog")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Close checklist request" })).toHaveFocus();
        await user.keyboard("{Escape}");
        await waitFor(() => expect(trigger).toHaveFocus());
    });

    it("traps focus, restores the page, and keeps a failed request retryable", async () => {
        const user = userEvent.setup();
        vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
        render(<><button type="button">Earlier control</button><ExitIntentChecklist /></>);
        const trigger = screen.getByRole("button", { name: "Earlier control" });
        trigger.focus();
        fireEvent.mouseLeave(document.body, { clientY: 0 });

        const dialog = await screen.findByRole("dialog", { name: /Contractor Profit Leak Checklist/ });
        expect(screen.getByRole("button", { name: "Close checklist request" })).toHaveFocus();
        expect(trigger).toHaveAttribute("inert");
        await user.keyboard("{Shift>}{Tab}{/Shift}");
        expect(screen.getByRole("button", { name: "Send Me the Checklist" })).toHaveFocus();
        await user.keyboard("{Tab}");
        expect(screen.getByRole("button", { name: "Close checklist request" })).toHaveFocus();

        await user.click(screen.getByRole("button", { name: "Send Me the Checklist" }));
        expect(screen.getByRole("textbox", { name: "First name" })).toHaveAttribute("aria-describedby", "checklist-first-name-error");
        expect(screen.getByText("First name is required")).toHaveAttribute("id", "checklist-first-name-error");
        await user.type(screen.getByRole("textbox", { name: "First name" }), "Alex");
        await user.type(screen.getByRole("textbox", { name: "Email address" }), "alex@example.com");
        await user.click(screen.getByRole("button", { name: "Send Me the Checklist" }));
        expect(await screen.findByText("We could not receive your request. Please try again.")).toHaveAttribute("role", "alert");
        expect(screen.getByRole("textbox", { name: "Email address" })).toHaveValue("alex@example.com");
        expect(dialog).toBeInTheDocument();

        await user.keyboard("{Escape}");
        await waitFor(() => expect(trigger).toHaveFocus());
        expect(trigger).not.toHaveAttribute("inert");
    });
});
