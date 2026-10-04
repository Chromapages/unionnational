# Homepage design review — 29 September 2026

## Scope and verdict

The supplied review identifies real hierarchy and repetition problems, but several accessibility and sizing recommendations are not supported by the current implementation. The existing palette and components are a useful foundation. The largest design opportunity is to help a broad audience choose the right tax service sooner, with less repeated explanation.

Inspected the current local English homepage at `http://localhost:3001/en` using Chrome at 1440×900, 1920×1080, 768×1024, and 390×844. Also checked horizontal overflow at 320px, the 768px navigation drawer after hydration, service selector keyboard behavior, foreground video playback with reduced motion, and selected computed text colors. Used design-taste-frontend, ui-visual-validator, Ponytail, a bounded read-only code inspection, and official W3C guidance. No application code or CMS records were changed.

This is not a complete WCAG conformance audit. Caption completeness, contrast throughout every video frame, screen-reader announcements, 200% text resizing, all focus paths, Spanish layouts, and other browsers remain unverified.

## Measured evidence

| Width | Document height | Client-results start | Horizontal page overflow |
| --- | ---: | ---: | --- |
| 1440px | 6,173px | 4,226px | None observed |
| 1920px | 6,091px | 4,216px | None observed |
| 768px | 11,141px | 7,651px | None observed |
| 390px | 11,041px | 7,253px | None observed |

Measurements are snapshots with normal motion; reduced-motion layouts can differ because the trust marquee becomes a static list. At 320px the document width also remained 320px. No page-script errors were emitted during the four initial captures.

- Desktop hero is 700px tall, in addition to the 89px header and 68px trust strip. At 1440px it gives a roughly 440px video about 130px of vertical space above and below.
- At 390px, Services alone occupies about 3,348px. Client results begins roughly 8.6 viewport heights down. At 768px Services occupies about 2,935px. Mobile length deserves priority over minor desktop decoration.
- Desktop service selectors are 128px high. At 1440px their widths are approximately 343, 343, 321, and 312px. They use native buttons with `aria-pressed`, not `role=tab`.
- Desktop body text in comparison details is 14px; main values are 16px. Hero supporting copy is 20px. Service selector eyebrows are 11px; mini-case attribution is 10px; footer proof is 11px. Mobile comparison and process copy includes 12px body text.
- Sampled hero supporting text over its dark background is approximately 16.17:1. A desktop comparison detail is 4.69:1; an 11px service eyebrow over cream is 4.58:1. These samples pass the ordinary-text threshold, despite appearing faint in a reduced screenshot.
- Mobile “Integrated services. Stronger outcomes.” uses 10px `#adb5bd` over a light gradient: approximately 1.86–2.02:1 across its endpoints. This is a concrete contrast issue. Decorative quote marks and separators with low contrast are not automatically failures.
- Footer navigation links are 14px text in 32px-high targets; CTA is 44px high. The measured navigation and legal links exceed the 24px target-height minimum. The 768px drawer opened normally after the page hydrated.
- At 1920px the main section headings begin at x=256px, while Client results begins at x=212px: 44px wider on each side. At 1440px the difference is 12px. This confirms the container inconsistency.

Raw measurements and screenshots: `C:/Users/ericb/.codex/visualizations/2026/09/22/01a0cb28-f65b-7510-bc37-04884e495874/homepage-design-review/`.

## Review of the twelve supplied findings

| # | Assessment | Recommended treatment |
| --- | --- | --- |
| 1 | Partly confirmed; pause is the clear defect. | The visible video autoplays, loops, and lasts about 40.5 seconds. Initial native controls are disabled until sound is enabled. Expose pause immediately or use user-initiated playback. No caption track is passed, but burned-in captions are visible; their completeness has not been established. A track is preferable for control, but absence of a track alone does not prove missing captions. A scrim behind burned-in words requires editing the asset or replacing them with a separate caption layer. A concerned expression in one frame is not a functional defect. |
| 2 | Confirmed on desktop. | The clipped pills form an intentional moving marquee; the same three proofs appear in the strip below. Retain one static, complete proof treatment and remove the redundant moving row. |
| 3 | Real hierarchy issue; proposed universal CTA is too rigid. | Your site serves planning, filing, and IRS-help visitors. Keep one primary consultation/intake action but provide clear routes for different needs. The S-Corp estimator is too narrow for the universal hero action. “Contact Us” in a footer can remain appropriate navigation. |
| 4 | Confirmed. | Rendered process/footer says 30 minutes; final CTA says 45. Confirm the actual booking offer and use one duration or omit it. |
| 5 | Claims need context; counts are not inherently contradictory. | 200 contractors could be included in 1,000 business owners. Establish definitions and dates. The live local title still says Save $20k+ and meta description says $23k+; no supporting calculation is displayed in the observed homepage. Remove broad numerical promises until evidence supports their exact wording. A disclaimer does not provide that evidence. |
| 6 | Partly confirmed. | Increase small mobile body copy and the 10–11px supporting labels where they carry information. A useful design target is 16px main copy, 14px secondary copy, 12px labels; these are project choices, not WCAG minimum font sizes. Fix measured contrast failures rather than darkening all gray/gold text. |
| 7 | Confirmed. | Remove the repeated planning workflow and fold “Plan further ahead” into one closing message. Repeated CTAs are useful at decision points; repeated explanations and competing promises create the problem. |
| 8 | Sizing diagnosis is incorrect for the current page. | Controls already exceed 44px. Active state includes an underline and outline, so it is not color alone. Tab and Enter changed the selected outcome; ArrowRight did not, as expected for this implementation. If retaining a true tab-style UI, implement the ARIA tabs pattern fully; alternatively retain clearly labeled native selector buttons. Main issue is the large panel and tiny eyebrow copy, not target height. |
| 9 | Density is confirmed; industry variety is appropriate. | With your broad audience, e-commerce/manufacturing stories are not inherently off-brand. Keep only attributed, substantiated stories and make one dominant. Verify that photographs are authentic client assets or clearly illustrative. |
| 10 | Evidence is weak; a dollar figure is not mandatory. | A documented filing resolution, completed implementation, or resolved IRS matter can be a useful outcome. Add the period and concrete outcome you can prove. Do not invent or force a savings figure to make the design stronger. |
| 11 | Low-priority visual noise. | Remove repeated decorative slogans if they add no new information. Use `aria-hidden` only for genuinely redundant decoration, not meaningful copy that happens to be visually small. |
| 12 | Density is subjective; target-size concern not reproduced in sampled links. | Simplify duplicate proof text if needed. Keep useful navigation and contact information. Current navigation targets are 32px high and mobile accordion buttons 48px high. |

## Additional findings

1. **Mobile hidden playback:** The desktop video remains mounted and plays while its container is hidden at 768px and 390px. Reduced motion does not stop foreground autoplay. Fix mounting/playback conditions; do not depend on CSS hiding to stop media. Sources: `src/components/home/HeroVideoPlayer.tsx:43,99-110`; `src/components/home/VideoHero.tsx:269-286,333-341`.
2. **Proof arrives too late:** The visitor sees several thousand pixels of planning explanations before a case study. Move credible evidence up, after a compact service-choice section. Full planning-versus-filing detail belongs on the planning route if it delays IRS-help visitors.
3. **Service navigation is too narrow:** The four outcomes cover tax reduction, books, CFO leadership, and business foundation. An individual with a return problem or IRS notice has no obvious outcome choice. Add visible filing and IRS-help routes near the top. This matters more than restyling those four selectors.
4. **Typography observation needs correction:** Current main headings compute to Outfit, a sans-serif family; body computes to Inter. The screenshot review's “serif-style headings” description is not true of the current page. No font swap is needed to solve this audit.
5. **Contact visibility is an information issue:** Put a verified name, EA credential, phone, and city near the first decision. The chat prompt is not a substitute for a direct contact path and adds another attention cue to a busy hero.
6. **CMS wiring limits copy-only fixes:** Hero/SEO can be updated in Sanity. The homepage testimonial component discards fetched testimonials and renders translation strings (`TestimonialsSection.tsx:20-49`). Closing CTA and proof labels are also translation driven. Correct content must be connected before CMS edits can control those sections.
7. **Credential nuance:** IRS describes EA status as its highest awarded credential; that does not rank it above every tax profession. “Jason Astwood, EA” or “Enrolled Agent” is clearer hero proof than an unqualified “Highest Credential.”

## Priority and division of work

**First:** align the broad audience and primary destinations, remove unsupported claims, confirm call length, expose video pause, stop hidden/reduced-motion autoplay, and fix the measured mobile contrast failure.

**Next:** place a compact planning/filing/IRS-help service choice immediately after the hero, move one verified case up, remove duplicate process passages and the extra dark banner, and substantially shorten mobile Services. Preserve useful entry points to bookkeeping/CFO support without making everyone read that material.

**Then:** unify content edges, increase small meaningful labels, refine selector widths, reduce ornamental slogans, and simplify duplicate footer proof.

CMS work: hero/SEO/team copy, service descriptions, authentic case evidence and attribution, verified contact values. Code work: button destinations, CMS wiring, responsive layout, media controls, text sizing/contrast, selector behavior, and section order. Video asset work: inspect full captions, revise the CPA comparison if it does not represent the firm's positioning, and replace burned-in caption styling if needed.

## Web guidance used

- [W3C: Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide) — automatic motion lasting over five seconds alongside other content needs a pause/stop/hide mechanism, absent the essential exception.
- [W3C: Captions (Prerecorded)](https://www.w3.org/WAI/WCAG22/Understanding/captions-prerecorded.html) — complete synchronized captions are required for applicable prerecorded audio; open and closed captions are both recognized techniques.
- [W3C: Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) — ordinary text generally needs 4.5:1; qualifying large text needs 3:1.
- [W3C: Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) and [Enhanced](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html) — AA uses 24×24px with specified exceptions; the 44×44px rule belongs to enhanced AAA. A 44px design target is still sensible.
- [W3C: Tabs pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) — actual tabs need associated panels, selected-state semantics, and the documented keyboard behavior.
- [W3C: Resize Text](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html) and [Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) — assess enlargement and reflow rather than treating a 14px body minimum as a WCAG rule.
- [NN/g: Homepage Design Principles](https://www.nngroup.com/articles/homepage-design-principles/) — homepages orient visitors and provide routes for their main tasks, including multiple audiences.
- [NN/g: B2B Trust](https://www.nngroup.com/articles/b2b-trust-from-b2c/) — identifiable testimonial sources and useful contact paths support trust.
- [IRS: Enrolled Agent Information](https://www.irs.gov/tax-professionals/enrolled-agents/enrolled-agent-information) — supports the precise credential description above.
