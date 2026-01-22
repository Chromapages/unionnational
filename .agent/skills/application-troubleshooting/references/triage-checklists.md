## Quick Intake Checklist
- Symptom summary (what user sees) and first-seen timestamp.
- Scope: affected users %, routes/features, environments (prod/stage/local), tenants/regions.
- Recent change suspects: deploys, config/feature flags, data migrations, dependency updates.
- Evidence so far: log excerpts, request IDs, screenshots, stack traces.
- Repro status: unknown / partial / deterministic; note exact inputs, account, device/browser, flag state.
- Blast radius controls: pause deploys? enable maintenance banner? throttle traffic? toggle flag?
- Data risk: writes involved? idempotency? partial updates to roll back?
- Ownership: primary responder, communicator, decision owner for rollback.
- Next checkpoint time and success criteria for “mitigated.”

## Repro Builder (when repro is unclear)
1) Freeze variables: pin version/build, cache, feature flags, and data snapshot if possible.  
2) Narrow surface: single user/account/tenant, single endpoint/route, single device/browser.  
3) Capture inputs: request payloads, headers, auth context, locale, time zone, concurrency level.  
4) Timebox two attempts: if still flaky, pivot to evidence collection (logs/traces) and record/replay.  
5) Once repro exists, script it (curl/postman/playwright) and save for verification.

## Severity Cues
- **High**: data corruption risk, payment/checkout down, auth failures, crash loops, P0/P1 alerts.
- **Medium**: degraded performance, partial feature loss, intermittent errors with workaround.
- **Low**: cosmetic/typo, non-blocking warnings, slow path only.

## Evidence to Collect Early
- Request/trace IDs, correlation IDs, user/account IDs.
- Exact error text and stack, status codes, latency outliers.
- Environment info: app version/commit, feature flags, config values, region/zone/host.
- Data snapshots around the failing entity (before/after if safe).
- Timeline of events (deploys, migrations, alerts) in the last 2–4 hours.
