import assert from "node:assert/strict";

const base = "http://127.0.0.1:3534";
const paths = [
    "/en/shop/cart",
    "/en/shop/success",
    "/scorp-estimator/results",
    "/en/construction/downsell",
    "/en/restaurants/downsell",
];

for (const path of paths) {
    const response = await fetch(base + path, { redirect: "manual", signal: AbortSignal.timeout(20000) });
    const html = await response.text();
    const cache = response.headers.get("cache-control") || "";
    assert.equal(response.status, 200, `${path} status`);
    assert.match(cache, /no-store/i, `${path} cache`);
    assert.match(html, /<meta name="robots" content="noindex, nofollow"/, `${path} robots`);
    console.log(`${path}: ${response.status}, ${cache}, noindex`);
}

const legacy = await fetch(base + "/en/construction/profit-blueprint/success", { redirect: "manual" });
const legacyHtml = await legacy.text();
assert.equal(legacy.status, 200);
assert.match(legacy.headers.get("cache-control") || "", /no-store/i);
assert.match(legacyHtml, /<meta name="robots" content="noindex, nofollow"/);
assert.ok(legacyHtml.includes("shop/success"));
assert.ok(!legacyHtml.includes("Order Confirmed"));
console.log("blueprint legacy: no confirmation; streams redirect to paid-order verification");

const sitemap = await (await fetch(base + "/sitemap.xml")).text();
for (const path of ["/shop/cart", "/shop/success", "/scorp-estimator/results", "/downsell", "/profit-blueprint/success"]) {
    assert.ok(!sitemap.includes(path), `sitemap exposes ${path}`);
}
console.log("private states absent from sitemap");
