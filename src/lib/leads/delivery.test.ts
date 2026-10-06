import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
const state = vi.hoisted(() => ({ records: new Map<string, Record<string, unknown>>(), failReserve: false, failUpdate: false, signal: undefined as undefined | (() => AbortSignal) }));
vi.mock("@/lib/config/env", () => ({ getEnv: (key: string) => key === "UPSTASH_REDIS_REST_URL" ? "https://redis.example.test" : key === "UPSTASH_REDIS_REST_TOKEN" ? "test-only" : undefined }));
vi.mock("@upstash/redis", () => ({ Redis: class {
    constructor(options: { signal: () => AbortSignal }) { state.signal = options.signal; }
    async set(key: string, value: Record<string, unknown>) {
        if (state.failReserve) throw new Error("synthetic unavailable");
        if (state.records.has(key)) return null;
        state.records.set(key, value); return "OK";
    }
    async get(key: string) { return state.records.get(key) ?? null; }
    async eval(_script: string, keys: string[], args: string[]) {
        if (state.failUpdate) throw new Error("synthetic update unavailable");
        const record = state.records.get(keys[0]);
        if (!record || record.owner !== args[0] || record.state !== args[1] || record.updatedAt !== args[2]) return 0;
        state.records.set(keys[0], JSON.parse(args[3])); return 1;
    }
} }));
import { deliverLead, reconcileLeadDelivery } from "./delivery";
const body = { event_type: "AUDIT_EVENT", contact: { email: "synthetic@audit.example.test" }, submitted_at: "2026-10-05T00:00:00.000Z" };
const identity = "d3db602a-72d1-496d-9f43-c3fb3e9c03f1";
const receiver = "https://crm.example.test/receiver";
const fetchMock = vi.fn();
const receiptKey = () => [...state.records.keys()].find(key => key.startsWith("lead-delivery:v1:"))!;
beforeEach(() => { state.records.clear(); state.failReserve = false; state.failUpdate = false; fetchMock.mockReset(); vi.stubGlobal("fetch", fetchMock); });
afterEach(() => vi.unstubAllGlobals());

describe("durable lead dispatch", () => {
    it("sends concurrent and repeated submissions once, across rotated receivers", async () => {
        let finish!: (response: Response) => void;
        fetchMock.mockImplementation(() => new Promise<Response>(resolve => { finish = resolve; }));
        const first = deliverLead(body, receiver, identity);
        await vi.waitFor(() => expect(fetchMock).toHaveBeenCalledOnce());
        await expect(deliverLead(body, receiver, identity)).rejects.toMatchObject({ status: 503 });
        finish(new Response(null, { status: 202 }));
        const response = await first;
        expect(response.headers.get("X-Lead-Receipt")).toMatch(/^lead-delivery:v1:[a-f0-9]{64}$/);
        expect((await deliverLead({ ...body, submitted_at: "2026-10-06T00:00:00.000Z" }, "https://crm.example.test/rotated", identity)).ok).toBe(true);
        expect((await deliverLead(body, receiver, crypto.randomUUID())).ok).toBe(true);
        expect(fetchMock).toHaveBeenCalledOnce();
        expect(JSON.stringify([...state.records.values()])).not.toContain(body.contact.email);
    });

    it("ignores regenerated transport timestamps but retains answer timestamps", async () => {
        fetchMock.mockResolvedValue(new Response(null, { status: 202 }));
        const first = { ...body, tracking: { clientTimestamp: "2026-10-05T00:00:00.000Z", client_timestamp: "first" }, answers: { timestamp: "answer-one" } };
        await deliverLead(first, receiver, identity);
        expect((await deliverLead({ ...first, tracking: { clientTimestamp: "2026-10-05T00:01:00.000Z", client_timestamp: "second" } }, receiver, identity)).ok).toBe(true);
        expect(fetchMock).toHaveBeenCalledOnce();
        await expect(deliverLead({ ...first, answers: { timestamp: "answer-two" } }, receiver, identity)).rejects.toMatchObject({ status: 409 });
    });

    it("keeps a changed client timestamp and new UUID inside the same uncertain claim", async () => {
        fetchMock.mockRejectedValue(new DOMException("synthetic deadline", "TimeoutError"));
        await expect(deliverLead({ ...body, tracking: { clientTimestamp: "first" } }, receiver, identity)).rejects.toMatchObject({ status: 504 });
        await expect(deliverLead({ ...body, tracking: { clientTimestamp: "second" } }, receiver, crypto.randomUUID())).rejects.toMatchObject({ status: 503 });
        expect(fetchMock).toHaveBeenCalledOnce();
    });

    it("rejects recovery of an active pending sender and permits an evidenced stale claim", async () => {
        let finish!: (response: Response) => void;
        fetchMock.mockImplementation(() => new Promise<Response>(resolve => { finish = resolve; }));
        const sender = deliverLead(body, receiver, identity);
        await vi.waitFor(() => expect(fetchMock).toHaveBeenCalledOnce());
        const receipt = receiptKey();
        expect(await reconcileLeadDelivery(receipt, "not_delivered", "synthetic checked receiver absence")).toBe(false);
        const pending = state.records.get(receipt)!;
        state.records.set(receipt, { ...pending, updatedAt: new Date(Date.now() - 61_000).toISOString() });
        expect(await reconcileLeadDelivery(receipt, "not_delivered", "synthetic confirmed stale sender and receiver absence")).toBe(true);
        finish(new Response(null, { status: 202 }));
        await expect(sender).rejects.toMatchObject({ status: 503 });
        expect(fetchMock).toHaveBeenCalledOnce();
    });

    it("holds timeout-after-acceptance for evidence and never replays automatically", async () => {
        fetchMock.mockRejectedValue(new DOMException("synthetic deadline", "TimeoutError"));
        await expect(deliverLead(body, receiver, identity)).rejects.toMatchObject({ status: 504 });
        await expect(deliverLead(body, receiver, identity)).rejects.toMatchObject({ status: 503 });
        await expect(deliverLead(body, receiver, crypto.randomUUID())).rejects.toMatchObject({ status: 503 });
        expect(fetchMock).toHaveBeenCalledOnce();
        const receipt = receiptKey();
        expect(await reconcileLeadDelivery(receipt, "accepted", "synthetic receiver acknowledgement record")).toBe(true);
        expect((await deliverLead(body, receiver, identity)).ok).toBe(true);
        expect(fetchMock).toHaveBeenCalledOnce();
    });

    it("allows a single retry only after explicit proof of no delivery", async () => {
        fetchMock.mockResolvedValueOnce(new Response(null, { status: 500 })).mockResolvedValueOnce(new Response(null, { status: 202 }));
        await expect(deliverLead(body, receiver, identity)).rejects.toMatchObject({ status: 502 });
        expect(await reconcileLeadDelivery(receiptKey(), "not_delivered", "synthetic verified absence")).toBe(true);
        expect((await deliverLead(body, receiver, identity)).ok).toBe(true);
        expect((await deliverLead(body, receiver, identity)).ok).toBe(true);
        expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    it("rejects identity conflicts, unsafe destinations and unavailable storage before provider work", async () => {
        fetchMock.mockResolvedValue(new Response(null, { status: 202 }));
        await deliverLead(body, receiver, identity);
        await expect(deliverLead({ ...body, contact: { email: "different@audit.example.test" } }, receiver, identity)).rejects.toMatchObject({ status: 409 });
        await expect(deliverLead(body, "https://crm.example.test@evil.invalid/path", identity)).rejects.toMatchObject({ status: 503 });
        state.failReserve = true;
        await expect(deliverLead(body, receiver, crypto.randomUUID())).rejects.toMatchObject({ status: 503 });
        expect(fetchMock).toHaveBeenCalledOnce();
        expect(fetchMock.mock.calls[0][1].redirect).toBe("error");
    });

    it("does not resend when recording provider acceptance fails", async () => {
        fetchMock.mockResolvedValue(new Response(null, { status: 202 }));
        state.failUpdate = true;
        await expect(deliverLead(body, receiver, identity)).rejects.toMatchObject({ status: 502 });
        state.failUpdate = false;
        await expect(deliverLead(body, receiver, identity)).rejects.toMatchObject({ status: 503 });
        expect(fetchMock).toHaveBeenCalledOnce();
    });

    it("uses a fresh bounded Redis request signal and retains a truncated trace reference", async () => {
        fetchMock.mockResolvedValue(new Response("synthetic response", { status: 202 }));
        await deliverLead(body, receiver, identity, "t".repeat(300));
        expect(state.signal?.()).toBeInstanceOf(AbortSignal);
        expect(fetchMock.mock.calls[0][1].headers["X-Trace-Id"]).toHaveLength(200);
    });

    it("rejects invalid, missing and completed recovery receipts without storage mutation", async () => {
        expect(await reconcileLeadDelivery("not a receipt", "accepted", "synthetic evidence")).toBe(false);
        expect(await reconcileLeadDelivery("lead-delivery:v1:" + "a".repeat(64), "accepted", "synthetic evidence")).toBe(false);
        fetchMock.mockResolvedValue(new Response(null, { status: 202 }));
        const response = await deliverLead(body, receiver, identity);
        expect(await reconcileLeadDelivery(response.headers.get("X-Lead-Receipt")!, "not_delivered", "synthetic evidence")).toBe(false);
        expect(fetchMock).toHaveBeenCalledOnce();
    });

    it("blocks a corrupted stored payload fingerprint instead of forwarding again", async () => {
        fetchMock.mockResolvedValue(new Response(null, { status: 202 }));
        await deliverLead(body, receiver, identity);
        const receipt = receiptKey();
        state.records.set(receipt, { ...state.records.get(receipt), payloadHash: "f".repeat(64) });
        await expect(deliverLead(body, receiver, crypto.randomUUID())).rejects.toMatchObject({ status: 409 });
        expect(fetchMock).toHaveBeenCalledOnce();
    });

    it("records an accepted receipt even when the response body cannot be drained", async () => {
        const stream = new ReadableStream({ cancel() { return Promise.reject(new Error("synthetic response cancel fault")); } });
        fetchMock.mockResolvedValue(new Response(stream, { status: 202 }));
        expect((await deliverLead(body, receiver, identity)).ok).toBe(true);
        expect((await deliverLead(body, receiver, identity)).ok).toBe(true);
        expect(fetchMock).toHaveBeenCalledOnce();
    });
});
