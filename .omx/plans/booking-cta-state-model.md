# Consultation CTA state model

| State | Trigger | User feedback | Exit / recovery |
|---|---|---|---|
| Default | Initial render | Gold unified booking link with calendar and direction icons | Tap, keyboard activation, voice command, or switch activation |
| Focus-visible | Keyboard/switch focus | Dark inner outline and gold outer ring | Focus moves normally |
| Touch-pressed | Pointer down | Darker gold active surface | Release launches destination immediately |
| Launch acknowledgment | First activation | Lighter gold surface, dark ring, busy semantics; label and geometry remain fixed | Internal route begins immediately; duplicate activations are suppressed |
| Scheduler loading | Booking page mounts | Live "Loading available appointment times" status | Iframe ready, provider error, or 15-second timeout |
| Scheduler failure | Iframe/script error or timeout | Alert with in-place retry and contact fallback | Retry reloads only the iframe; contact preserves an alternate path |
| No viable time | Calendar provider presents no suitable time | Provider remains authoritative; site-owned quiet contact route is available below calendar | Contact route or provider-selected alternative |
| Return | Visitor activates booking-page return link | Same-site history return where possible, otherwise safe return URL | Origin page or home |

## Constraints

- The iframe owns date, time, timezone, required details, confirmation, cancellation, and rescheduling states.
- No fake progress, timer, animated indicator, or appointment-confirmed copy is rendered by the site shell.
- CTA surface changes use only color/ring feedback and respect `prefers-reduced-motion`.
