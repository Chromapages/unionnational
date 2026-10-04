import assert from "node:assert/strict";
import { chromium } from "playwright";

// Run against the dev server: node scripts/check-services-priority.mjs
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto(new URL("/en/services", process.env.SERVICES_CHECK_URL ?? "http://localhost:3001").href);
  const tabs = page.locator('#construction-services [role="tab"]');
  await tabs.first().waitFor({ state: "visible" });
  for (const [index, slug] of ["tax-planning", "strategic-bookkeeping", "fractional-cfo", "new-business-formation"].entries()) {
    await tabs.nth(index).click();
    const panel = page.locator("#challenge-recommendations");
    assert.equal(await panel.locator("article").count(), 3);
    assert.equal(await page.locator('#construction-services [aria-selected="true"]').count(), 1);
    assert.equal(await panel.locator('[data-priority-service="start"] a').getAttribute("href"), `/en/${slug}`);
    assert.equal(await panel.locator("[data-service-price]").count(), 3);
    assert.equal(await panel.getAttribute("aria-labelledby"), await tabs.nth(index).getAttribute("id"));
  }
  await tabs.last().press("Home");
  assert.equal(await tabs.first().getAttribute("aria-selected"), "true");
  await tabs.first().press("ArrowLeft");
  assert.equal(await tabs.last().getAttribute("aria-selected"), "true");
  const plans = page.locator("#support-plans [data-support-plan]");
  assert.equal(await plans.count(), 3);
  for (const plan of await plans.all()) {
    assert.match(await plan.locator("[data-plan-price]").innerText(), /\$[\d,]+/);
    assert.equal(await plan.locator("a").getAttribute("href"), "/en/pricing");
  }
  assert.match(await page.locator('#support-plans [data-analytics="strategy_call_cta"]').getAttribute("href"), /book/);
  console.log("Services priority selector: passed");
} finally {
  await browser.close();
}
