import { test, expect } from "./fixtures";

test.setTimeout(120_000);

for (const locale of ["en", "es"]) {
    for (const width of [320, 1280]) {
        test(`${locale} core pages retain nonce, keyboard target and viewport at ${width}px`, async ({ page }) => {
            await page.setViewportSize({ width, height: 900 });
            for (const path of ["", "/services", "/resources", "/shop", "/book", "/shop/cart"]) {
                const errors: string[] = [];
                const onError = (error: Error) => errors.push(error.message);
                page.on("pageerror", onError);
                const response = await page.goto(`/${locale}${path}`, { waitUntil: "load" });
                expect(response?.status()).toBe(200);
                expect(response?.headers()["content-security-policy"]).toMatch(/'nonce-/);
                await expect(page.locator("html")).toHaveAttribute("lang", locale);
                await expect(page.locator("#main-content")).toBeVisible();
                expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
                await page.keyboard.press("Tab");
                expect(await page.evaluate(() => document.activeElement?.getAttribute("href"))).toBe("#main-content");
                await page.keyboard.press("Enter");
                expect(await page.evaluate(() => document.activeElement?.id)).toBe("main-content");
                expect(errors).toEqual([]);
                page.off("pageerror", onError);
            }
        });
    }
}

test("privacy dialog restores focus and private navigation uses a new document", async ({ page }) => {
    await page.goto("/en");
    const opener = page.getByRole("button", { name: "Privacy preferences", exact: true });
    await opener.click();
    const dialog = page.getByRole("dialog", { name: "Optional analytics and chat" });
    await expect(dialog).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
    await expect(opener).toBeFocused();
    await opener.click();
    await Promise.all([
        page.waitForEvent("load"),
        page.getByRole("button", { name: "Enable optional tools", exact: true }).click(),
    ]);
    await expect(opener).toBeVisible();
    await page.evaluate(() => { Object.assign(window, { __privacyDocument: true }); });
    const booking = page.locator('a[href="/en/book"]:visible').first();
    await booking.click();
    await expect(page).toHaveURL(/\/en\/book/);
    await expect(page.locator("#main-content")).toBeVisible();
    expect(await page.evaluate(() => "__privacyDocument" in window)).toBe(false);
});

test("client locale navigation retains script and style execution", async ({ page }) => {
    test.setTimeout(30_000);
    await page.setViewportSize({ width: 1920, height: 1080 });
    const violations: string[] = [];
    await page.addInitScript(() => {
        document.addEventListener("securitypolicyviolation", event => {
            if (event.effectiveDirective.startsWith("script") || event.effectiveDirective === "style-src-elem") {
                const target = window as Window & { __policyViolations?: string[] };
                (target.__policyViolations ||= []).push(event.effectiveDirective);
            }
        });
    });
    await page.goto("/en");
    await page.getByRole("button", { name: /language: en/i }).click();
    await page.getByRole("button", { name: "Español", exact: true }).click();
    await expect(page).toHaveURL(/\/es(?:\?|$)/);
    await expect(page.locator("html")).toHaveAttribute("lang", "es");
    violations.push(...await page.evaluate(() => (window as Window & { __policyViolations?: string[] }).__policyViolations || []));
    await page.getByRole("button", { name: /idioma: es/i }).click();
    await page.getByRole("button", { name: "English", exact: true }).click();
    await expect(page).toHaveURL(/\/en(?:\?|$)/);
    await page.getByRole("button", { name: "Services", exact: true }).click();
    const servicesLink = page.locator('a[href="/en/services"]:visible').first();
    await servicesLink.click();
    await expect(page).toHaveURL(/\/en\/services/);
    await expect(page.locator("#main-content")).toBeVisible();
    violations.push(...await page.evaluate(() => (window as Window & { __policyViolations?: string[] }).__policyViolations || []));
    expect(violations).toEqual([]);
});

test("dotted documents receive CSP and Spanish estimator keeps the approved journey", async ({ page }) => {
    const response = await page.goto("/en/blog/unknown.document");
    expect(response?.headers()["content-security-policy"]).toMatch(/'nonce-/);
    await page.goto("/es/scorp-estimator");
    await expect(page).toHaveURL(/\/es\/s-corp-tax-advantage/);
});
