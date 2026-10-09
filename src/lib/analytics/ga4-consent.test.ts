import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GA4_CONSENT_KEY, GA4_CONSENT_DENIAL_KEY, GA4_CONSENT_TTL_MS, getGa4Consent, getGa4ConsentExpiry, setGa4Consent, subscribeGa4Consent } from "./ga4-consent";

beforeEach(() => {
    vi.restoreAllMocks();
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-10-06T12:00:00Z"));
    sessionStorage.clear();
    setGa4Consent(false);
    localStorage.clear();
});
afterEach(() => { vi.restoreAllMocks(); vi.useRealTimers(); });
describe("independent GA4-purpose consent", () => {
    it("defaults denied and never treats bundled optional-tracking v1 as GA4 permission", () => {
        localStorage.setItem("unt-optional-tracking", JSON.stringify({ version: 1, allowed: true, expiresAt: Date.now() + GA4_CONSENT_TTL_MS }));
        expect(getGa4Consent()).toBe(false);
        expect(getGa4ConsentExpiry()).toBeNull();
        expect(setGa4Consent(true)).toBe(true);
        expect(getGa4Consent()).toBe(true);
        expect(getGa4ConsentExpiry()).toBe(Date.now() + GA4_CONSENT_TTL_MS);
        expect(JSON.parse(localStorage.getItem(GA4_CONSENT_KEY)!)).toMatchObject({ version: 1, purpose: "ga4_analytics" });
        expect(setGa4Consent(false)).toBe(true);
        expect(getGa4Consent()).toBe(false);
    });
    it("expires at the exact policy boundary", () => {
        setGa4Consent(true);
        vi.advanceTimersByTime(GA4_CONSENT_TTL_MS - 1);
        expect(getGa4Consent()).toBe(true);
        vi.advanceTimersByTime(1);
        expect(getGa4Consent()).toBe(false);
        expect(getGa4ConsentExpiry()).toBeNull();
    });
    it("fails closed on malformed, legacy, excessive, future or wrong-purpose records", () => {
        const now = Date.now();
        const valid = { version: 1, purpose: "ga4_analytics", allowed: true, grantedAt: now, expiresAt: now + GA4_CONSENT_TTL_MS };
        for (const record of [null, { version: 1, allowed: true, expiresAt: now + 1000 }, { ...valid, purpose: "marketing" },
            { ...valid, version: 2 }, { ...valid, expiresAt: valid.expiresAt + 1 }, { ...valid, grantedAt: now + 1 },
            { ...valid, allowed: "true" }, { ...valid, visitor: "fixture" }, { ...valid, expiresAt: now }]) {
            localStorage.setItem(GA4_CONSENT_KEY, JSON.stringify(record));
            expect(getGa4Consent()).toBe(false);
            expect(getGa4ConsentExpiry()).toBeNull();
        }
        localStorage.setItem(GA4_CONSENT_KEY, "malformed{");
        expect(getGa4Consent()).toBe(false);
    });
    it("cannot grant with unavailable storage and cannot undo failed-write revocation", () => {
        setGa4Consent(true);
        const write = vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new Error("blocked"); });
        expect(setGa4Consent(false)).toBe(false);
        expect(getGa4Consent()).toBe(false);
        expect(setGa4Consent(true)).toBe(false);
        expect(getGa4Consent()).toBe(false);
        write.mockRestore();
        setGa4Consent(true);
        vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => { throw new Error("blocked"); });
        expect(getGa4Consent()).toBe(false);
        expect(getGa4ConsentExpiry()).toBeNull();
    });
    it("removes an old grant after a denial write fails, including after a reload", async () => {
        expect(setGa4Consent(true)).toBe(true);
        vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new Error("writes blocked"); });
        expect(setGa4Consent(false)).toBe(false);
        expect(localStorage.getItem(GA4_CONSENT_KEY)).toBeNull();
        vi.restoreAllMocks();
        vi.resetModules();
        const reloaded = await import("./ga4-consent");
        expect(reloaded.getGa4Consent()).toBe(false);
    });
    it("preserves denial across reload through a session fence when the old grant cannot be removed", async () => {
        expect(setGa4Consent(true)).toBe(true);
        const write = Storage.prototype.setItem;
        const remove = Storage.prototype.removeItem;
        vi.spyOn(Storage.prototype, "setItem").mockImplementation(function (this: Storage, key, value) {
            if (this === localStorage) throw new Error("local writes blocked");
            return write.call(this, key, value);
        });
        vi.spyOn(Storage.prototype, "removeItem").mockImplementation(function (this: Storage, key) {
            if (this === localStorage) throw new Error("local removal blocked");
            return remove.call(this, key);
        });
        expect(setGa4Consent(false)).toBe(false);
        expect(JSON.parse(localStorage.getItem(GA4_CONSENT_KEY)!).allowed).toBe(true);
        expect(sessionStorage.getItem(GA4_CONSENT_DENIAL_KEY)).toBe("1");
        vi.restoreAllMocks();
        vi.resetModules();
        const reloaded = await import("./ga4-consent");
        expect(reloaded.getGa4Consent()).toBe(false);
        expect(reloaded.getGa4ConsentExpiry()).toBeNull();
        expect(reloaded.setGa4Consent(true)).toBe(true);
        expect(sessionStorage.getItem(GA4_CONSENT_DENIAL_KEY)).toBeNull();
        expect(reloaded.getGa4Consent()).toBe(true);
    });
    it("never clears a denial fence unless a fresh grant was saved and verified", () => {
        sessionStorage.setItem(GA4_CONSENT_DENIAL_KEY, "1");
        vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {});
        expect(setGa4Consent(true)).toBe(false);
        expect(sessionStorage.getItem(GA4_CONSENT_DENIAL_KEY)).toBe("1");
        expect(getGa4Consent()).toBe(false);
    });
    it("returns save failure and retains the document block when every persistence channel fails", () => {
        expect(setGa4Consent(true)).toBe(true);
        vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new Error("blocked"); });
        vi.spyOn(Storage.prototype, "removeItem").mockImplementation(() => { throw new Error("blocked"); });
        expect(setGa4Consent(false)).toBe(false);
        expect(getGa4Consent()).toBe(false);
        expect(JSON.parse(localStorage.getItem(GA4_CONSENT_KEY)!).allowed).toBe(true);
        expect(sessionStorage.getItem(GA4_CONSENT_DENIAL_KEY)).toBeNull();
    });
    it("denies when session storage cannot be checked", () => {
        expect(setGa4Consent(true)).toBe(true);
        const read = Storage.prototype.getItem;
        vi.spyOn(Storage.prototype, "getItem").mockImplementation(function (this: Storage, key) {
            if (this === sessionStorage) throw new Error("session storage blocked");
            return read.call(this, key);
        });
        expect(getGa4Consent()).toBe(false);
        expect(getGa4ConsentExpiry()).toBeNull();
    });
    it("subscribes to this purpose and cross-tab changes, with clean removal", () => {
        const callback = vi.fn();
        const unsubscribe = subscribeGa4Consent(callback);
        setGa4Consent(true);
        expect(callback).toHaveBeenCalledTimes(1);
        window.dispatchEvent(new StorageEvent("storage", { key: "unt-optional-tracking" }));
        expect(callback).toHaveBeenCalledTimes(1);
        window.dispatchEvent(new StorageEvent("storage", { key: GA4_CONSENT_KEY }));
        window.dispatchEvent(new StorageEvent("storage", { key: null }));
        expect(callback).toHaveBeenCalledTimes(3);
        unsubscribe();
        setGa4Consent(false);
        window.dispatchEvent(new StorageEvent("storage", { key: GA4_CONSENT_KEY }));
        expect(callback).toHaveBeenCalledTimes(3);
    });
});
