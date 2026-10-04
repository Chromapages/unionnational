import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { MultiStepContactForm } from "./MultiStepContactForm";
import { submitContactForm } from "@/app/[locale]/contact/actions";

vi.mock("next-intl", () => ({
    useLocale: () => "es",
    useTranslations: () => Object.assign((key: string) => ({
        "step1.fallbackTitle": "Choose your goal",
        "step1.continueButton": "Continue",
        "step1.errorMessage": "Choose a goal",
        "step1.goals.taxReduction": "Tax reduction",
        "confirmation.continue": "Continue to details",
        "step2.title": "Your details",
        "step2.submitButton": "Submit",
        "step2.labels.firstName": "First name",
        "step2.labels.lastName": "Last name",
        "step2.labels.email": "Email",
        "step2.labels.phone": "Phone",
        "step2.labels.message": "Message",
        "validation.firstNameRequired": "First name required",
        "validation.lastNameRequired": "Last name required",
        "validation.emailInvalid": "Valid email required",
        "validation.privacyRequired": "Privacy agreement required",
    } as Record<string, string>)[key] || key, { rich: () => "I agree to the privacy policy" }),
}));
vi.mock("@/app/[locale]/contact/actions", () => ({ submitContactForm: vi.fn() }));
vi.mock("@/components/seo/MetaPixel", () => ({ trackMetaEvent: vi.fn() }));

describe("MultiStepContactForm", () => {
    it("focuses step headings and associates validation messages with fields", async () => {
        const user = userEvent.setup();
        render(<MultiStepContactForm />);
        await user.click(screen.getByRole("button", { name: "Continue" }));
        expect(screen.getByRole("radio", { name: /Tax reduction/ })).toHaveFocus();
        expect(screen.getByRole("radiogroup")).toHaveAttribute("aria-describedby", "consultation-goal-error");
        await user.click(screen.getByRole("radio", { name: /Tax reduction/ }));
        await user.click(screen.getByRole("button", { name: "Continue" }));
        expect(screen.getByRole("heading", { name: "Tax reduction" })).toHaveFocus();
        await user.click(screen.getByRole("button", { name: "Continue to details" }));
        expect(screen.getByRole("heading", { name: "Your details" })).toHaveFocus();
        await user.click(screen.getByRole("button", { name: "Submit" }));
        const firstName = screen.getByRole("textbox", { name: "First name" });
        expect(firstName).toHaveAttribute("aria-invalid", "true");
        expect(firstName).toHaveAttribute("aria-describedby", "firstName-error");
        expect(screen.getByText("First name required")).toHaveAttribute("id", "firstName-error");
    });

    it("forwards the selected locale with the complete contact form", async () => {
        const user = userEvent.setup();
        vi.mocked(submitContactForm).mockResolvedValueOnce({ status: "error", message: "Retry" });
        render(<MultiStepContactForm />);
        await user.click(screen.getByRole("radio", { name: /Tax reduction/ }));
        await user.click(screen.getByRole("button", { name: "Continue" }));
        await user.click(screen.getByRole("button", { name: "Continue to details" }));
        await user.type(screen.getByRole("textbox", { name: "First name" }), "Alex");
        await user.type(screen.getByRole("textbox", { name: "Last name" }), "Rivera");
        await user.type(screen.getByRole("textbox", { name: "Email" }), "alex@example.com");
        await user.click(screen.getByRole("checkbox", { name: /privacy policy/i }));
        await user.click(screen.getByRole("button", { name: "Submit" }));
        await waitFor(() => expect(submitContactForm).toHaveBeenCalled());
        expect(vi.mocked(submitContactForm).mock.lastCall?.[1].get("locale")).toBe("es");
        expect(vi.mocked(submitContactForm).mock.lastCall?.[1].get("submissionId")).toEqual(expect.any(String));
    });
});
