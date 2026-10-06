import { describe, expect, it, vi } from "vitest";
import { isCheckoutSessionId, issueReceiptCookie, oldReceiptCookieNames, purchaseReference, readWebhookBody, receiptCookieName, receiptSession } from "./payment-security";

const secret = "fixture-only-receipt-secret";
const id = "cs_test_receiptFixture";
describe("guest receipt authorization", () => {
    it("binds an independent signed expiring receipt to the initiating browser", () => {
        const cookie = issueReceiptCookie(id, secret, 100);
        const reference = purchaseReference(id, secret);
        expect(reference).toMatch(/^order_[a-f0-9]{32}$/);
        expect(reference).not.toContain(id);
        expect(receiptSession(cookie, reference, secret, 101)).toBe(id);
        expect(receiptSession(undefined, reference, secret, 101)).toBeNull();
        expect(receiptSession(cookie, reference, secret, 86501)).toBeNull();
        expect(receiptSession(cookie + "x", reference, secret, 101)).toBeNull();
        expect(receiptSession(cookie, reference, "another-secret", 101)).toBeNull();
        const second = issueReceiptCookie("cs_test_secondTab", secret, 101);
        expect(receiptSession(cookie, reference, secret, 102)).toBe(id);
        expect(receiptSession(second, reference, secret, 102)).toBeNull();
        expect(receiptCookieName(reference)).toMatch(/^__Host-unt_shop_receipt_/);
    });
    it("prunes earlier receipt names while retaining four previous independent grants", () => {
        const names = ["a", "b", "c", "d", "e", "f"].map(letter => `__Host-unt_shop_receipt_${letter.repeat(32)}`);
        expect(oldReceiptCookieNames(names.map(name => `${name}=fixture`).join("; "), "current")).toEqual(names.slice(0, 2));
    });
    it.each(["../../balance", "cs_test_ok/../balance", [id], "cs_test_ok?expand=customer", "cs_live_", "cs_test_" + "x".repeat(201)])("rejects invalid provider path inputs %j", value => {
        expect(isCheckoutSessionId(value)).toBe(false);
    });
});

describe("exact bounded webhook body", () => {
    it("preserves UTF-8 bytes for signature verification", async () => {
        const text = '{"fixture":"📘"}\n';
        expect(await readWebhookBody(new Request("https://fixture.invalid", { method: "POST", body: text }))).toEqual(Buffer.from(text));
    });
    it("rejects declared and actual oversized bodies", async () => {
        await expect(readWebhookBody(new Request("https://fixture.invalid", { method: "POST", headers: { "content-length": "999" }, body: "a" }), 10)).rejects.toThrow("REQUEST_TOO_LARGE");
        await expect(readWebhookBody(new Request("https://fixture.invalid", { method: "POST", body: "a".repeat(11) }), 10)).rejects.toThrow("REQUEST_TOO_LARGE");
    });
    it("cancels a stalled stream after its deadline", async () => {
        vi.useFakeTimers();
        const cancel = vi.fn();
        const request = { headers: new Headers(), body: { getReader: () => ({ read: () => new Promise(() => {}), cancel: async () => cancel() }) } } as unknown as Request;
        const pending = expect(readWebhookBody(request, 10, 50)).rejects.toThrow("BODY_TIMEOUT");
        await vi.advanceTimersByTimeAsync(51);
        await pending;
        expect(cancel).toHaveBeenCalledOnce();
        vi.useRealTimers();
    });
});
