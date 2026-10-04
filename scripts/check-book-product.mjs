// Run manually against the dev server: node scripts/check-book-product.mjs
import assert from "node:assert/strict";
import { chromium } from "playwright";

const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto("http://localhost:3001/en/shop/the-3m-s-to-freedom", { waitUntil: "domcontentloaded" });
  const group = page.getByRole("radiogroup", { name: "Choose your format" });
  await group.waitFor();
  assert.equal(await page.locator("h1").count(), 1);
  assert.equal(await group.getByRole("radio").count(), 4);
  assert.equal(await page.locator("[data-selected-price]").getAttribute("data-selected-price"), "29");
  assert.equal(await page.locator("[data-book-summary] > li").count(), 3);
  await page.locator("#what-youll-learn details summary").first().click();
  assert.equal(await page.locator("[data-publisher-takeaways] > li").count(), 4);
  assert.ok((await page.locator("[data-publisher-takeaways]").innerText()).includes("systems, delegation, and metrics"));
  assert.equal(await page.locator('a[href*="undefined"],a[href*="why-the-rich-dont-pay-taxes"]').count(), 0);
  assert.equal(await page.locator('a[href$="/contact"]').count(), 0);
  assert.ok(await page.locator("[data-related-books] h3").count() <= 2);
  const formats = [["Digital PDF",29],["Audiobook",27],["Hardcover",39],["Bundle (Digital + Print)",59]];
  for (const [index,[name,price]] of formats.entries()) {
    await group.getByRole("radio").nth(index).check();
    await page.waitForFunction(expected => document.querySelector("[data-selected-price]")?.getAttribute("data-selected-price") === String(expected),price);
    await page.locator("[data-related-books]").scrollIntoViewIfNeeded();
    await page.locator("#product-sticky-bar").waitFor();
    assert.equal(await page.locator("[data-sticky-price]").getAttribute("data-sticky-price"),String(price));
    await page.locator("#sticky-add-to-cart").click();
    const cart=page.getByRole("dialog",{name:"Shopping Cart"});
    await cart.waitFor();
    assert.ok((await cart.innerText()).includes("The 3M’s to Freedom — "+name));
    assert.ok((await cart.innerText()).includes("$"+price));
    assert.equal(await cart.getByRole("status").getAttribute("aria-live"),"polite");
    await cart.getByRole("button",{name:"Remove The 3M’s to Freedom — "+name+" from cart",exact:true}).click();
    await page.getByRole("button",{name:"Close shopping cart",exact:true}).click();
  }
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  await page.locator("#site-footer").scrollIntoViewIfNeeded();
  await page.locator("#product-sticky-bar").waitFor({state:"detached"});
} finally { await browser.close(); }
