import { test, expect, type Page } from "./fixtures";
import path from "node:path";

const screenshots = path.resolve(".omx/tmp/unt-pricing-preview/screenshots");
const locales = ["en", "es"] as const;
const browserDiagnostics = new WeakMap<Page, string[]>();
test.setTimeout(120_000); // Cold development compilation spans several service routes in the integration case.
test.beforeEach(async ({ context, page }) => {
  const diagnostics: string[] = [];
  browserDiagnostics.set(page, diagnostics);
  page.on("pageerror", error => diagnostics.push(`pageerror: ${error.message}`));
  page.on("console", message => { if (message.type() === "error") diagnostics.push(`console: ${message.text()}`); });
  page.on("requestfailed", request => { if (request.url().includes("/_next/")) diagnostics.push(`chunk: ${request.failure()?.errorText}`); });
  // Public brand images are read-only; all other external requests and every submission remain blocked.
  await context.route("https://cdn.sanity.io/images/p1x9y3wz/**", route => route.request().method() === "GET" ? route.continue() : route.abort("blockedbyclient"));
});
test.afterEach(async ({ page }, info) => {
  if (info.status === info.expectedStatus || page.isClosed()) return;
  const tabs = await page.getByRole("tab").evaluateAll(elements => elements.map(element => {
    const propsKey = Object.keys(element).find(key => key.startsWith("__reactProps"));
    const props = propsKey ? (element as unknown as Record<string, { onKeyDown?: unknown }>)[propsKey] : undefined;
    return { text: element.textContent, selected: element.getAttribute("aria-selected"), focused: element === document.activeElement, keyHandler: typeof props?.onKeyDown };
  }));
  await info.attach("browser-diagnostics", { body: JSON.stringify({ tabs, messages: browserDiagnostics.get(page) }, null, 2), contentType: "application/json" });
});

for (const locale of locales) {
  for (const width of [320, 375, 768, 1280]) {
    test(`draft pricing ledger ${locale} at ${width}px`, async ({ page }) => {
      test.skip(process.env.UNT_PRICING_BROWSER_PREVIEW !== "1", "Requires the explicitly enabled local pricing fixture server.");
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`/${locale}/pricing`);
      await expect(page.locator("[data-pricing-draft]")).toBeVisible({ timeout: 20_000 });
      const panel = page.getByRole("tabpanel");
      await expect(panel.locator("article")).toHaveCount(10);
      for (const price of ["$2,500", "$595", "$250", "$1,495", "$1,795", "$3,500", "$495", "$750"]) await expect(panel).toContainText(price);
      await expect(panel).toContainText(locale === "es" ? "Desde $2,500/mes" : "From $2,500/month");
      await expect(panel).toContainText(locale === "es" ? "Desde $3,500/año" : "From $3,500/year");
      await expect(panel).toContainText("Utah");
      await expect(panel).not.toContainText("$1,800");
      await expect(panel).not.toContainText("$6,500");
      await expect(panel).not.toContainText("$10,000");
      const inquiry = panel.locator("a").first();
      await expect(inquiry).toHaveAttribute("href", `/${locale}/contact`);
      const dimensions = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, viewport: innerWidth }));
      expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.viewport + 1);
      await expect.poll(() => page.locator(".strategy-dock-logo img").evaluateAll(images => images.every(image => (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0))).toBe(true);
      await page.screenshot({ path: path.join(screenshots, `pricing-${locale}-${width}.png`), fullPage: width === 1280 });
      // Wait for streamed client handlers by retrying the actual keyboard interaction, not a fixed sleep.
      await expect(async () => {
        await page.getByRole("tab").first().focus();
        await page.keyboard.press("ArrowRight");
        await expect(page.getByRole("tab").nth(1)).toBeFocused({ timeout: 500 });
      }).toPass({ timeout: 20_000 });
      await expect(panel.locator("article")).toHaveCount(3);
      await page.keyboard.press("Home");
      await expect(panel.locator("article")).toHaveCount(10);
      if (width === 1280) {
        await page.evaluate(() => { document.documentElement.style.zoom = "2"; });
        const zoomed = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, viewport: innerWidth }));
        expect(zoomed.scroll).toBeLessThanOrEqual(zoomed.viewport + 1);
        await expect(panel.locator("article").first()).toBeVisible();
      }
    });
  }

  test(`shared services and detail prices in ${locale}`, async ({ page }) => {
    test.skip(process.env.UNT_PRICING_BROWSER_PREVIEW !== "1", "Requires the explicitly enabled local pricing fixture server.");
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(`/${locale}/services`);
    await expect(page.locator("[data-pricing-draft]")).toBeVisible();
    await expect(page.locator("[data-support-plan]")).toHaveCount(2);
    await expect(page.locator("[data-plan-price]").first()).toContainText(locale === "es" ? "Desde $2,500/mes" : "From $2,500/month");
    await page.locator("#support-plans").screenshot({ path: path.join(screenshots, `services-${locale}-1280.png`) });
    for (const [route, prices] of [
      ["fractional-cfo", ["$2,500"]], ["strategic-bookkeeping", ["$595"]],
      ["payroll-services", ["$250"]], ["tax-planning", ["$3,500", "$495"]],
      ["tax-preparation-and-filing", ["$1,495", "$1,795", "$595"]], ["back-taxes-irs-tax-resolution", ["$750"]],
    ] as const) {
      await page.goto(`/${locale}/${route}`);
      await expect(page.locator("[data-pricing-draft]")).toBeVisible();
      const offers = page.locator("[data-service-offers]");
      for (const price of prices) await expect(offers).toContainText(price);
      await expect(offers).not.toContainText("$15 per employee");
      if (route === "back-taxes-irs-tax-resolution") {
        await expect(offers).not.toContainText("30");
        await offers.screenshot({ path: path.join(screenshots, `irs-${locale}-1280.png`) });
      }
      if (route === "payroll-services") await offers.screenshot({ path: path.join(screenshots, `payroll-${locale}-1280.png`) });
      const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
      expect(canonical).toContain(`/${locale}/${route}`);
      const final = page.locator("#service-next-step a").first();
      await expect(final).toHaveAttribute("href", new RegExp(`(?:/${locale})?/book`));
    }
    await page.goto(`/${locale}/services/fractional-cfo`);
    await expect(page).toHaveURL(new RegExp(`/${locale}/fractional-cfo$`));
  });
}
