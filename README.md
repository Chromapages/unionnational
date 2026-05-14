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
npm run dev          # Start development server (Turbopack)
npm run dev:webpack  # Start development server (Webpack)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run test          # Run unit tests
npm run test:coverage # Run tests with coverage report
npm run test:e2e      # Run Playwright end-to-end tests
```

## Quality Gates

All checks must pass before merging or deploying:

```bash
npm exec tsc -- --noEmit  # TypeScript type check
npm run lint              # ESLint
npm run test:coverage     # Unit tests with coverage
npm run build             # Production build
npm audit --audit-level=high  # Security audit
```

## Environment Variables

Required variables for local development and production:

### GoHighLevel (GHL)

| Variable | Description |
|---|---|
| `GHL_CLIENT_ID` | GHL OAuth client ID |
| `GHL_CLIENT_SECRET` | GHL OAuth client secret |
| `GHL_LOCATION_ID` | GHL location ID |
| `GHL_REFRESH_TOKEN` | GHL OAuth refresh token |
| `GHL_WEBHOOK_URL` | General webhook URL |
| `GHL_SHOP_PURCHASE_WEBHOOK_URL` | Shop purchase webhook URL |
| `GHL_SCORP_ESTIMATOR_WEBHOOK_URL` | S-Corp estimator webhook URL |
| `GHL_SURVEY_WEBHOOK_URL` | Survey webhook URL |
| `GHL_TAX_ANALYSIS_WEBHOOK_URL` | Tax analysis webhook URL |
| `GHL_APPLICATION_WEBHOOK_URL` | Application webhook URL |
| `GHL_RESTAURANT_APPLICATION_WEBHOOK_URL` | Restaurant application webhook URL |

### Stripe

| Variable | Description |
|---|---|
| `STRIPE_SECRET_KEY` | Stripe secret API key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |

### Sanity

| Variable | Description |
|---|---|
| `SANITY_AUTH_TOKEN` | Sanity API token |
| `SANITY_REVALIDATE_SECRET` | Secret for on-demand revalidation |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID (public) |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset name (public) |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Sanity API version (public) |

### Application

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_BASE_URL` | Public base URL (e.g., https://unionnationaltax.com) |

### Rate Limiting (Upstash Redis) — optional for production

| Variable | Description |
|---|---|
| `UPSTASH_REDIS_REST_URL` | Upstash Redis REST URL |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis REST token |
| `RL_WINDOW` | Rate limit window in seconds |
| `RL_MAX` | Max requests per window |
| `ENABLE_UPSTASH` | Set to `1` to enable rate limiting |

### Observability (OpenTelemetry) — optional

| Variable | Description |
|---|---|
| `OTEL_EXPORTER_OTLP_ENDPOINT` | OTLP exporter endpoint |
| `OTEL_SERVICE_NAME` | Service name for traces |

## Architecture

### API Routes

All API routes live under `src/app/api/`. The canonical lead intake route is:

```
POST /api/ghl/intake
```

### Sanity Schemas

Schemas are defined under `src/sanity/schemaTypes/`.

### GHL Integration

CRM integration is in `src/lib/ghl/`, including authentication and webhook sending.

### Stripe

Stripe logic is in `src/lib/stripe.ts`. Stripe webhook idempotency uses Sanity `stripeWebhookIdempotency` documents to prevent double-processing of events.

### Observability

OpenTelemetry setup is in `src/lib/observability/`.