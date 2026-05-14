import { type Page, type Locator, expect } from "@playwright/test";

export class ShopPage {
  readonly page: Page;
  readonly productCards: Locator;
  readonly searchInput: Locator;
  readonly categoryFilter: Locator;
  readonly sortSelect: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productCards = page.locator("[data-testid='product-card'], article").first().locator("..");
    this.searchInput = page.locator("input[type='search'], input[placeholder*='Search']").first();
    this.categoryFilter = page.locator("[data-testid='category-filter']").first();
    this.sortSelect = page.locator("select").first();
  }

  async goto() {
    await this.page.goto("/shop");
    await this.page.waitForLoadState("networkidle");
  }

  async addProductToCart(productTitle: string) {
    // Find product card by title text
    const productCard = this.page.locator("h3", { hasText: productTitle }).locator("..").locator("..");
    // Click the quick view or navigate to product detail
    const addButton = productCard.locator("a[href*='/shop/']").first();
    await addButton.click();
    await this.page.waitForLoadState("networkidle");
  }

  async openCart() {
    // Click the cart toggle button
    const cartButton = this.page.locator("button[aria-label*='cart'], [data-testid='cart-toggle']").first();
    await cartButton.click();
  }

  async getProductByTitle(title: string) {
    return this.page.locator("h3", { hasText: title }).locator("..").locator("..");
  }
}

export class ProductDetailPage {
  readonly page: Page;
  readonly addToCartButton: Locator;
  readonly buyButton: Locator;
  readonly priceText: Locator;
  readonly titleText: Locator;
  readonly formatBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButton = page.locator("button", { hasText: /add to cart/i }).first();
    this.buyButton = page.locator("button", { hasText: /buy now/i }).first();
    this.priceText = page.locator("[data-testid='product-price'], .text-2xl").first();
    this.titleText = page.locator("h1").first();
    this.formatBadge = page.locator("[data-testid='format-badge'], span").first();
  }

  async goto(slug: string) {
    await this.page.goto(`/shop/${slug}`);
    await this.page.waitForLoadState("networkidle");
  }

  async addToCart() {
    await this.addToCartButton.click();
    // Wait for cart sidebar to open or button state change
    await this.page.waitForTimeout(500);
  }

  async buyNow() {
    await this.buyButton.click();
    await this.page.waitForLoadState("networkidle");
  }

  async getPrice() {
    const text = await this.priceText.textContent();
    return text?.replace(/[^0-9.]/g, "") ?? "0";
  }

  async getTitle() {
    return this.titleText.textContent() ?? "";
  }
}

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly emptyCartMessage: Locator;
  readonly subtotalText: Locator;
  readonly totalText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator("[data-testid='cart-item']");
    this.checkoutButton = page.locator("button", { hasText: /checkout|proceed/i }).first();
    this.continueShoppingButton = page.locator("button", { hasText: /continue shopping/i }).first();
    this.emptyCartMessage = page.locator("text=/your cart is empty/i").first();
    this.subtotalText = page.locator("text=/subtotal/i").last();
    this.totalText = page.locator("[data-testid='cart-total'], text=/total/i").last();
  }

  async goto() {
    await this.page.goto("/shop/cart");
    await this.page.waitForLoadState("networkidle");
  }

  async removeItem(title: string) {
    const item = this.cartItems.filter({ hasText: title });
    const removeBtn = item.locator("button[aria-label*='remove'], button").first();
    await removeBtn.click();
    await this.page.waitForTimeout(300);
  }

  async updateQuantity(title: string, quantity: number) {
    const item = this.cartItems.filter({ hasText: title });
    if (quantity <= 0) {
      await item.locator("button[aria-label*='remove'], button").first().click();
    } else {
      const minusBtn = item.locator("button").first();
      const plusBtn = item.locator("button").last();
      const currentQty = await item.locator("span").textContent();
      const diff = quantity - parseInt(currentQty ?? "1", 10);
      if (diff > 0) {
        for (let i = 0; i < diff; i++) await plusBtn.click();
      } else if (diff < 0) {
        for (let i = 0; i < Math.abs(diff); i++) await minusBtn.click();
      }
    }
    await this.page.waitForTimeout(300);
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async cancelCheckout() {
    // If we reach Stripe checkout, we can cancel there
    // The flow might redirect to Stripe hosted checkout
    await this.page.waitForURL(/checkout|stripe|success/i, { timeout: 10000 }).catch(() => {
      // If no redirect, assume still on cart page
    });
  }

  async getItemCount() {
    return this.cartItems.count();
  }

  async isEmpty() {
    return this.emptyCartMessage.isVisible().catch(() => false);
  }
}

export class CheckoutSuccessPage {
  readonly page: Page;
  readonly successMessage: Locator;
  readonly orderSummary: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.successMessage = page.locator("text=/thank you|success|order confirmed/i").first();
    this.orderSummary = page.locator("[data-testid='order-summary'], text=/order/i").first();
    this.continueButton = page.locator("a, button", { hasText: /continue|back/i }).first();
  }

  async waitForSuccess() {
    // Can be /checkout/success or similar route
    await this.page.waitForURL(/success/i, { timeout: 15000 }).catch(() => {
      // Fallback: check current page content
    });
    await this.page.waitForLoadState("networkidle");
  }

  async getSuccessText() {
    return this.successMessage.textContent().catch(() => "").then(v => v ?? "");
  }

  async isOrderConfirmed() {
    return this.successMessage.isVisible().catch(() => false);
  }
}
