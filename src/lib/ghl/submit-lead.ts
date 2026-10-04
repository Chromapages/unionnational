import type { GhlPayload } from "./contract";

type SubmissionResult = { success: true } | { success: false; message: string };

const retryMessage = "We couldn't send your assessment. Your answers are still here. Please try again.";

export async function submitGhlLead(payload: GhlPayload): Promise<SubmissionResult> {
    try {
        const response = await fetch("/api/ghl/intake", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            signal: AbortSignal.timeout(12_000),
        });

        if (response.status === 429) {
            return { success: false, message: "Too many attempts. Please wait a minute, then try again." };
        }
        if (response.status === 400) {
            return { success: false, message: "Please review your answers, then try again." };
        }
        if (!response.ok) return { success: false, message: retryMessage };

        const result: unknown = await response.json().catch(() => null);
        if (!result || typeof result !== "object" || !("success" in result) || result.success !== true) {
            return { success: false, message: retryMessage };
        }

        return { success: true };
    } catch {
        return { success: false, message: retryMessage };
    }
}
