# SKILL: Quality Bar Spec Generator

## Purpose
This skill enables an AI coding agent to create, audit, and maintain
production-grade quality bar spec files (`QUALITY_BAR.md`) for any
software project. When invoked, the agent gathers project context and
outputs a complete, executable, production-ready quality bar spec.

---

## Trigger Phrases
Activate this skill when the user says any of the following:
- "create a quality bar spec"
- "generate QUALITY_BAR.md"
- "write a quality spec"
- "set up quality standards"
- "audit my quality bar"
- "update quality spec"

---

## Context Gathering (Ask Before Generating)

Before generating the spec, collect the following. If context is already
available in the codebase or conversation, infer it — don't ask redundantly.

### Required
- [ ] Project name
- [ ] Primary stack (language, framework, runtime)
- [ ] Deployment target (Vercel, AWS, Docker, etc.)
- [ ] Test framework in use or preferred
- [ ] Is this customer-facing / production? (yes/no)

### Infer From Codebase If Present
- Package manager (`package.json`, `Pipfile`, `go.mod`, etc.)
- Existing lint/format config (`.eslintrc`, `prettier.config`, etc.)
- CI/CD config (`.github/workflows`, `vercel.json`, etc.)
- Existing env files (`.env.example`)
- DB/ORM setup (Prisma, Drizzle, SQLAlchemy, etc.)

---

## Output File

Always output to: `QUALITY_BAR.md` in the project root.
If the file already exists, diff against it and only update sections
that are incomplete, missing, or outdated. Never silently overwrite
existing content — show a diff summary first.

---

## Required Sections (Always Include)

### 1. Project Overview
```
# QUALITY_BAR.md
Project: [name]
Stack: [stack]
Deployment: [target]
Owner: [team or person]
Last Updated: [date]
```

### 2. Commands Table
Include ALL of the following with exact flags:
- Dev server
- Build
- Test (with coverage flag)
- Lint (with auto-fix flag)
- Type check (if typed language)
- Format
- DB migrate (if applicable)
- Deploy (if scriptable)

### 3. Code Style Rules
- Typing policy (strict mode, no-any rules, etc.)
- Naming conventions for files, variables, functions, constants, components
- Max file length and max function length
- Export conventions
- Import ordering rules
- At least ONE concrete ✅ correct / 🚫 wrong code example

### 4. Project Structure
- Annotated directory tree of `/src` or equivalent
- Where env vars are accessed (config layer — never inline)
- Where API calls are made (client wrapper — never raw in components)
- Where types/interfaces live

### 5. Three-Tier Boundary System
Structure as:
- ✅ Always Do — safe defaults enforced on every task
- ⚠️ Ask First — high-impact gates requiring approval
- 🚫 Never Do — hard stops, zero tolerance

Minimum entries per tier: 5

### 6. Testing Standards
- Framework and file colocation convention
- Coverage threshold (block merge below this number)
- Required test types: unit, integration, E2E
- Command to run with coverage report
- Rule for when a new test is mandatory (every new function/hook/route)

### 7. Defect Definitions (Three-Tier Severity)

#### 🚨 Critical — Zero Tolerance (Blocks deploy)
Examples to always include:
- Security vulnerability (exposed keys, missing auth, injection vectors)
- Data loss risk
- Production crash / unhandled exception
- Broken core user flow

#### ⚠️ Major — Blocks Merge
Examples to always include:
- Feature doesn't match spec
- Type errors or unsafe typing
- Coverage drops below threshold
- Missing error handling on API routes
- Unauthorized dependency addition
- Performance budget exceeded

#### 🔵 Minor — Non-blocking (Track and fix)
Examples to always include:
- Naming convention violations
- Missing doc comments
- Console.log in production code
- Style/formatting inconsistency

### 8. Performance Budget
Always include a table with thresholds for:
- Lighthouse score (all categories)
- First Contentful Paint
- Largest Contentful Paint
- JS Bundle size (gzipped)
- API response time (p95)
- Build time (warn threshold)

### 9. Reliability Targets (SLOs) — Production Only
Include when `customer-facing = yes`:
- Availability SLO (% uptime / 30 days)
- Latency SLO (p95 API response)
- Error rate SLO (% 5xx / total requests)
- Error budget definition and freeze-deploy rule

### 10. Observability Requirements — Production Only
Include when `customer-facing = yes`:
- Structured logging format (required fields: timestamp, level, service, traceId, userId)
- Distributed tracing requirement (OpenTelemetry or equivalent)
- Metrics: request rate, error rate, latency histograms
- Alert thresholds that trigger on-call
- Required health endpoints: `/healthz` and `/readyz`

### 11. Incident Response — Production Only
Include when `customer-facing = yes`:
- SEV level definitions (SEV-1 through SEV-3) with response SLAs
- Runbook template per critical path:
  1. Symptoms
  2. Blast radius
  3. Diagnosis steps
  4. Recovery/rollback steps
  5. Escalation path

### 12. Deployment Standards — Production Only
Include when `customer-facing = yes`:
- Feature flag requirement for user-facing changes
- Canary / staged rollout policy
- Rollback time objective (RTO): target < 5 minutes
- DB migration safety rule (backward-compatible only)
- Zero-downtime deploy requirement

### 13. Data & Compliance — Production Only
Include when `customer-facing = yes` or data is sensitive:
- PII encryption at rest and masking in logs
- Audit log requirement (actor + timestamp on all data access)
- Data deletion SLA (GDPR/CCPA)
- Backup and restore verification policy
- Secret rotation cadence (max 90 days)

### 14. Dependency & Supply Chain
Always include:
- CVE audit command (`npm audit`, `pip-audit`, etc.) and zero high/critical rule
- Lockfile commit policy
- Version pinning strategy
- License audit rule (no incompatible licenses in commercial product)
- Third-party service SLA documentation requirement

### 15. Git Workflow
- Branch naming convention
- Commit message format (Conventional Commits preferred)
- PR requirements: CI green, reviewer count, linked ticket, description format

### 16. Definition of Done
A numbered checklist. Task is complete when ALL items pass:
1. Feature works per spec
2. All tests pass + new tests written
3. Lint, type check, format pass with zero errors
4. Performance budget not regressed
5. PR reviewed and approved
6. QUALITY_BAR.md self-audit completed (see below)

### 17. Agent Self-Audit Prompt
Always include this block verbatim at the bottom of every generated QUALITY_BAR.md:

```
## Agent Self-Audit

After completing any task, run this checklist before handoff:

1. Commands      — Do build, lint, type check, and tests all pass?
2. Defects       — Were any Critical or Major defects introduced? How resolved?
3. Boundaries    — Were all ✅ / ⚠️ / 🚫 rules respected?
4. Tests         — Are new tests written for all new logic?
5. Performance   — Are all budget thresholds still met?
6. Observability — Are new code paths logged and traced? (production)
7. Security      — Are inputs validated? No secrets committed?
8. Spec alignment — Does the output match the feature spec exactly?

Report format:
- ✅ [item] — passed
- ⚠️ [item] — deferred, reason: [reason], ticket: [ref]
- 🚨 [item] — FAILED, action taken: [description]

Do not mark a task complete until all 🚨 items are resolved.
```

---

## Audit Mode

When the user asks to "audit" an existing `QUALITY_BAR.md`, the agent must:

1. Read the current file
2. Check for each Required Section above — mark ✅ present / ❌ missing / ⚠️ incomplete
3. Output a gap report in this format:

```
## Quality Bar Audit Report
Date: [date]

| Section                    | Status        | Notes                          |
|----------------------------|---------------|-------------------------------|
| Commands Table             | ✅ Present    |                               |
| Defect Definitions         | ⚠️ Incomplete  | Missing Minor tier examples   |
| SLOs / Reliability Targets | ❌ Missing    | Required for production       |
| Agent Self-Audit Prompt    | ❌ Missing    | Add verbatim block from spec  |
```

4. Ask: "Would you like me to fill in the missing sections now?"

---

## Update Mode

When the user asks to "update" the spec:
- Never delete existing content unless explicitly instructed
- Add missing sections from the Required Sections list
- Append new entries to Lessons Learned if provided
- Bump the `Last Updated` date
- Output a changelog summary of what changed

---

## Lessons Learned Section

Always include a `## Lessons Learned` section at the end of every generated file.
Populate with any project-specific gotchas discovered during the conversation.
Format:

```markdown
## Lessons Learned
<!-- Add gotchas, footguns, and non-obvious decisions here as discovered -->
- [Date] [Area]: [What happened and what to do instead]
```

---

## Quality Tiers

Use these to scope the output:

| Tier           | When to Use                    | Sections Included              |
|----------------|--------------------------------|-------------------------------|
| **Starter**    | Internal tools, prototypes     | Sections 1–8, 15–17           |
| **Production** | Customer-facing SaaS           | All sections (1–17)           |
| **Regulated**  | Fintech, health, legal         | All + add HIPAA/SOC2/PCI notes |

Default to **Production** tier unless the user specifies otherwise.

---

## Output Rules

- Output the full `QUALITY_BAR.md` as a single fenced markdown code block
- Use real values from the project — never leave `[placeholder]` unfilled if inferable
- All commands must be copy-paste executable
- All thresholds must be specific numbers — never "reasonable" or "acceptable"
- Flag any section where project context was insufficient with:
  `<!-- TODO: Confirm with team — [what's needed] -->`
- After generating, always run the Agent Self-Audit against the file itself and
  report results before presenting the output to the user

---

## Deployment Options

Use this skill in any of the following ways:

| Method                        | How                                                                 |
|-------------------------------|---------------------------------------------------------------------|
| **Cursor**                    | Save to `.cursor/rules/quality-bar.md`                             |
| **Windsurf**                  | Save to `.windsurf/rules/quality-bar.md`                           |
| **Claude / OpenAI**           | Paste full file into agent system prompt                           |
| **OpenClaw / AHM**            | Register as named skill, trigger on `create quality bar spec` intent|
| **Project repo**              | Commit to `docs/skills/quality-bar-skill.md`, reference in `AGENTS.md` |

---

## Example Generated Output (Starter Skeleton)

Below is the minimum skeleton a generated `QUALITY_BAR.md` must follow.
The agent fills in all values from project context before outputting.

```markdown
# QUALITY_BAR.md

**Project:** [name]
**Stack:** [stack]
**Deployment:** [target]
**Owner:** [team/person]
**Last Updated:** [YYYY-MM-DD]

---

## Commands

| Action       | Command                        |
|--------------|-------------------------------|
| Dev server   | `npm run dev`                 |
| Build        | `npm run build`               |
| Test         | `npm test -- --coverage`      |
| Lint         | `npm run lint --fix`          |
| Type check   | `npx tsc --noEmit`            |
| Format       | `npx prettier --write .`      |
| DB migrate   | `npx prisma migrate dev`      |

---

## Code Style

- TypeScript strict mode ON (`strict: true` in tsconfig.json)
- No `any` types — must include justification comment if used
- Functional components only — no class components
- Named exports only — no default exports except Next.js pages
- File naming: `kebab-case` | Component naming: `PascalCase`
- Variable naming: `camelCase` | Constants: `UPPER_SNAKE_CASE`
- Max file length: 300 lines | Max function length: 50 lines

### ✅ Correct
\`\`\`tsx
export function UserCard({ userId }: { userId: string }) {
  return <div>{userId}</div>;
}
\`\`\`

### 🚫 Wrong
\`\`\`tsx
export default function (props: any) {
  return <div>{props.userId}</div>;
}
\`\`\`

---

## Project Structure

\`\`\`
/src
  /app          → Next.js App Router pages
  /components   → Reusable UI components
  /lib          → Utility functions and helpers
  /hooks        → Custom React hooks
  /config       → All env vars accessed HERE only
  /types        → Shared TypeScript interfaces/types
  /api          → API client wrappers (never raw fetch)
/tests          → E2E and integration tests
/public         → Static assets
\`\`\`

---

## Three-Tier Boundaries

### ✅ Always Do
- Run lint + tests before every commit
- Write a test for every new function, hook, or API route
- Log all errors to the monitoring service (not just console.error)
- Follow folder structure exactly
- Add TypeScript types to all function signatures
- Access env vars only through `src/config/env.ts`

### ⚠️ Ask First
- Adding a new npm dependency
- Modifying DB schema or migrations
- Changing CI/CD pipeline config
- Modifying shared auth or session logic
- Adding or removing environment variables
- Changing public API contracts

### 🚫 Never Do
- Commit secrets, API keys, or tokens
- Edit `node_modules/` or lockfiles manually
- Skip or delete a failing test
- Push directly to `main` or `production`
- Use `// @ts-ignore` without a linked ticket
- Call external APIs directly inside React components
- Return raw stack traces to the client

---

## Testing Standards

- **Framework:** Jest + React Testing Library
- **Location:** Colocated — `[name].test.tsx` next to source file
- **Coverage threshold:** ≥ 80% — CI blocks merge below this
- **Required:** Unit (all utils), Component (all UI), Integration (all API routes), E2E (all critical flows)

\`\`\`bash
npm test -- --coverage --coverageThreshold='{"global":{"lines":80}}'
\`\`\`

---

## Defect Definitions

### 🚨 Critical — Zero Tolerance (Blocks deploy)
- Security vulnerability: exposed API keys, missing auth, injection vector
- Data loss: destructive DB op without confirmation or rollback
- Production crash: unhandled exception that takes down the app
- Broken core user flow: login, primary feature, or checkout non-functional

### ⚠️ Major — Blocks Merge
- Feature output doesn't match spec
- TypeScript errors or unjustified `any` usage
- Test coverage drops below 80%
- API route missing error handling or returning raw stack traces
- New dependency added without approval
- Performance budget exceeded
- Env var accessed outside `src/config/env.ts`

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
- [Date] [Area]: [What happened and what to do instead]
```
