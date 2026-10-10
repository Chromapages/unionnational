import { test, expect } from "./fixtures";

test.setTimeout(120_000);

test.beforeEach(async ({ context }) => {
    await context.route("https://cdn.sanity.io/images/p1x9y3wz/**", route =>
        ["GET", "HEAD"].includes(route.request().method()) && route.request().resourceType() === "image"
            ? route.continue() : route.abort("blockedbyclient"));
});

for (const width of [320, 390, 1920]) {
    for (const source of ["/en", "/en/services", "/es", "/es/services"]) {
        test(`${source} Torres story reaches the existing target at ${width}px`, async ({ page }, testInfo) => {
            await page.setViewportSize({ width, height: 900 });
            await page.goto(source, { waitUntil: "load" });
            const story = page.locator('a[href*="/industries#torres-story"]:visible');
            await expect(story).toHaveCount(1);
            const locale = source.split("/")[1];
            await expect(story).toHaveAttribute("href", `/${locale}/industries#torres-story`);
            if (width === 1920) { await story.focus(); await page.keyboard.press("Enter"); }
            else await story.click();
            await expect(page).toHaveURL(new RegExp(`/${locale}/industries#torres-story$`));
            const target = page.locator("#torres-story");
            await expect(target).toBeVisible();
            await expect.poll(async () => (await target.boundingBox())?.y ?? -1).toBeGreaterThanOrEqual(80);
            await expect.poll(async () => (await target.boundingBox())?.y ?? 1000).toBeLessThan(300);
            const navigation = await page.locator("header.site-header:visible").boundingBox();
            expect((await target.boundingBox())!.y).toBeGreaterThan((navigation?.y ?? 0) + (navigation?.height ?? 0));
            await expect(target).toHaveCSS("scroll-margin-top", "112px");
            expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
            await page.screenshot({ path: testInfo.outputPath(`torres-${width}.png`), fullPage: false });
        });
    }
}

test("intake copy and independent assessment entry remain distinct", async ({ page }) => {
    await page.goto("/en/intake");
    await expect(page.getByText("Complete this brief profile and uncover hidden tax savings that traditional accountants might miss.", { exact: true })).toBeVisible();
    await page.goto("/en/health-check");
    await page.getByRole("button", { name: "Start Diagnostic", exact: true }).click();
    await expect(page.getByText("What type of business entity do you operate?", { exact: true })).toBeVisible();
    await expect(page).toHaveURL(/\/en\/health-check$/);
});

for (const width of [390, 1920]) {
    test(`existing IRS, industries and homepage book discovery remain intact at ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.goto("/en");
        const book = page.getByRole("region", { name: "Build a more profitable construction business", exact: true });
        await expect(book).toBeVisible();
        await expect(book.getByRole("link", { name: "Explore the Book", exact: true })).toHaveAttribute("href", "/en/shop/the-money-making-blueprint-for-construction-companies");
        await expect(book.getByRole("img")).toBeVisible();
        expect(await book.locator("form,input,button").count()).toBe(0);
        expect(await book.innerText()).not.toMatch(/\$\d|Add to cart|download/i);
        for (const source of ["/en", "/en/services"]) {
            await page.goto(source);
            const irs = page.locator('main a[href="/en/back-taxes-irs-tax-resolution"]:visible').first();
            await expect(irs).toBeVisible();
            await irs.click();
            await expect(page).toHaveURL(/\/en\/back-taxes-irs-tax-resolution$/);
            await page.waitForLoadState("load");
            await expect(page.getByRole("heading", { level: 1 })).toContainText("Back Taxes");
            await expect.poll(() => page.locator('link[rel="canonical"]').evaluateAll(nodes => nodes.map(node => node.getAttribute("href"))), { timeout: 15000 })
                .toEqual(["https://unionnationaltax.com/en/back-taxes-irs-tax-resolution"]);
            await expect(page.locator("#back-taxes-irs-tax-resolution-hero-cta")).toHaveAttribute("href", /\/en\/book/);
            await page.goto(source);
            for (const industry of ["restaurants", "construction"]) {
                const link = page.locator(`main a[href="/en/industries/${industry}"]:visible`).first();
                await expect(link).toBeVisible();
                await link.click();
                await expect(page).toHaveURL(new RegExp(`/en/industries/${industry}$`));
                const consultation = page.locator('a[href="#consultation-form"]:visible').first();
                await consultation.click();
                await expect(page.locator("#consultation-form")).toBeVisible();
                await page.goto(source);
            }
        }
    });
}

for (const width of [320, 390]) {
    test(`phone menu closes with Escape and navigates to Services at ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.goto("/en");
        const opener = page.getByRole("button", { name: "Open menu", exact: true });
        await opener.click();
        const menu = page.getByRole("dialog", { name: "Mobile navigation", exact: true });
        await expect(menu).toBeVisible();
        await page.keyboard.press("Escape");
        await expect(menu).toBeHidden();
        await expect(opener).toBeFocused();
        await opener.click();
        await menu.locator('a[href="/en/services"]').click();
        await expect(page).toHaveURL(/\/en\/services$/);
        await expect(menu).toBeHidden();
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    });
}

test("desktop navigation opens the existing shop with the keyboard", async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 900 });
    await page.goto("/en");
    const shop = page.locator('header.site-header a[href="/en/shop"]:visible');
    await expect(shop).toHaveCount(1);
    await shop.focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/en\/shop$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

for (const width of [390, 1920]) {
    test(`homepage book opens the existing product and both accordions at ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.goto("/en");
        await page.getByRole("link", { name: "Explore the Book", exact: true }).click();
        await expect(page).toHaveURL(/\/en\/shop\/the-money-making-blueprint-for-construction-companies$/);
        await page.waitForLoadState("load");
        await expect(page.getByRole("heading", { level: 1 })).toContainText("Blueprint for Construction Companies");
        const accordions = page.locator("#what-youll-learn details");
        await expect(accordions).toHaveCount(2);
        for (const accordion of await accordions.all()) {
            await accordion.locator("summary").click();
            await expect(accordion).toHaveAttribute("open", "");
        }
        await expect.poll(() => page.locator('link[rel="canonical"]').evaluateAll(nodes => nodes.map(node => node.getAttribute("href"))), { timeout: 15000 })
            .toEqual(["https://unionnationaltax.com/en/shop/the-money-making-blueprint-for-construction-companies"]);
        await expect(page.getByRole("button", { name: "Add to cart", exact: true }).first()).toBeVisible();
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    });
}
