import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ReactNode } from "react";
import { HealthCheckSurvey } from "./HealthCheckSurvey";
import messages from "@/messages/en.json";

vi.mock("next-intl", async importOriginal => {
    const {createTranslator} = await importOriginal<typeof import("next-intl")>();
    return {useLocale: () => "en", useTranslations: (namespace: "HealthCheck" | "HealthCheck.capture") => createTranslator({locale: "en", messages, namespace})};
});
vi.mock("@/i18n/navigation", () => ({ Link: ({ children, href, ...props }: { children: ReactNode; href: string }) => <a href={`/en${href}`} {...props}>{children}</a> }));
vi.mock("framer-motion", () => ({
    AnimatePresence: ({ children }: { children: ReactNode }) => children,
    motion: { div: ({ children }: { children: ReactNode }) => <div>{children}</div> },
}));
vi.mock("./InsightPanel", () => ({ InsightPanel: () => null }));
vi.mock("./ResultVaultPreview", () => ({ ResultVaultPreview: () => null }));
vi.mock("./ResultDashboard", () => ({ ResultDashboard: () => <p>Assessment results</p> }));

describe("health survey question transitions", () => {
    beforeEach(() => vi.useFakeTimers());
    afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });

    it("accepts one answer and advances only one question after rapid clicks", () => {
        render(<HealthCheckSurvey />);
        fireEvent.click(screen.getByRole("button", { name: /Start Diagnostic/ }));
        const option = screen.getByRole("button", { name: /S-Corp/ });
        fireEvent.click(option);
        fireEvent.click(option);
        expect(option).toBeDisabled();
        act(() => vi.advanceTimersByTime(400));
        expect(screen.getByRole("heading", { name: /Have you filed all federal/ })).toBeInTheDocument();
        act(() => vi.advanceTimersByTime(400));
        expect(screen.getByRole("heading", { name: /Have you filed all federal/ })).toBeInTheDocument();
    });

    it("cancels a pending answer transition when going back", () => {
        render(<HealthCheckSurvey />);
        fireEvent.click(screen.getByRole("button", { name: /Start Diagnostic/ }));
        fireEvent.click(screen.getByRole("button", { name: /S-Corp/ }));
        act(() => vi.advanceTimersByTime(400));
        fireEvent.click(screen.getByRole("button", { name: "Yes, all filed on time" }));
        fireEvent.click(screen.getByRole("button", { name: /Previous Question/ }));
        act(() => vi.advanceTimersByTime(400));
        expect(screen.getByRole("heading", { name: /What type of business entity/ })).toBeInTheDocument();
    });

    it("retains the identity of the Not sure zero answer when revisiting", () => {
        render(<HealthCheckSurvey />);
        fireEvent.click(screen.getByRole("button", { name: /Start Diagnostic/ }));
        fireEvent.click(screen.getByRole("button", { name: /S-Corp/ }));
        act(() => vi.advanceTimersByTime(400));
        fireEvent.click(screen.getByRole("button", { name: "Not sure" }));
        act(() => vi.advanceTimersByTime(400));
        fireEvent.click(screen.getByRole("button", { name: /Previous Question/ }));
        expect(screen.getByRole("button", { name: "Not sure" })).toHaveAttribute("aria-pressed", "true");
        expect(screen.getByRole("button", { name: "Missing 1-2 returns" })).toHaveAttribute("aria-pressed", "false");
        expect(screen.getByRole("heading", { name: /Have you filed all federal/ })).toHaveFocus();
    });

    const reachCapture = () => {
        render(<HealthCheckSurvey />);
        fireEvent.click(screen.getByRole("button", { name: /Start Diagnostic/ }));
        for (let step = 1; step <= 7; step++) {
            fireEvent.click(within(screen.getByRole("group")).getAllByRole("button")[0]);
            act(() => vi.advanceTimersByTime(400));
        }
        fireEvent.change(screen.getByLabelText("First Name"), { target: { value: "Ava" } });
        fireEvent.change(screen.getByLabelText("Last Name"), { target: { value: "Rivera" } });
        fireEvent.change(screen.getByLabelText("Email Address"), { target: { value: "ava@example.test" } });
        fireEvent.change(screen.getByLabelText("Phone Number"), { target: { value: "5550101234" } });
        return screen.getByRole("button", { name: "View Assessment Summary" }).closest("form")!;
    };

    it("sends stable option identities and one request after double submission", async () => {
        let finish!: (response: Response) => void;
        const fetchMock = vi.fn();
        fetchMock.mockImplementation(() => new Promise<Response>(resolve => { finish = resolve; }));
        vi.stubGlobal("fetch", fetchMock);
        const form = reachCapture();
        fireEvent.submit(form);
        fireEvent.submit(form);
        expect(fetchMock).toHaveBeenCalledOnce();
        const payload = JSON.parse(fetchMock.mock.calls[0][1].body);
        expect(payload).toMatchObject({ answers: { 1: 15, 2: 20, 3: 15, 4: 15, 5: 12, 6: 12, 7: 11 }, answer_option_ids: { 1: "s-corp", 2: "on-time", 3: "none", 4: "monthly", 5: "always", 6: "accounting-software", 7: "year-round" }, answer_contract_version: "health-check-v1", locale: "en" });
        expect(fetchMock.mock.calls[0][1].signal).toBeInstanceOf(AbortSignal);
        await act(async () => { finish(new Response(JSON.stringify({ success: true }), { status: 200 })); });
        expect(screen.getByText("Assessment results")).toBeInTheDocument();
    });

    it.each([
        ["400", () => Promise.resolve(new Response("{}", { status: 400 }))],
        ["429", () => Promise.resolve(new Response("{}", { status: 429 }))],
        ["500", () => Promise.resolve(new Response("{}", { status: 500 }))],
        ["invalid JSON", () => Promise.resolve(new Response("not-json", { status: 200 }))],
        ["unconfirmed success", () => Promise.resolve(new Response('{"success":false}', { status: 200 }))],
        ["network failure", () => Promise.reject(new TypeError("synthetic offline"))],
        ["timeout", () => Promise.reject(new DOMException("synthetic deadline", "TimeoutError"))],
    ])("retains answers and UUID after %s", async (_label, reply) => {
        const fetchMock = vi.fn();
        fetchMock.mockImplementation(reply);
        vi.stubGlobal("fetch", fetchMock);
        const form = reachCapture();
        await act(async () => { fireEvent.submit(form); });
        expect(screen.getByRole("alert")).toHaveTextContent("couldn't confirm your submission");
        expect(screen.queryByText("Assessment results")).not.toBeInTheDocument();
        expect(screen.getByLabelText("Email Address")).toHaveValue("ava@example.test");
        fetchMock.mockImplementationOnce(() => Promise.resolve(new Response('{"success":true}', { status: 200 })));
        await act(async () => { fireEvent.submit(form); });
        const original = JSON.parse(fetchMock.mock.calls[0][1].body);
        const retried = JSON.parse(fetchMock.mock.calls[1][1].body);
        expect(retried).toEqual(original);
        expect(screen.getByText("Assessment results")).toBeInTheDocument();
    });

    it("prevents invalid contact submission and associates the focused field error", () => {
        const fetchMock = vi.fn();
        vi.stubGlobal("fetch", fetchMock);
        const form = reachCapture();
        const firstName = screen.getByLabelText("First Name");
        fireEvent.change(firstName, { target: { value: "" } });
        fireEvent.submit(form);
        expect(fetchMock).not.toHaveBeenCalled();
        expect(firstName).toHaveFocus();
        expect(firstName).toHaveAttribute("aria-invalid", "true");
        expect(firstName).toHaveAccessibleDescription("First name is required");
        expect(screen.getByRole("link", { name: "Privacy Policy" })).toHaveAttribute("href", "/en/legal/privacy-policy");
    });

    it("stops waiting at the configured deadline and keeps an unconfirmed submission recoverable", async () => {
        const deadline = vi.spyOn(AbortSignal, "timeout").mockImplementation(milliseconds => {
            const controller = new AbortController();
            setTimeout(() => controller.abort(new DOMException("synthetic deadline", "TimeoutError")), milliseconds);
            return controller.signal;
        });
        const fetchMock = vi.fn((_url: string, options: RequestInit) => new Promise<Response>((_resolve, reject) => {
            options.signal?.addEventListener("abort", () => reject(options.signal?.reason), { once: true });
        }));
        vi.stubGlobal("fetch", fetchMock);
        const form = reachCapture();
        fireEvent.submit(form);
        expect(deadline).toHaveBeenCalledWith(12_000);
        expect(screen.getByRole("button", { name: "Submitting..." })).toBeDisabled();
        await act(async () => { await vi.advanceTimersByTimeAsync(12_000); });
        expect(screen.getByRole("alert")).toHaveTextContent("contact Union National Tax before starting another submission");
        expect(screen.getByRole("button", { name: "View Assessment Summary" })).toBeEnabled();
        expect(screen.getByLabelText("Email Address")).toHaveValue("ava@example.test");
    });
});
