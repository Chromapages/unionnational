# Local Internal Server Error recovery

Root evidence: both local servers returned HTTP 500. Today's development logs repeatedly reported ENOENT for .next/dev/required-server-files.json and .next-3001/dev/required-server-files.json. Installed Next.js is 16.3.8, updated October 4; the parent CLI processes had been running since October 3. Fresh runtime/cache startup resolves the failure, supporting stale development artifacts after the upgrade as the cause.

Actions: confirmed both parent command lines belonged to this project, stopped their process trees, and launched the existing scripts/dev-server.mjs helper on ports 3001 and 3002 with fresh, separate ignored output directories. Both helpers run hidden and retain stdout/stderr logs. Preserved the original dev caches by moving them to checked workspace-local backup paths; no recursive deletion. Removed the temporary tsconfig include entries automatically added by these launches, preserving prior configuration.

Current output directories:
- .next-recovery-3001-20261004-154447
- .next-recovery-3002-20261004-154447

Preserved caches:
- .next/dev.before-recovery-20261004-154447
- .next-3001/dev.before-recovery-20261004-154447

Verification: /en on port 3002 and /en/s-corp-tax-advantage on port 3001 changed from HTTP 500 to HTTP 200. Reloaded the actual user tabs: localhost:3002/en renders “Stop overpaying in taxes. Build a stronger business.”; localhost:3001/en/resources renders “Tax and business guidance for owners”. Neither displays Internal Server Error.

Application source changes: none required. Evidence/runtime changes: this note, ignored generated caches/backups and .omx/logs/dev-recovery-3001/3002 stdout/stderr logs. No dependencies, production deployment, build, lint, typecheck or test suite run. Existing source edits and old cache contents retained. Scope: local development servers only.
