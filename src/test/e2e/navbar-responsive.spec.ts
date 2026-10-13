import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import en from "../../messages/en.json";
import es from "../../messages/es.json";
import { test, expect, type Page } from "./fixtures";

test.setTimeout(90_000);
test.use({ contextOptions: { reducedMotion: "reduce" } });

const messages = { en: en.Header, es: es.Header };
const destinations = [
    ["services", "/services"], ["industries", "/industries"],
    ["resources", "/resources"], ["about", "/about"], ["shop", "/shop"],
] as const;

test.beforeEach(async ({ context }) => {
    await context.route("https://cdn.sanity.io/images/p1x9y3wz/**", route =>
        ["GET", "HEAD"].includes(route.request().method()) && route.request().resourceType() === "image"
            ? route.continue() : route.abort("blockedbyclient"));
});

async function settleHeader(page: Page) {
    await page.evaluate(() => document.fonts.ready);
    await expect.poll(() => page.locator("header img").evaluateAll(images =>
        images.every(image => (image as HTMLImageElement).complete))).toBe(true);
    await expect.poll(() => page.evaluate(() => {
        const header = document.querySelector("header.site-header")!.getBoundingClientRect();
        const spacer = document.querySelector(".site-header-offset")!.getBoundingClientRect();
        return Math.abs(header.height - spacer.height);
    })).toBeLessThanOrEqual(1);
}

async function checkFullNavigation(page: Page, locale: "en" | "es") {
    const t = messages[locale];
    const header = page.locator("header.site-header");
    const nav = header.getByRole("navigation", { name: t.mainNavigationAria, exact: true });
    await expect(nav).toBeVisible();
    const entries = nav.locator(".strategy-nav-list > .strategy-nav-entry");
    await expect(entries).toHaveCount(5);
    for (const [index, [key, href]] of destinations.entries()) {
        const control = entries.nth(index).getByRole(key === "services" ? "button" : "link", {
            name: t[key], exact: true,
        });
        await expect(control).toBeVisible();
        if (key !== "services") {
            await expect(control).toHaveAttribute("href", `/${locale}${href}`);
        }
        const box = await control.boundingBox();
        expect(box!.height, `${t[key]} target height`).toBeGreaterThanOrEqual(44);
        expect(box!.width, `${t[key]} target width`).toBeGreaterThanOrEqual(44);
    }
    await expect(header.locator(".strategy-locale")).toBeVisible();
    await expect(header.locator(".strategy-booking-cta")).toBeVisible();
    await expect(header.getByRole("button", { name: t.openMenu, exact: true })).toBeHidden();
    await expect(header.getByRole("button", { name: t.more, exact: true })).toHaveCount(0);
    const geometry = await header.evaluate(element => {
        const bounds = element.getBoundingClientRect();
        const controls = Array.from(element.querySelectorAll<HTMLElement>(
            '.strategy-nav-entry > a, .strategy-services-trigger, .strategy-booking-cta, .strategy-locale-button, a[aria-label]',
        )).filter(control => control.getClientRects().length > 0).map(control => {
            const box = control.getBoundingClientRect();
            return { left: box.left, right: box.right, top: box.top, bottom: box.bottom };
        });
        return {
            contained: controls.every(box => box.left >= -1 && box.right <= innerWidth + 1
                && box.top >= bounds.top - 1 && box.bottom <= bounds.bottom + 1),
            overlap: controls.some((box, index) => controls.slice(index + 1).some(other =>
                Math.min(box.right, other.right) - Math.max(box.left, other.left) > 1
                && Math.min(box.bottom, other.bottom) - Math.max(box.top, other.top) > 1)),
        };
    });
    expect(geometry.contained, "header controls stay inside the viewport and header").toBe(true);
    expect(geometry.overlap, "header controls do not overlap").toBe(false);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
}

for (const locale of ["en", "es"] as const) {
    for (const width of [767, 768, 834, 1024, 1280, 1366, 1440, 1536, 1664]) {
        test(`${locale} responsive navbar at ${width}px`, async ({ page }) => {
            await page.setViewportSize({ width, height: 900 });
            await page.goto(`/${locale}/pricing`, { waitUntil: "load" });
            await settleHeader(page);
            if (width < 1024) {
                await expect(page.getByRole("button", { name: messages[locale].openMenu, exact: true })).toBeVisible();
                await expect(page.locator(".strategy-nav-dock")).toBeHidden();
                return;
            }
            await checkFullNavigation(page, locale);
            if (width === 834 || width === 1366) {
                const directory = resolve(".omx/tmp/navbar-responsive/screenshots");
                await mkdir(directory, { recursive: true });
                await page.locator("header.site-header").screenshot({ path: resolve(directory, `navbar-${locale}-${width}.png`) });
                await page.evaluate(() => window.scrollTo(0, 450));
                await expect(page.locator("header.site-header")).toHaveAttribute("data-compact", "true");
                await settleHeader(page);
                await checkFullNavigation(page, locale);
            }
        });
    }

    test(`${locale} laptop Services and language disclosures preserve keyboard focus`, async ({ page }) => {
        await page.setViewportSize({ width: 1024, height: 700 });
        await page.goto(`/${locale}/pricing`);
        await settleHeader(page);
        const services = page.locator("#header-services-button");
        await services.click();
        const panel = page.locator("#header-services-panel");
        await expect(panel).toBeVisible();
        const box = await panel.boundingBox();
        expect(box!.x).toBeGreaterThanOrEqual(0);
        expect(box!.x + box!.width).toBeLessThanOrEqual(1024);
        expect(box!.y + box!.height).toBeLessThanOrEqual(700);
        await panel.getByRole("link").first().focus();
        await page.keyboard.press("Escape");
        await expect(panel).toBeHidden();
        await expect(services).toBeFocused();
        await page.keyboard.press("Enter");
        await expect(panel).toBeVisible();
        await expect(panel.getByRole("link").first()).toBeFocused();
        await page.keyboard.press("Escape");
        await expect(services).toBeFocused();
        const language = page.locator(".strategy-locale-button");
        await language.focus();
        await page.keyboard.press("Space");
        await expect(page.locator("#header-language-options")).toBeVisible();
        await page.keyboard.press("Escape");
        await expect(page.locator("#header-language-options")).toBeHidden();
        await expect(language).toBeFocused();
    });

    test(`${locale} open phone drawer cleans up when resized to laptop`, async ({ page }) => {
        await page.setViewportSize({ width: 320, height: 900 });
        await page.goto(`/${locale}/pricing`);
        await page.getByRole("button", { name: messages[locale].openMenu, exact: true }).click();
        const drawer = page.getByRole("dialog", { name: messages[locale].mobileNavigationAria, exact: true });
        await expect(drawer).toBeVisible();
        expect(await page.evaluate(() => document.body.style.overflow)).toBe("hidden");
        await page.setViewportSize({ width: 1024, height: 700 });
        await expect(drawer).toBeHidden();
        await expect.poll(() => page.evaluate(() => document.body.style.overflow)).not.toBe("hidden");
        await expect(page.locator("header[inert], main[inert], footer[inert]")).toHaveCount(0);
        await expect.poll(() => page.evaluate(() => {
            const focused = document.activeElement as HTMLElement | null;
            return Boolean(focused && focused !== document.body && focused.getClientRects().length > 0
                && !focused.closest("[inert]"));
        })).toBe(true);
        await settleHeader(page);
        await checkFullNavigation(page, locale);
    });
}

for (const width of [1536, 1664]) {
    test(`Spanish S-Corp booking label fits at ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.goto("/es/s-corp-tax-advantage");
        await settleHeader(page);
        await checkFullNavigation(page, "es");
        const booking = page.locator("header .strategy-booking-cta");
        await expect(booking).toContainText("Reservar una evaluación S-Corp");
        await expect(booking).toHaveAttribute("href", "/es/book");
        await expect(booking).toHaveCSS("white-space", "nowrap");
        expect(await booking.evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
    });
}
