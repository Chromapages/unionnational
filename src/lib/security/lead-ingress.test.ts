import { beforeEach, afterEach, describe, it, expect, vi } from "vitest";
const settings = vi.hoisted(() => ({ env: {} as Record<string, string> }));
vi.mock("@/lib/config/env", () => ({ getEnv: (key: string) => settings.env[key] }));
vi.mock("@/lib/observability/logger", () => ({ logger: { warn: vi.fn() } }));

beforeEach(() => { vi.resetModules(); settings.env = {}; });
afterEach(() => vi.unstubAllEnvs());

const request = (headers: Record<string, string> = {}) => new Request("https://app.example.test/api/lead", { headers });

describe("public lead ingress budgets", () => {
    it("keeps an early global cap without assigning unknown visitors one small requester budget", async () => {
        const { checkLeadIngress } = await import("./lead-ingress");
        const outcomes = [];
        for (let index = 0; index < 121; index++) outcomes.push(await checkLeadIngress(request({ "x-forwarded-for": `192.0.2.${index + 1}` })));
        expect(outcomes.filter(value => value.ok)).toHaveLength(120);
        expect(outcomes[120]).toMatchObject({ ok: false, status: 429 });
    });

    it("isolates verified visitors and keeps rejected requester bursts out of the global budget", async () => {
        settings.env = { LEAD_PROXY_HEADERS_VERIFIED: "true", LEAD_TRUSTED_IP_HEADER: "x-real-ip" };
        const { checkLeadIngress } = await import("./lead-ingress");
        for (let index = 0; index < 20; index++) expect(await checkLeadIngress(request({ "x-real-ip": "192.0.2.1" }))).toEqual({ ok: true });
        for (let index = 0; index < 120; index++) expect(await checkLeadIngress(request({ "x-real-ip": "192.0.2.1" }))).toMatchObject({ status: 429 });
        expect(await checkLeadIngress(request({ "x-real-ip": "192.0.2.2" }))).toEqual({ ok: true });
    });

    it("uses only explicitly verified allowed headers, hashing the actual identity", async () => {
        const { leadRequesterKey } = await import("./lead-ingress");
        const headers = { "x-real-ip": "192.0.2.2", "x-forwarded-for": "192.0.2.99" };
        expect(leadRequesterKey(request(headers))).toBe("anonymous");
        settings.env = { LEAD_PROXY_HEADERS_VERIFIED: "true", LEAD_TRUSTED_IP_HEADER: "authorization" };
        expect(leadRequesterKey(request(headers))).toBe("anonymous");
        settings.env.LEAD_TRUSTED_IP_HEADER = "x-real-ip";
        expect(leadRequesterKey(request(headers))).toMatch(/^[a-f0-9]{64}$/);
        expect(leadRequesterKey(request(headers))).toBe(leadRequesterKey(request({ ...headers, "x-forwarded-for": "192.0.2.100" })));
        expect(leadRequesterKey(request({ "x-real-ip": "invalid" }))).toBe("anonymous");
    });

    it("keeps contact limits independent and rejects cross-site requests", async () => {
        const { checkLeadContact, checkLeadIngress } = await import("./lead-ingress");
        for (let i = 0; i < 5; i++) expect(await checkLeadContact("one@audit.example.test")).toEqual({ ok: true });
        expect(await checkLeadContact("ONE@AUDIT.EXAMPLE.TEST")).toMatchObject({ ok: false, status: 429 });
        expect(await checkLeadContact("two@audit.example.test")).toEqual({ ok: true });
        expect(await checkLeadIngress(request({ Origin: "https://other.example.test" }))).toMatchObject({ ok: false, status: 403 });
    });

    it("fails closed before work when production shared storage is absent", async () => {
        vi.stubEnv("NODE_ENV", "production");
        const { checkLeadIngress } = await import("./lead-ingress");
        expect(await checkLeadIngress(request())).toMatchObject({ ok: false, status: 503 });
    });

    it("accepts a verified forwarding chain but rejects malformed or cross-site origins", async () => {
        const { leadRequesterKey, checkLeadIngress } = await import("./lead-ingress");
        settings.env = { LEAD_PROXY_HEADERS_VERIFIED: "true", LEAD_TRUSTED_IP_HEADER: "x-forwarded-for", NEXT_PUBLIC_BASE_URL: "https://public.example.test" };
        const chain = request({ "x-forwarded-for": "192.0.2.3, 192.0.2.99", Origin: "https://public.example.test" });
        expect(leadRequesterKey(chain)).toMatch(/^[a-f0-9]{64}$/);
        expect(await checkLeadIngress(chain)).toEqual({ ok: true });
        expect(await checkLeadIngress(request({ Origin: "not an origin" }))).toMatchObject({ ok: false, status: 403 });
        expect(await checkLeadIngress(request({ Origin: "https://app.example.test", "sec-fetch-site": "cross-site" }))).toMatchObject({ ok: false, status: 403 });
        settings.env.NEXT_PUBLIC_BASE_URL = "not a URL";
        expect(await checkLeadIngress(request())).toMatchObject({ ok: false, status: 403 });
    });
});
