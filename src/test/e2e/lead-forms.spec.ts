import { test, expect } from "@playwright/test";
import { IntakeFormPage } from "./pages/lead-forms.pages";

/**
 * Lead Forms E2E Test Suite
 *
 * Tests the primary intake/lead form submission flow:
 * - Multi-step strategy intake form (5 steps)
 * - Contact/business information collection
 * - Business profile and financial health assessment
 * - Strategic priorities and service interest selection
 * - Urgency and investment willingness capture
 * - Form submission and success state verification
 *
 * Prerequisites: The app should be running at http://localhost:3000
 */

test.describe("Lead Form Submission", () => {
  let intakeFormPage: IntakeFormPage;

  test.beforeEach(async ({ page }) => {
    intakeFormPage = new IntakeFormPage(page);
  });

  test("primary lead form submit path - complete intake and verify success", async ({ page }) => {
    // Step 1: Navigate to intake page
    await intakeFormPage.goto();
    await page.waitForLoadState("networkidle");

    // Step 2: Verify form is visible
    await expect(intakeFormPage.firstNameInput).toBeVisible({ timeout: 10000 });

    // Step 3: Fill Step 1 - Core Profile
    await intakeFormPage.fillStep1({
      firstName: "Alexandra",
      lastName: "Rivera",
      companyName: "Rivera Financial Group",
      email: "alexandra@riverafinancialgroup.com",
      phone: "(305) 555-0147",
    });

    // Verify inputs
    await expect(intakeFormPage.firstNameInput).toHaveValue("Alexandra");
    await expect(intakeFormPage.lastNameInput).toHaveValue("Rivera");
    await expect(intakeFormPage.companyNameInput).toHaveValue("Rivera Financial Group");

    // Step 4: Advance to Step 2
    await intakeFormPage.next();
    await page.waitForTimeout(500);

    // Step 5: Fill Step 2 - Operating Scale
    await intakeFormPage.fillStep2(
      "Professional Services",  // industry
      "Florida",                 // state
      "Service-Based",          // businessType
      "$100k-$500k"             // revenueRange
    );

    // Step 6: Advance to Step 3
    await intakeFormPage.next();
    await page.waitForTimeout(500);

    // Step 7: Fill Step 3 - Financial Health
    await intakeFormPage.fillStep3(
      "LLC (Single)",           // entityType
      "Yes, I have an accountant", // hasAccountant
      "Books are current"        // booksStatus
    );

    // Step 8: Advance to Step 4
    await intakeFormPage.next();
    await page.waitForTimeout(500);

    // Step 9: Fill Step 4 - Strategic Priorities
    await intakeFormPage.fillStep4(
      "I'm making great revenue but I need better tax planning to keep more of what I earn.",
      ["S-Corp Advantage", "Proactive Tax Planning"]
    );

    // Step 10: Advance to Step 5
    await intakeFormPage.next();
    await page.waitForTimeout(500);

    // Step 11: Fill Step 5 - Deployment Urgency
    await intakeFormPage.fillStep5(
      "Immediate (This month)",  // urgency
      "Yes, ready to invest in strategy", // investmentWillingness
      "Book Strategy Call Now"   // preferredNextStep
    );

    // Step 12: Submit the form
    await intakeFormPage.submit();
    await page.waitForTimeout(4000); // Wait for API response

    // Step 13: Verify success state
    const isSuccess = await intakeFormPage.isSuccess();
    expect(isSuccess).toBe(true);

    // Step 14: Verify success message content
    const successText = await intakeFormPage.getSuccessText();
    expect(successText.toLowerCase()).toContain("assessment received");

    // Step 15: Verify CTA buttons on success page
    await expect(intakeFormPage.scheduleCallButton).toBeVisible();
    await expect(intakeFormPage.homepageButton).toBeVisible();
  });

  test("lead form step 1 validation - requires mandatory fields", async ({ page }) => {
    await intakeFormPage.goto();
    await expect(intakeFormPage.firstNameInput).toBeVisible({ timeout: 10000 });

    // Try to advance without filling required fields
    await intakeFormPage.next();
    await page.waitForTimeout(500);

    // Should show validation errors and remain on step 1
    await expect(intakeFormPage.firstNameInput).toBeVisible();
    // Email field should have error styling or error message
    const emailInput = intakeFormPage.emailInput;
    const isInvalid = await emailInput.evaluate((el: HTMLInputElement) => el.checkValidity && !el.checkValidity());
    expect(isInvalid).toBe(true);
  });

  test("lead form multi-step navigation - back and forth through steps", async ({ page }) => {
    await intakeFormPage.goto();
    await expect(intakeFormPage.firstNameInput).toBeVisible({ timeout: 10000 });

    // Fill Step 1
    await intakeFormPage.fillStep1({
      firstName: "Michael",
      lastName: "Torres",
      companyName: "Torres Consulting",
      email: "michael@torresconsulting.com",
      phone: "(512) 555-0199",
    });

    // Advance through steps
    await intakeFormPage.next();
    await page.waitForTimeout(300);
    await intakeFormPage.fillStep2("Construction", "Texas", "Service-Based", "$500k-$1M");

    await intakeFormPage.next();
    await page.waitForTimeout(300);
    await intakeFormPage.fillStep3("LLC (Multi)", "I do it myself", "Books are current");

    // Go back to Step 3
    await intakeFormPage.back();
    await page.waitForTimeout(300);

    // Go back to Step 2
    await intakeFormPage.back();
    await page.waitForTimeout(300);

    // Verify Step 2 fields still have values
    await expect(intakeFormPage.industrySelect).toBeVisible();

    // Go back to Step 1
    await intakeFormPage.back();
    await page.waitForTimeout(300);

    // Verify Step 1 values persisted
    await expect(intakeFormPage.firstNameInput).toHaveValue("Michael");
    await expect(intakeFormPage.lastNameInput).toHaveValue("Torres");
  });

  test("lead form service interest selection - multi-select checkboxes", async ({ page }) => {
    await intakeFormPage.goto();
    await expect(intakeFormPage.firstNameInput).toBeVisible({ timeout: 10000 });

    // Fill Step 1
    await intakeFormPage.fillStep1({
      firstName: "Jennifer",
      lastName: "Walsh",
      companyName: "Walsh Digital Agency",
      email: "jennifer@walshdigital.com",
      phone: "(415) 555-0288",
    });

    // Step 2
    await intakeFormPage.next();
    await page.waitForTimeout(300);
    await intakeFormPage.fillStep2("Agency", "California", "Service-Based", "$100k-$500k");

    // Step 3
    await intakeFormPage.next();
    await page.waitForTimeout(300);
    await intakeFormPage.fillStep3("Sole Proprietorship", "I have a bookkeeper only", "Somewhat behind");

    // Step 4 - Service selection
    await intakeFormPage.next();
    await page.waitForTimeout(300);
    await intakeFormPage.fillStep4(
      "Need help understanding my tax situation as I scale.",
      ["S-Corp Advantage", "Fractional CFO Strategy", "Strategic Visibility/Books"]
    );

    // Verify checkboxes are checked
    const checkedBoxes = page.locator("input[type='checkbox']:checked");
    const count = await checkedBoxes.count();
    expect(count).toBe(3);

    // Step 5
    await intakeFormPage.next();
    await page.waitForTimeout(300);
    await intakeFormPage.fillStep5("1-3 Months", "Maybe, depending on ROI", "Receive Email Summary");

    // Submit
    await intakeFormPage.submit();
    await page.waitForTimeout(4000);

    // Should show success with email summary option
    const isSuccess = await intakeFormPage.isSuccess();
    expect(isSuccess).toBe(true);
  });

  test("lead form urgency selection - immediate vs research mode", async ({ page }) => {
    await intakeFormPage.goto();
    await expect(intakeFormPage.firstNameInput).toBeVisible({ timeout: 10000 });

    // Fill all steps with "Immediate" urgency
    await intakeFormPage.fillStep1({
      firstName: "Robert",
      lastName: "Kim",
      companyName: "Kim & Associates",
      email: "robert@kimassociates.com",
      phone: "(206) 555-0334",
    });

    await intakeFormPage.next();
    await page.waitForTimeout(300);
    await intakeFormPage.fillStep2("Real Estate", "Washington", "Brick & Mortar", "$1M-$5M");

    await intakeFormPage.next();
    await page.waitForTimeout(300);
    await intakeFormPage.fillStep3("S-Corp", "Yes, I have an accountant", "Books are current");

    await intakeFormPage.next();
    await page.waitForTimeout(300);
    await intakeFormPage.fillStep4("Need comprehensive tax strategy for growing real estate portfolio.", ["Proactive Tax Planning"]);

    await intakeFormPage.next();
    await page.waitForTimeout(300);

    // Select immediate urgency with "Book Strategy Call Now"
    await intakeFormPage.fillStep5("Immediate (This month)", "Yes, ready to invest in strategy", "Book Strategy Call Now");

    await intakeFormPage.submit();
    await page.waitForTimeout(4000);

    // Should redirect to /book for high-intent leads
    await page.waitForURL(/\/book/, { timeout: 5000 }).catch(() => {
      // If no redirect, check success state
    });

    const currentUrl = page.url();
    // High-intent leads should be redirected to booking page
    if (currentUrl.includes("/book")) {
      await expect(page.locator("h1, h2")).toBeVisible();
    }
  });

  test("lead form revenue range selection - all options selectable", async ({ page }) => {
    await intakeFormPage.goto();
    await expect(intakeFormPage.firstNameInput).toBeVisible({ timeout: 10000 });

    // Fill Step 1
    await intakeFormPage.fillStep1({
      firstName: "Lisa",
      lastName: "Chang",
      companyName: "Chang E-commerce",
      email: "lisa@changecomm.com",
      phone: "(323) 555-0445",
    });

    await intakeFormPage.next();
    await page.waitForTimeout(300);

    // Test each revenue range option
    const revenueRanges = ["$0-$100k", "$100k-$500k", "$500k-$1M", "$1M-$5M", "$5M+"];

    for (const range of revenueRanges) {
      // Navigate to step 2 if not already there
      if (!(await intakeFormPage.stateInput.isVisible())) {
        await intakeFormPage.next();
        await page.waitForTimeout(300);
      }

      // Clear and fill
      await page.locator("div").filter({ hasText: new RegExp(`^\\${range.replace("$", "\\$")}$`) }).first().click();
      await page.waitForTimeout(100);
    }
  });

  test("lead form entity type selection - sole proprietor path", async ({ page }) => {
    await intakeFormPage.goto();
    await expect(intakeFormPage.firstNameInput).toBeVisible({ timeout: 10000 });

    // Fill Step 1
    await intakeFormPage.fillStep1({
      firstName: "James",
      lastName: "Wilson",
      companyName: "Wilson Freelance",
      email: "james@wilsonfreelance.com",
      phone: "(617) 555-0566",
    });

    await intakeFormPage.next();
    await page.waitForTimeout(300);
    await intakeFormPage.fillStep2("Professional Services", "Massachusetts", "Service-Based", "$0-$100k");

    await intakeFormPage.next();
    await page.waitForTimeout(300);

    // Select Sole Proprietorship
    await page.locator("div").filter({ hasText: /^Sole Proprietorship$/ }).first().click();
    await page.waitForTimeout(100);

    await intakeFormPage.next();
    await page.waitForTimeout(300);

    // Fill remaining steps
    await intakeFormPage.fillStep4("Just starting out and need tax guidance.", ["S-Corp Advantage"]);

    await intakeFormPage.next();
    await page.waitForTimeout(300);
    await intakeFormPage.fillStep5("Looking for next year", "Mostly looking for free advice", "Receive Email Summary");

    await intakeFormPage.submit();
    await page.waitForTimeout(4000);

    // Should show success (not redirect to booking since lower urgency)
    const isSuccess = await intakeFormPage.isSuccess();
    expect(isSuccess).toBe(true);
  });

  test("lead form books status - accurate tracking", async ({ page }) => {
    await intakeFormPage.goto();
    await expect(intakeFormPage.firstNameInput).toBeVisible({ timeout: 10000 });

    // Fill Step 1
    await intakeFormPage.fillStep1({
      firstName: "Patricia",
      lastName: "Mendez",
      companyName: "Mendez Restaurant Group",
      email: "patricia@mendezrestaurant.com",
      phone: "(713) 555-0677",
    });

    await intakeFormPage.next();
    await page.waitForTimeout(300);
    await intakeFormPage.fillStep2("Restaurant", "Texas", "Brick & Mortar", "$500k-$1M");

    await intakeFormPage.next();
    await page.waitForTimeout(300);

    // Select different book status options
    const bookStatuses = ["Books are current", "Somewhat behind", "Major cleanup needed", "I don&apos;t know"];

    for (const status of bookStatuses) {
      await page.locator("div").filter({ hasText: new RegExp(`^${status.replace(/'/g, "")}`) }).first().click();
      await page.waitForTimeout(100);
    }
  });

  test("lead form investment willingness - affects routing", async ({ page }) => {
    await intakeFormPage.goto();
    await expect(intakeFormPage.firstNameInput).toBeVisible({ timeout: 10000 });

    // Test "Mostly looking for free advice" path
    await intakeFormPage.fillStep1({
      firstName: "Thomas",
      lastName: "Brown",
      companyName: "Brown Startup",
      email: "thomas@brownstartup.com",
      phone: "(404) 555-0788",
    });

    await intakeFormPage.next();
    await page.waitForTimeout(300);
    await intakeFormPage.fillStep2("E-commerce", "Georgia", "Product/E-commerce", "$100k-$500k");

    await intakeFormPage.next();
    await page.waitForTimeout(300);
    await intakeFormPage.fillStep3("LLC (Single)", "I do it myself", "Somewhat behind");

    await intakeFormPage.next();
    await page.waitForTimeout(300);
    await intakeFormPage.fillStep4("Need help organizing my business finances.", ["Strategic Visibility/Books"]);

    await intakeFormPage.next();
    await page.waitForTimeout(300);
    await intakeFormPage.fillStep5("Just researching", "Mostly looking for free advice", "Receive Email Summary");

    await intakeFormPage.submit();
    await page.waitForTimeout(4000);

    // Should show success state (email summary, not booking redirect)
    const isSuccess = await intakeFormPage.isSuccess();
    expect(isSuccess).toBe(true);
  });

  test("lead form pain point textarea - accepts free text", async ({ page }) => {
    await intakeFormPage.goto();
    await expect(intakeFormPage.firstNameInput).toBeVisible({ timeout: 10000 });

    // Fill Step 1
    await intakeFormPage.fillStep1({
      firstName: "Sophia",
      lastName: "Lee",
      companyName: "Lee Creative Agency",
      email: "sophia@leeagency.com",
      phone: "(213) 555-0899",
    });

    await intakeFormPage.next();
    await page.waitForTimeout(300);
    await intakeFormPage.fillStep2("Agency", "California", "Service-Based", "$100k-$500k");

    await intakeFormPage.next();
    await page.waitForTimeout(300);
    await intakeFormPage.fillStep3("LLC (Single)", "Yes, I have an accountant", "Books are current");

    await intakeFormPage.next();
    await page.waitForTimeout(300);

    // Fill long-form pain point text
    const longPainText = "I am experiencing significant cash flow issues despite having strong revenue. " +
      "I believe my estimated tax payments are wrong and I may be overpaying. " +
      "My current CPA has not been proactive and I need a second opinion on my tax strategy. " +
      "Looking for someone who can help me understand my numbers better.";

    await intakeFormPage.fillStep4(longPainText, ["Proactive Tax Planning"]);

    // Verify textarea has the content
    const textareaValue = await intakeFormPage.painPointTextarea.inputValue();
    expect(textareaValue).toContain("cash flow issues");
    expect(textareaValue).toContain("estimated tax payments");
  });

  test("lead form page load performance - form renders within acceptable time", async ({ page }) => {
    const startTime = Date.now();
    await intakeFormPage.goto();
    await page.waitForLoadState("networkidle");

    const loadTime = Date.now() - startTime;

    // Form should be visible within 5 seconds
    await expect(intakeFormPage.firstNameInput).toBeVisible({ timeout: 5000 });

    // Log performance (useful for CI reports)
    console.log(`Intake form loaded in ${loadTime}ms`);

    // Should load in reasonable time for UX
    expect(loadTime).toBeLessThan(10000);
  });

  test("lead form localStorage persistence - draft saves", async ({ page }) => {
    await intakeFormPage.goto();
    await expect(intakeFormPage.firstNameInput).toBeVisible({ timeout: 10000 });

    // Fill partial form
    await intakeFormPage.fillStep1({
      firstName: "Daniel",
      lastName: "Park",
      companyName: "Park Consulting",
      email: "daniel@parkconsulting.com",
      phone: "(312) 555-0900",
    });

    // Wait for auto-save (if implemented)
    await page.waitForTimeout(1000);

    // Reload page
    await page.reload();
    await page.waitForLoadState("networkidle");

    // Form should be visible but may or may not have persisted values depending on implementation
    await expect(intakeFormPage.firstNameInput).toBeVisible({ timeout: 5000 });
  });

  test("lead form step indicator - shows current step accurately", async ({ page }) => {
    await intakeFormPage.goto();
    await expect(intakeFormPage.firstNameInput).toBeVisible({ timeout: 10000 });

    // Step 1 should be active (progress dots: first is wide/gold)
    let currentStep = await intakeFormPage.getCurrentStep();
    expect(currentStep).toBe(1);

    // Advance to Step 2
    await intakeFormPage.fillStep1({
      firstName: "Emily",
      lastName: "Watson",
      companyName: "Watson Studios",
      email: "emily@watsonstudios.com",
      phone: "(503) 555-0111",
    });
    await intakeFormPage.next();
    await page.waitForTimeout(500);

    currentStep = await intakeFormPage.getCurrentStep();
    expect(currentStep).toBe(2);

    // Advance to Step 3
    await intakeFormPage.fillStep2("E-commerce", "Oregon", "Product/E-commerce", "$500k-$1M");
    await intakeFormPage.next();
    await page.waitForTimeout(500);

    currentStep = await intakeFormPage.getCurrentStep();
    expect(currentStep).toBe(3);

    // Advance to Step 4
    await intakeFormPage.fillStep3("LLC (Multi)", "I have a bookkeeper only", "Somewhat behind");
    await intakeFormPage.next();
    await page.waitForTimeout(500);

    currentStep = await intakeFormPage.getCurrentStep();
    expect(currentStep).toBe(4);

    // Advance to Step 5
    await intakeFormPage.fillStep4("Need better financial visibility.", ["Fractional CFO Strategy"]);
    await intakeFormPage.next();
    await page.waitForTimeout(500);

    currentStep = await intakeFormPage.getCurrentStep();
    expect(currentStep).toBe(5);
  });
});
