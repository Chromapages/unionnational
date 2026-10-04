# Booking page simplification

## Approved client decisions

30-minute Tax Strategy Call; free; name and email required, phone optional; three-month booking window. Client chose exact provider-dashboard instructions instead of signing in. Test-booking identity/email has not been supplied.

## Inspection findings

- /en/book has separate desktop/mobile H1 markup. Desktop hero has a multi-line headline, See available times anchor and visible 01/02/03 reassurance markers.
- BookingCalendar embeds https://link.agent-crm.com/widget/booking/sBGopjvf9OdyrfgWqOJx. The provider displays Jason’s Office Calendar twice, 45 min, and nine 45-minute-spaced starts from 10:00 AM through 4:00 PM. Selecting 10:00 shows 10:00–10:45.
- After availability loads, provider selects Sat Oct 3 automatically. Oct 2 is disabled/today, not the selected day. This part of the text audit was a loading-state misread.
- Month and year dropdowns expose 1986–2066; existing Previous/Next month arrows already have accessible names and Previous is disabled at the current month.
- Desktop day cells measured 54×52px, but have no tabindex/aria-selected/aria-disabled. Selected/disabled state is conveyed through CSS classes. Slot span is 50px high; the initial slot click leads to a Select button, then the form.
- Confirmation form: first name*, last name*, phone*, email*, additional information, and a content-consent checkbox. No form data entered or appointment submitted.
- Time zone is retained as a searchable picker showing America/Denver. It is provider-owned.
- Agent CRM dashboard is signed out. Repository OAuth credentials and installed ghlwf private-integration authentication are absent. No provider writes are possible in the current session.
- Public website source outside /book already uses 30 minutes, including the homepage. The paid construction strategy-call order bump is a separate commerce offer; the cart version is inactive. No wholesale duration replacement is needed. CMS override fields are a separate content audit limit.

## Severity-ordered plan

| Severity | Problem / consequence | Files or provider settings | Minimal change | Verification |
|---|---|---|---|---|
| Blocker | Provider 45 vs approved 30 undermines trust. | Calendar sBGopjvf9OdyrfgWqOJx, event name, duration/interval, notifications | Owner sets 30-minute duration/name, checks interval separately and updates any hardcoded notification text. | Public widget, selected-slot end time and confirmation agree on 30. |
| High | Required phone and extra questions create friction. | Provider Forms and Payments / selected form | Required name/email, optional phone, remove extra information question per client decision; review consent separately. | Rendered confirmation form matches approved fields. |
| High | Broad navigation and weak keyboard semantics. | Provider widget/Availability | Three-month window, arrow-only navigation, retained zone picker with Change disclosure. Vendor/customization needed for semantics not exposed by standard settings. | Keyboard date/slot navigation, live announcements, 44px targets, first available selection. |
| High | Long duplicate hero and numbered reassurance row repeat the offer. | book/page.tsx, messages | Reuse one InnerPageHeader; short title and one approved offer line; remove numbered row and redundant anchor. | One H1, one/two title lines, calendar visible in first viewport. |
| Medium | Full footer competes with booking. | Footer.tsx | Add compact presentation to existing component; preserve legal data/modal and contact. | Legal destinations/content retained and links 44px. |
| Medium | Chat launcher can cover mobile slots. | ChatWidget.tsx | Suppress launcher on /book while keeping scheduling help link. | 390px calendar/slots unobstructed. |
| Medium | Campaign query can enter iframe ID. | BookingCalendar.tsx | Extract calendar ID from URL pathname. | Correct stable ID with UTM query; no campaign loss. |

Provider controls cannot be changed by parent-page CSS because the iframe is cross-origin. The provider 45-minute mismatch will remain until the owner applies the documented settings; do not mark this task fully complete or pretend the iframe was fixed. No new booking frontend/features, dependencies or invented offer details. Build/lint/typecheck/suites are prohibited by the workspace instruction.

## Implemented and manually verified

- Reused InnerPageHeader with one H1 and the approved offer line. Removed the duplicate hero, numbered reassurance row and See available times anchor; the calendar starts within the first viewport.
- Reused Footer in compact mode. Existing disclaimer/privacy destinations, any published Terms destination, copyright and disclaimer modal content are preserved.
- Calendar remains visible after the provider script initializes and resizes it. Removed the false startup timeout that replaced a healthy calendar. Explicit retries remain available for actual loading errors; a late script error preserves the iframe and any entered data.
- Correct stable iframe ID with UTM attribution retained. Observed ready state and 787px provider height on desktop; 757px on mobile.
- Rendered checks at 390px, 1536px and the initial 1910px viewport: one H1, no host horizontal overflow, visible calendar. The mobile title is two lines; desktop is one.
- Help/legal links and disclaimer control measure 44px tall. Disclaimer opens with existing content and closes normally. Chat widget is hidden with pointer events disabled on the booking route.
- Hosted text contrast measured from rendered colors: H1 17.99:1, offer line 10.10:1, help 8.18:1, footer 14.76:1. Provider contrast and actual screen-reader speech remain unverified.
- Mobile provider has no horizontal overflow at 390px. It preselects the first available date, but clicking the date opens a separate time-slot screen rather than placing slots below the calendar. Month arrows are still 41px. Those provider-owned differences remain pending.
- No appointment submitted: no client test identity was supplied. No build, lint, typecheck or test suites were run, following the workspace instruction. Regression tests were saved for the calendar integration and compact footer.

## Changed source files

- src/app/[locale]/book/page.tsx
- src/components/booking/BookingCalendar.tsx
- src/components/booking/BookingCalendar.test.tsx
- src/components/layout/Footer.tsx
- src/components/layout/Footer.test.tsx
- src/components/ChatWidget.tsx
- src/messages/en.json
- src/messages/es.json

## Handoff and remaining risk

Exact provider values and supported customization limits: docs/booking-provider-settings.md. **The provider still displays 45 minutes; this task is not fully complete until those dashboard changes and a real test booking are verified.** No provider settings were changed. Client has already approved all four business decisions.
