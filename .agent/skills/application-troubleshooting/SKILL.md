---
name: application-troubleshooting
description: End-to-end troubleshooting playbook for debugging applications (frontend, backend, mobile, data jobs) from triage through verification. Use when diagnosing crashes, errors, performance regressions, flaky tests, or unclear failures and you need a repeatable workflow, checklists, instrumentation tips, or communication templates.
---

# Application Troubleshooting

## Overview
Use this skill to rapidly triage, reproduce, isolate, and fix application issues while minimizing blast radius. It supplies concise workflows, decision aids, and templates so debugging stays disciplined and fast.

## Quick Start
- Stabilize: capture signals, halt risky actions, and gather minimal context.
- Reproduce: confirm the symptom and make it deterministic.
- Isolate: narrow the failing boundary (feature, host, build, data).
- Observe: add or enable scoped logging/metrics/traces with minimal intrusion.
- Fix small: apply the smallest safe change, ideally behind a flag.
- Verify: run targeted checks and monitor for regression.
- Close loop: document root cause, prevention, and status.

## Workflow

### 1) Triage & Context
- Capture incident basics fast: symptom, scope, first-seen time, impacted users, blast radius, and recent changes.
- If impact is high, freeze deploys and note the rollback path; enable maintenance banners where applicable.
- Collect artifacts early (logs, screenshots, request IDs). Use `assets/issue-intake-template.md` to structure intake.
- If repro is unknown, prioritize building a minimal repro before deep dives.

### 2) Reproduce Reliably
- Aim for deterministic repro in a controlled environment (flag on/off, specific dataset, device/browser).
- Match production parity where possible: same config, data shape, and traffic pattern.
- When repro is hard, pivot to evidence gathering (errors, traces) and simulation (record/replay, fixture snapshots). See `references/triage-checklists.md`.

### 3) Isolate the Fault
- Shrink the search space: toggle modules/flags, stub dependencies, change one variable at a time.
- Use binary search on code (git bisect) or config (feature toggles) when a regression window exists.
- Separate code vs data issues by replaying with known-good data and checking schema/contract drift.

### 4) Observe & Instrument
- Turn on scoped debug logging with guards to avoid noise and leakage; log inputs, decisions, and correlation IDs.
- Add metrics/timers around suspected hotspots; capture end-to-end traces when possible.
- For async/concurrency problems, log ordering, locking, and contention signals. See `references/debugging-techniques.md`.

### 5) Fix Safely
- Prefer the smallest viable fix; avoid refactors during incidents.
- Guard risky paths with feature flags or narrower conditions; keep rollback one command away.
- Record the causal chain in the PR/commit so future responders have context.

### 6) Verify & Prevent Regression
- Re-run the repro, add a focused test for it, and run the smallest relevant suite (unit plus affected integration/e2e).
- Validate negative cases and monitor key metrics/logs after rollout.
- Add safeguards: validation, timeouts/retries, rate limits, circuit breakers, health checks. See `references/fix-verification.md`.

### 7) Communicate
- Status cadence: what happened, user impact, ETA to mitigation, next checkpoint.
- Post-resolution: root cause, contributing factors, fix summary, prevention items, and follow-up owners.

## Resource Map
- `references/triage-checklists.md` — fast intake, severity cues, and a reproducibility builder.
- `references/debugging-techniques.md` — isolation tactics, logging patterns, and differential debugging aids.
- `references/fix-verification.md` — verification matrix, rollback/feature-flag playbook, and regression defenses.
- `assets/issue-intake-template.md` — ready-to-send template for collecting reproducible details.
