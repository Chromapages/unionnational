# Union National Tax

A Next.js tax services website with Sanity CMS, Stripe, and GoHighLevel (GHL) CRM integration.

## Stack

- **Framework**: Next.js 16 (App Router)
- **CMS**: Sanity
- **Payments**: Stripe
- **i18n**: next-intl
- **UI**: React 19, TypeScript, Tailwind 4

## Available Scripts

```bash
npm ci               # Install the locked dependencies
npm run dev          # Start Webpack development server on port 3000 (.next)
npm run dev:3001     # Start a separate Webpack preview on port 3001 (.next-3001)
npm run dev:webpack  # Start development server (Webpack)
npm run dev:turbo    # Start development server (Turbopack)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run test          # Run unit tests
npm run test:coverage # Run tests with coverage report
npm run test:e2e      # Run Playwright end-to-end tests
npm run shop:readiness # Check local Stripe/URL configuration and price map (read only)
```

## Quality Gates

Run these source checks before merging or deploying:

```bash
npm exec tsc -- --noEmit  # TypeScript type check
npm run lint              # ESLint
npm run test:coverage     # Unit tests with coverage
npm run build             # Production build
npm audit --audit-level=high  # Security audit
```

`npm run shop:readiness` validates local configuration and the price map without contacting providers. Missing or invalid private payment storage, migration, or authenticated receiver configuration is a failure, not a warning. Routine CI runs this check with synthetic fixtures and `SHOP_READINESS_STATIC=1`, without payment credentials. A passing build, local preview, or configuration check does not verify live lead, email, or payment delivery.

Public `/readyz` returns only `configuration_ready` (200) or `not_ready` (503), with `Cache-Control: no-store`. It checks configuration, not live provider health. Run the local readiness CLI for detailed payment configuration names; use the operational runbooks for authorized provider verification.

## Environment Variables

Set the variables for the external integrations you use. A read-only local preview can start with the public CMS defaults in `src/lib/config/env.ts`; lead and payment flows require their own configuration.

### GoHighLevel (GHL)

| Variable | Description |
|---|---|
| `GHL_WEBHOOK_URL` | General server-side lead receiver URL |
| `GHL_SCORP_ESTIMATOR_WEBHOOK_URL` | S-Corp estimator webhook URL |
| `GHL_SURVEY_WEBHOOK_URL` | Survey webhook URL |
| `GHL_TAX_ANALYSIS_WEBHOOK_URL` | Tax analysis webhook URL |
| `GHL_APPLICATION_WEBHOOK_URL` | Application webhook URL |
| `GHL_RESTAURANT_APPLICATION_WEBHOOK_URL` | Restaurant application webhook URL |
| `GHL_CONSTRUCTION_CHECKLIST_WEBHOOK_URL` | Construction checklist webhook URL |
| `GHL_CONSTRUCTION_ASSESSMENT_WEBHOOK_URL` | Construction assessment webhook URL |
| `GHL_BLUEPRINT_MORE_INFO_WEBHOOK_URL` | Blueprint information-request webhook URL |

Purchase delivery additionally requires an approved HTTPS receiver, exact hostname allowlist, HMAC secret, and owner-confirmed durable acknowledgement/idempotency contract. Follow [Shop fulfillment recovery](docs/shop-fulfillment-recovery.md) for the exact configuration and verification gates. Do not enable a confirmation flag merely because a local test passes.

### Stripe

| Variable | Description |
|---|---|
| `STRIPE_SECRET_KEY` | Stripe secret API key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |

### Sanity

| Variable | Description |
|---|---|
| `SANITY_AUTH_TOKEN` | Scoped server/admin Sanity API token; never a `NEXT_PUBLIC_` value |
| `SANITY_REVALIDATE_SECRET` | Secret for on-demand revalidation |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID (public) |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset name (public) |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Sanity API version (public) |

Payment state uses a separate private `SANITY_PAYMENT_DATASET` and `SANITY_PAYMENT_AUTH_TOKEN`. Verify anonymous denial, least-privilege grants, and legacy recovery migration before setting the private/migration confirmation flags. Public Content Lake assets do not become private through a website gate. The [payment runbook](docs/shop-fulfillment-recovery.md) records the required evidence.

### Application

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_BASE_URL` | Public base URL (e.g., https://unionnationaltax.com) |

### Shared quotas and lead reservations (Upstash Redis) — required for production

| Variable | Description |
|---|---|
| `UPSTASH_REDIS_REST_URL` | Upstash Redis REST URL |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis REST token |
| `RL_WINDOW` | Rate limit window in seconds |
| `RL_MAX` | Max requests per window |
| `ENABLE_UPSTASH` | Set to literal `true` to use Redis quotas in development; production uses configured Redis automatically |
| `LEAD_TRUSTED_IP_HEADER` | Approved proxy identity header; inactive until its overwrite contract is verified |
| `LEAD_PROXY_HEADERS_VERIFIED` | Set to literal `true` only after verifying edge overwrite and direct-origin protection |

Production quotas and durable lead reservations require both Redis settings. Missing configuration or quota storage failure makes affected submissions unavailable (503), rather than bypassing protection. Development can use an in-memory fallback for quotas; it is process-local and cannot prove shared enforcement or durable retry behavior.

Before enabling proxy identity trust, record which edge overwrites the chosen header, strip client-supplied values, and verify whether direct origin access is blocked. Do not set the attestation based only on a passing mock. Apply approved upstream admission/body/deadline controls and test actual shared Redis failures in staging. See [Repository and release controls](docs/operations/repository-release-security.md).

## Architecture

### API Routes

All API routes live under `src/app/api/`. The canonical lead intake route is:

```
POST /api/ghl/intake
```

### Sanity Schemas

Schemas are defined under `src/sanity/schemaTypes/`.

### GHL Integration

CRM contracts are in `src/lib/ghl/`; durable duplicate-safe delivery is in `src/lib/leads/`. Uncertain delivery stays reserved until an authorized operator reconciles receiver evidence.

### Stripe

Stripe logic is in `src/lib/stripe.ts` and `src/lib/shop/`. Webhook idempotency uses revision-guarded `stripeWebhookIdempotency` documents in the separate private operational dataset. Failed or uncertain fulfillment remains recoverable without charging again.

### Observability

`src/lib/observability/` emits bounded redacted structured logs and request metrics to the host log sink. No OpenTelemetry collector is installed. Configure retention, alerts, and recovery ownership on the actual host using the [operations runbook](docs/operations/repository-release-security.md).
