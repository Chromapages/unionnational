import assert from "node:assert/strict";
import { chromium } from "playwright";

// Run against the dev server: node scripts/check-about-consolidation.mjs
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const page = await browser.newPage();
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(new URL("/en/about", process.env.ABOUT_CHECK_URL ?? "http://localhost:3001").href);
    assert.equal(await page.locator("h1").count(), 1);
    assert.equal((await page.locator("h1").innerText()).replace(/\s+/g, " ").trim(), "The People Behind Your Financial Strategy.");
    assert.equal(await page.locator("[data-about-practice] li").count(), 4);
    assert.equal(await page.locator('#about-hero a[href="/en/team"]').count(), 1);
    assert.equal(await page.locator("#about-founder [data-about-person]").count(), 1);
    assert.equal(await page.locator("[data-founder-practice] li").count(), 3);
    assert.equal(await page.locator('#about-founder a[href="/en/team#founder"]').count(), 1);
    assert.equal(await page.locator('#about-team a[href="/en/team"]').count(), 1);
    assert.equal(await page.locator("[data-team-values] li").count(), 3);
    assert.equal(await page.locator('#about-team [data-about-person="pending"]').count(), 0);
    assert.ok(await page.locator('#about-team a[href*="#team-member-"]').count() > 0);
    assert.equal(await page.locator("[data-about-work] > li").count(), 3);
    assert.equal(await page.locator("#about-work h4").count(), 3);
    assert.equal(await page.locator("#about-work h2").innerText(), "A clear process. A stronger tomorrow.");
    assert.equal(await page.locator("[data-about-proof]").count(), 0);
    for (const card of await page.locator("[data-about-person]").all()) {
      const tags = await card.locator("[data-credential]").allTextContents();
      assert.equal(new Set(tags).size, tags.length);
    }
    for (const link of await page.locator('a[href^="/en/book"]:visible').all()) assert.equal((await link.innerText()).trim(), "Book a Strategy Call");
    assert.equal(await page.locator("#about-next-step ul li").count(), 3);
    assert.equal(new URL(await page.locator("#about-next-step a").getAttribute("href"), page.url()).pathname, "/en/book");
    if (width === 390 && await page.locator("chat-widget").count()) {
      await page.locator("#about-next-step a").scrollIntoViewIfNeeded();
      await page.waitForFunction(() => document.querySelector("chat-widget")?.hasAttribute("data-about-cta-visible"));
      assert.equal(await page.locator("chat-widget").evaluate(widget => getComputedStyle(widget).visibility), "hidden");
    }
    assert.equal(await page.locator('a[href$="/contact"]:visible').count(), 0);
  }
  await page.goto(new URL("/en/team", process.env.ABOUT_CHECK_URL ?? "http://localhost:3001").href);
  assert.equal(await page.locator("h1").count(), 1);
  assert.equal(await page.locator("[data-directory-founder]").count(), 1);
  const founderDisclosure = page.locator('#founder details');
  if (await founderDisclosure.count()) {
    const founderSummary = founderDisclosure.locator('summary');
    await founderSummary.focus();
    await founderSummary.press('Enter');
    assert.equal(await founderDisclosure.evaluate(element => element.open), true);
    assert.ok((await founderDisclosure.locator('p').innerText()).trim().length > 0);
    await founderSummary.press('Enter');
    assert.equal(await founderDisclosure.evaluate(element => element.open), false);
  }
  const sourceImage = new URL(await page.locator("#founder img").getAttribute("src"));
  const [, , projectId, dataset] = sourceImage.pathname.split("/");
  const rosterQuery = '*[_type == "teamMember" && isFounder != true]{_id}';
  const rosterResponse = await fetch(`https://${projectId}.api.sanity.io/v2025-01-01/data/query/${dataset}?query=${encodeURIComponent(rosterQuery)}`);
  assert.ok(rosterResponse.ok);
  const { result: publishedRoster } = await rosterResponse.json();
  const renderedIds = await page.locator("[data-team-directory] article").evaluateAll(cards => cards.map(card => card.id.replace("team-member-", "")).sort());
  assert.deepEqual(renderedIds, publishedRoster.map(member => member._id).sort());
  assert.equal(await page.locator('#team-next-step a[href^="/en/book"]').count(), 1);
  assert.equal(await page.locator('a[href$="/contact"]:visible').count(), 0);
  const profileCard = page.locator('[id^="team-member-"]').first();
  const profileButton = profileCard.locator("button");
  await profileButton.focus();
  await profileButton.press("Enter");
  await page.getByRole("dialog").waitFor();
  await page.waitForFunction(() => document.activeElement?.getAttribute("aria-label") === "Close profile");
  await page.keyboard.press("Escape");
  await page.getByRole("dialog").waitFor({ state: "detached" });
  assert.equal(await profileButton.evaluate(button => document.activeElement === button), true);
} finally {
  await browser.close();
}
