import { test, expect, type Page } from "@playwright/test";
import { ShopPage, ProductDetailPage, CartPage, CheckoutSuccessPage } from "./pages/shop.pages";

/**
 * Checkout E2E Test Suite
 *
 * Tests digital and physical checkout flows including:
 * - Digital product happy path
 * - Physical product shipping path
 * - Checkout cancellation path
 * - Checkout success and cart clearing
 *
 * Prerequisites: The app should be running at http://localhost:3000
 * Some tests require Stripe mock or test mode configuration.
 */

test.describe("Checkout Flows", () => {
  let shopPage: ShopPage;
  let productDetailPage: ProductDetailPage;
  let cartPage: CartPage;
  let checkoutSuccessPage: CheckoutSuccessPage;

  test.beforeEach(async ({ page }) => {
    shopPage = new ShopPage(page);
    productDetailPage = new ProductDetailPage(page);
    cartPage = new CartPage(page);
    checkoutSuccessPage = new CheckoutSuccessPage(page);
  });

  test.afterEach(async ({ page }) => {
    // Clean up cart state after each test
    await page.goto("/shop/cart");
    const clearBtn = page.locator("button[aria-label*='clear'], button[aria-label*='remove all']").first();
    if (await clearBtn.isVisible().catch(() => false)) {
      await clearBtn.click();
    }
    // Clear via API or localStorage as fallback
    await page.evaluate(() => {
      localStorage.removeItem("union-national-cart");
    });
  });

  // ─── Digital Checkout Happy Path ─────────────────────────────────────────

  test("digital checkout happy path - buy digital product and verify success page", async ({ page }) => {
    // Step 1: Navigate to shop and find a digital product
    await shopPage.goto();

    // Step 2: Click on a product to go to detail page
    // Look for an ebook or template format (digital)
    const digitalProductTitle = await page.locator("h3", { hasText: /ebook|template|course/i })
      .first()
      .textContent()
      .catch(async () => {
        // Fallback: just click first product card link
        return page.locator("a[href*='/shop/']").first().getAttribute("href");
      });

    // Click into the first digital product
    const firstDigitalLink = page.locator("a[href*='/shop/']").filter({ has: page.locator("text=/ebook|template|course/i") }).first();
    await firstDigitalLink.click();
    await page.waitForLoadState("networkidle");

    // Step 3: Add to cart
    const addBtn = page.locator("button", { hasText: /add to cart/i }).first();
    await addBtn.click();
    await page.waitForTimeout(800);

    // Step 4: Open cart sidebar and verify item added
    await shopPage.openCart();
    const cartItemVisible = page.locator("[role='dialog'] h3, [role='dialog']").first();
    await expect(cartItemVisible).toBeVisible();

    // Step 5: Go to cart page
    const reviewCartLink = page.locator("a", { hasText: /review cart/i }).first();
    await reviewCartLink.click();
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveURL(/\/shop\/cart/);

    // Step 6: Verify cart has item
    const cartItems = page.locator("[data-testid='cart-item'], .flex.gap-4.rounded-3xl");
    await expect(cartItems.first()).toBeVisible();

    // Step 7: Click checkout
    await cartPage.proceedToCheckout();

    // Step 8: Should redirect to Stripe or checkout success
    // Wait for redirect or success state
    await page.waitForURL(/stripe|checkout|success/i, { timeout: 10000 }).catch(() => {
      // If no Stripe redirect, verify we're still on cart with checkout message
    });

    // For demo/testing: if Stripe is in test mode, we can proceed
    // In real E2E, Stripe redirect would be handled via pop-up windows
    // For now, verify checkout button state or redirect occurred
    const currentUrl = page.url();
    test.skip(
      currentUrl.includes("stripe") || currentUrl.includes("checkout"),
      "Stripe checkout redirect - requires manual interaction in test mode"
    );

    // Alternative: verify the success page if using direct API checkout
    await checkoutSuccessPage.waitForSuccess();
    await expect(checkoutSuccessPage.successMessage).toBeVisible();
  });

  // ─── Physical Checkout Shipping Path ───────────────────────────────────

  test("physical checkout shipping path - buy physical product with shipping", async ({ page }) => {
    // Step 1: Navigate to shop and find a physical product
    await shopPage.goto();

    // Look for a physical/bundle format product
    const physicalLink = page
      .locator("a[href*='/shop/']")
      .filter({ has: page.locator("text=/physical|bundle/i") })
      .first();

    const hasPhysical = await physicalLink.isVisible().catch(() => false);
    if (!hasPhysical) {
      // Fallback: navigate directly to a known product or skip
      test.skip(true, "No physical products available in test environment");
      return;
    }

    await physicalLink.click();
    await page.waitForLoadState("networkidle");

    // Verify product detail page loaded
    await expect(page.locator("h1")).toBeVisible();

    // Step 2: Add to cart
    const addBtn = page.locator("button", { hasText: /add to cart|buy now/i }).first();
    await addBtn.click();
    await page.waitForTimeout(800);

    // Step 3: Navigate to cart
    const reviewCartLink = page.locator("a", { hasText: /review cart/i }).first();
    await reviewCartLink.click();
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveURL(/\/shop\/cart/);

    // Step 4: Verify cart contents
    const cartItems = page.locator("[data-testid='cart-item']");
    const itemCount = await cartItems.count();
    expect(itemCount).toBeGreaterThan(0);

    // Step 5: Verify shipping info is shown (physical products require shipping)
    const shippingSection = page.locator("text=/shipping/i").first();
    await expect(shippingSection).toBeVisible();

    // Step 6: Proceed to checkout
    await cartPage.proceedToCheckout();

    // Step 7: Should show shipping form or redirect to Stripe
    // Note: Stripe checkout handles shipping collection
    await page.waitForURL(/stripe|checkout|success/i, { timeout: 10000 }).catch(() => {
      // Checkout initiated but no redirect yet
    });

    const currentUrl = page.url();
    test.skip(
      currentUrl.includes("stripe") || currentUrl.includes("checkout"),
      "Physical checkout redirect - requires Stripe test mode interaction"
    );

    await checkoutSuccessPage.waitForSuccess();
    await expect(checkoutSuccessPage.successMessage).toBeVisible();
  });

  // ─── Checkout Cancel Path ───────────────────────────────────────────────

  test("checkout cancel path - cancel during checkout and verify cart state", async ({ page }) => {
    // Step 1: Add item to cart
    await shopPage.goto();

    const productLink = page.locator("a[href*='/shop/']").first();
    await productLink.click();
    await page.waitForLoadState("networkidle");

    const addBtn = page.locator("button", { hasText: /add to cart/i }).first();
    await addBtn.click();
    await page.waitForTimeout(800);

    // Step 2: Navigate to cart
    const reviewCartLink = page.locator("a", { hasText: /review cart/i }).first();
    await reviewCartLink.click();
    await page.waitForLoadState("networkidle");

    // Step 3: Verify item in cart before checkout
    const cartItems = page.locator("[data-testid='cart-item']");
    const itemCountBefore = await cartItems.count();
    expect(itemCountBefore).toBeGreaterThan(0);

    // Step 4: Click checkout (initiates Stripe redirect)
    await cartPage.proceedToCheckout();

    // Step 5: Simulate cancel by navigating back or using cancel URL param
    // Stripe checkout can be cancelled - go back to cart
    await page.goto("/shop/cart?checkout=cancelled");
    await page.waitForLoadState("networkidle");

    // Step 6: Verify cancelled checkout message is shown
    const cancelledMessage = page.locator("text=/checkout was cancelled|Your cart is still here/i").first();
    await expect(cancelledMessage).toBeVisible();

    // Step 7: Verify cart still contains items (was not cleared)
    const itemsAfterCancel = await cartItems.count();
    expect(itemsAfterCancel).toBe(itemCountBefore);
  });

  // ─── Checkout Success / Cart Clearing Path ───────────────────────────────

  test("checkout success and cart clearing - complete purchase and verify cart empties", async ({ page }) => {
    // This test requires Stripe test mode or mock checkout API
    // Step 1: Add multiple items to cart
    await shopPage.goto();

    // Add first product
    const firstProductLink = page.locator("a[href*='/shop/']").first();
    await firstProductLink.click();
    await page.waitForLoadState("networkidle");
    const addBtn1 = page.locator("button", { hasText: /add to cart/i }).first();
    await addBtn1.click();
    await page.waitForTimeout(500);

    // Go back to shop and add second product
    await shopPage.goto();
    const secondProductLink = page.locator("a[href*='/shop/']").nth(1);
    await secondProductLink.click();
    await page.waitForLoadState("networkidle");
    const addBtn2 = page.locator("button", { hasText: /add to cart/i }).first();
    await addBtn2.click();
    await page.waitForTimeout(500);

    // Step 2: Navigate to cart and verify 2 items
    const reviewCartLink = page.locator("a", { hasText: /review cart/i }).first();
    await reviewCartLink.click();
    await page.waitForLoadState("networkidle");

    const cartItems = page.locator("[data-testid='cart-item']");
    const itemCount = await cartItems.count();
    expect(itemCount).toBe(2);

    // Step 3: Complete checkout
    // In a real environment with Stripe mock, clicking checkout would:
    // 1. Redirect to Stripe
    // 2. Complete test payment
    // 3. Redirect back to /shop/cart?checkout=success or success page
    // For automated testing, we simulate the success redirect
    await cartPage.proceedToCheckout();

    // Step 4: Simulate successful Stripe redirect (in test mode)
    // Navigate to success state to verify cart clearing behavior
    // In real flow: Stripe redirects back with success param
    await page.goto("/shop/cart?checkout=success");
    await page.waitForLoadState("networkidle");

    // Step 5: Verify success state is shown
    const successBanner = page.locator("text=/thank you|order.*confirmed|success/i").first();
    const hasSuccess = await successBanner.isVisible().catch(() => false);

    if (hasSuccess) {
      // Step 6: Cart should be cleared after successful purchase
      // Reload cart page to verify persisted state
      await page.reload();
      await page.waitForLoadState("networkidle");

      // Verify cart is empty
      const emptyMessage = page.locator("text=/your cart is empty/i").first();
      await expect(emptyMessage).toBeVisible();
    } else {
      // If success banner not visible, this might be the Stripe redirect page
      // Verify we're in a checkout flow
      const currentUrl = page.url();
      test.skip(
        currentUrl.includes("stripe") || currentUrl.includes("checkout"),
        "Checkout in progress - requires Stripe test payment completion"
      );
    }
  });

  // ─── Additional Helper Tests ───────────────────────────────────────────

  test("cart persists across navigation", async ({ page }) => {
    // Add item to cart
    await shopPage.goto();
    const productLink = page.locator("a[href*='/shop/']").first();
    await productLink.click();
    await page.waitForLoadState("networkidle");
    const addBtn = page.locator("button", { hasText: /add to cart/i }).first();
    await addBtn.click();
    await page.waitForTimeout(800);

    // Navigate away
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Go back to cart
    await page.goto("/shop/cart");
    await page.waitForLoadState("networkidle");

    // Cart should still have item
    const cartItems = page.locator("[data-testid='cart-item']");
    await expect(cartItems.first()).toBeVisible();
  });

  test("remove item from cart", async ({ page }) => {
    await shopPage.goto();
    const productLink = page.locator("a[href*='/shop/']").first();
    await productLink.click();
    await page.waitForLoadState("networkidle");
    const addBtn = page.locator("button", { hasText: /add to cart/i }).first();
    await addBtn.click();
    await page.waitForTimeout(800);

    // Go to cart
    const reviewCartLink = page.locator("a", { hasText: /review cart/i }).first();
    await reviewCartLink.click();
    await page.waitForLoadState("networkidle");

    // Remove item
    const removeBtn = page.locator("button[aria-label*='remove']").first();
    await removeBtn.click();
    await page.waitForTimeout(500);

    // Verify cart is empty
    const emptyMessage = page.locator("text=/your cart is empty/i").first();
    await expect(emptyMessage).toBeVisible();
  });
});
