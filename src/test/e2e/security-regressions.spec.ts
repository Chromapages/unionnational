import { test, expect, type Page } from "./fixtures";

test.use({ serviceWorkers: "block" });
test.setTimeout(60_000);

async function fillStrategy(page: Page) {
    await page.goto("/en/intake");
    for (const [name, value] of Object.entries({ firstName: "Audit", lastName: "Example", companyName: "Synthetic Audit LLC", email: "audit@example.invalid", phone: "5550101234" })) {
        await page.locator(`input[name="${name}"]`).fill(value);
    }
    const next = page.getByRole("button", { name: "Continue Path" });
    await next.click();
    await page.locator('select[name="industry"]').selectOption("Restaurant");
    await page.locator('input[name="state"]').fill("Texas");
    await page.getByText("Service-Based", { exact: true }).click();
    await page.getByText("$1M-$3M", { exact: true }).click();
    await next.click();
    await page.getByText("LLC (Single)", { exact: true }).click();
    await page.getByText("Yes, I have an accountant", { exact: true }).click();
    await page.getByText("Books are current", { exact: true }).click();
    await next.click();
    await page.locator('textarea[name="primaryPainPoint"]').fill("Synthetic request for bookkeeping guidance.");
    await page.getByText("S-Corp Advantage", { exact: true }).click();
    await expect(page.locator('input[type="checkbox"][value="S-Corp Advantage"]')).toBeChecked();
    await next.click();
    await page.getByText("1-3 Months", { exact: true }).click();
    await page.getByText("Maybe, depending on ROI", { exact: true }).click();
    await page.getByText("Wait for callback", { exact: true }).click();
}

async function fillConstruction(page: Page) {
    await page.goto("/en/construction-profitability-assessment");
    for (const name of ["$500K-$1M", "Yes, fully automated", "Weekly / Real-time", "Highly accurate / Data-driven", "Monthly / Proactive"]) {
        await page.getByRole("button", { name, exact: true }).click();
    }
    for (const [name, value] of Object.entries({ firstName: "Audit", lastName: "Example", companyName: "Synthetic Audit LLC", email: "audit@example.invalid", phone: "5550101234" })) {
        await page.locator(`input[name="${name}"]`).fill(value);
    }
}

const cases = ["acknowledged", "not-acknowledged", "400", "429", "500", "invalid-json", "network", "timeout", "double-submit"] as const;

for (const form of ["strategy", "construction"] as const) {
    for (const scenario of cases) {
        test(`${form}: ${scenario} preserves truthful acknowledgement`, async ({ page }) => {
            let requests = 0;
            let payload: Record<string, unknown> | undefined;
            let releaseSubmission: () => void = () => undefined;
            const pendingSubmission = new Promise<void>(resolve => { releaseSubmission = resolve; });
            await page.route("**/api/ghl/intake", async (route) => {
                requests++;
                payload = route.request().postDataJSON();
                if (scenario === "network") return route.abort("failed");
                if (scenario === "timeout") {
                    await new Promise(resolve => setTimeout(resolve, 14_000));
                    return route.fulfill({ json: { success: true } }).catch(() => undefined);
                }
                if (scenario === "double-submit") await pendingSubmission;
                if (scenario === "invalid-json") return route.fulfill({ status: 200, contentType: "application/json", body: "{" });
                if (["400", "429", "500"].includes(scenario)) return route.fulfill({ status: Number(scenario), json: { success: false } });
                return route.fulfill({ json: { success: scenario !== "not-acknowledged" } });
            });
            await (form === "strategy" ? fillStrategy(page) : fillConstruction(page));
            const submit = page.locator('form button[type="submit"]');
            await submit.click();
            if (scenario === "double-submit") {
                await expect(submit).toBeDisabled();
                await submit.evaluate((button: HTMLButtonElement) => button.click());
                expect(requests).toBe(1);
                releaseSubmission();
            }
            if (scenario === "acknowledged" || scenario === "double-submit") {
                await expect(page.getByRole("heading", { name: form === "strategy" ? "Assessment Received" : /profit.*blueprint|profitability.*score|strong foundation/i }).first()).toBeVisible();
            } else {
                await expect(page.getByRole("alert").filter({ hasText: /try again|wait a minute/ }).first()).toBeVisible({ timeout: 20_000 });
                await expect(page.getByRole("button", { name: /retry/i })).toBeEnabled();
                await expect(page.getByText("Assessment Received", { exact: true })).toHaveCount(0);
                if (form === "strategy") {
                    for (let step = 5; step > 1; step--) await page.getByRole("button", { name: "Roll Back Step" }).click();
                }
                await expect(page.locator('input[name="email"]')).toHaveValue("audit@example.invalid");
            }
            expect(requests).toBe(1);
            expect(payload?.contact).toMatchObject({ email: "audit@example.invalid" });
            expect(payload?.business).toMatchObject({ annual_revenue_band: form === "strategy" ? "1M_3M" : "500K_1M" });
            expect(payload?.meta).toMatchObject({ locale: "en" });
            expect(payload?.answers).toBeTruthy();
        });
    }
}

for (const locale of ["en", "es"]) {
    test(`${locale}: transaction query has no receipt details or optional tracking`, async ({ page }) => {
        const optionalRequests: string[] = [];
        page.on("request", request => {
            if (/facebook|googletagmanager|google-analytics|leadconnectorhq/.test(request.url())) optionalRequests.push(new URL(request.url()).hostname);
        });
        await page.goto(`/${locale}/shop/success?session_id=cs_test_unowned`);
        await expect(page.locator("main")).toBeVisible();
        expect(new URL(page.url()).searchParams.has("session_id")).toBe(false);
        expect(optionalRequests).toEqual([]);
        await expect(page.getByText(/order confirmed|pedido confirmado/i)).toHaveCount(0);
    });
}

test("production CSP rejects an untrusted parser-inserted inline script", async ({ page }) => {
    test.skip(process.env.PLAYWRIGHT_PRODUCTION !== "true", "Production CSP assertion requires production preview.");
    // strict-dynamic trusts programmatic descendants of nonce-bearing scripts.
    // Alter the local HTML response to exercise actual untrusted parser insertion.
    await page.route("**/en", async route => {
        const response = await route.fetch();
        const body = (await response.text()).replace("</head>", "<script>window.__unapprovedInline = true</script></head>");
        const headers = { ...response.headers() };
        delete headers["content-encoding"];
        delete headers["content-length"];
        await route.fulfill({ response, headers, body });
    });
    const response = await page.goto("/en");
    const policy = response?.headers()["content-security-policy"] || "";
    expect(policy).toMatch(/script-src[^;]*'nonce-/);
    expect(policy).not.toContain("'unsafe-eval'");
    expect(policy.match(/script-src[^;]*/)?.[0]).not.toContain("'unsafe-inline'");
    expect(await page.evaluate(() => "__unapprovedInline" in window)).toBe(false);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});
