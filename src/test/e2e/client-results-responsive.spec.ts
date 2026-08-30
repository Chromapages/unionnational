import { expect, test } from "@playwright/test";

const viewports = [
    { width: 320, columns: 1, padding: 20 },
    { width: 375, columns: 1, padding: 20 },
    { width: 768, columns: 1, padding: 24 },
    { width: 1024, columns: 3, padding: 32 },
    { width: 1280, columns: 3, padding: 32 },
    { width: 1440, columns: 3, padding: 32 },
];

test.use({ channel: process.env.PLAYWRIGHT_CHANNEL as "chrome" | undefined });

test.describe("Client Results responsive layout", () => {
    for (const viewport of viewports) {
        test(`uses the intended ${viewport.columns}-column layout at ${viewport.width}px`, async ({ page }) => {
            await page.setViewportSize({ width: viewport.width, height: 1000 });
            await page.goto(process.env.HOMEPAGE_URL ?? "http://localhost:3000/en", { waitUntil: "domcontentloaded" });

            const section = page.locator("#client-results");
            const grid = page.getByTestId("client-results-grid");
            await expect(section).toBeVisible();

            const layout = await grid.evaluate((element) => {
                const style = getComputedStyle(element);
                const card = element.querySelector<HTMLElement>("article, figure");
                return {
                    columns: style.gridTemplateColumns.split(" ").length,
                    padding: card ? Number.parseFloat(getComputedStyle(card).paddingLeft) : 0,
                    documentScrollWidth: document.documentElement.scrollWidth,
                };
            });

            expect(layout.columns).toBe(viewport.columns);
            expect(layout.padding).toBe(viewport.padding);
            expect(layout.documentScrollWidth).toBeLessThanOrEqual(viewport.width);
        });
    }

    for (const width of [375, 768]) {
        test(`keeps long case-study and quote content contained at ${width}px`, async ({ page }) => {
            await page.setViewportSize({ width, height: 1000 });
            await page.goto(process.env.HOMEPAGE_URL ?? "http://localhost:3000/en", { waitUntil: "domcontentloaded" });

            const section = page.locator("#client-results");
            await section.evaluate((element) => {
                element.querySelectorAll("dd").forEach((item) => {
                    item.textContent = "A detailed explanation of the business change, financial decisions, and ongoing implementation work needed to support a complex multi-state operating plan.";
                });
                element.querySelectorAll("blockquote").forEach((item) => {
                    item.textContent = "The team gave us a detailed roadmap that made our financial priorities clear, coordinated the operational work, and helped us make confident decisions throughout a complicated growth period.";
                });
            });

            const measurements = await section.evaluate((element) => ({
                overflow: element.scrollWidth > document.documentElement.clientWidth,
                cards: [...element.querySelectorAll<HTMLElement>("article, figure")].map((card) => {
                    const caption = card.querySelector<HTMLElement>("figcaption");
                    const cardBox = card.getBoundingClientRect();
                    const captionBox = caption?.getBoundingClientRect();
                    return {
                        minHeight: getComputedStyle(card).minHeight,
                        captionInset: captionBox ? Math.round(cardBox.bottom - captionBox.bottom) : null,
                    };
                }),
            }));

            expect(measurements.overflow).toBe(false);
            expect(measurements.cards.every((card) => card.minHeight === "0px")).toBe(true);
            expect(measurements.cards.filter((card) => card.captionInset !== null).every((card) => card.captionInset! >= 20)).toBe(true);
        });
    }
});
