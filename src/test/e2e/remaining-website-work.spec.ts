import { test, expect, type Page } from "./fixtures";
import en from "../../messages/en.json";
import es from "../../messages/es.json";

test.setTimeout(120_000);

test.beforeEach(async ({ context }) => {
    await context.route("https://cdn.sanity.io/images/p1x9y3wz/**", route =>
        ["GET", "HEAD"].includes(route.request().method()) && route.request().resourceType() === "image"
            ? route.continue() : route.abort("blockedbyclient"));
});

for (const locale of ["en", "es"] as const) {
    for (const width of [390, 1920]) {
        test(`construction copy and offers remain consistent in ${locale} at ${width}px`, async ({ page }, info) => {
            const messages = locale === "es" ? es : en;
            const slug = "the-money-making-blueprint-for-construction-companies";
            const path = `/${locale}/shop/${slug}`;
            await page.setViewportSize({ width, height: 900 });
            await page.goto(path);
            const description = messages.Shop.Desktop.books.construction.description;
            await expect(page.getByText(description, { exact: true }).first()).toBeVisible();
            await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", description);
            await expect(page.locator('meta[property="og:description"]')).toHaveAttribute("content", description);
            await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://unionnationaltax.com${path}`);
            const overview = page.locator("#what-youll-learn");
            const copy = messages.Shop.ProductPage.constructionOverview;
            for (const feature of copy.features.slice(0, 3)) await expect(overview.getByText(feature, { exact: true })).toBeVisible();
            for (const accordion of await overview.locator("details").all()) {
                const summary = accordion.locator("summary");
                if (width === 1920) { await summary.focus(); await page.keyboard.press("Enter"); }
                else await summary.click();
                await expect(accordion).toHaveAttribute("open", "");
            }
            for (const feature of copy.features.slice(3)) await expect(overview.getByText(feature, { exact: true })).toBeVisible();
            for (const objective of copy.learningObjectives) {
                const item = overview.locator("details li").filter({ hasText: objective.title });
                await expect(item).toBeVisible();
                await expect(item).toContainText(objective.description);
            }
            expect(await overview.innerText()).not.toMatch(/Section 179|1099|depreciaci[oó]n|depreciation/i);
            const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
            const product = schemas.map(text => JSON.parse(text)).find(schema => schema["@type"] === "Product");
            expect(product.description).toBe(description);
            expect(product.offers.map((offer: { price: number }) => offer.price).sort((a: number, b: number) => a - b)).toEqual([27, 27, 39, 59]);
            expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
            await page.screenshot({ path: info.outputPath(`construction-${locale}-${width}.png`) });
        });
    }
}

for (const width of [320, 390]) {
    test(`assessment retains one selected zero option with keyboard navigation at ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.goto("/en/health-check");
        await page.getByRole("button", { name: "Start Diagnostic", exact: true }).click();
        await page.getByRole("group").getByRole("button", { name: /^S-Corp/ }).click();
        await page.locator("#health-question-2").waitFor();
        const unsure = page.getByRole("button", { name: "Not sure", exact: true });
        await unsure.focus();
        await page.keyboard.press("Enter");
        await page.locator("#health-question-3").waitFor();
        await page.getByRole("button", { name: "Previous Question", exact: true }).click();
        await expect(page.locator("#health-question-2")).toBeFocused();
        await expect(unsure).toHaveAttribute("aria-pressed", "true");
        await expect(page.getByRole("button", { name: "Missing 1-2 returns", exact: true })).toHaveAttribute("aria-pressed", "false");
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    });
}

async function completeAssessment(page: Page, locale: "en" | "es" = "en") {
    const copy = (locale === "es" ? es : en).HealthCheck;
    await page.goto(`/${locale}/health-check`);
    await page.getByRole("button", { name: copy.start, exact: true }).click();
    for (let step = 1; step <= 7; step++) {
        await page.locator(`#health-question-${step}`).waitFor();
        await page.getByRole("group").getByRole("button").first().click();
    }
    await page.getByLabel(copy.capture.firstName, { exact: true }).fill("Preview");
    await page.getByLabel(copy.capture.lastName, { exact: true }).fill("Fixture");
    await page.getByLabel(copy.capture.email, { exact: true }).fill("preview@example.test");
    await page.getByLabel(copy.capture.phone, { exact: true }).fill("5550101234");
}

for (const width of [320, 390, 1920]) {
    test(`Spanish assessment completes through a local mock at ${width}px`, async ({ page, context }, info) => {
        const requests: Record<string, unknown>[] = [];
        await context.route("**/api/survey", async route => {
            requests.push(route.request().postDataJSON());
            await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ success: true, score: 100, category: "growth" }) });
        });
        await page.setViewportSize({ width, height: 900 });
        await completeAssessment(page, "es");
        await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", es.HealthCheck.metadata.description);
        await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://unionnationaltax.com/es/health-check");
        await expect(page.getByRole("heading", { name: es.HealthCheck.capture.title, exact: true })).toBeVisible();
        await page.getByRole("button", { name: es.HealthCheck.capture.submit, exact: true }).click();
        await expect(page.getByText(es.HealthCheck.results.basedOn, { exact: true })).toBeVisible();
        await expect(page.getByRole("link", { name: es.HealthCheck.results.growth.cta, exact: true })).toHaveAttribute("href", "/es/services");
        expect(requests).toHaveLength(1);
        expect(requests[0]).toMatchObject({ locale: "es", source_page: "/es/health-check", answer_contract_version: "health-check-v1", answer_option_ids: { 1: "s-corp", 2: "on-time", 3: "none", 4: "monthly", 5: "always", 6: "accounting-software", 7: "year-round" } });
        expect(page.url()).not.toMatch(/score=|answer=|email=/);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
        await page.screenshot({ path: info.outputPath(`assessment-es-${width}.png`) });
    });
}

test("Spanish assessment validates and recovers from a mocked delivery failure", async ({ page, context }) => {
    let requests = 0;
    await context.route("**/api/survey", async route => {
        requests++;
        await route.fulfill({ status: 503, contentType: "application/json", body: JSON.stringify({ success: false }) });
    });
    await completeAssessment(page, "es");
    const firstName = page.getByLabel(es.HealthCheck.capture.firstName, { exact: true });
    await firstName.fill("");
    await page.getByRole("button", { name: es.HealthCheck.capture.submit, exact: true }).click();
    await expect(firstName).toBeFocused();
    await expect(firstName).toHaveAttribute("aria-invalid", "true");
    await expect(firstName).toHaveAccessibleDescription(es.HealthCheck.capture.errors.firstName);
    expect(requests).toBe(0);
    await firstName.fill("Preview");
    await page.getByRole("button", { name: es.HealthCheck.capture.submit, exact: true }).click();
    await expect(page.locator("main").getByRole("alert")).toHaveText(es.HealthCheck.submissionError);
    await expect(page.getByLabel(es.HealthCheck.capture.email, { exact: true })).toHaveValue("preview@example.test");
    await expect(page.getByText(es.HealthCheck.results.basedOn, { exact: true })).toHaveCount(0);
    await expect(page.locator("form").getByRole("button", { name: es.HealthCheck.capture.submit, exact: true })).toBeEnabled();
    expect(requests).toBe(1);
});

test("mock assessment acceptance preserves answer identities and suppresses duplicate submits", async ({ page, context }) => {
    const requests: Record<string, unknown>[] = [];
    await context.route("**/api/survey", async route => {
        requests.push(route.request().postDataJSON());
        await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ success: true, score: 100, category: "growth" }) });
    });
    await completeAssessment(page);
    await page.locator("form").evaluate(form => {
        (form as HTMLFormElement).requestSubmit();
        (form as HTMLFormElement).requestSubmit();
    });
    await expect(page.getByText("Based on Your Answers", { exact: true })).toBeVisible();
    expect(requests).toHaveLength(1);
    expect(requests[0]).toMatchObject({ answer_contract_version: "health-check-v1", source_page: "/en/health-check", answers: { 1: 15, 2: 20, 3: 15, 4: 15, 5: 12, 6: 12, 7: 11 }, answer_option_ids: { 1: "s-corp", 2: "on-time", 3: "none", 4: "monthly", 5: "always", 6: "accounting-software", 7: "year-round" } });
    await expect(page.getByRole("link", { name: "Explore Fractional CFO", exact: true })).toHaveAttribute("href", "/en/services");
    expect(page.url()).not.toMatch(/score=|answer=|email=/);
});

test("mock assessment rejection retains contact and answers without showing a result", async ({ page, context }) => {
    await context.route("**/api/survey", route => route.fulfill({ status: 503, contentType: "application/json", body: JSON.stringify({ success: false }) }));
    await completeAssessment(page);
    await page.getByRole("button", { name: "View Assessment Summary", exact: true }).click();
    await expect(page.locator("main").getByRole("alert")).toContainText("couldn't confirm your submission");
    await expect(page.getByLabel("Email Address", { exact: true })).toHaveValue("preview@example.test");
    await expect(page.getByText("Based on Your Answers", { exact: true })).toHaveCount(0);
    await expect(page.getByRole("link", { name: "Privacy Policy", exact: true }).first()).toHaveAttribute("href", "/en/legal/privacy-policy");
});
