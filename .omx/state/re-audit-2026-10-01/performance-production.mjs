import { chromium } from "playwright";
import { writeFile } from "node:fs/promises";

const base = "http://127.0.0.1:3534";
const paths = ["/en", "/en/services", "/en/resources", "/en/shop", "/en/book"];
const viewports = [{ width: 390, height: 844 }, { width: 1280, height: 900 }];
const browser = await chromium.launch({ channel: "chrome", headless: true });
const traces = [];
try {
    for (const viewport of viewports) {
        for (const path of paths) {
            const page = await browser.newPage({ viewport });
            await page.addInitScript(() => {
                window.__lcp = 0;
                new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) window.__lcp = entry.startTime;
                }).observe({ type: "largest-contentful-paint", buffered: true });
            });
            await page.route("**/*", (route) => {
                const request = route.request();
                const url = new URL(request.url());
                if (["GET", "HEAD"].includes(request.method()) && (url.origin === base || url.hostname === "cdn.sanity.io")) return route.continue();
                return route.abort();
            });
            try {
                const response = await page.goto(base + path, { waitUntil: "load", timeout: 60000 });
                await page.waitForTimeout(1200);
                const timing = await page.evaluate(() => {
                    const nav = performance.getEntriesByType("navigation")[0];
                    const fcp = performance.getEntriesByName("first-contentful-paint")[0];
                    return {
                        ttfbMs: Math.round(nav.responseStart - nav.requestStart),
                        loadMs: Math.round(nav.loadEventEnd - nav.startTime),
                        fcpMs: fcp ? Math.round(fcp.startTime) : null,
                        lcpMs: window.__lcp ? Math.round(window.__lcp) : null,
                        resourceTransferBytes: performance.getEntriesByType("resource").reduce((total, entry) => total + (entry.transferSize || 0), 0),
                    };
                });
                traces.push({ path, width: viewport.width, status: response?.status(), ...timing });
                console.log(`${path} ${viewport.width}: ${response?.status()} FCP=${timing.fcpMs} LCP=${timing.lcpMs}`);
            } catch (error) {
                traces.push({ path, width: viewport.width, error: String(error) });
                console.log(`${path} ${viewport.width}: ERROR ${error}`);
            } finally {
                await page.close();
            }
        }
    }
    await writeFile(".omx/state/re-audit-2026-10-01/performance-production.json", JSON.stringify({
        caveat: "Local production build in Chrome; CRM/analytics/media hosts blocked except Sanity CDN; one load per route; no agreed budgets or field Core Web Vitals.",
        traces,
    }, null, 2));
} finally {
    await browser.close();
}
