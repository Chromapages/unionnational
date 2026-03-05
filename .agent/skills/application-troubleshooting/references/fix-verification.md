## Verification Matrix
- Re-run scripted repro first; expect clean pass.
- Add a focused automated test that fails before the fix and passes after.
- Targeted suites: unit tests around the module + affected integration/e2e path; skip unrelated broad suites during incidents.
- Negative checks: invalid input, boundary values, concurrency/ordering where relevant.
- Performance/latency spot-check if the issue touched hot paths.

## Rollout & Safeguards
- Prefer feature-flagged rollout; enable for a small cohort/tenant/region first.
- Keep rollback path hot: reversible migration plan, previous build ready, or kill-switch flag.
- Monitor during rollout: error rates, latency, saturation, and custom symptom metrics.
- Announce checkpoints (e.g., 15m/30m) with pass/fail criteria to decide whether to continue rollout.

## Post-Fix Hardening
- Add detection: alert on the specific symptom, add SLO burn alerts if applicable.
- Add prevention: validation, timeouts/retries with backoff, circuit breakers, rate limits, idempotency.
- Update runbooks and on-call notes with the repro script, root cause, and the exact signals that confirmed it.
- Create a follow-up ticket for any deferred cleanups or refactors and assign an owner/date.
