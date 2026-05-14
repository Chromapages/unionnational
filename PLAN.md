# Project Quality Audit Remediation Plan

## Summary

Audit evidence shows the project is not yet up to `QUALITY_BAR.md` for deploy readiness.

Current hard facts:
- `npm run build` fails on a TypeScript error in `src/scripts/publish-blog.ts`.
- `npm exec tsc -- --noEmit` fails on the same error.
- `npm run lint` passes with `284` warnings, including many `any`, unused code, React purity warnings, raw `<img>` usage, and accessibility warnings.
- `npm run test:coverage` passes at `85.39%` statements, but only covers `4` test files and `21` tests, leaving critical app/API/checkout flows untested.
- `npm audit --audit-level=high` passes with `0` high/critical CVEs, but reports `20` moderate advisories.
- Security/test subagents found deploy-blocking gaps around secrets, intake security, PII logging, idempotency, rate limiting, observability, and missing E2E/API coverage.

## Gap List

- `Critical` Rotate exposed local Stripe/Sanity/GHL secrets, remove committed secret material, and replace hardcoded GHL webhook URLs with server-only env variables.
- `Critical` Fix the build/typecheck blocker in `src/scripts/publish-blog.ts`.
- `High` Consolidate fragmented lead intake routes into one governed server-side intake path with shared validation, masked logging, rate limiting, and consistent GHL contract mapping.
- `High` Remove plaintext PII logging from API routes and frontend form paths; route all server logs through the structured logger with redaction.
- `High` Add durable Stripe fulfillment idempotency keyed by Stripe `event.id` and/or checkout session ID. Because this needs persistent storage, use Sanity as the existing available datastore unless a separate production datastore is already approved.
- `High` Add route-level integration tests for checkout, Stripe webhook, GHL intake, S-Corp estimator, survey, submit application routes, and revalidation.
- `High` Add Playwright E2E tests for checkout and the highest-value lead forms. `src/test/e2e` is currently missing.
- `Medium-High` Replace in-memory-only rate limiting on public lead/checkout routes with a production-safe adapter. Keep current in-memory limiter only as local fallback.
- `Medium` Add OpenTelemetry instrumentation and basic request/error/latency metrics to satisfy `QUALITY_BAR.md` observability requirements.
- `Medium` Tighten CSP/security headers in `next.config.ts`, especially `unsafe-eval`, broad `connect-src`, missing `object-src`, `base-uri`, and `frame-ancestors`.
- `Medium` Reduce lint debt: eliminate unjustified `any`, stale imports, default exports in reusable modules, React purity warnings, missing image alt text, and raw `<img>` in performance-sensitive components.
- `Medium` Refactor overlong files above the 300-line bar, starting with `src/sanity/lib/queries.ts`, S-Corp pages, large forms, `ProductHero`, `VideoHero`, and checkout route logic.
- `Medium` Update README/docs so the repo’s real Next/Sanity/Stripe architecture, quality gates, env setup, and verification commands replace the default Next.js starter text.
- `Medium` Review dependency version policy: security-sensitive packages currently use caret ranges despite the quality bar’s supply-chain rule.

## Implementation Plan

1. Stabilize deploy blockers first.
   - Fix `publish-blog.ts` so `bodyEn` satisfies `BlogPostInput`.
   - Run `npm exec tsc -- --noEmit` and `npm run build` until both pass.
   - Keep existing dirty worktree changes intact and avoid unrelated cleanup.

2. Lock down secrets and integration configuration.
   - Move all GHL webhook URLs and integration secrets into `src/lib/config/env.ts`.
   - Add env names for each required webhook or collapse them behind one canonical `GHL_WEBHOOK_URL`.
   - Remove hardcoded webhook strings from API routes.
   - Add `.env.example` with placeholder names only.
   - Document that exposed secrets must be rotated outside the codebase before deploy.

3. Consolidate lead intake.
   - Choose `src/app/api/ghl-intake/route.ts` as the canonical intake route because it already uses `getEnv`, structured logging, validation, honeypot, and rate limiting.
   - Route or migrate older intake endpoints to shared validation/forwarding helpers instead of duplicating schemas and webhook logic.
   - Normalize payload shape to the documented GHL contract: version, event type, source page, lead magnet type, contact, business, intent, results, tracking, meta.
   - Reject invalid payloads with safe client messages; never return raw stack traces.

4. Harden checkout and webhook flows.
   - Keep checkout price resolution server-side.
   - Add rate limiting to `shop/checkout`.
   - Add a persistent processed-event record for Stripe webhook fulfillment using the existing Sanity stack unless another datastore is explicitly available.
   - Store event/session fulfillment state before downstream GHL fulfillment to prevent duplicate delivery.
   - Keep manual fulfillment fallback, but log it through redacted structured logs.

5. Add observability and security baseline.
   - Add `instrumentation.ts` for OTel-compatible route spans.
   - Add request count, error count, and latency histogram hooks around API handlers through a shared wrapper/helper.
   - Redact email, phone, names, lead answers, scores where needed, and tax/financial fields from logs.
   - Tighten CSP in stages, preserving required Sanity, Stripe, GHL, analytics, video, and image domains.

6. Pay down quality-bar lint/refactor debt.
   - Convert recurring Sanity/Portable Text `any` types into shared local types.
   - Remove unused imports/variables.
   - Replace raw `<img>` with `next/image` where assets affect LCP or accessibility.
   - Split files over 300 lines only where behavior can be protected by tests first.
   - Replace default exports in reusable components/libs except Next page/layout boundaries.

7. Update docs.
   - Rewrite `README.md` with the actual stack, commands, env setup, quality gates, and deploy notes.
   - Add an audit checklist mapping `QUALITY_BAR.md` items to concrete commands and expected outputs.
   - Document the canonical lead-intake and Stripe fulfillment architecture.

## Public Interfaces And Types

- Extend `EnvName` in `src/lib/config/env.ts` for all server-only webhook/config values needed by GHL, Stripe fulfillment, rate limiting, and observability.
- Add or align a single exported GHL payload schema/type in `src/lib/ghl/contract.ts`.
- Add a shared API handler wrapper or helper for trace ID, logging, metrics, redaction, and safe error responses.
- Add a persistent Stripe processed-event type/document if using Sanity for webhook idempotency.
- No new npm dependencies unless needed for production-grade OTel/rate limiting and explicitly approved before implementation.

## Test Plan

- Unit tests:
  - `src/lib/scorp/*`
  - `src/lib/scorp-advantage/calculator.ts`
  - `src/lib/shop/*`
  - `src/lib/security/rate-limiter.ts`
  - `src/lib/ghl/contract.ts`
  - env/logger/redaction helpers

- API integration tests:
  - checkout success, empty cart, invalid cart, missing product, missing price, external buyLink fallback, shipping metadata, oversized metadata
  - Stripe webhook valid signature, invalid signature, duplicate event, GHL fulfillment success/failure, manual fulfillment fallback
  - GHL intake validation, honeypot, rate limit, safe error response, forwarding failure
  - S-Corp estimator validation and GHL payload mapping
  - revalidate valid/invalid secret

- Component tests:
  - S-Corp estimator step validation and submit states
  - contact/intake multi-step form validation
  - cart quantity and checkout button behavior
  - application form success/error states

- E2E tests:
  - digital checkout happy path
  - physical checkout shipping path
  - checkout cancel path
  - checkout success/cart clearing path
  - S-Corp estimator happy path
  - primary lead form submit path

- Final verification commands:
  - `npm run lint`
  - `npm exec tsc -- --noEmit`
  - `npm run test:coverage`
  - `npm run test:e2e`
  - `npm run build`
  - `npm audit --audit-level=high`

## Assumptions

- Use existing dependencies and architecture first; no new package unless required for quality-bar compliance.
- Sanity is the default persistent store for Stripe webhook idempotency because no separate database is present in the repo.
- Existing uncommitted user/worktree changes must be preserved.
- Secrets found during audit are treated as compromised and must be rotated outside the repo before production deploy.
