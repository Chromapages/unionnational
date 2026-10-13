# Deployment follow-up

1. Rename the Next.js locale entry to `src/proxy.ts`, retaining the existing next-intl handler, cookie options and matcher. Rename its regression test and update its import. Verify the convention in the debug production build and locale redirects in production HTTP requests.
2. Remove the unused npm crypto dependency; application imports already use node:crypto. Reconcile the lockfile through npm audit fix.
3. Run npm audit fix without force. Inspect remaining advisories and compatible pinned upgrades; record any major migrations that require separate work.
4. Run npm run build -- --debug and verify on Node 22. Record actual diagnostics and build time; do not infer cloud memory exhaustion or adjust unavailable hosting limits.

Existing matcher regression coverage protects the health/readiness exclusions. No UI, content, styling or component changes are planned.

## Result

- Removed unused crypto dependency from package.json and lockfile; app uses node:crypto.
- Renamed src/middleware.ts to src/proxy.ts; handler, matcher and cookie settings unchanged. Renamed regression file to src/proxy.test.ts and updated import/description.
- npm audit fix updated compatible transitive dependencies. Additional same-major pins: next-intl4.14.9, styled-components6.5.3, Vitest/coverage4.1.11, protobuf7.6.6/8.8.0 and undici6.29.0/7.30.0.
- Scoped next-intl SWC override to1.16.0, within its ~1.16.0 requirement. New1.16.13 compressed native loader rejected Windows cache ACLs; temporary and custom cache options did not resolve it.1.16.0 restored builds without permission changes or bypassing security checks. Revisit this pin only with native Windows build verification.
- npm run build -- --debug passed on Node24 in62.9 seconds. Equivalent debug build on Node22.23.3 passed in57.2 seconds,84/84 generation tasks complete. The middleware deprecation warning is gone. Existing API og Edge Runtime warning and debug dynamic-rendering bailout messages remain; exit status0.
- Production HTTP checks on Node22: / redirects to /en or /es according to language; /services redirects to /en/services; /en,/es,/healthz return200; /api/scorp-estimator GET returns405 without locale redirect. /readyz returns503 without locale redirect because local integration configuration is incomplete.
- Restarted existing preview servers;3001/en/resources and3002/en return200. Temporary production verification server stopped after checks.

## Remaining risks

- Audit fell from88(1low,50moderate,36high,1critical) to64(38moderate,26high,0critical). tar updated to7.5.22; crypto absent from lockfile. Remaining security findings need coordinated Sanity/next-sanity, Lighthouse and OpenTelemetry migrations. npm audit force also suggests downgrading Next ESLint config to14.2.35; not applied.
- Local readiness is missing SANITY_AUTH_TOKEN, SANITY_REVALIDATE_SECRET, STRIPE_WEBHOOK_SECRET, GHL_WEBHOOK_URL, GHL_SHOP_PURCHASE_WEBHOOK_URL, GHL_APPLICATION_WEBHOOK_URL, GHL_RESTAURANT_APPLICATION_WEBHOOK_URL, GHL_SURVEY_WEBHOOK_URL, GHL_TAX_ANALYSIS_WEBHOOK_URL, GHL_SCORP_ESTIMATOR_WEBHOOK_URL, UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN. Values were not fabricated. Hosting may have a different environment.
- Hosted deployment, Linux clean install and host memory/timeouts were not inspected. Supplied generic failure log does not prove memory exhaustion. No hosting resource limits changed.
- Separate lint/test suites were not run per workspace agreement; production build and focused HTTP checks provide the recorded verification.

Evidence: .omx/logs/deployment-build-debug.log, deployment-build-node22-debug.log, deployment-audit-final.json, deployment-production-routing.json, deployment-readiness.json.
