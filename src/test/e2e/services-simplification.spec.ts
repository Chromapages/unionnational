import { expect, test } from "./fixtures";

const recommendations = [
  ["s-corp-tax-advantage", "tax-planning", "tax-preparation-and-filing"],
  ["strategic-bookkeeping", "fractional-cfo", "payroll-services"],
  ["fractional-cfo", "strategic-bookkeeping", "tax-planning"],
  ["new-business-formation", "payroll-services", "tax-preparation-and-filing"],
];

for (const locale of ["en", "es"]) {
  for (const width of [390, 1280]) {
    test(`Services preserves problem routes and pricing context: ${locale}, ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`${process.env.SERVICES_TEST_ORIGIN || "http://localhost:3000"}/${locale}/services`);
      const experience = page.getByTestId("services-experience");
      const tabs = experience.getByRole("tab");
      await expect(tabs).toHaveCount(4);
      for (let index = 0; index < recommendations.length; index++) {
        await tabs.nth(index).click();
        await expect(tabs.nth(index)).toHaveAttribute("aria-selected", "true");
        const panel = experience.getByRole("tabpanel");
        await expect(panel).toHaveCount(1);
        const hrefs = await panel.locator("a[data-service-href]").evaluateAll(elements => [...new Set(elements.map(element => element.getAttribute("href")))]);
        expect(hrefs).toEqual(recommendations[index].map(slug => `/${locale}/${slug}`));
      }
      await tabs.nth(3).press("Home");
      await expect(tabs.nth(0)).toBeFocused();
      await expect(tabs.nth(0)).toHaveAttribute("aria-selected", "true");
      await tabs.nth(0).press("ArrowRight");
      await expect(tabs.nth(1)).toBeFocused();
      await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
      await expect(experience.locator("#services-common-questions details")).toHaveCount(4);
      await expect(experience.locator('a[data-analytics="strategy_call_cta"]')).toHaveCount(3);
      await expect(experience.locator("#support-plans")).toContainText(locale === "en" ? "annual tax-return filing" : "declaración anual");
      expect(await page.evaluate(() => document.body.scrollWidth > innerWidth)).toBe(false);
    });
  }
}

test("Services FAQ keeps a single open answer and updates its decision guide", async ({ page }) => {
  await page.goto(`${process.env.SERVICES_TEST_ORIGIN || "http://localhost:3000"}/en/services`);
  const faq = page.locator("#services-common-questions");
  const cards = faq.locator("details");
  const guide = faq.locator("#services-faq-guide ul");
  await expect(cards).toHaveCount(4);
  await expect(cards.nth(0)).toHaveAttribute("open", "");
  const originalGuidance = await guide.textContent();
  await cards.nth(1).locator("summary").press("Enter");
  await expect(cards.nth(1)).toHaveAttribute("open", "");
  await expect(cards.nth(0)).not.toHaveAttribute("open", "");
  await expect(guide).not.toHaveText(originalGuidance || "");
  await expect(faq.locator('a[data-analytics="strategy_call_cta"]')).toHaveCount(1);
  await expect(faq.locator('a[href="#support-plans"]')).toBeVisible();
});
