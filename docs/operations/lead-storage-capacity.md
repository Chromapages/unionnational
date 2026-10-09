# Lead reservation capacity and retention

New persistent delivery receipts and submitted-ID aliases each have a 10,000-reservation ceiling. Redis admission checks and counter updates run atomically before a CRM request. Development maps retain their existing independent 10,000-entry ceilings.

On first allocation, each persistent `lead-capacity:v1:delivery` or `lead-capacity:v1:identity` counter conservatively includes **all existing Redis database keys**. This avoids ignoring legacy lead reservations, but may refuse new leads earlier when unrelated quota keys exist. Counters never expire or decrease. A full store returns controlled 503 for new records; existing acknowledged receipts and evidence-backed recovery remain available. Changing receiver URLs or restarting the application does not reset these counters.

The application emits `lead_capacity_warning` on allocations at or above 80% and `lead_capacity_exhausted` when admission is refused. `scripts/summarize-operational-logs.mjs` counts these events without exporting payloads or identities. Operations must connect these events to actual alerts and monitor both counters, Redis memory/key limits, eviction policy, and pending/uncertain backlog before release. Ensure the chosen storage does not evict durable idempotency records; flags alone are not verification.

## Required owner decision before reclamation

Confirm the receiver's maximum retry/replay horizon, operational capacity budget, retention requirements, archive location/access, and recovery owner. Approve an archival/tombstone design preserving duplicate protection for acknowledged and uncertain deliveries. No cleanup, TTL, counter reset, eviction, or automatic uncertain resend is implemented or authorized here.

Until that decision, this is deliberately conservative admission control, not a reclamation policy. Existing over-capacity stores require operator review. Do not delete receipts or reset counters to restore availability; that can authorize duplicate sends. Use the existing read-only recovery command and receiver evidence to review uncertain receipts.

## Local protocol verification

`node --test scripts/lead-storage-redis.test.mjs` starts an owned temporary Redis process bound to 127.0.0.1, with a generated fixture password and no automatic persistence. Set `REDIS_SERVER_BIN` to a reviewed local Redis executable when it is not on PATH. No .env or provider URL is read. It executes the exported Lua, including last-slot concurrency, existing-record duplicate handling, corrupt/wrong-type counters, memory rejection, accepted/uncertain state, SDK serialization through a local REST adapter, and a saved fixture restart. Fixture data contains synthetic identities only.

The Linux quality workflow uses a digest-pinned official Redis container on a loopback port. `REDIS_FIXTURE_LOCAL_SERVICE=true` is reserved for that dedicated empty fixture and uses the documented synthetic CI password; never point the check at a shared or production Redis instance. The local REST adapter proves SDK wire compatibility, not hosted Upstash implementation or eviction policy. Linux CI is prepared but requires an approved push/run before its results can be claimed.
