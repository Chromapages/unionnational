import { type Page, type Locator, expect } from "@playwright/test";

export class ScorpEstimatorPage {
  readonly page: Page;
  // Step 1 - Contact & Business
  readonly fullNameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly businessNameInput: Locator;
  readonly websiteInput: Locator;
  // Step 2 - Structure
  readonly entityTypeOptions: Locator;
  readonly nicheVerticalOptions: Locator;
  readonly seTaxOptions: Locator;
  // Step 3 - Financials
  readonly revenueBandOptions: Locator;
  readonly netProfitOptions: Locator;
  readonly payrollStatusOptions: Locator;
  readonly painPointSelect: Locator;
  readonly readinessOptions: Locator;
  // Navigation
  readonly nextButton: Locator;
  readonly backButton: Locator;
  readonly submitButton: Locator;
  readonly progressIndicator: Locator;
  // Result
  readonly resultContainer: Locator;
  readonly savingsText: Locator;
  readonly fitLevelBadge: Locator;

  constructor(page: Page) {
    this.page = page;

    // Step 1 inputs
    this.fullNameInput = page.locator("#full_name");
    this.emailInput = page.locator("#email");
    this.phoneInput = page.locator("#phone");
    this.businessNameInput = page.locator("#business_name");
    this.websiteInput = page.locator("#website_url");

    // Step 2 - Structure
    this.entityTypeOptions = page.locator("[role='radiogroup']").nth(0).locator("[role='radio']");
    this.nicheVerticalOptions = page.locator("[role='radiogroup']").nth(1).locator("[role='radio']");
    this.seTaxOptions = page.locator("[role='radiogroup']").nth(2).locator("[role='radio']");

    // Step 3 - Financials
    this.revenueBandOptions = page.locator("[role='radiogroup']").nth(0).locator("[role='radio']");
    this.netProfitOptions = page.locator("[role='radiogroup']").nth(1).locator("[role='radio']");
    this.payrollStatusOptions = page.locator("[role='radiogroup']").nth(2).locator("[role='radio']");
    this.painPointSelect = page.locator("#primary_pain_point");
    this.readinessOptions = page.locator("[role='radiogroup']").nth(3).locator("[role='radio']");

    // Navigation
    this.nextButton = page.locator("button", { hasText: /continue/i }).first();
    this.backButton = page.locator("button", { hasText: /back/i }).first();
    this.submitButton = page.locator("button", { hasText: /get your estimate/i }).first();
    this.progressIndicator = page.locator("[data-testid='estimator-progress']");

    // Result
    this.resultContainer = page.locator("[data-testid='estimator-result']").first();
    this.savingsText = page.locator("text=/\\$[0-9,]+/").first();
    this.fitLevelBadge = page.locator("[data-testid='fit-level-badge']").first();
  }

  async goto() {
    await this.page.goto("/s-corp-tax-advantage");
    await this.page.waitForLoadState("networkidle");
    // Scroll to estimator if needed
    await this.page.locator("button", { hasText: /see if you qualify/i }).click();
    await this.page.waitForTimeout(500);
  }

  async fillStep1(contact: { fullName: string; email: string; phone: string; businessName: string; website?: string }) {
    await this.fullNameInput.fill(contact.fullName);
    await this.emailInput.fill(contact.email);
    await this.phoneInput.fill(contact.phone);
    await this.businessNameInput.fill(contact.businessName);
    if (contact.website) {
      await this.websiteInput.fill(contact.website);
    }
  }

  async selectStep2(entityType: string, nicheVertical: string, seTax: string = "YES") {
    // Entity type
    const entityBtn = this.entityTypeOptions.filter({ hasText: new RegExp(entityType, "i") }).first();
    await entityBtn.click();
    await this.page.waitForTimeout(100);

    // Niche vertical
    const nicheBtn = this.nicheVerticalOptions.filter({ hasText: new RegExp(nicheVertical, "i") }).first();
    await nicheBtn.click();
    await this.page.waitForTimeout(100);

    // SE Tax
    const seTaxBtn = this.seTaxOptions.filter({ hasText: new RegExp(seTax.replace("_", " "), "i") }).first();
    await seTaxBtn.click();
    await this.page.waitForTimeout(100);
  }

  async selectStep3(
    revenueBand: string,
    netProfitRange: string,
    payrollStatus: string = "NOT_RUNNING_PAYROLL",
    painPoint: string = "OVERPAYING_TAXES",
    readiness: string = "MEDIUM"
  ) {
    // Revenue band
    const revenueBtn = this.revenueBandOptions.filter({ hasText: new RegExp(revenueBand.replace("_", " "), "i") }).first();
    await revenueBtn.click();
    await this.page.waitForTimeout(100);

    // Net profit range
    const profitBtn = this.netProfitOptions.filter({ hasText: new RegExp(netProfitRange.replace("_", " "), "i") }).first();
    await profitBtn.click();
    await this.page.waitForTimeout(100);

    // Payroll status
    const payrollBtn = this.payrollStatusOptions.filter({ hasText: new RegExp(payrollStatus.replace("_", " "), "i") }).first();
    await payrollBtn.click();
    await this.page.waitForTimeout(100);

    // Pain point
    await this.painPointSelect.selectOption(painPoint);
    await this.page.waitForTimeout(100);

    // Readiness
    const readinessBtn = this.readinessOptions.filter({ hasText: new RegExp(readiness, "i") }).first();
    await readinessBtn.click();
    await this.page.waitForTimeout(100);
  }

  async next() {
    await this.nextButton.click();
    await this.page.waitForTimeout(300);
  }

  async back() {
    await this.backButton.click();
    await this.page.waitForTimeout(300);
  }

  async submit() {
    await this.submitButton.click();
    await this.page.waitForTimeout(2000); // Wait for API response
  }

  async isOnResultStep(): Promise<boolean> {
    return this.resultContainer.isVisible().catch(() => false);
  }

  async getSavingsRange(): Promise<string> {
    return this.savingsText.textContent().catch(() => "").then(v => v ?? "");
  }

  async getFitLevel(): Promise<string> {
    return this.fitLevelBadge.textContent().catch(() => "").then(v => v ?? "");
  }
}
