import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ fetch: vi.fn(), commit: vi.fn(), createClient: vi.fn(), event: vi.fn(), session: vi.fn(), update: vi.fn(), fields: {} as Record<string, unknown>, audit: {} as Record<string, unknown>, revision: "" }));
vi.mock("@sanity/client", () => ({ createClient: (...args: unknown[]) => { mocks.createClient(...args); return {
    fetch: mocks.fetch,
    transaction() {
        const patch = { ifRevisionId(value: string) { mocks.revision = value; return patch; }, set(value: Record<string, unknown>) { mocks.fields = value; return patch; } };
        const transaction = { patch(_id: string, update: (value: typeof patch) => unknown) { update(patch); return transaction; }, create(value: Record<string, unknown>) { mocks.audit = value; return transaction; }, commit: mocks.commit };
        return transaction;
    },
}; } }));
vi.mock("stripe", () => ({ default: class { events = { retrieve: mocks.event }; checkout = { sessions: { retrieve: mocks.session, update: mocks.update } }; } }));

const id = `stripeWebhookIdempotency.${"a".repeat(64)}`;
const record = { _id: id, _rev: "fixture-revision", status: "pending_review", stripeEventId: "evt_fixture", updatedAt: new Date(Date.now() - 700000).toISOString() };
const originalArgv = process.argv;
const originalExitCode = process.exitCode;
let log: ReturnType<typeof vi.spyOn>;
let error: ReturnType<typeof vi.spyOn>;

async function command(args: string[], fails = false) {
    process.argv = [originalArgv[0], path.resolve("scripts/shop-fulfillment-recovery.mjs"), ...args];
    await import("../../../scripts/shop-fulfillment-recovery.mjs");
    await vi.waitFor(() => expect(fails ? error : log).toHaveBeenCalled());
}
const applyArgs = (outcome = "delivered") => ["--record", id, "--outcome", outcome, "--apply", "--revision", record._rev, "--operator", "fixture-operator", "--evidence", "receiver:fixture-record"];

beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    log = vi.spyOn(console, "log").mockImplementation(() => {});
    error = vi.spyOn(console, "error").mockImplementation(() => {});
    mocks.fetch.mockReset().mockResolvedValue(record);
    mocks.commit.mockReset().mockResolvedValue({});
    mocks.event.mockReset().mockResolvedValue({ data: { object: { id: "cs_test_fixture" } } });
    mocks.session.mockReset().mockResolvedValue({ id: "cs_test_fixture", payment_status: "paid", metadata: { order_source: "unt_bookstore" } });
    mocks.update.mockReset().mockResolvedValue({});
    mocks.fields = {}; mocks.audit = {}; mocks.revision = "";
    vi.stubEnv("SANITY_PAYMENT_DATASET", "fixture_private");
    vi.stubEnv("NEXT_PUBLIC_SANITY_DATASET", "production");
    vi.stubEnv("SANITY_PAYMENT_AUTH_TOKEN", "fixture-only-private-token");
    vi.stubEnv("SANITY_PAYMENT_PRIVATE_CONFIRMED", "true");
    vi.stubEnv("SANITY_PAYMENT_MIGRATION_CONFIRMED", "true");
    vi.stubEnv("SHOP_RECOVERY_ALLOW_APPLY", "true");
    vi.stubEnv("STRIPE_SECRET_KEY", "sk_test_fixture");
    process.exitCode = undefined;
});
afterEach(() => { process.argv = originalArgv; process.exitCode = originalExitCode; vi.unstubAllEnvs(); vi.restoreAllMocks(); });

describe("private payment recovery command", () => {
    it("shows help before any account configuration or storage access", async () => {
        vi.stubEnv("SANITY_PAYMENT_AUTH_TOKEN", "");
        await command(["--help"]);
        expect(mocks.createClient).not.toHaveBeenCalled();
        expect(log).toHaveBeenCalledWith(expect.stringContaining("Never posts fulfillment or creates a charge"));
    });
    it.each([["SANITY_PAYMENT_DATASET", ""], ["SANITY_PAYMENT_DATASET", "../public"], ["SANITY_PAYMENT_DATASET", "production"], ["SANITY_PAYMENT_AUTH_TOKEN", ""], ["SANITY_PAYMENT_PRIVATE_CONFIRMED", "false"], ["SANITY_PAYMENT_MIGRATION_CONFIRMED", "false"]])("rejects unsafe storage configuration %s", async (key, value) => {
        vi.stubEnv(key, value);
        await command([], true);
        expect(mocks.createClient).not.toHaveBeenCalled();
        expect(process.exitCode).toBe(1);
    });
    it("reports a bounded backlog without personal data or provider calls", async () => {
        mocks.fetch.mockResolvedValue([{ _id: id, status: "pending_review" }]);
        await command([]);
        expect(mocks.fetch.mock.calls[0][0]).toContain("[0...100]");
        expect(JSON.parse(String(log.mock.calls[0][0]))).toMatchObject({ mode: "read-only", limit: 100 });
        expect(mocks.commit).not.toHaveBeenCalled();
        expect(mocks.event).not.toHaveBeenCalled();
    });
    it("previews a state transition without mutating either provider", async () => {
        await command(["--record", id, "--outcome", "delivered"]);
        expect(JSON.parse(String(log.mock.calls[0][0]))).toMatchObject({ mode: "dry-run", changes: { status: "processed" }, fulfillmentRequests: 0, newCharges: 0 });
        expect(mocks.commit).not.toHaveBeenCalled();
        expect(mocks.event).not.toHaveBeenCalled();
    });
    it("rejects malformed record IDs before a private lookup", async () => {
        await command(["--record", "../../private"], true);
        expect(mocks.fetch).not.toHaveBeenCalled();
    });
    it.each(["gate", "revision", "operator", "evidence"])("requires the explicit apply %s", async missing => {
        const args = applyArgs();
        if (missing === "gate") vi.stubEnv("SHOP_RECOVERY_ALLOW_APPLY", "false");
        else args[args.indexOf(`--${missing}`) + 1] = missing === "revision" ? "stale" : "";
        await command(args, true);
        expect(mocks.event).not.toHaveBeenCalled();
        expect(mocks.commit).not.toHaveBeenCalled();
    });
    it.each(["event", "key", "session", "unpaid", "source"])("refuses recovery with unverifiable %s", async invalid => {
        if (invalid === "event") mocks.fetch.mockResolvedValue({ ...record, stripeEventId: "../../unsafe" });
        if (invalid === "key") vi.stubEnv("STRIPE_SECRET_KEY", "");
        if (invalid === "session") mocks.event.mockResolvedValue({ data: { object: { id: "../../balance" } } });
        if (invalid === "unpaid") mocks.session.mockResolvedValue({ payment_status: "unpaid", metadata: { order_source: "unt_bookstore" } });
        if (invalid === "source") mocks.session.mockResolvedValue({ payment_status: "paid", metadata: { order_source: "other" } });
        await command(applyArgs(), true);
        expect(mocks.commit).not.toHaveBeenCalled();
    });
    it("records CAS evidence before repairing metadata for proven delivery", async () => {
        await command(applyArgs());
        expect(mocks.revision).toBe(record._rev);
        expect(mocks.fields).toMatchObject({ status: "processed" });
        expect(mocks.audit).toMatchObject({ recordId: id, priorRevision: record._rev, priorStatus: "pending_review", outcome: "delivered", operator: "fixture-operator", evidence: "receiver:fixture-record" });
        expect(mocks.commit).toHaveBeenCalledOnce();
        expect(mocks.update).toHaveBeenCalledWith("cs_test_fixture", expect.objectContaining({ metadata: expect.objectContaining({ fulfillment_status: "fulfilled" }) }));
        expect(mocks.commit.mock.invocationCallOrder[0]).toBeLessThan(mocks.update.mock.invocationCallOrder[0]);
    });
    it("authorizes a proven-undelivered retry without sending or marking delivered", async () => {
        await command([...applyArgs("undelivered"), "--receiver-confirmed-no-delivery"]);
        expect(mocks.fields).toMatchObject({ status: "failed", lastError: "operator_confirmed_no_delivery" });
        expect(mocks.update).not.toHaveBeenCalled();
    });
    it("refuses to make an already fulfilled session retryable", async () => {
        mocks.session.mockResolvedValue({ payment_status: "paid", metadata: { order_source: "unt_bookstore", fulfillment_status: "fulfilled" } });
        await command([...applyArgs("undelivered"), "--receiver-confirmed-no-delivery"], true);
        expect(mocks.commit).not.toHaveBeenCalled();
    });
    it("moves only a stale processing claim to review without a Stripe request", async () => {
        mocks.fetch.mockResolvedValue({ ...record, status: "processing" });
        await command(applyArgs("stale-review"));
        expect(mocks.fields).toMatchObject({ status: "pending_review" });
        expect(mocks.event).not.toHaveBeenCalled();
        expect(mocks.update).not.toHaveBeenCalled();
    });
    it("does not repair Stripe metadata after a CAS transaction failure", async () => {
        mocks.commit.mockRejectedValue(new Error("synthetic revision conflict"));
        await command(applyArgs(), true);
        expect(mocks.update).not.toHaveBeenCalled();
    });
    it("keeps recorded acceptance when a subsequent Stripe metadata repair fails", async () => {
        mocks.update.mockRejectedValue(new Error("synthetic metadata outage"));
        await command(applyArgs(), true);
        expect(mocks.fields.status).toBe("processed");
        expect(mocks.commit).toHaveBeenCalledOnce();
    });
});
