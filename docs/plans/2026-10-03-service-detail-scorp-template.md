# Use the S-Corp service-detail template throughout

Scope: seven canonical service-detail routes and their existing locale/alias routes. Use S-Corp's six main sections in order: hero, suitability, process, included support, FAQ and booking CTA. Keep each service's own copy, eligibility, process steps, deliverables, questions, links and brand fonts.

1. Remove comparison, video and testimonial/proof sections from the shared template. Remove their now-unused template imports and image-poster work; leave CMS content and other component files intact.
2. Give suitability sections the same onward link to the service's process section. Preserve the reviewed S-Corp label and use localized generic process-link copy elsewhere.
3. Retain the existing shared hero, suitability cards, process ledger, included cards, shop-style FAQ, About sizing and booking CTA. Do not fabricate extra cards or deliverables to force identical content counts.
   Use the same full footer booking treatment on each detail page, with the service's own CTA label.
4. Verify six-section order on all seven routes in both locale paths. Inspect mobile/tablet layout and process/booking anchor targets. Save visual evidence and a verdict. No lint, typecheck, suites or build under the standing instruction.

Success: each rendered service detail contains only those same six main sections in the same order; no comparison, video or proof section remains; service-specific content is retained; no horizontal overflow; onward links resolve. Complete within the requested 15-minute window.

Completed: all 14 canonical locale routes render exactly the six sections in the required order. Each retains its original deliverable count and four process steps; FAQ counts remain service-specific. All suitability process targets exist and footer links use the locale booking route. The localized onward link was keyboard-activated and updated the URL to the correct process anchor. Responsive checks at 390/768/1440px found no changed-section or page overflow. Visual evidence and measurements are in `.omx/state/service-detail-scorp-template/`. No formal suites, lint, typecheck or build run.

Changed files: ServicePageTemplate.tsx, CmsServicePage.tsx and messages/en.json plus messages/es.json. Removed extra rendering branches, six unused template imports and poster URL work. Existing CMS data and component files were preserved. No dependencies added. Remaining limitation: deeper ledger fields render when the service provides them; no unapproved deliverables or outputs were invented.
