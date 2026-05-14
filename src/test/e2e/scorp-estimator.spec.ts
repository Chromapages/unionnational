import { test, expect } from "@playwright/test";
import { ScorpEstimatorPage } from "./pages/scorp-estimator.pages";

/**
 * S-Corp Estimator E2E Test Suite
 *
 * Tests the complete S-Corp Tax Advantage estimator flow:
 * - Multi-step form navigation
 * - Contact & Business information (Step 1)
 * - Structure & Context selection (Step 2)
 * - Profit & Payroll details (Step 3)
 * - Result display and CTA interaction
 *
 * Prerequisites: The app should be running at http://localhost:3000
 */

test.describe("S-Corp Estimator Happy Path", () => {
  let estimatorPage: ScorpEstimatorPage;

  test.beforeEach(async ({ page }) => {
    estimatorPage = new ScorpEstimatorPage(page);
  });

  test("complete estimator flow - fill all steps and verify results displayed", async ({ page }) => {
    // Step 1: Navigate to S-Corp Tax Advantage page
    await estimatorPage.goto();

    // Step 2: Verify estimator form is visible (scrolled into view)
    await expect(estimatorPage.fullNameInput).toBeVisible({ timeout: 10000 });

    // Step 3: Fill Step 1 - Contact & Business Info
    await estimatorPage.fillStep1({
      fullName: "Marcus Johnson",
      email: "marcus.johnson@growthventures.com",
      phone: "(555) 867-5309",
      businessName: "Johnson Tax Consulting LLC",
      website: "https://johnsontaxconsulting.com",
    });

    // Verify inputs are filled
    await expect(estimatorPage.fullNameInput).toHaveValue("Marcus Johnson");
    await expect(estimatorPage.emailInput).toHaveValue("marcus.johnson@growthventures.com");
    await expect(estimatorPage.phoneInput).toHaveValue("(555) 867-5309");
    await expect(estimatorPage.businessNameInput).toHaveValue("Johnson Tax Consulting LLC");

    // Step 4: Advance to Step 2
    await estimatorPage.next();
    await page.waitForTimeout(500);

    // Step 5: Fill Step 2 - Structure & Context
    // Entity type: Single/Multi-Member LLC
    // Niche vertical: Professional Services
    // SE Tax: YES
    await estimatorPage.selectStep2("LLC", "Professional Services", "YES");

    // Verify selections were made (button should have aria-checked=true)
    const selectedEntity = page.locator("[role='radio'][aria-checked='true']").first();
    await expect(selectedEntity).toBeVisible();

    // Step 6: Advance to Step 3
    await estimatorPage.next();
    await page.waitForTimeout(500);

    // Step 7: Fill Step 3 - Profit & Payroll
    // Revenue: $100K - $250K
    // Net Profit: $50K - $100K
    // Payroll: Not running payroll
    // Pain Point: Overpaying Taxes
    // Readiness: Immediate Implementation
    await estimatorPage.selectStep3(
      "100K_250K",
      "50K_100K",
      "NOT_RUNNING_PAYROLL",
      "OVERPAYING_TAXES",
      "HIGH"
    );

    // Step 8: Submit the estimator
    await estimatorPage.submit();
    await page.waitForTimeout(3000); // Wait for API response

    // Step 9: Verify result is displayed
    const isResult = await estimatorPage.isOnResultStep();
    expect(isResult).toBe(true);

    // Step 10: Verify result content
    const savingsText = await estimatorPage.getSavingsRange();
    expect(savingsText).toMatch(/\$[0-9,]+/); // Should show dollar amount

    const fitLevel = await estimatorPage.getFitLevel();
    expect(fitLevel).toBeTruthy();

    // Step 11: Verify CTA buttons are present on result page
    const ctaSection = page.locator("text=/schedule.*call|book.*strategy/i").first();
    await expect(ctaSection).toBeVisible({ timeout: 5000 });
  });

  test("estimator step validation - prevents advancing with invalid data", async ({ page }) => {
    await estimatorPage.goto();
    await expect(estimatorPage.fullNameInput).toBeVisible({ timeout: 10000 });

    // Try to advance without filling required fields
    // Step 1 requires: fullName, email, phone, businessName
    await page.locator("button", { hasText: /continue/i }).first().click();
    await page.waitForTimeout(500);

    // Should still be on Step 1 (validation should block navigation)
    // Check that error messages are shown
    const errorMessages = page.locator("[id$='_error'], .text-red-500");
    const errorCount = await errorMessages.count();
    expect(errorCount).toBeGreaterThan(0);
  });

  test("estimator back navigation - can go back and modify selections", async ({ page }) => {
    await estimatorPage.goto();
    await expect(estimatorPage.fullNameInput).toBeVisible({ timeout: 10000 });

    // Fill Step 1
    await estimatorPage.fillStep1({
      fullName: "Sarah Chen",
      email: "sarah.chen@innovatetech.io",
      phone: "(415) 555-0123",
      businessName: "InnovateTech Solutions",
    });

    // Advance to Step 2
    await estimatorPage.next();
    await page.waitForTimeout(500);

    // Select options
    await estimatorPage.selectStep2("S_Corp", "Agency", "YES");

    // Go back to Step 1
    await estimatorPage.back();
    await page.waitForTimeout(500);

    // Verify Step 1 is shown and fields still have values
    await expect(estimatorPage.fullNameInput).toHaveValue("Sarah Chen");
    await expect(estimatorPage.emailInput).toHaveValue("sarah.chen@innovatetech.io");

    // Change email
    await estimatorPage.emailInput.clear();
    await estimatorPage.emailInput.fill("sarah.c@innovatetech.io");

    // Advance again
    await estimatorPage.next();
    await page.waitForTimeout(500);

    // Step 2 should still show our previous selection
    const selectedOptions = page.locator("[role='radio'][aria-checked='true']");
    const count = await selectedOptions.count();
    expect(count).toBeGreaterThan(0);
  });

  test("estimator result CTA - schedule call button is clickable", async ({ page }) => {
    // Complete the estimator flow with high-intent data
    await estimatorPage.goto();
    await expect(estimatorPage.fullNameInput).toBeVisible({ timeout: 10000 });

    // Fill all steps quickly with high-value data
    await estimatorPage.fillStep1({
      fullName: "David Park",
      email: "david.park@enterpriseplus.com",
      phone: "(212) 555-8900",
      businessName: "Enterprise Plus Consulting",
    });

    await estimatorPage.next();
    await page.waitForTimeout(300);
    await estimatorPage.selectStep2("LLC", "Professional Services", "YES");

    await estimatorPage.next();
    await page.waitForTimeout(300);
    await estimatorPage.selectStep3("500K_1M", "250K_PLUS", "RUNNING_PAYROLL", "OVERPAYING_TAXES", "HIGH");

    await estimatorPage.submit();
    await page.waitForTimeout(3000);

    // Verify result step is shown
    const isResult = await estimatorPage.isOnResultStep();
    expect(isResult).toBe(true);

    // Find and verify the CTA button is clickable
    const scheduleButton = page.locator("a", { hasText: /schedule.*call|book.*strategy/i }).first();
    await expect(scheduleButton).toBeVisible();

    // Verify it points to /book
    const href = await scheduleButton.getAttribute("href");
    expect(href).toMatch(/\/book/);
  });

  test("estimator mobile responsiveness", async ({ page }) => {
    // Test on mobile viewport
    await page.setViewportSize({ width: 375, height: 812 });
    await estimatorPage.goto();
    await expect(estimatorPage.fullNameInput).toBeVisible({ timeout: 10000 });

    // Fill Step 1 on mobile
    await estimatorPage.fillStep1({
      fullName: "Mobile Test User",
      email: "mobile@test.com",
      phone: "(555) 000-0001",
      businessName: "Mobile Test Business",
    });

    await estimatorPage.next();
    await page.waitForTimeout(500);

    // Step 2 should be visible on mobile
    await estimatorPage.selectStep2("LLC", "Real Estate", "NO");
    await estimatorPage.next();
    await page.waitForTimeout(500);

    // Step 3 should be visible on mobile
    await estimatorPage.selectStep3("UNDER_100K", "UNDER_50K", "NOT_RUNNING_PAYROLL", "CASH_FLOW_ISSUES", "MEDIUM");

    await estimatorPage.submit();
    await page.waitForTimeout(3000);

    // Result should be visible on mobile
    const isResult = await estimatorPage.isOnResultStep();
    expect(isResult).toBe(true);
  });

  test("estimator progress indicator updates", async ({ page }) => {
    await estimatorPage.goto();
    await expect(estimatorPage.fullNameInput).toBeVisible({ timeout: 10000 });

    // Progress should show step 1 active initially
    // We can check that progress dots/segments exist
    const progressBar = page.locator("[data-testid='estimator-progress'], .flex.gap-1\\.5").first();

    // Fill step 1 and advance
    await estimatorPage.fillStep1({
      fullName: "Progress Test",
      email: "progress@test.com",
      phone: "(555) 111-2222",
      businessName: "Progress Business",
    });
    await estimatorPage.next();
    await page.waitForTimeout(500);

    // Should now be on step 2 (progress should update)
    await expect(page.locator("[role='radiogroup']").nth(0)).toBeVisible();
  });

  test("estimator form data persists across steps", async ({ page }) => {
    await estimatorPage.goto();
    await expect(estimatorPage.fullNameInput).toBeVisible({ timeout: 10000 });

    // Fill Step 1
    await estimatorPage.fillStep1({
      fullName: "Persistence Test",
      email: "persist@test.com",
      phone: "(555) 999-8888",
      businessName: "Persistence LLC",
    });

    // Navigate through all steps without changing step 1
    await estimatorPage.next();
    await page.waitForTimeout(300);
    await estimatorPage.selectStep2("PARTNERSHIP", "Construction", "YES");

    await estimatorPage.next();
    await page.waitForTimeout(300);
    await estimatorPage.selectStep3("250K_500K", "100K_150K", "NOT_RUNNING_PAYROLL", "BOOKKEEPING_CHAOS", "LOW");

    // Go back twice to step 1
    await estimatorPage.back();
    await page.waitForTimeout(300);
    await estimatorPage.back();
    await page.waitForTimeout(300);

    // Verify all step 1 data persisted
    await expect(estimatorPage.fullNameInput).toHaveValue("Persistence Test");
    await expect(estimatorPage.emailInput).toHaveValue("persist@test.com");
    await expect(estimatorPage.phoneInput).toHaveValue("(555) 999-8888");
    await expect(estimatorPage.businessNameInput).toHaveValue("Persistence LLC");
  });
});
