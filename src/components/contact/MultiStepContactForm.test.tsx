import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MultiStepContactForm } from "./MultiStepContactForm";
import { submitContactForm } from "@/app/[locale]/contact/actions";

const translationLocale = vi.hoisted(() => ({ industry: "en" as "en" | "es" }));
vi.mock("next-intl", async (importOriginal) => {
    const { createTranslator } = await importOriginal<typeof import("next-intl")>();
    const { default: messages } = await import("@/messages/en.json");
    const { default: spanishMessages } = await import("@/messages/es.json");
    return {
    useLocale: () => "es",
    useTranslations: (namespace: string) => namespace === "IndustryContact" ? createTranslator({ locale: translationLocale.industry, messages: translationLocale.industry === "es" ? spanishMessages : messages, namespace: "IndustryContact" }) : Object.assign((key: string) => ({
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
    };
});
vi.mock("@/i18n/navigation", () => ({ Link: ({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) => <a href={href} className={className}>{children}</a> }));
vi.mock("@/app/[locale]/contact/actions", () => ({ submitContactForm: vi.fn() }));
vi.mock("@/components/seo/MetaPixel", () => ({ trackMetaEvent: vi.fn() }));

describe("MultiStepContactForm", () => {
    beforeEach(() => vi.mocked(submitContactForm).mockReset());
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

describe("industry inquiries", () => {
    beforeEach(() => {
        vi.mocked(submitContactForm).mockReset();
        translationLocale.industry = "en";
    });

    async function fillInquiry(user: ReturnType<typeof userEvent.setup>) {
        await user.type(screen.getByRole("textbox", { name: "First name" }), "Alex");
        await user.type(screen.getByRole("textbox", { name: "Last name" }), "Rivera");
        await user.type(screen.getByRole("textbox", { name: "Email" }), "synthetic@audit.example.test");
        await user.click(screen.getByRole("checkbox", { name: /privacy policy/i }));
    }

    it.each(["restaurants", "construction"] as const)("sends a minimal %s inquiry and confirms receipt only", async (industry) => {
        vi.mocked(submitContactForm).mockResolvedValueOnce({ status: "success" });
        const user = userEvent.setup();
        render(<MultiStepContactForm industry={industry} title="Ask about your business" subtitle="Share your question." />);
        expect(screen.getByRole("heading", { name: "Ask about your business" })).toBeInTheDocument();
        expect(screen.queryByRole("radiogroup")).not.toBeInTheDocument();
        expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
        expect(screen.getByRole("link", { name: "Privacy Policy" })).toHaveAttribute("href", "/legal/privacy-policy");
        expect(screen.getByRole("link", { name: "Privacy Policy" })).toHaveClass("inline-flex", "min-h-11", "items-center");
        expect(screen.getByRole("checkbox", { name: /privacy policy/i }).closest("label")).toHaveClass("min-h-11");
        expect(screen.getByRole("textbox", { name: "Your question (optional)" })).toHaveAttribute("aria-describedby", "message-warning");
        expect(screen.getByText(/Do not include Social Security numbers/)).toBeInTheDocument();
        expect(screen.getByText(/This form does not schedule/)).toHaveClass("text-slate-700");
        expect(screen.getByRole("textbox", { name: "First name" })).toHaveClass("border-slate-700", "focus-visible:ring-brand-900");
        expect(screen.getByRole("button", { name: "Send inquiry" })).toHaveClass("focus-visible:outline-brand-900");
        expect(document.querySelector('input[type="file"]')).toBeNull();
        expect(screen.queryByText(/2 business hours|45 seconds|free|30-minute|match you/i)).not.toBeInTheDocument();
        await fillInquiry(user);
        await user.click(screen.getByRole("button", { name: "Send inquiry" }));
        await screen.findByRole("heading", { name: "Inquiry received." });
        expect(screen.getByRole("heading", { name: "Inquiry received." })).toHaveFocus();
        const submitted = vi.mocked(submitContactForm).mock.lastCall?.[1];
        expect(submitted?.get("industry")).toBe(industry);
        expect(submitted?.get("goal")).toBe("industry-inquiry");
        expect(submitted?.get("locale")).toBe("es");
        expect(submitted?.get("phone")).toBe("");
        expect(submitted?.get("message")).toBe("");
        expect(submitted?.get("submissionId")).toEqual(expect.any(String));
        expect(screen.queryByText(/2 business hours|30-minute|match you/i)).not.toBeInTheDocument();
    });

    it("focuses validation errors and requires consent before delivery", async () => {
        const user = userEvent.setup();
        render(<MultiStepContactForm industry="restaurants" />);
        await user.click(screen.getByRole("button", { name: "Send inquiry" }));
        const firstName = screen.getByRole("textbox", { name: "First name" });
        expect(firstName).toHaveAttribute("aria-invalid", "true");
        expect(firstName).toHaveAttribute("aria-describedby", "firstName-error");
        expect(firstName).toHaveFocus();
        expect(submitContactForm).not.toHaveBeenCalled();
        await fillInquiry(user);
        await user.click(screen.getByRole("checkbox", { name: /privacy policy/i }));
        await user.click(screen.getByRole("button", { name: "Send inquiry" }));
        expect(screen.getByText("Agree to the privacy policy before sending your inquiry.")).toHaveAttribute("id", "privacy-error");
        expect(submitContactForm).not.toHaveBeenCalled();
    });

    it("blocks duplicate sends and preserves details and identity for a retry", async () => {
        let rejectDelivery!: (reason: Error) => void;
        vi.mocked(submitContactForm).mockImplementationOnce(() => new Promise((_resolve, reject) => { rejectDelivery = reject; }));
        const user = userEvent.setup();
        render(<MultiStepContactForm industry="construction" />);
        await fillInquiry(user);
        await user.type(screen.getByRole("textbox", { name: "Your question (optional)" }), "Synthetic job-costing inquiry.");
        await user.dblClick(screen.getByRole("button", { name: "Send inquiry" }));
        expect(submitContactForm).toHaveBeenCalledTimes(1);
        expect(screen.getByRole("button", { name: "Sending inquiry…" })).toBeDisabled();
        const firstId = vi.mocked(submitContactForm).mock.lastCall?.[1].get("submissionId");
        rejectDelivery(new Error("Synthetic provider failure"));
        await screen.findByRole("alert");
        expect(screen.getByRole("textbox", { name: "First name" })).toHaveValue("Alex");
        expect(screen.getByRole("textbox", { name: "Your question (optional)" })).toHaveValue("Synthetic job-costing inquiry.");
        expect(screen.queryByRole("heading", { name: "Inquiry received." })).not.toBeInTheDocument();
        vi.mocked(submitContactForm).mockResolvedValueOnce({ status: "error", message: "Synthetic provider details" });
        await user.click(screen.getByRole("button", { name: "Retry inquiry" }));
        await screen.findByRole("button", { name: "Retry inquiry" });
        expect(submitContactForm).toHaveBeenCalledTimes(2);
        expect(vi.mocked(submitContactForm).mock.lastCall?.[1].get("submissionId")).toBe(firstId);
        expect(screen.queryByText("Synthetic provider details")).not.toBeInTheDocument();
    });

    it("announces Spanish field and delivery errors without exposing English schema messages", async () => {
        translationLocale.industry = "es";
        const user = userEvent.setup();
        render(<MultiStepContactForm industry="restaurants" />);
        await user.click(screen.getByRole("button", { name: "Enviar consulta" }));
        const firstName = screen.getByRole("textbox", { name: "Nombre" });
        expect(firstName).toHaveFocus();
        expect(screen.getByText("Ingrese un nombre de 2 a 100 caracteres.")).toHaveAttribute("role", "alert");
        expect(screen.getByText("Ingrese una dirección de correo electrónico válida.")).toHaveAttribute("id", "email-error");
        expect(screen.getByText("Acepte la política de privacidad antes de enviar su consulta.")).toHaveAttribute("id", "privacy-error");
        expect(screen.queryByText(/First name is required|valid email address|must agree/i)).not.toBeInTheDocument();
        expect(screen.getByRole("textbox", { name: "Su pregunta (opcional)" })).toHaveAttribute("aria-describedby", "message-warning");
        await user.type(firstName, "Alex");
        await user.type(screen.getByRole("textbox", { name: "Apellido" }), "Rivera");
        await user.type(screen.getByRole("textbox", { name: "Correo electrónico" }), "synthetic@audit.example.test");
        await user.click(screen.getByRole("checkbox", { name: /Política de privacidad/i }));
        fireEvent.change(screen.getByRole("textbox", { name: "Teléfono (opcional)" }), { target: { value: "1".repeat(31) } });
        fireEvent.change(screen.getByRole("textbox", { name: "Su pregunta (opcional)" }), { target: { value: "a".repeat(2_001) } });
        await user.click(screen.getByRole("button", { name: "Enviar consulta" }));
        expect(screen.getByText("Use un máximo de 30 caracteres para su teléfono.")).toHaveAttribute("id", "phone-error");
        expect(screen.getByText("Use un máximo de 2.000 caracteres para su pregunta.")).toHaveAttribute("id", "message-error");
        expect(submitContactForm).not.toHaveBeenCalled();
        fireEvent.change(screen.getByRole("textbox", { name: "Teléfono (opcional)" }), { target: { value: "" } });
        fireEvent.change(screen.getByRole("textbox", { name: "Su pregunta (opcional)" }), { target: { value: "Consulta sintética." } });
        vi.mocked(submitContactForm).mockResolvedValueOnce({ status: "error", message: "Invalid form data." });
        await user.click(screen.getByRole("button", { name: "Enviar consulta" }));
        await screen.findByRole("button", { name: "Reintentar consulta" });
        expect(screen.getByRole("alert")).toHaveTextContent("No pudimos confirmar la entrega.");
        expect(screen.queryByText("Invalid form data.")).not.toBeInTheDocument();
        expect(screen.getByRole("textbox", { name: "Su pregunta (opcional)" })).toHaveValue("Consulta sintética.");
    });
});
