# Remove marked team-hero row

Scope: TeamHero only. Remove Ongoing Support from the rendered icon/translation mapping and remove its unused icon import. Keep Tax Expertise and Business Perspective, the current hero sizing, founder section and directory intact. Shared render covers EN and ES.

Verification: inspect /en/team at 1440px and 390px; confirm exactly two hero practice rows, no Ongoing Support heading, no clipped remaining text. No build/lint/typecheck/test suite for this small deletion.

Result: removed the third rendered row and its unused UsersRound import from TeamHero.tsx. The current user preview runs on localhost:3002. Browser checks at actual 1440px and 390px confirmed only Tax Expertise and Business Perspective, with no clipped hero headings or body text. Existing sizing, copy, colors, founder panel and directory were preserved. No new dependencies or known risks from this deletion. Screenshot: .omx/state/team-hero-remove-support/desktop.jpg.
