import { type Page, type Locator, expect } from "@playwright/test";

export class IntakeFormPage {
  readonly page: Page;
  // Step 1 - Core Profile
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly companyNameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  // Step 2 - Operating Scale
  readonly industrySelect: Locator;
  readonly stateInput: Locator;
  readonly businessTypeOptions: Locator;
  readonly revenueRangeOptions: Locator;
  // Step 3 - Financial Health
  readonly entityTypeOptions: Locator;
  readonly accountantOptions: Locator;
  readonly booksStatusOptions: Locator;
  // Step 4 - Strategic Priorities
  readonly painPointTextarea: Locator;
  readonly serviceCheckboxOptions: Locator;
  // Step 5 - Deployment Urgency
  readonly urgencyOptions: Locator;
  readonly investmentOptions: Locator;
  readonly nextStepOptions: Locator;
  // Navigation
  readonly nextButton: Locator;
  readonly backButton: Locator;
  readonly submitButton: Locator;
  readonly progressDots: Locator;
  // Success state
  readonly successMessage: Locator;
  readonly scheduleCallButton: Locator;
  readonly homepageButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Step 1 inputs
    this.firstNameInput = page.locator("input[placeholder*='First Name'], input[placeholder*='Michael']").first();
    this.lastNameInput = page.locator("input[placeholder*='Last Name'], input[placeholder*='Ross']").first();
    this.companyNameInput = page.locator("input[placeholder*='Company'], input[placeholder*='Union']").first();
    this.emailInput = page.locator("input[type='email'], input[placeholder*='@']").first();
    this.phoneInput = page.locator("input[type='tel'], input[placeholder*='(']").first();

    // Step 2
    this.industrySelect = page.locator("select").first();
    this.stateInput = page.locator("input[placeholder*='Florida'], input[placeholder*='state']").first();
    this.businessTypeOptions = page.locator("div").filter({ hasText: /Service-Based|Product\/E-commerce|Brick & Mortar|High-Growth Tech/ }).first();
    this.revenueRangeOptions = page.locator("div").filter({ hasText: /\$0-\$100k|\$100k-\$500k|\$500k-\$1M|\$1M-\$5M|\$5M\+/ }).first();

    // Step 3
    this.entityTypeOptions = page.locator("div").filter({ hasText: /Sole Proprietorship|LLC \(Single\)|LLC \(Multi\)|S-Corp|C-Corp|Other/ }).first();
    this.accountantOptions = page.locator("div").filter({ hasText: /Yes, I have an accountant|I do it myself|I have a bookkeeper only|No professional help/ }).first();
    this.booksStatusOptions = page.locator("div").filter({ hasText: /Books are current|Somewhat behind|Major cleanup needed|I don.*t know/ }).first();

    // Step 4
    this.painPointTextarea = page.locator("textarea").first();
    this.serviceCheckboxOptions = page.locator("input[type='checkbox']");

    // Step 5
    this.urgencyOptions = page.locator("div").filter({ hasText: /Immediate \(This month\)|1-3 Months|Looking for next year|Just researching/ }).first();
    this.investmentOptions = page.locator("div").filter({ hasText: /Yes, ready to invest|Maybe, depending on ROI|Mostly looking for free advice/ }).first();
    this.nextStepOptions = page.locator("div").filter({ hasText: /Book Strategy Call Now|Receive Email Summary|Wait for callback/ }).first();

    // Navigation
    this.nextButton = page.locator("button", { hasText: /continue path/i }).first();
    this.backButton = page.locator("button", { hasText: /roll back/i }).first();
    this.submitButton = page.locator("button", { hasText: /submit assessment/i }).first();
    this.progressDots = page.locator("[class*='h-2 rounded-full']");

    // Success state
    this.successMessage = page.locator("text=/assessment received/i").first();
    this.scheduleCallButton = page.locator("button", { hasText: /schedule strategy call now/i }).first();
    this.homepageButton = page.locator("button", { hasText: /return to homepage/i }).first();
  }

  async goto() {
    await this.page.goto("/intake");
    await this.page.waitForLoadState("networkidle");
  }

  async fillStep1(data: { firstName: string; lastName: string; companyName: string; email: string; phone: string }) {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.companyNameInput.fill(data.companyName);
    await this.emailInput.fill(data.email);
    await this.phoneInput.fill(data.phone);
  }

  async fillStep2(industry: string, state: string, businessType: string, revenueRange: string) {
    await this.industrySelect.selectOption(industry);
    await this.stateInput.fill(state);

    // Business type - click the div with matching text
    await this.page.locator("div").filter({ hasText: new RegExp(`^${businessType}$`) }).first().click();
    await this.page.waitForTimeout(100);

    // Revenue range - click the div with matching text
    await this.page.locator("div").filter({ hasText: new RegExp(`^\\${revenueRange.replace("$", "\\$")}$`) }).first().click();
    await this.page.waitForTimeout(100);
  }

  async fillStep3(entityType: string, accountant: string, booksStatus: string) {
    // Entity type
    await this.page.locator("div").filter({ hasText: new RegExp(`^${entityType}$`) }).first().click();
    await this.page.waitForTimeout(100);

    // Accountant
    await this.page.locator("div").filter({ hasText: new RegExp(`^${accountant}$`) }).first().click();
    await this.page.waitForTimeout(100);

    // Books status
    await this.page.locator("div").filter({ hasText: new RegExp(`^${booksStatus.replace(/'/g, "")}`) }).first().click();
    await this.page.waitForTimeout(100);
  }

  async fillStep4(painPoint: string, services: string[]) {
    await this.painPointTextarea.fill(painPoint);

    for (const service of services) {
      const checkbox = this.serviceCheckboxOptions.filter({ hasText: new RegExp(service, "i") }).first();
      await checkbox.check();
    }
  }

  async fillStep5(urgency: string, investment: string, nextStep: string) {
    // Urgency
    await this.page.locator("div").filter({ hasText: new RegExp(`^${urgency}$`) }).first().click();
    await this.page.waitForTimeout(100);

    // Investment willingness
    await this.page.locator("div").filter({ hasText: new RegExp(`^${investment}$`) }).first().click();
    await this.page.waitForTimeout(100);

    // Preferred next step
    await this.page.locator("div").filter({ hasText: new RegExp(`^${nextStep}$`) }).first().click();
    await this.page.waitForTimeout(100);
  }

  async next() {
    await this.nextButton.click();
    await this.page.waitForTimeout(500);
  }

  async back() {
    await this.backButton.click();
    await this.page.waitForTimeout(500);
  }

  async submit() {
    await this.submitButton.click();
    await this.page.waitForTimeout(3000); // Wait for API response and redirect
  }

  async isSuccess(): Promise<boolean> {
    return this.successMessage.isVisible().catch(() => false);
  }

  async getSuccessText(): Promise<string> {
    return this.successMessage.textContent().catch(() => "").then(v => v ?? "");
  }

  async getCurrentStep(): Promise<number> {
    // Count which progress dot is active (wider = gold colored)
    const dots = await this.progressDots.all();
    for (let i = 0; i < dots.length; i++) {
      const width = await dots[i].evaluate((el: Element) => {
        const style = window.getComputedStyle(el);
        return parseFloat(style.width);
      });
      if (width > 8) return i + 1;
    }
    return 1;
  }
}
