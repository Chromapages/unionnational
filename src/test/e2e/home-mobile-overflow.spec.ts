import { expect, test } from "@playwright/test";

const mobileWidths = [320, 375, 414, 428];

test.use({ channel: process.env.PLAYWRIGHT_CHANNEL as "chrome" | undefined });

test.describe("homepage mobile viewport", () => {
    for (const width of mobileWidths) {
        test(`does not overflow horizontally at ${width}px`, async ({ page }) => {
            await page.setViewportSize({ width, height: 844 });
            await page.goto(process.env.HOMEPAGE_URL ?? "http://localhost:3000/en", { waitUntil: "domcontentloaded" });
            await page.getByRole("heading", { level: 1 }).waitFor();

            const overflowingElements = await page.evaluate(() => {
                const viewportWidth = document.documentElement.clientWidth;

                return [...document.querySelectorAll<HTMLElement>("*")]
                    .filter((element) => {
                        const overflowX = window.getComputedStyle(element).overflowX;
                        return element.scrollWidth > viewportWidth && !["auto", "scroll"].includes(overflowX);
                    })
                    .map((element) => ({
                        tag: element.tagName.toLowerCase(),
                        className: element.className,
                        id: element.id,
                        scrollWidth: element.scrollWidth,
                    }));
            });

            const documentScrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
            const clearanceViolations = await page.evaluate(() => {
                const viewportWidth = document.documentElement.clientWidth;
                const selectors = [
                    "#hero-heading",
                    "#hero-heading + p",
                    'section[aria-labelledby="hero-heading"] a[href$="/scorp-estimator"]',
                    'section[aria-labelledby="hero-heading"] a[href="#services"]',
                    'section[aria-labelledby="hero-heading"] [aria-label="Firm credentials"]',
                    "header button",
                ];

                return selectors.flatMap((selector) => [...document.querySelectorAll<HTMLElement>(selector)]
                    .map((element) => {
                        const { left, right, width: elementWidth } = element.getBoundingClientRect();
                        return { selector, left, right, elementWidth };
                    })
                    .filter(({ left, right, elementWidth }) => elementWidth > 0 && (left < 16 || right > viewportWidth - 16)));
            });

            expect(documentScrollWidth).toBeLessThanOrEqual(width);
            expect(overflowingElements).toEqual([]);
            expect(clearanceViolations).toEqual([]);
        });
    }
});
