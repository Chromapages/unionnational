# Repository and release controls

This runbook describes local controls and the administrative steps needed before release. Account settings, deployment configuration, historical capability retirement, and production monitoring still require recorded owner evidence. Static fixture checks do not confirm provider behavior.

## Repository administrator

Require the Quality job and CodeQL job for changes to the protected release branch. Require reviewed pull requests, disallow ordinary force pushes and branch deletion, dismiss stale approvals, and require approval again when security-sensitive files change. Add actual authorized user/team names to `.github/CODEOWNERS` for `.github/`, `scripts/`, API routes, `src/lib/shop/`, and authentication/configuration/observability helpers. No fictitious team was inserted: an administrator must identify the real approvers and verify their access.

Set the repository's default workflow token to read access. The committed workflows declare `contents: read`; only the CodeQL job additionally requests `security-events: write`. Checkout credentials do not persist. Action revisions are full commit SHAs verified against their official repository tags. Review Dependabot pull requests before merging, including action SHA updates. [GitHub secure-use guidance](https://docs.github.com/en/actions/reference/security/secure-use).

Enable applicable secret scanning and push protection in the actual repository settings. Keep the custom GHL capability guard because generic provider scanners may not recognize those URLs. The Quality source guard prints only locations, types, and fingerprints; it never prints source excerpts or values. The script also rejects tracked environment/key files by filename without reading them. Binary/non-UTF-8 and oversized files are reported as skipped. This regex control cannot detect every encoded or unfamiliar credential.

Run the strict historical scan when evaluating retirement:

```text
node scripts/security-source-guard.mjs --history
```

The manual history job checks all refs available in its full-depth checkout. `.github/security-history-baseline.json` is a disposition inventory rather than an allowlist. Historical capabilities block the check until an owner records that each is retired, with nonsecret provider/admin evidence. An exact historical mock fixture has a restricted object/path/type exception. Current source has no baseline exceptions. Never put URLs or replacement values in the ledger. Retire credentials before considering coordinated history cleanup; the scan does not rotate credentials or rewrite history.

## Static quality and deployment gates

Production requires shared Redis credentials for quotas and lead delivery reservations. Missing Redis configuration or quota-storage failure returns an unavailable state rather than an in-memory production fallback. Development Redis quotas are enabled with `ENABLE_UPSTASH=true` (the literal string; `1` is not enabled). A development memory fallback is process-local and cannot verify production isolation or durable delivery recovery.

Do not enable `LEAD_PROXY_HEADERS_VERIFIED=true` until hosting evidence establishes the chosen `LEAD_TRUSTED_IP_HEADER` is overwritten by the trusted ingress, client-provided copies are stripped, and direct-origin bypass is blocked or accounted for. Record ingress body/deadline/admission limits and repeat the spoofing/shared-capacity fixtures against authorized staging. A source flag cannot establish this deployment trust contract.

Public `/readyz` returns a generic uncached configuration status, not missing setting names or delivery health. Use `npm run shop:readiness` locally for payment configuration diagnostics; use the existing recovery/monitoring CLIs only with separately authorized provider-read scope. Configuration checks do not verify actual Redis availability, private dataset ACLs, migration completion, or receiver acceptance.

Routine Quality jobs use synthetic Stripe/Sanity/receiver values and `SHOP_READINESS_STATIC=1`; the readiness script does not read `.env.local` in this mode. It verifies the private dataset differs from the public catalog dataset, configuration flags have the expected shape, the fulfillment destination matches the exact allowed host list over HTTPS, and an adequately sized signing value is configured. The actual private dataset, migration completion, receiver authentication, idempotency, durable acknowledgement, and Hostinger settings require owner verification using the payment runbook.

After `npm ci`, CI checks that the bounded braces patch actually ran, executes repository/dependency regression checks, then performs the normal lint/type/test/build/audit steps. A high-severity upstream audit finding remains a failed audit gate even when a reviewed local patch reduces its exposure; no advisory is hidden by this workflow. CodeQL is configured for application JavaScript/TypeScript and workflow definitions, with generated/private artifacts excluded. The workflow has not been executed on GitHub as part of local verification.

Before release, obtain a clean installation/build for the intended platform and generate inventory on that host:

```text
node scripts/release-inventory.mjs --production
```

The private `.release-evidence/` directory contains a lockfile inventory, `sbom.cdx.json`, and preserved `THIRD-PARTY-NOTICES.md`. The inventory includes locked optional/platform candidates and reports absent packages, installed-version mismatches, missing notice text, unknown licenses, and licenses needing review. Resolve applicable review items before distribution. Packaged notice files are preserved verbatim. This generated evidence does not grant legal approval or establish that the inventory exactly matches every browser bundle; validate the actual release and obtain any missing notices. Use `--strict` when the selected release scope's review items are resolved. Docker/npm packaging ignores audit reports, runtime state, local backups, and private release evidence. Include reviewed required notices intentionally with distributed releases; private generation and packaging exclusions do not waive license obligations.

## Local mutation scripts

Seeds, migrations, privacy-policy updates, and the repair script default to a preview. Application requires the configured dataset and project to be acknowledged explicitly:

```text
node scripts/repair-live-content.mjs
node scripts/repair-live-content.mjs --apply --target=<configured-dataset> --project=<configured-project>
```

For TypeScript administrator tools, use the supported Node runtime's existing type stripping rather than downloading a runner:

```text
node --experimental-strip-types scripts/create-privacy-policy-document.ts
node --experimental-strip-types scripts/seed-spanish-product-content.ts
node --experimental-strip-types src/scripts/migrate-schemas-i18n.ts
```

An explicit application requires a scoped write credential. It writes full originals and missing-document markers into `.local-backups/sanity/` before the first mutation and checks the original revisions again. Every existing-document patch uses a revision precondition; creates fail on a competing creation. Preview output lists IDs/fields instead of document content. Backup failures or changed revisions stop application. The shared helper bounds a plan to 1,000 documents; larger migrations need an explicitly reviewed batch strategy. Review full backup content locally and resolve any conflicts before retrying. No automatic restoration is provided.

Output directories reject traversal and symlinks. Unix backup directories/files use private modes; verify the backup directory ACL on Windows because POSIX modes do not establish a Windows ACL. Backups may contain sensitive CMS content. Keep them local, access-restricted, and outside releases; apply an owner-defined retention policy.

## Operational visibility

Request counters and latency now emit structured `request_metric` JSON to the existing log sink. There is no implicit metrics provider or public metrics endpoint. Labels are bounded and approved dimensions omit user information, URLs, receipt/session capabilities, and arbitrary tag keys. Log aggregation must be configured on the actual host to retain and alert on these events. Logging failure never breaks a request; monitor host log delivery independently.

For a local aggregate of authorized logs, pipe them into `node scripts/summarize-operational-logs.mjs`. It outputs counter/latency observations and approved status counts without forwarding raw lines, IDs, errors, or request data. Counts represent observed log events rather than the authoritative backlog.

`node scripts/payment-monitoring-summary.mjs` defaults to a local GROQ query preview and makes no provider request. An authorized private read needs `--read-private-state --project=<configured-project> --target=<private-dataset>` and a private, preferably read-scoped payment credential. It fetches only aggregate counts and the oldest open update timestamp, never event/contact/session details. Use the separate fulfillment recovery tool for a reviewed record-specific disposition; this monitoring helper never charges or sends fulfillment.

Configure the host's existing log/monitoring system to notify the named operations owner for sustained forwarding errors, failed payment events, and aged `processing`, `pending_manual`, or `pending_review` records. Start with alerting on any failed payment event and open processing older than ten minutes; set pending/manual review response times with the business owner. Record the actual notification destination, retention, and recovery drill. Local helpers provide data and a safe recovery view; no collector, scheduler, dashboard, or alert recipient was provisioned by these changes.

## Existing tracked runtime artifacts

New runtime files are ignored, and existing tracked user artifacts were preserved. An administrator should inventory those files, retain needed material locally, review business/identity content, and perform this index-only migration in a dedicated reviewed change:

```text
git rm -r --cached -- .omx/logs .omx/state
git rm --cached -- .omx/metrics.json
git ls-files -- .omx/logs .omx/state .omx/metrics.json
```

The first two commands remove index entries while retaining local files; they were not executed here. Review the staged change before committing. Other generated root metadata can be selected explicitly after inventory. Old objects remain reachable until separately coordinated history cleanup, if warranted. Ignore rules and packaging exclusions do not remove already published Git content.
