import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { BlueprintMoreInfoForm } from "./BlueprintMoreInfoForm";

vi.mock("@/components/seo/MetaPixel", () => ({ trackMetaEvent: vi.fn() }));
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

describe("blueprint inquiry business details", () => {
    it("forwards the required state with the business profile", async () => {
        const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ success: true }), { status: 200 }));
        vi.stubGlobal("fetch", fetchMock);
        render(<BlueprintMoreInfoForm />);
        for (const [label, value] of [["First Name", "Ava"], ["Email Address", "ava@example.test"], ["Phone Number", "5550101234"], ["Business Name", "Ava Construction"], ["State", "TX"]]) {
            fireEvent.change(screen.getByLabelText(label), { target: { value } });
        }
        fireEvent.click(screen.getByRole("button", { name: "Send Message" }));
        await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
        expect(JSON.parse(fetchMock.mock.calls[0][1].body).business).toMatchObject({ state_location: "TX" });
    });
});
