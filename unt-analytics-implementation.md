# UNT analytics — authorized local implementation

Authority: Eric approved local implementation after reading the handoff. Credentials, provider/privacy settings, push and deployment remain separately gated. Preserve the existing dirty checkout; baseline and integration-file copies are under `.omx/analytics-implementation-baseline/`.

- [x] Add shared report/event contracts and fail-closed fixture policy. No existing bundled preference becomes GA4 consent; homepage/Services/tax-resolution and restricted flows remain excluded from GA4 candidates.
- [x] Implement disabled-by-default GA4 adapter and reviewed CTA bridge with independent purpose consent, sanitized context and navigation deduplication. Verify using fake transports, never a real Google property.
- [x] Implement guarded server reporting contracts, bounded queries/cache/quota handling and safe unavailable states. Staff identity and Google token adapters remain unconfigured until separately authorized owner setup.
- [x] Build UNT dashboard components with labeled synthetic fixtures and a development-only local preview. Production pages/APIs deny access without configured verified staff auth.
- [x] Verify targeted tests, lint, typecheck, build, local browser layouts and forbidden-network/anonymous-access behavior. Review diff against the recorded baseline; document owner gates and rollback.

No live tracking, provider setup, credential creation, privacy-notice activation, commit, push, deployment or real lead submission is included. OIDC provider, approved page registry, GA4 property/settings/timezone/campaigns and actual hosting capability remain owner decisions. Conversions remain unavailable without authenticated completion contracts.

Local implementation evidence, remaining activation work and owner gates: docs/operations/analytics-local-review.md. These checkmarks describe local scope only; live auth/reporting/tracking remain blocked.
