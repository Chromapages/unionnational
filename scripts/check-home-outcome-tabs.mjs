import assert from "node:assert/strict";
import { chromium } from "playwright";

// Run against an already-started dev server: node scripts/check-home-outcome-tabs.mjs
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    await page.goto(new URL("/en", process.env.HOME_OUTCOME_CHECK_URL ?? "http://localhost:3001").href);
    const tabs = page.getByRole("tab");
    await tabs.first().waitFor({ state: "visible" });
    await page.evaluate(() => document.fonts.ready);
    const panelBox = page.locator("[data-outcome-panels]");
    const height = (await panelBox.boundingBox()).height;
    for (const [index, route] of ["/tax-planning", "/strategic-bookkeeping", "/fractional-cfo"].entries()) {
        await tabs.nth(index).click();
        assert.equal(await page.getByRole("tabpanel").count(), 1);
        assert.equal(await page.locator('[role="tab"][aria-selected="true"]').count(), 1);
        assert.equal(await page.locator('[role="tabpanel"][inert]').count(), 2);
        assert.equal(await page.getByRole("tabpanel").locator("[data-outcome-primary]").getAttribute("href"), `/en${route}`);
        assert.equal(await page.getByRole("tabpanel").locator("li").count(), 4);
        assert.ok(Math.abs((await panelBox.boundingBox()).height - height) < 1);
    }
    for (const [key, index] of [["Home", 0], ["End", 2], ["ArrowRight", 0], ["ArrowLeft", 2]]) {
        await page.locator('[role="tab"][aria-selected="true"]').press(key);
        assert.equal(await tabs.nth(index).getAttribute("aria-selected"), "true");
        assert.equal(await tabs.nth(index).evaluate((tab) => tab === document.activeElement), true);
    }
    console.log("Homepage outcome tabs: passed");
} finally {
    await browser.close();
}
