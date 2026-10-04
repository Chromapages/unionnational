import assert from "node:assert/strict";
import { chromium } from "playwright";

const baseUrl = process.env.LEAD_CHECK_BASE_URL || "http://localhost:3001";

async function fillGeneral(page, nextStep = "Receive Email Summary") {
    await page.getByPlaceholder("e.g. Michael").fill("Alex");
    await page.getByPlaceholder("e.g. Ross").fill("Rivera");
    await page.getByPlaceholder("Union National Ventures LLC").fill("Rivera LLC");
    await page.getByPlaceholder("michael@domain.com").fill("alex@example.com");
    await page.getByPlaceholder("(555) 000-0000").fill("(305) 555-0101");
    await page.getByRole("button", { name: /Continue Path/ }).click();
    await page.getByRole("heading", { name: "Operating Scale" }).waitFor();
    await page.locator("form select").selectOption("Construction");
    await page.getByPlaceholder("e.g. Florida").fill("Florida");
    await page.locator("form").getByText("Service-Based", { exact: true }).click();
    await page.locator("form").getByText("$500k-$1M", { exact: true }).click();
    await page.getByRole("button", { name: /Continue Path/ }).click();
    await page.getByRole("heading", { name: "Financial Health" }).waitFor();
    await page.locator("form").getByText("LLC (Single)", { exact: true }).click();
    await page.locator("form").getByText("Yes, I have an accountant", { exact: true }).click();
    await page.locator("form").getByText("Books are current", { exact: true }).click();
    await page.getByRole("button", { name: /Continue Path/ }).click();
    await page.getByRole("heading", { name: "Strategic Priorities" }).waitFor();
    await page.locator("form textarea").fill("Need clearer tax planning.");
    await page.locator("form").getByText("Proactive Tax Planning", { exact: true }).click();
    await page.getByRole("button", { name: /Continue Path/ }).click();
    await page.getByRole("heading", { name: "Deployment Urgency" }).waitFor();
    await page.locator("form").getByText("1-3 Months", { exact: true }).click();
    await page.locator("form").getByText("Maybe, depending on ROI", { exact: true }).click();
    await page.locator("form").getByText(nextStep, { exact: true }).click();
}

async function fillConstruction(page) {
    await page.getByRole("heading", { name: "Revenue Band" }).waitFor();
    await page.locator("form").getByRole("button", { name: "$500K-$1M" }).click();
    await page.getByRole("heading", { name: "Job Costing" }).waitFor();
    await page.locator("form").getByRole("button", { name: "Partially / Inconsistent" }).click();
    await page.getByRole("heading", { name: "Cash Flow Visibility" }).waitFor();
    await page.locator("form").getByRole("button", { name: "Monthly / Quarterly" }).click();
    await page.getByRole("heading", { name: "Estimating Accuracy" }).waitFor();
    await page.locator("form").getByRole("button", { name: "Mostly accurate, but we miss things" }).click();
    await page.getByRole("heading", { name: "Financial Reviews" }).waitFor();
    await page.locator("form").getByRole("button", { name: "Annually / Semi-annually" }).click();
    await page.getByRole("heading", { name: "Secure Results" }).waitFor();
    await page.getByPlaceholder("e.g. John").fill("Alex");
    await page.getByPlaceholder("e.g. Smith").fill("Rivera");
    await page.getByPlaceholder("john@construction.com").fill("alex@example.com");
    await page.getByPlaceholder("(555) 000-0000").fill("(305) 555-0101");
    await page.getByPlaceholder("Smith Builders LLC").fill("Rivera Builders");
}

async function checkForm(browser, path, fill, successText) {
    const page = await browser.newPage();
    const replies = [400, 429, 500, "network", 200];
    const posted = [];
    let legacyPosts = 0;
    await page.route("**/api/ghl-intake", async (route) => {
        legacyPosts += 1;
        await route.abort();
    });
    await page.route("**/api/ghl/intake", async (route) => {
        posted.push(route.request().postDataJSON());
        const reply = replies.shift();
        if (reply === "network") return route.abort("failed");
        await route.fulfill({
            status: reply,
            contentType: "application/json",
            body: JSON.stringify({ success: reply === 200 }),
        });
    });

    try {
        await page.goto(baseUrl + path, { waitUntil: "load" });
        await fill(page);
        for (const expected of ["review your answers", "Too many attempts", "couldn't send", "couldn't send"]) {
            const request = page.waitForRequest("**/api/ghl/intake");
            await page.locator("form button[type=submit]").click();
            await request;
            await page.waitForFunction((text) => document.querySelector("form [role=alert]")?.textContent?.includes(text), expected);
            assert.equal(await page.getByText(successText, { exact: true }).count(), 0);
            assert.equal(await page.getByRole("button", { name: "Retry Submission" }).isEnabled(), true);
        }
        await page.getByRole("button", { name: "Retry Submission" }).click();
        await page.getByText(successText, { exact: true }).waitFor();
        assert.equal(posted.length, 5);
        assert.equal(legacyPosts, 0);
        assert.equal(posted[0].business.annual_revenue_band, "500K_1M");
        assert.equal(new Set(posted.map((item) => item.meta.submission_id)).size, 1);
        assert.equal(posted[0].meta.locale, "en");
        if (path === "/en/intake") {
            assert.equal(posted[0].intent.preferred_next_step, "EMAIL_SUMMARY_REQUESTED");
            assert.equal(posted[0].business.business_type, "Service-Based");
            assert.equal(posted[0].business.state_location, "Florida");
            assert.equal(posted[0].answers.has_accountant, "Yes, I have an accountant");
            assert.equal(posted[0].answers.investment_willingness, "Maybe, depending on ROI");
        } else {
            assert.equal(posted[0].results.fit_score, 45);
            assert.equal(posted[0].answers.job_costing, "Partially / Inconsistent");
        }
        console.log(path + ": 400, 429, 500, network, retry success; canonical endpoint only");
    } finally {
        await page.close();
    }
}

async function checkBookingRedirect(browser) {
    const page = await browser.newPage();
    const replies = [500, 200];
    const posted = [];
    await page.route("**/api/ghl/intake", async (route) => {
        posted.push(route.request().postDataJSON());
        const status = replies.shift();
        await route.fulfill({ status, contentType: "application/json", body: JSON.stringify({ success: status === 200 }) });
    });
    try {
        await page.goto(baseUrl + "/en/intake", { waitUntil: "load" });
        await fillGeneral(page, "Book Strategy Call Now");
        await page.locator("form button[type=submit]").click();
        await page.locator("form [role=alert]").waitFor();
        assert.equal(new URL(page.url()).pathname, "/en/intake");
        await page.getByRole("button", { name: "Retry Submission" }).click();
        await page.waitForURL("**/en/book");
        assert.equal(posted[0].intent.preferred_next_step, "BOOK_STRATEGY_CALL");
        assert.equal(posted.length, 2);
        console.log("/en/intake booking choice: no redirect before acknowledgement; locale route after retry");
    } finally {
        await page.close();
    }
}

const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
    await checkForm(browser, "/en/intake", fillGeneral, "Assessment Received");
    await checkForm(browser, "/en/construction-profitability-assessment", fillConstruction, "Assessment Finalized");
    await checkBookingRedirect(browser);
} finally {
    await browser.close();
}
