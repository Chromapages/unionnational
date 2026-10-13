# October 6 local security implementation

Baseline: main / 7301488f962bafa1791762e4fe4140fe3a37abd9. Lock SHA256 690E98C8281CFE7DB35634BD580C72EC86CD489377FC37368D7BDE17E5750807.
Preserve pre-existing .omx, test-results and tsconfig changes. No credential/provider changes, artifact untracking, push or deployment.

- SEC02: targeted source-map-js 1.2.2; verify maps/CSS, lock graph and both audits.
- SEC04: avoid assigning every unknown visitor a small shared requester budget; retain global early admission, contact isolation and explicitly verified proxy identities. Upstream trust/admission still requires evidence.
- SEC05: preserve early resource budgets; add separate authenticated processing budgets with regression tests. Edge starvation remains a release blocker.
- SEC06: atomically cap new persistent reservations (including UUID aliases), preserving existing records and all uncertain states. Do not expire, evict or automatically replay. Existing baseline storage and archival/replay horizon require operations evidence.
- P3: remove unused privileged CMS client, generic private/no-store readiness, correct deployment instructions. Preserve tracked operational evidence.
- SEC03/08: verify current mitigation and investigate supported upstream chain removal; no forced majors or suppressed advisories.
- Final: focused regressions, full coverage/unit suite, lint, typecheck, Webpack build, Node control tests, source/history/bundle scans, review against baseline. Linux clean install requires a supported environment (local WSL virtualization unavailable).

Cleanup approach: existing tests protect behavior; delete unused privilege surface, reuse quota and delivery protocols, no new dependency names or abstractions. Add smallest regression tests covering each changed trust boundary.
