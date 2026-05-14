# Shop Production Readiness Plan

Date: 2026-05-02
Mode: `$plan` direct planning
Scope: shop, product detail pages, cart/sidebar, checkout API, Stripe mappings, webhook fulfillment, success page, analytics, and production verification.

## Requirements Summary

Make the shop purchase flow production ready across browse, product selection, cart state, Stripe checkout, payment success, and fulfillment. The system must route each selected book edition to the correct Stripe price, keep cart state reliable through cancel/success flows, handle digital and hardcover fulfillment distinctly, and expose enough validation and monitoring to catch broken products before customers do.

Current surface evidence:

- Shop content is fetched from Sanity in `SHOP_PAGE_QUERY`, `ALL_PRODUCTS_QUERY`, and `PRODUCT_DETAIL_QUERY` at `src/sanity/lib/queries.ts:280`, `src/sanity/lib/queries.ts:319`, and `src/sanity/lib/queries.ts:338`.
- Product detail supports selectable editions and passes selected edition data to the cart in `src/components/shop/ProductHero.tsx:104`, `src/components/shop/ProductHero.tsx:132`, and `src/components/shop/ProductHero.tsx:145`.
- Cart state is persisted client-side under `union-national-cart` in `src/store/useCartStore.ts:23` and `src/store/useCartStore.ts:79`.
- Both cart sidebar and cart page call `beginCheckout`, clear the cart, and redirect as soon as a Checkout Session is created at `src/components/shop/CartSidebar.tsx:99`, `src/components/shop/CartSidebar.tsx:101`, `src/components/shop/CartPageClient.tsx:56`, and `src/components/shop/CartPageClient.tsx:58`.
- The checkout route resolves Stripe prices through `getStripePriceId` at `src/app/api/shop/checkout/route.ts:48`, creates Stripe line items at `src/app/api/shop/checkout/route.ts:213`, and always requests shipping addresses at `src/app/api/shop/checkout/route.ts:217`.
- The webhook validates signatures and forwards purchase metadata to an optional GHL webhook at `src/app/api/shop/webhook/route.ts:17`, `src/app/api/shop/webhook/route.ts:65`, and `src/app/api/shop/webhook/route.ts:71`.
- The success page retrieves the Stripe session and tracks purchase events at `src/app/[locale]/shop/success/page.tsx:18` and `src/app/[locale]/shop/success/page.tsx:30`.
- The local env has a Stripe secret configured, but the webhook secret is still placeholder-like and shop purchase fulfillment webhook is empty, based on `.env.local:24`, `.env.local:25`, and `.env.local:26`.

## Production Risks Found

1. Cart is cleared too early. If Stripe checkout is started and the customer cancels or fails payment, the cart is gone because the client calls `clearCart()` before leaving the site.

2. Fulfillment is not production complete. The webhook logs and optionally posts to `GHL_SHOP_PURCHASE_WEBHOOK_URL`, but there is no durable order store, idempotency guard, retry queue, fulfillment status, or customer-facing delivery confirmation keyed by order contents.

3. Digital and hardcover fulfillment are not separated. Checkout always collects shipping, and success copy always mentions both digital downloads and physical shipping even if the order contains only one format.

4. Featured and sticky add-to-cart paths are weaker than product-detail edition selection. `FeaturedProduct` adds a top-level product only, while `StickyBuyBar` uses the product default format/price, so they can bypass selected edition intent.

5. Stripe mapping is still string fragile. The fallback map has generic keys like `Hardcover` and `Digital PDF`; the resolver now prefers product-specific keys, but production should remove generic ambiguity and validate every Sanity product/edition against Stripe before deploy.

6. Webhook metadata is too thin. Checkout metadata currently stores only `slug` and `edition`, not format, title, quantity, price ID, fulfillment type, or a normalized SKU, making post-payment automation brittle.

7. Success page has type and trust issues. It uses `any` for Stripe line items, shows generic fulfillment promises, and does not handle invalid/missing `session_id` with a clear user-safe state.

8. Environment readiness needs a gate. Missing `STRIPE_WEBHOOK_SECRET`, missing fulfillment webhook, wrong base URL, or test/live key mismatches should fail production checks before traffic.

## Decision

Build a production-hardening pass in four layers:

1. Data contract and price resolution
2. Cart and checkout behavior
3. Fulfillment and success experience
4. Verification, observability, and release gates

This keeps customer-facing behavior stable while tightening the purchase contract underneath it.

## Acceptance Criteria

- Every product and edition in Sanity either has an explicit `stripePriceId` or resolves to exactly one Stripe price from the static map.
- Digital selection creates a Checkout Session with the digital Stripe price; hardcover selection creates one with the hardcover/shipping Stripe price.
- Cart survives Stripe cancel/failure and is cleared only after confirmed payment or a deliberate post-success reconciliation.
- Checkout metadata includes normalized item data: product id, slug, title, edition id, edition name, format, fulfillment type, price id, quantity.
- Shipping address collection is required only when at least one physical item is in the checkout.
- Webhook fulfillment is idempotent by Stripe session id.
- Digital orders trigger digital delivery workflow; physical orders trigger shipping workflow; mixed orders trigger both.
- Success page displays order-specific next steps and handles missing/invalid session ids without implying success.
- Stripe webhook secret, Stripe mode, base URL, and fulfillment destination are verified by an automated production readiness check.
- `npm exec tsc -- --noEmit` and `npm run build` pass.
- Shop-specific lint/type issues introduced during the pass are zero; existing repo-wide lint debt is documented separately.
- End-to-end checks cover browse -> product -> edition select -> cart -> checkout session creation -> cancel -> cart preserved, and a webhook fixture -> fulfillment path.

## Implementation Plan

### Phase 1: Stabilize the Commerce Data Contract

Files:
- `src/lib/shop/types.ts`
- `src/sanity/schemaTypes/product.ts`
- `src/sanity/lib/queries.ts`
- `src/lib/shop/stripe-price-map.ts`
- `Stripe Product Id for UNT Books - Sheet1.csv`

Steps:

1. Add a normalized commerce item type with `editionName`, `format`, `fulfillmentType`, `stripePriceId`, and `requiresShipping`.
2. Update Sanity product edition schema to make `format` an enum and recommend `stripePriceId` per edition.
3. Update `SHOP_PAGE_QUERY` featured product data to include `stripeProductId`, `stripePriceId`, and edition data, not only top-level `format` and `price`.
4. Remove or de-prioritize generic map keys such as `Hardcover` and `Digital PDF` after all current products have product-specific entries.
5. Add a validation script that compares Sanity products plus the CSV/map and reports unresolved or duplicate Stripe mapping paths.

### Phase 2: Fix All Add-To-Cart Entry Points

Files:
- `src/components/shop/ProductHero.tsx`
- `src/components/shop/FeaturedProduct.tsx`
- `src/components/ui/StickyBuyBar.tsx`
- `src/components/shop/TransactionCard.tsx`
- `src/store/useCartStore.ts`

Steps:

1. Make `ProductHero` the canonical selector behavior: selected edition determines cart key, displayed price, format, fulfillment type, and Stripe price.
2. Change `StickyBuyBar` so it receives and adds the currently selected edition, or hide/degrade it when no selected edition context is available.
3. Change `FeaturedProduct` to route users to product detail when editions exist, or include explicit default edition/price data when direct add is allowed.
4. Remove or wire `TransactionCard`; it is currently not used, but if it becomes active without a real Sanity `_id`, checkout can fail product validation.
5. Add cart item migration/validation so old persisted cart items without `editionId` or Stripe-safe product IDs are either upgraded or gracefully removed with a message.

### Phase 3: Correct Checkout Session Creation

Files:
- `src/lib/shop/checkout-client.ts`
- `src/app/api/shop/checkout/route.ts`
- `src/lib/stripe.ts`

Steps:

1. Send the full normalized cart payload to the checkout route.
2. On the server, ignore untrusted client price amounts, but use client item identity to re-fetch Sanity product and resolve the authoritative Stripe price.
3. Determine `requiresShipping` from resolved edition/product data and include `shipping_address_collection` only when needed.
4. Store complete normalized metadata on the Stripe session, staying under Stripe metadata limits. If needed, use a compact JSON summary plus item count.
5. Do not clear the cart when the Checkout Session is merely created. Preserve cart through redirect and clear after success confirmation.
6. Add specific error codes for unresolved edition, inactive product, missing Stripe price, Stripe environment mismatch, and cart validation failure.

### Phase 4: Production Fulfillment

Files:
- `src/app/api/shop/webhook/route.ts`
- New `src/lib/shop/fulfillment.ts`
- New `src/lib/shop/orders.ts` or equivalent integration boundary

Steps:

1. Add idempotency keyed by `checkout.session.completed` session id.
2. Parse and validate checkout metadata with Zod before fulfillment.
3. Split items into digital, physical, audio, and bundle fulfillment lanes.
4. Trigger the correct GHL/webhook/email automation per lane.
5. Log fulfillment attempts with session id, customer email, item summary, status, and retry eligibility.
6. Return success to Stripe after durable receipt of the event, but capture fulfillment failures for retry/manual intervention.
7. Add webhook fixture tests for digital-only, physical-only, mixed, invalid metadata, missing email, and duplicate event.

### Phase 5: Success, Cancel, and Customer UX

Files:
- `src/app/[locale]/shop/success/page.tsx`
- `src/app/[locale]/shop/cart/page.tsx`
- `src/components/shop/CartPageClient.tsx`
- `src/components/shop/CartSidebar.tsx`
- `src/components/seo/ShopPurchaseEvent.tsx`

Steps:

1. Make success page conditional: show digital instructions only for digital items, shipping copy only for physical items.
2. Replace `any` Stripe line item handling with typed helpers.
3. Handle missing or invalid `session_id` with a safe "We could not verify this order" state and support CTA.
4. Add cancel return messaging on `/shop/cart` so customers understand payment was not completed and their cart remains available.
5. Track purchase event once per confirmed session, not repeatedly on refresh if avoidable.

### Phase 6: QA, Observability, and Release Gate

Files:
- New `tests/shop/*` or project-appropriate test folder
- New `scripts/check-shop-readiness.*`
- Existing `package.json`

Steps:

1. Add unit tests for Stripe price resolution and fulfillment classification.
2. Add API tests for checkout payload validation and webhook fixture handling.
3. Add Playwright smoke tests for shop browse, product detail edition selection, cart quantity/remove, checkout start, and cancel return.
4. Add an environment readiness script checking:
   - `STRIPE_SECRET_KEY` present and expected live/test mode for environment
   - `STRIPE_WEBHOOK_SECRET` present and not placeholder
   - `NEXT_PUBLIC_BASE_URL` set correctly
   - fulfillment webhook configured or explicitly disabled with an operational fallback
5. Add structured logs for checkout creation, missing prices, webhook receipt, and fulfillment status.
6. Run and record:
   - `npm exec tsc -- --noEmit`
   - `npm run build`
   - shop unit/API tests
   - shop Playwright smoke tests
   - Stripe CLI webhook fixture or dashboard test event

## Suggested Execution Staffing

Solo `$ralph` path:
- Best when you want one owner to implement and verify the whole hardening pass.
- Suggested role focus: executor for implementation, verifier for final evidence, test-engineer for test design if native subagents are available.

`$team` path:
- Best if speed matters and the work can be split.
- Lane 1: data contract and Stripe resolver.
- Lane 2: frontend cart/product UX.
- Lane 3: webhook fulfillment and success page.
- Lane 4: tests and production readiness script.

## Verification Matrix

Unit:
- `getStripePriceId` resolves correct price for each CSV row and known Sanity edition shape.
- Cart item validation rejects missing slug/product id/edition conflicts.
- Fulfillment classifier separates digital, hardcover, audio, and bundles.

API:
- `/api/shop/checkout` rejects empty carts, unknown products, invalid editions, missing prices, and malformed quantities.
- `/api/shop/checkout` creates sessions with shipping only for physical/mixed carts.
- `/api/shop/webhook` validates signatures, rejects invalid metadata safely, and handles duplicate events idempotently.

E2E:
- Browse shop, search/filter/sort, open product, select digital, add to cart, checkout session uses digital price.
- Select hardcover, add to cart, checkout session uses hardcover price and requests shipping.
- Cancel from Stripe returns to cart with items preserved.
- Success page displays correct fulfillment instructions for the completed order.

Production:
- Build passes.
- Typecheck passes.
- Readiness script passes.
- Stripe webhook endpoint is configured with the production secret.
- GHL or fulfillment automation receives a test order event.

## Risks and Mitigations

- Risk: Sanity data differs from local assumptions.
  Mitigation: validation script fetches current Sanity products and reports unresolved edition mappings.

- Risk: Stripe metadata limit truncates rich item payloads.
  Mitigation: store compact metadata and optionally write full order details to a durable order store before redirect or during webhook handling.

- Risk: Existing persisted carts contain obsolete item shapes.
  Mitigation: version persisted cart state and migrate/drop invalid entries with customer-safe messaging.

- Risk: Fulfillment webhook outage.
  Mitigation: idempotent fulfillment logs plus retry/manual queue.

- Risk: Repo-wide lint is already noisy.
  Mitigation: gate shop changes with TypeScript, build, targeted tests, and optionally a shop-only ESLint command until global lint debt is addressed.

## ADR

Decision: Harden the existing Sanity + Stripe Checkout architecture rather than replacing it.

Drivers:
- The current app already has Sanity product content, Stripe Checkout, cart persistence, and Meta tracking wired.
- The main production risks are contract gaps and fulfillment reliability, not a need for a new commerce platform.
- Keeping the current architecture minimizes customer-facing change while improving correctness.

Alternatives considered:
- Replace with Shopify or another commerce platform: rejected for scope and migration overhead.
- Keep static Stripe mapping only: rejected because string matching is fragile across multiple books and editions.
- Require all purchases from product detail only: viable as a temporary mitigation, but not enough for a polished production shop.

Why chosen:
- Explicit edition-level commerce data plus server-side validation gives the strongest correctness with the least disruption.

Consequences:
- Sanity product data becomes part of the commerce contract and needs validation before deploy.
- Fulfillment needs a real operational owner or destination, not only UI copy.

Follow-ups:
- Decide whether fulfillment records live in Sanity, a database, GHL, Stripe metadata/dashboard, or a lightweight file/log pipeline.
- Decide whether direct add from featured/sticky CTAs should be allowed for products with multiple editions.
