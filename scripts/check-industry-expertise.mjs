import assert from "node:assert/strict";
import { chromium } from "playwright";

// Run against the local server: node scripts/check-industry-expertise.mjs
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const page = await browser.newPage();
  for (const width of [375, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(new URL("/en/industries", process.env.INDUSTRIES_CHECK_URL ?? "http://localhost:3001").href);
    assert.equal(await page.locator("h1").count(), 1);
    assert.equal(await page.locator('[role="tab"]').count(), 0);
    const cards = page.locator("[data-industry-card]");
    assert.equal(await cards.count(), 4);
    for (const [index, slug] of ["construction", "restaurants", "real-estate", "e-commerce"].entries()) {
      const card = cards.nth(index);
      assert.equal(await card.locator("li").count(), 3);
      assert.equal(await card.locator('li svg[aria-hidden="true"]').count(), 3);
      assert.equal(await card.getAttribute("href"), "/en/industries/" + slug);
      await card.focus();
      assert.equal(await card.evaluate(e => document.activeElement === e), true);
    }
    assert.equal(await page.locator("main blockquote").count(), 1);
    assert.equal(await page.locator("main dl").count(), 0);
    for (const link of await page.locator('a[href$="/book"]:visible').all()) {
      assert.equal((await link.innerText()).trim(), "Book a Strategy Call");
    }
    assert.equal(await page.locator('a[href$="/contact"]:visible').count(), 0);
    if (width === 375) {
      await page.locator('header button[aria-controls="mobile-navigation"]').click();
      await page.waitForFunction(() => document.querySelector("#mobile-navigation")?.contains(document.activeElement));
      assert.equal(await page.locator('#mobile-navigation a[href$="/book"]').innerText(), "Book a Strategy Call");
      await page.keyboard.press("Escape");
      await page.waitForFunction(() => document.activeElement === document.querySelector('header button[aria-controls="mobile-navigation"]'));
    }
  }
} finally {
  await browser.close();
}
