import { expect, test } from "./fixtures";

const desktopWidths = [1024, 1280, 1366, 1440, 1600, 1728, 1920];

test.use({ channel: process.env.PLAYWRIGHT_CHANNEL as "chrome" | undefined });

test.describe("homepage late-funnel CTA", () => {
    for (const width of desktopWidths) {
        test(`keeps proposition and action adjacent at ${width}px`, async ({ page }) => {
            await page.setViewportSize({ width, height: 1000 });
            await page.goto(process.env.HOMEPAGE_URL ?? "http://localhost:3000/en", { waitUntil: "domcontentloaded" });

            const section = page.locator("section").filter({ has: page.getByRole("heading", { name: "Ready for a smarter tax strategy?" }) });
            await section.scrollIntoViewIfNeeded();
            const cta = section.getByRole("link", { name: "Book a Strategy Call" });
            await expect(cta).toHaveAttribute("href", /\/en\/book\?returnTo=/);
            await expect(cta).toHaveAttribute("data-analytics", "strategy_call_cta");

            const layout = await section.evaluate((element) => {
                const container = element.querySelector<HTMLElement>(":scope > div");
                const grid = container?.querySelector<HTMLElement>(":scope > div > div");
                const [proposition, action] = grid ? [...grid.children].map((child) => child.getBoundingClientRect()) : [];
                const button = element.querySelector<HTMLAnchorElement>("a");
                const buttonBox = button?.getBoundingClientRect();
                return {
                    containerWidth: Math.round(container?.getBoundingClientRect().width ?? 0),
                    gap: proposition && action ? Math.round(action.x - proposition.right) : 0,
                    buttonHeight: Math.round(buttonBox?.height ?? 0),
                    pageOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
                };
            });

            expect(layout.containerWidth).toBeLessThanOrEqual(1536);
            expect(layout.gap).toBeGreaterThanOrEqual(32);
            expect(layout.gap).toBeLessThanOrEqual(48);
            expect(layout.buttonHeight).toBeGreaterThanOrEqual(56);
            expect(layout.pageOverflow).toBe(false);
        });
    }

    test("uses an internal booking destination with visible focus and pressed states", async ({ page }) => {
        await page.goto(process.env.HOMEPAGE_URL ?? "http://localhost:3000/en", { waitUntil: "domcontentloaded" });
        const cta = page.getByRole("link", { name: "Book a Strategy Call" });
        await expect(cta).toHaveClass(/focus-visible:outline-\[3px\]/);
        await expect(cta).toHaveClass(/focus-visible:ring-gold-300/);
        await expect(cta).toHaveClass(/active:bg-gold-600/);
        await expect(cta).not.toContainText(/accepting new advisory clients/i);
        await expect(page.getByText(/Free 30-minute consultation/i)).toBeVisible();
    });

    test("stacks only when the CTA container cannot preserve its 7/5 rail", async ({ page }) => {
        await page.setViewportSize({ width: 768, height: 1000 });
        await page.goto(process.env.HOMEPAGE_URL ?? "http://localhost:3000/en", { waitUntil: "domcontentloaded" });
        const section = page.locator("section").filter({ has: page.getByRole("heading", { name: "Ready for a smarter tax strategy?" }) });

        const columns = await section.evaluate((element) => {
            const grid = element.querySelector<HTMLElement>(".cta-decision-grid");
            return getComputedStyle(grid!).gridTemplateColumns.split(" ").length;
        });

        expect(columns).toBe(1);
    });
});
