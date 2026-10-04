import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ReactNode } from "react";
import { HealthCheckSurvey } from "./HealthCheckSurvey";

vi.mock("next-intl", () => ({ useLocale: () => "en" }));
vi.mock("framer-motion", () => ({
    AnimatePresence: ({ children }: { children: ReactNode }) => children,
    motion: { div: ({ children }: { children: ReactNode }) => <div>{children}</div> },
}));
vi.mock("./InsightPanel", () => ({ InsightPanel: () => null }));
vi.mock("./ResultVaultPreview", () => ({ ResultVaultPreview: () => null }));
vi.mock("./ResultDashboard", () => ({ ResultDashboard: () => null }));
vi.mock("./SecureLeadCapture", () => ({ SecureLeadCapture: () => <p>Lead capture</p> }));

describe("health survey question transitions", () => {
    beforeEach(() => vi.useFakeTimers());
    afterEach(() => { cleanup(); vi.useRealTimers(); });

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
});
