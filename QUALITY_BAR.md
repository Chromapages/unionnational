# QUALITY_BAR.md

**Project:** Union National Tax
**Stack:** Next.js (App Router), React, TypeScript, TailwindCSS, Sanity CMS, Stripe
**Deployment:** Vercel
**Owner:** Union National Tax Engineering Team
**Last Updated:** 2026-05-02

---

## Commands

| Action       | Command                        |
|--------------|-------------------------------|
| Dev server   | `npm run dev`                 |
| Build        | `npm run build`               |
| Test         | `npm test -- --coverage`      |
| Lint         | `npm run lint`                |
| Type check   | `npx tsc --noEmit`            |
| Format       | `npx prettier --write .`      |

---

## Code Style

- TypeScript strict mode ON (`strict: true` in tsconfig.json)
- No `any` types — must include justification comment if used
- Functional components only — no class components
- Named exports preferred — no default exports except Next.js pages and layouts
- File naming: `kebab-case` or `PascalCase` for components
- Component naming: `PascalCase`
- Variable naming: `camelCase` | Constants: `UPPER_SNAKE_CASE`
- Max file length: 300 lines | Max function length: 50 lines

### ✅ Correct
```tsx
export function UserCard({ userId }: { userId: string }) {
  return <div>{userId}</div>;
}
```

### 🚫 Wrong
```tsx
export default function (props: any) {
  return <div>{props.userId}</div>;
}
```

---

## Project Structure

```
/src
  /app          → Next.js App Router pages
  /components   → Reusable UI components
  /lib          → Utility functions and helpers
  /hooks        → Custom React hooks
  /sanity       → CMS schemas and queries
  /store        → Zustand state management
  /scripts      → Utility scripts
/public         → Static assets
```

---

## Three-Tier Boundaries

### ✅ Always Do
- Run lint + type checks before every commit
- Write a test for every new critical utility or API route
- Log all errors to the monitoring service (not just console.error)
- Follow folder structure exactly
- Add TypeScript types to all function signatures
- Access env vars only through central config (if applicable)

### ⚠️ Ask First
- Adding a new npm dependency
- Modifying CMS schema or migrations
- Changing CI/CD pipeline config
- Modifying shared auth or checkout logic
- Adding or removing environment variables
- Changing public API contracts

### 🚫 Never Do
- Commit secrets, API keys, or tokens
- Edit `node_modules/` or lockfiles manually
- Skip or delete a failing test
- Push directly to `main` or `production`
- Use `// @ts-ignore` without a linked ticket
- Call external APIs directly inside React components without proper error handling
- Return raw stack traces to the client

---

## Testing Standards

- **Framework:** Playwright (E2E) / Jest (Unit - TBD)
- **Location:** Colocated or in `/tests`
- **Coverage threshold:** ≥ 80% — CI blocks merge below this
- **Required:** Unit (all utils), Component (critical UI), Integration (API routes), E2E (checkout flows)

```bash
npm test -- --coverage --coverageThreshold='{"global":{"lines":80}}'
```

---

## Defect Definitions

### 🚨 Critical — Zero Tolerance (Blocks deploy)
- Security vulnerability: exposed API keys, missing auth, injection vector
- Data loss: destructive operation without confirmation or rollback
- Production crash: unhandled exception that takes down the app
- Broken core user flow: login, primary feature, or checkout non-functional

### ⚠️ Major — Blocks Merge
- Feature output doesn't match spec
- TypeScript errors or unjustified `any` usage
- Test coverage drops below 80%
- API route missing error handling or returning raw stack traces
- New dependency added without approval
- Performance budget exceeded

### 🔵 Minor — Non-blocking (Log and fix in follow-up)
- Naming convention violation
- Missing or incomplete JSDoc/TSDoc comment
- `console.log` left in production code
- Tailwind class ordering inconsistency
- Component file exceeds 300 lines

---

## Performance Budget

| Metric                  | Threshold          |
|-------------------------|--------------------|
| Lighthouse Performance  | ≥ 90               |
| Lighthouse Accessibility| ≥ 90               |
| First Contentful Paint  | < 1.5s             |
| Largest Contentful Paint| < 2.5s             |
| JS Bundle (gzipped)     | < 300kb            |
| API Response Time (p95) | < 200ms            |
| Build Time              | < 3 min (warn)     |

---

## Reliability Targets (SLOs)

| Signal       | SLI                              | SLO Target           |
|--------------|----------------------------------|----------------------|
| Availability | % successful HTTP responses      | ≥ 99.9% / 30 days   |
| Latency      | p95 API response time            | < 200ms              |
| Error rate   | % 5xx responses / total requests | < 0.1%               |
| Build health | % green CI runs / 7 days         | ≥ 95%                |

**Error budget:** 0.1% of monthly requests (~43 min downtime).
Freeze deploys when error budget is > 50% consumed.

---

## Observability Requirements

- **Logging:** Structured JSON — required fields: `timestamp`, `level`, `service`, `traceId`, `userId`
- **Tracing:** OpenTelemetry spans on every API request
- **Metrics:** Request rate, error rate, latency histograms exported to monitoring stack
- **Alerting:** Page on-call when error rate > 1% for 5 consecutive minutes
- **Health endpoints:** `/healthz` (liveness) and `/readyz` (readiness) required on all services

---

## Incident Response

| Severity | Definition                                  | Response SLA  |
|----------|---------------------------------------------|---------------|
| SEV-1    | Full outage or data breach                  | 15 minutes    |
| SEV-2    | Major feature down, significant degradation | 1 hour        |
| SEV-3    | Minor degradation, workaround available     | Next business day |

### Runbook Template (per critical path)
1. **Symptoms** — What the alert or error looks like
2. **Blast radius** — Who and what is affected
3. **Diagnosis** — Which logs/metrics/traces to check first
4. **Recovery** — Rollback command, feature flag toggle, restart procedure
5. **Escalation** — Who to page if unresolved within SLA window

---

## Deployment Standards

- Feature flags required for all user-facing changes above minor scope
- Canary deploys: route 5% of traffic before full rollout
- Rollback time objective (RTO): < 5 minutes for any deploy
- DB migrations must be backward-compatible (no breaking changes in a single deploy)
- Zero-downtime deploys: health checks must pass before old instances terminate

---

## Data & Compliance

- PII fields encrypted at rest and masked in all logs
- All data access logged with actor ID + timestamp
- Data deletion requests honored within 30 days (GDPR/CCPA)
- Backups tested for restore quarterly
- API keys and secrets rotated every 90 days maximum

---

## Dependency & Supply Chain

- `npm audit` — zero high or critical CVEs before any deploy
- Lockfile (`package-lock.json`) committed and never manually edited
- No `^` version ranges on security-critical packages
- License audit: no GPL dependencies in commercial product
- All third-party services must have documented uptime SLAs on file

---

## Git Workflow

- **Branches:** `feature/[ticket-id]-short-description`
- **Commits:** Conventional Commits — `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`
- **PR Requirements:**
  - All CI checks green
  - Minimum 1 reviewer approval
  - Linked ticket or issue
  - Description includes: What changed, Why, How to test

---

## Definition of Done

A task is complete only when ALL of the following are true:

1. Feature works as specified in the linked spec/ticket
2. All tests pass and new tests written for new logic
3. Lint, type check, and format pass with zero errors
4. Performance budget not regressed
5. PR reviewed and approved by at least 1 teammate
6. Agent Self-Audit completed and all 🚨 items resolved

---

## Agent Self-Audit

After completing any task, run this checklist before handoff:

1. Commands       — Do build, lint, type check, and tests all pass?
2. Defects        — Were any Critical or Major defects introduced? How resolved?
3. Boundaries     — Were all ✅ / ⚠️ / 🚫 rules respected?
4. Tests          — Are new tests written for all new logic?
5. Performance    — Are all budget thresholds still met?
6. Observability  — Are new code paths logged and traced?
7. Security       — Are inputs validated? No secrets committed?
8. Spec alignment — Does the output match the feature spec exactly?

Report format:
- ✅ [item] — passed
- ⚠️ [item] — deferred, reason: [reason], ticket: [ref]
- 🚨 [item] — FAILED, action taken: [description]

Do not mark a task complete until all 🚨 items are resolved.

---

## Lessons Learned
<!-- Add gotchas, footguns, and non-obvious decisions here as discovered -->
- 2026-05-02 Shop Checkout: Stripe integration requires specific sync logic to ensure price IDs match Sanity CMS editions.
