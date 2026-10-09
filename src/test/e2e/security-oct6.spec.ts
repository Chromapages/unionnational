import { test, expect } from "./fixtures";

test("public readiness exposes only an uncached configuration status", async ({ request }) => {
    const response = await request.get("/readyz");
    expect([200, 503]).toContain(response.status());
    const body = await response.json();
    expect(Object.keys(body)).toEqual(["status"]);
    expect(["configuration_ready", "not_ready"]).toContain(body.status);
    expect(response.headers()["cache-control"]).toContain("no-store");
});

test("image optimizer rejects other Sanity projects before fetching an asset", async ({ request }) => {
    const response = await request.get("/_next/image", { params: { url: "https://cdn.sanity.io/images/notunt00/production/fixture-1x1.png", w: "640", q: "75" } });
    expect(response.status()).toBe(400);
    expect(await response.text()).toContain("not allowed");
});

test("Studio shell retains its isolated policy and consumer policy stays strict", async ({ request }) => {
    const studio = await request.get("/hq");
    expect(studio.status()).toBe(200);
    expect(studio.headers()["content-security-policy"]).toContain("'unsafe-eval'");
    const consumer = await request.get("/en");
    expect(consumer.status()).toBe(200);
    expect(consumer.headers()["content-security-policy"]).toContain("'nonce-");
    expect(consumer.headers()["content-security-policy"]).not.toContain("'unsafe-eval'");
});
