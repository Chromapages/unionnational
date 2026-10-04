import { chromium } from "playwright";
import { writeFile } from "node:fs/promises";

const slug = "the-money-making-blueprint-for-construction-companies";
const post = "the-no-tax-on-tips-rule-explained-what-qsr-owners-must-do-right-now-to-protect-the-fica-tip";
const paths = [
    `/en/blog/${post}`, `/es/blog/${post}`,
    `/en/shop/${slug}`, `/es/shop/${slug}`,
    `/en/books/${slug}`, `/es/books/${slug}`,
    "/en/legal/disclaimer", "/es/legal/disclaimer",
    "/en/construction/apply", "/es/restaurants/booking",
];
const browser = await chromium.launch({ channel: "chrome", headless: true });
const records = [];
try {
    for (const path of paths) {
        const page = await browser.newPage();
        await page.route("**/*", (route) => {
            const request = route.request();
            if (["GET", "HEAD"].includes(request.method()) && new URL(request.url()).origin === "http://127.0.0.1:3534") return route.continue();
            return route.abort();
        });
        const response = await page.goto("http://127.0.0.1:3534" + path, { waitUntil: "domcontentloaded", timeout: 30000 });
        const head = await page.evaluate(() => ({
            title: document.title,
            canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href") || null,
            en: document.querySelector('link[hreflang="en"]')?.getAttribute("href") || null,
            es: document.querySelector('link[hreflang="es"]')?.getAttribute("href") || null,
            robots: document.querySelector('meta[name="robots"]')?.getAttribute("content") || null,
        }));
        records.push({ path, status: response?.status(), ...head });
        console.log(`${path}: ${response?.status()} ${head.canonical}`);
        await page.close();
    }
    await writeFile(".omx/state/re-audit-2026-10-01/dynamic-heads.json", JSON.stringify(records, null, 2));
} finally {
    await browser.close();
}
