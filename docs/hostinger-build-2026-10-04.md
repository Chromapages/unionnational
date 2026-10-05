# Hostinger compilation timeout repair — October 4, 2026

Hostinger build `01a1094f-12d4-7258-9679-12ea46d6b559` used commit `bc3c150`, Node 22, `npm install`, and `npm run build`. Installation completed in 26.6 seconds. The hosted log then stopped at Turbopack compilation and reported a generic failure after about 15 minutes. It contains no hosted OOM or compiler diagnostic, so the hosting failure's exact mechanism is not proven.

## Reproduction and fix

A fresh output directory was used to avoid relying on an existing compiler cache. Under Node 22.23.3, the unchanged configuration failed in 57.8 seconds with repeated `FATAL ERROR: Zone Allocation failed - process out of memory` messages. The import errors identify crashed Node subprocesses running `next/dist/build/babel/loader`.

The installed Next.js guide documents that the optional React Compiler uses Babel. Change only `reactCompiler: true` to `reactCompiler: false` in `next.config.ts` to remove this optional compilation workload. Keep Turbopack, TypeScript validation, the locked dependencies, and application code unchanged. Automatic React Compiler memoization is no longer applied; this does not establish a runtime performance improvement.

With that one configuration change and another fresh output directory, the Node 22 build passed in 85.5 seconds: compilation 26.1 seconds, TypeScript about 50 seconds, and all 84 page-generation tasks completed. The resulting Node 22 production server returned HTTP 200 for `/en`, `/es`, `/en/shop`, `/es/book`, and `/healthz`.

## Evidence and boundaries

- Failure log: `.omx/logs/hostinger-cold-node22.log`.
- Successful fresh build: `.omx/logs/hostinger-cold-no-compiler-node22.log`.
- Read installed Next.js `reactCompiler`, `building`, `turbopack`, and `memory-usage` guides before the change.
- No standalone lint or unit suite was run for this configuration change; production build includes TypeScript verification.
- Local Linux reproduction was unavailable because the installed WSL distribution cannot start without the Windows virtualization component. No machine settings were changed.
- Hostinger must build the new revision to confirm resolution there. Keep Node 22, build command `npm run build`, and output directory `.next`.
- The 64 npm audit findings are separate unresolved dependency work. Do not use `npm audit fix --force` as a compilation-timeout repair.
