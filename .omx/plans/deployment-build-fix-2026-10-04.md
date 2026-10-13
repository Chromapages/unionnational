# Production deployment build fix

Deployment source: GitHub Chromapages/unionnational, main, commit 555dbdf. User log ended at compilation without a diagnostic. Local reproduction of the same npm run build command compiled successfully in 60 seconds, then exposed 11 TypeScript diagnostics. No Turbopack configuration change was justified by that evidence.

## Changes

- Construction profit-blueprint page: type nullable product using the existing Sanity query result type, fixing implicit-any capture in the catalog lookup.
- Legal page: declare generateMetadata as Promise<Metadata>, matching the installed Next.js API and exposing optional metadata fields correctly to callers.
- Locale layout test: serialize string-or-URL metadataBase using toString instead of assuming href.
- FAQList and VideoPlayer tests: remove unsupported Testing Library role-query exact options; literal accessible-name matching remains.
- S-Corp content test: use a complete typed ServicePage fixture, including document metadata and section headings, instead of an incomplete cast.

Six source/test files changed; 20 lines added and 12 removed. No dependency, bundler, TypeScript strictness, application behavior or visual design change.

## Verification

1. npm run build: exit 0, compilation 9.6s, TypeScript 10.8s, all 84 static pages generated.
2. Equivalent next build under temporary Node 22.23.3 runtime: exit 0, compilation 14.4s, TypeScript 32.8s, all 84 static pages generated.

Read installed Next 16.3.8 build/CLI/metadata guidance before edits. Node 22 runtime was obtained in npm's temporary cache; package.json and package-lock.json remain unchanged. Test files were type-checked by the production builds; no separate test suite, lint or audit fix was run.

Deployment boundary: hosted build retry and its platform resource/timeout behavior remain unverified. The user-supplied log did not expose a compiler diagnostic. Existing middleware/Edge deprecation and npm audit warnings are separate remaining warnings. Publish only the six verified build-fix files, preserving unrelated runtime-state changes.

Publication: committed only the six verified files with the Lore protocol as d1317a5, then pushed main from 555dbdf to d1317a5. Unrelated runtime state/log changes were left unstaged. The next hosted attempt must use the updated main revision. No hosted deployment was started in this task.
