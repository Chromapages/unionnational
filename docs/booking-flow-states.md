# Strategy-call scheduling journey

The `/book` page is an on-site host for a cross-origin scheduling provider. The host owns page orientation, return navigation, loading, and provider-load failure. The provider owns scheduling fields and outcomes. The host must not imitate provider controls or infer provider state.

## Verified host journey

| State | Owner | What the visitor sees | Data and recovery rule |
| --- | --- | --- | --- |
| Enter booking | Host | Task-specific heading: choose an available date and time. | There is one configured scheduler URL; no appointment-type selector is rendered. |
| Return without completion | Host | A “Back to strategy overview” or “Back to home” link before the task heading. | Same-site history is used when available to preserve the originating page state; the rendered anchor remains the non-JavaScript fallback. |
| Loading | Host | A status message over reserved calendar space: “Loading available appointment times…” | The calendar region has a fixed minimum height to prevent layout shift. |
| Provider ready | Provider | The embedded scheduler becomes available. | The host records the provider opening once and does not claim an appointment is booked. |
| Provider load failure | Host | An alert with “Try the calendar again” and the existing Contact route. | Retry creates a fresh iframe only while no provider session is ready. |
| Late host/script failure after ready | Provider session preserved | The ready iframe remains visible. | The host does not replace the iframe after the visitor could have entered data. |

## Provider-owned journey

The host cannot inspect or control the following because the scheduler runs in a cross-origin iframe and does not expose approved callbacks. These are **not** duplicated as host UI.

| State | Host behavior | Provider requirement before being represented in host copy |
| --- | --- | --- |
| Appointment-type selection | Not applicable in the current host flow. One scheduler URL is embedded. | Add a type selector only if the provider exposes multiple approved appointment types and their labels/availability. |
| Available dates and times | Keep the calendar visible; do not restate availability outside it. | Provider shows selectable availability. |
| Selected date or time | No host-side summary or progress marker. | Provider preserves and announces the selection. |
| Required contact information and validation | No host-side form or validation messages. | Provider labels required fields, identifies validation errors, and preserves entered values. |
| Unavailable dates or times | No host-side disabled controls exist. | If the provider renders unavailable options, it must communicate why they are unavailable rather than relying on a disabled appearance alone. |
| No availability | No host waitlist, alternate channel, or promise is shown. | Provider must supply its own approved no-availability explanation and recovery. |
| Confirmation | No host success state or booking event is inferred. | Provider confirms the booking and supplies any allowed next action. |
| Cancellation and rescheduling | No host controls or status are shown. | Provider owns cancellation/rescheduling only when configured. |

## Content and analytics constraints

- Do not publish host metadata for duration, price, advisor, conferencing method, preparation requirements, or availability until it comes from a shared approved source or provider integration.
- Do not claim that a date, time, booking, confirmation, cancellation, or reschedule succeeded unless the provider exposes an approved callback.
- Host analytics can record scheduling-route activation, provider iframe readiness, provider-load error, retry, and return navigation. It must not capture entered scheduling data or infer completion from iframe load.

## Keyboard and focus ownership

| Interaction | Requirement | Current host behavior |
| --- | --- | --- |
| Route-to-task sequence | Header navigation, return navigation, then the scheduler. | The return link precedes the iframe in DOM and visual order. |
| Loading | A hidden/inactive scheduler must not be keyboard reachable. | The iframe has `tabindex=-1` until the provider is ready. |
| Ready scheduler | The provider entry point needs a visible, non-layout-shifting focus boundary. | Focusing the iframe applies a 2px inset deep-green ring to the host calendar surface. |
| Failure and retry | Focus must stay on the recovery controls, not an unavailable iframe. | The error state removes the iframe and exposes real retry/contact controls. |
| Return | The back link is a real anchor with a visible on-dark focus indicator. | Same-site history is preferred; its href remains the non-JavaScript fallback. |

The host has no keyboard trap. The provider’s date controls, time choices, form fields, validation messages, confirmation, cancellation, and rescheduling controls remain **UNVERIFIED** until they are tested in the provider’s own accessible interface. The host cannot inspect or remediate their keyboard behavior across the cross-origin iframe boundary.

## Semantic structure

- The document title and the sole H1 both describe the current task: choosing a time for a tax strategy call.
- Return navigation is a named `nav` landmark before the task heading.
- The calendar section has one visually hidden, meaningful H2: “Appointment calendar.” Its iframe title repeats that destination in task-specific language.
- The host renders no booking inputs. Labels, required states, instructions, and validation for provider-owned booking fields are **UNVERIFIED** until checked in the scheduling provider; do not duplicate those fields in the host page.

## Desktop-responsive header contract

The orientation header and scheduler share one left-aligned, `max-w-screen-2xl` (1536px) rail, matching the navbar. The task heading and supporting copy use a narrower 46rem (736px) measure. Neither grows beyond the navbar on ultrawide displays.

| Viewport range | Rail behavior | Text behavior |
| --- | --- | --- |
| 1024px | Full available width less 24px outer gutters. | The 46rem heading measure may wrap naturally; no hard line break is used. |
| 1280–1920px | Fluid rail up to 1536px, centered in the viewport. | Heading and support remain 736px; no added font scale or gap is introduced. |
| Reduced viewport / enlarged text | Rail and copy contract naturally through their existing max widths and padding. | Text wraps vertically; no two-dimensional scrolling or overlapping metadata is permitted. |

At 1024, 1280, 1366, 1440, 1600, 1728, and 1920px, the calendar stays aligned one pixel inside the same rail only because of its border. Any future header copy must remain normal flowing text so localized or longer content can increase height without clipping.

## Performance contract

- The booking route and its header are server-rendered. Only `BookingCalendar` is a client component.
- The header contains no image, animation, availability request, or third-party script. Its task heading and guidance render before the scheduler becomes ready.
- The calendar reserves a 600px minimum height, presents a live loading status, and exposes retry/recovery if provider resources are blocked.
- The provider iframe initializes immediately on `/book` because reaching this route is explicit scheduling intent. Its optional form-embed script uses `lazyOnload`.
- Global GHL tracking uses `lazyOnload`; it must not block header rendering or the initial scheduler request.
- Provider-owned resources, including iframe fonts and availability requests, are not host-controlled. Their timing must be monitored separately; no production Core Web Vitals budget has been established in this repository.

## Data-minimization and privacy contract

- The host page has no scheduling form and requests no personal, financial, or tax-sensitive information.
- Privacy Policy and Contact links sit directly beneath the embedded calendar as quiet utility links; neither is presented as a promotional CTA.
- The iframe uses `strict-origin-when-cross-origin` referrer policy so the provider receives only the site origin for cross-origin requests, not host-page path/query detail.
- Direct provider audit, initial calendar screen: date/time controls and a timezone search are visible. No contact, financial, or tax-sensitive fields are visible before a time is selected.
- Direct provider audit, initial calendar screen: no visible privacy link was found. The timezone search has `autocomplete="off"` and `aria-label="-searchbox"`; its accessible name and autocomplete behavior require provider remediation.
- Provider contact/confirmation fields, required/optional distinctions, input-purpose autocomplete tokens, validation, retention, data-sharing, and privacy-policy placement are **UNVERIFIED**. Do not add host claims about them until the provider configuration and data-processing terms are reviewed.
