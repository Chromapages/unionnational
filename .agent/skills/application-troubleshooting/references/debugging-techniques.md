## Isolation Techniques
- Toggle/flag: disable suspected feature or dependency; confirm symptom disappears.
- Stub dependency: replace network/storage/cache with in-memory fakes to separate code vs external.
- Binary search: `git bisect` on commits or configs; stop when a single change flips pass/fail.
- Delta diff: compare failing vs working host/tenant/build; diff env vars, config, versions, data shape.
- Canary compare: route a trickle of traffic to candidate fix and compare metrics/errors against control.

## Logging & Tracing Patterns
- Structured logs with keys: `request_id`, `user_id`, `flag_state`, `input_checksum`, `decision`.
- Guardrails: redact secrets, cap payload size, and wrap debug logs behind a flag and sample rate.
- Log decisions, not just failures: record branches taken, retry attempts, cache hits/misses.
- Correlate: ensure every hop carries the same correlation/trace ID; verify in logs before analysis.
- Timeouts/latency: log start/stop with durations; capture downstream status and retry count.

## Differential Debugging (what changed?)
- Code: commits, feature flags, dependency versions, build pipeline changes.
- Data: schema drift, enum expansions, new nullability, out-of-range values, migrations.
- Traffic: new client versions, spikes, geo/tenant mix shift, cron job timing.
- Infra: node upgrades, autoscaling events, certificate/secret rotation, network ACL changes.

## Concurrency/Async Clues
- Look for races: non-atomic read-modify-write, shared mutable caches, missing locks.
- Visibility issues: stale caches, write buffers, replication lag; add freshness markers.
- Ordering: enqueue/dequeue order, idempotency keys, retry with jitter to reduce thundering herds.

## Quick Tools (language-agnostic)
- `git bisect` or feature-flag bisect to narrow culprit.
- Record/replay: capture failing request/fixture and replay locally.
- Profiling: sample CPU/heap/allocs to catch leaks or hot loops.
- Strace/tcpdump equivalents when suspecting syscalls or network stalls.
- Chaos toggle: deliberately kill dependency or inject latency to confirm resilience gaps.
