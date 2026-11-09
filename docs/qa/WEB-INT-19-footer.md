# WEB-INT-19: Footer fulfilled-data recovery

[Issue #17](https://github.com/Chromapages/unionnational/issues/17). Developer implementation record; independent p5 review and isolated PR-tree verification remain separate.

## Change

Only `src/components/layout/Footer.tsx` and its adjacent test changed, plus this note. Preserve the current standard, booking and compact layouts; no telephone UI was present or added.

At Footer's consumption boundary:

- Treat a fulfilled non-array legal result as unavailable. Skip null rows and Terms rows without a nonblank string slug, retaining a later valid published destination.
- Use existing brand/copyright/disclaimer fallbacks for malformed or blank CMS text rather than rendering objects or calling string methods on them.
- Keep locale-aware Contact/Book links, legal links and existing privacy/disclaimer controls. Do not introduce fallback Terms destinations.

`getCachedLegalPages` is unchanged: source, cache keys/tags/TTL, return API and exported contract are preserved. Shop also imports this loader; this repair does not normalize its shared result or change Shop/commerce semantics. LSP reference lookup was attempted but no server was available; literal reference inspection identified the Shop caller. No Shop edit or migration was made.

## Reproduction and verification

Deterministic mocked-CMS reproduction before the fix: six failures in 13 Footer tests—non-array legal collection, null legal record, object-valued Terms slug, copyright, company name and disclaimer. These are fixture reproductions, not claims of observed live CMS corruption. A malformed-logo probe did not demonstrate a failure and was removed; no logo repair was invented.

Final checks on the integration tree:

- Guarded Vitest: Footer, Home route, FAQ route and FAQPageSchema test files; **33 passed in four files**, exit 0. Footer contributes 12 cases, including EN/ES × standard/booking/compact destinations and privacy access, rejected/null reads and malformed fulfilled values.
- ESLint on the six changed application/test files: exit 0, no diagnostics.
- `tsc --noEmit --incremental false`: exit 0.
- Protected source-fixture browser: EN/ES × standard/booking/compact, plus Home/FAQ cases; all 12 cases hydrated and opened/closed existing privacy preferences without enabling optional tools. Valid Terms and Contact/Book destinations survived malformed fixtures. Spanish compact disclaimer opened with the existing Spanish fallback. No guarded I/O attempts, main-world runtime errors, stored tracking choice or horizontal overflow at the observed 929×917 viewport.

Commands and complete output are in local evidence `WEB-INT-pr-wave-20261109/`: `footer-red-guarded.txt`, `scoped-tests-final.txt`, `scoped-eslint-final.txt`, `typecheck-final.txt`, `browser-result.json` and `browser-visuals.md`. The initial `footer-red.txt` is a runner-option failure (`--setupFiles` unsupported), not an application reproduction; the temporary guarded config corrected the runner without production configuration changes.

## Protection and limits

Fresh before/after manifests, exact initial dirty diff and per-ticket patches are recorded privately for the frozen handoff. No existing reviewed Contact/resources/sitemap/VSL/catalog/FAQSection/FAQAccordion/MetaPixel work is part of this ticket. No real-index staging, branch/HEAD changes, commit, push, CMS/Stripe/Sanity calls, optional tracking enablement, submission, purchase, merge or deploy was performed.

Browser evidence uses actual Footer controls but mocked CMS/cache/header/framework-navigation/image/tracking seams; it is not a full Next runtime or exact main-based PR snapshot. Browser emulation was ineffective, so no mobile/device certificate is claimed. Fixture walker key warnings and bundler warnings are instrumentation limits, not application fixes. No broad suite, full build, provider re-probe or live CMS verification was run. Source authority and WEB-INT-06D/07 gates remain unchanged. Lead owns isolated PR publication; p5 owns independent frozen QA.
