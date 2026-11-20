import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { redirect } from "next/navigation";
import BlueprintSuccessPage from "./page";

vi.mock("next/navigation", () => ({ redirect: vi.fn() }));

describe("legacy blueprint confirmation", () => {
    beforeEach(() => {
        vi.mocked(redirect).mockClear();
        vi.stubEnv("SHOP_PAYMENTS_ENABLED", "true");
    });
    afterEach(() => vi.unstubAllEnvs());

    it.each(["en", "es"])("redirects disabled %s confirmations to contact before reading the query", async (locale) => {
        vi.stubEnv("SHOP_PAYMENTS_ENABLED", undefined);
        const readQuery = vi.fn(() => { throw new Error("Disabled confirmation accessed the query"); });
        await BlueprintSuccessPage({
            params: Promise.resolve({ locale }),
            searchParams: new Proxy(Promise.resolve({ session_id: "cs_test_order123" }), { get: readQuery }),
        });

        expect(redirect).toHaveBeenCalledExactlyOnceWith(`/${locale}/contact`);
        expect(readQuery).not.toHaveBeenCalled();
    });

    it("passes a session to the paid-order verification page in the same locale", async () => {
        await BlueprintSuccessPage({
            params: Promise.resolve({ locale: "es" }),
            searchParams: Promise.resolve({ session_id: "cs_test_order123" }),
        });
        expect(redirect).toHaveBeenCalledWith("/es/shop/success?session_id=cs_test_order123");
    });

    it.each([undefined, "//other.example", "not-a-session"])("cannot show confirmation without a valid session identifier", async (session_id) => {
        await BlueprintSuccessPage({
            params: Promise.resolve({ locale: "en" }),
            searchParams: Promise.resolve({ session_id }),
        });
        expect(redirect).toHaveBeenCalledWith("/en/shop/success");
    });
});
