import { chromium } from "playwright";

const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
    const page = await browser.newPage();
    const response = await page.goto("http://127.0.0.1:3534/en/books/the-money-making-blueprint-for-construction-companies", { waitUntil: "domcontentloaded", timeout: 30000 });
    const image = await page.locator('meta[property="og:image"]').getAttribute("content");
    const localImage = image?.replace("https://unionnationaltax.com", "http://127.0.0.1:3534");
    const check = localImage ? await fetch(localImage, { method: "HEAD", signal: AbortSignal.timeout(8000) }) : null;
    console.log(JSON.stringify({ pageStatus: response?.status(), image, imageStatus: check?.status || null, imageType: check?.headers.get("content-type") || null }));
} finally {
    await browser.close();
}
