import { describe, expect, it, vi } from "vitest";
import { redirect } from "next/navigation";
import BlueprintSuccessPage from "./page";

vi.mock("next/navigation", () => ({ redirect: vi.fn() }));

describe("legacy blueprint confirmation", () => {
    it("passes a session to the paid-order verification page in the same locale", async () => {
        await BlueprintSuccessPage({
            params: Promise.resolve({ locale: "es" }),
            searchParams: Promise.resolve({ session_id: "cs_test_order123" }),
        });
        expect(redirect).toHaveBeenCalledWith("/es/shop/success?session_id=cs_test_order123");
    });

    it.each([undefined, "//other.example", "not-a-session"])("cannot show confirmation without a valid session identifier", async (session_id) => {
        vi.mocked(redirect).mockClear();
        await BlueprintSuccessPage({
            params: Promise.resolve({ locale: "en" }),
            searchParams: Promise.resolve({ session_id }),
        });
        expect(redirect).toHaveBeenCalledWith("/en/shop/success");
    });
});
