# Homepage closing CTA: compact cream band

Date: 2026-09-30  
Routes: `/en`, `/es`  
Reference: `C:/Users/ericb/Downloads/ChatGPT Image Sep 30, 2026, 12_48_22 PM.png`  
Status: implemented and browser-verified on 2026-09-30.

## Scope and design

Replace the internal dark `#contact` card in `ConsumerHome.tsx` with the supplied cream-band design. Preserve the surrounding sections, shared homepage container/spacing classes, Outfit/Inter fonts, and booking behavior. Other homepage sections already have unrelated local changes; do not revert or reshape them.

Desktop composition: heading and eyebrow, brief conversation summary separated by a gold rule, three icon-led reassurance items, then a pill-shaped gold booking button with its reassurance line. Use a subtle border and shadow, dark text, and warm gold accents. The CTA-specific heading will be smaller than the ordinary section H2 scale to fit the compact reference.

## Implementation

1. Keep the outer `home-rhythm-section home-rhythm-pause` wrapper and navbar-aligned container. Change only the inner card.
2. Use existing Tailwind/native container queries: four groups at wide container widths, two columns at intermediate widths, one column on narrow screens. Let content and translations wrap; no fixed height or truncation.
3. Reuse existing `Clock3`, `FileText`, and `UserRound` icons for “30 minutes”, “No preparation”, and “Enrolled Agent”, each with the reference's short support line. Hide decorative icons/rules from assistive technology.
4. Reuse `BookingCtaLink` with `showCalendarIcon={false}` so the button matches the label-and-arrow reference. Preserve destination, campaign handling, pending state, focus styling, and analytics placement.
5. Update only `ConsumerHome.final` in the EN/ES message files: reference heading, eyebrow, summary, and reassurance-item labels/details. Retain the existing booking-button label and no-pressure line.

## Copy

| Field | English | Spanish |
| --- | --- | --- |
| `final.eyebrow` | Your next step | Su próximo paso |
| `final.title` | You know the options. | Ya conoce las opciones. |
| `final.nextTitle` | Now clarify the next step. | Ahora defina el próximo paso. |
| `final.support` | A focused strategy call to review where the business stands and what deserves attention next. | Una llamada estratégica para revisar la situación de su negocio y lo que merece atención a continuación. |
| `final.duration.label` | 30 minutes | 30 minutos |
| `final.duration.detail` | Focused and efficient. | Enfoque y eficiencia. |
| `final.preparation.label` | No preparation | Sin preparación |
| `final.preparation.detail` | Come as you are. | Venga tal como está. |
| `final.expert.label` | Enrolled Agent | Agente Inscrito |
| `final.expert.detail` | Speak with a tax expert. | Hable con un experto fiscal. |

The active homepage uses locale message files for these fields; no live CMS write is needed.

## Verification

- Review screenshots against the reference using brand fonts.
- Check EN/ES at 320, 375, 768, 1024, 1440, and 1920px.
- Confirm no clipped heading, summary, fact labels, booking button, or note; no horizontal overflow.
- Check 200% root text enlargement and visible keyboard focus.
- Confirm the button points to the localized booking page with the existing return path and analytics marker.
- Verify outer spacing and container widths are retained.

Use live browser inspection. Build/lint/typecheck/test suites remain unrun under the workspace instructions. No dependencies or new interaction logic are required.

Expected implementation files: `src/components/home/ConsumerHome.tsx`, `src/messages/en.json`, `src/messages/es.json`; plus this plan and a visual-verdict record.

## Completion record

Implemented the reference's cream bordered band with a 28px bold Outfit heading, Inter supporting text, gold dividers, three reassurance items, and a gold-gradient booking button. The heading's two translated sentence blocks preserve the reference's message structure while allowing natural wrapping. Removed the dark radial/linear background and oversized minimum-height card. No new dependency, component, or interaction logic was added; `BookingCtaLink` itself was not modified.

Container queries provide four desktop groups, an intermediate two-column layout, and a narrow stacked layout. At 1440/1920px the English card is 172px tall; Spanish is 184px with natural translation wrapping. The existing `home-rhythm-section home-rhythm-pause` wrapper and locale-specific container remain intact; measured outer insets are still 24/36/48px at mobile/tablet/desktop.

Live-browser checks in English and Spanish at 320, 375, 768, 1024, 1440, and 1920px found no clipped text, missing translations, page overflow, or runtime errors. At 200% root text enlargement, both languages use the intermediate layout without clipping. The focused booking link has a 3px outline and the existing `strategy_call_cta` analytics marker. Keyboard Enter opened `/en/book?returnTo=%2F%23contact`; the Spanish link also retains its localized route and return path.

Evidence folder: `C:/Users/ericb/.codex/visualizations/2026/09/22/01a0cb28-f65b-7510-bc37-04884e495874/cta-cream-band/`, including screenshots and `verification.json`. Visual verdict: `.omx/state/homepage-cta-cream-band/ralph-progress.json`, pass 96.

Changed files: `ConsumerHome.tsx`, `src/messages/en.json`, `src/messages/es.json`, this plan, and the visual-verdict record. Other homepage sections and shared font/spacing definitions were preserved. Verification is scoped browser inspection; build/test suites and a full cross-browser/assistive-technology audit were not run, and no appointment was submitted.
