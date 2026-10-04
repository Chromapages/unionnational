import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";

const base = "http://127.0.0.1:3533";
const root = ".omx/state/re-audit-2026-10-01";
const paths = ["/en", "/es", "/en/services", "/es/services", "/en/industries", "/es/industries", "/en/resources", "/es/resources", "/en/shop", "/es/shop", "/en/book", "/es/book", "/en/shop/cart", "/es/shop/cart", "/es/s-corp-tax-advantage"];
const sizes = [{ width: 320, height: 720 }, { width: 1280, height: 900 }];
const screenshots = new Set(["/en|1280", "/es/services|320", "/es/industries|320", "/es/shop|320", "/es/book|1280", "/es/s-corp-tax-advantage|320"]);
const browser = await chromium.launch({ channel: "chrome", headless: true });
const records = [];
await mkdir(`${root}/screenshots`, { recursive: true });

try {
    for (const size of sizes) {
        for (const path of paths) {
            const page = await browser.newPage({ viewport: size });
            await page.route("**/*", async (route) => {
                const request = route.request();
                const target = new URL(request.url());
                if (target.origin !== base || !["GET", "HEAD"].includes(request.method())) return route.abort();
                return route.continue();
            });
            try {
                const response = await page.goto(`${base}${path}`, { waitUntil: "load", timeout: 60000 });
                await page.waitForTimeout(1000);
                const state = await page.evaluate(() => ({
                    title: document.title,
                    canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href") || null,
                    en: document.querySelector('link[hreflang="en"]')?.getAttribute("href") || null,
                    es: document.querySelector('link[hreflang="es"]')?.getAttribute("href") || null,
                    robots: document.querySelector('meta[name="robots"]')?.getAttribute("content") || null,
                    mainCount: document.querySelectorAll("#main-content").length,
                    overflow: document.documentElement.scrollWidth > innerWidth,
                }));
                await page.keyboard.press("Tab");
                const skipHref = await page.evaluate(() => document.activeElement?.getAttribute("href"));
                await page.keyboard.press("Enter");
                const skipFocus = await page.evaluate(() => document.activeElement?.id || null);
                const record = { path, width: size.width, status: response?.status(), url: page.url(), ...state, skipHref, skipFocus };
                if (screenshots.has(`${path}|${size.width}`)) {
                    const name = `${path.slice(1).replaceAll("/", "-")}-${size.width}.png`;
                    await page.screenshot({ path: `${root}/screenshots/${name}`, fullPage: true });
                    record.screenshot = `${root}/screenshots/${name}`;
                }
                records.push(record);
                process.stdout.write(`${path} ${size.width}: ${record.status}, overflow=${state.overflow}, canonical=${state.canonical}\n`);
            } catch (error) {
                records.push({ path, width: size.width, error: String(error) });
                process.stdout.write(`${path} ${size.width}: ERROR ${error}\n`);
            } finally {
                await page.close();
            }
        }
    }
    const esServices = await browser.newPage();
    await esServices.goto(`${base}/es/services`, { waitUntil: "domcontentloaded" });
    await esServices.waitForTimeout(500);
    const cta = await esServices.locator('[data-analytics="strategy_call_cta"]').first().getAttribute("href");
    records.push({ check: "services-booking-return", cta });
    await esServices.close();
    const book = await browser.newPage();
    await book.goto(`${base}/es/book?returnTo=%2Fservices`, { waitUntil: "domcontentloaded" });
    records.push({ check: "safe-booking-return", href: await book.locator('[data-analytics="strategy_call_scheduler_abandoned"]').first().getAttribute("href") });
    await book.close();
    const redirect = await browser.newPage();
    await redirect.goto(`${base}/es/scorp-estimator`, { waitUntil: "domcontentloaded" });
    await redirect.waitForURL("**/es/s-corp-tax-advantage", { timeout: 30000 });
    records.push({ check: "actual-scorp-journey", url: redirect.url() });
    await redirect.close();
    await writeFile(`${root}/browser-review.json`, JSON.stringify(records, null, 2));
} finally {
    await browser.close();
}
