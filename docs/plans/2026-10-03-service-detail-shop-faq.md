# Service-detail FAQ shares shop styling

Reuse ShopFAQ's support panel and soft FAQAccordion directly. Add optional service copy and a unique section ID while preserving the shop defaults. Pass each service's existing questions, answers and FAQ heading through the shared service template. Keep Outfit/Inter, locale support, contact route and initial first-answer expansion.

Success: service detail FAQ uses the same desktop split, pale support panel, icon rows, green contact link and soft accordion as shop; stacks on mobile; all existing FAQ content remains; Enter/Space and visible keyboard focus work; question targets are at least 44px tall. Manually inspect 390, 768 and 1440px. No formal suites, lint, typecheck or build under the standing instruction.

Completed: shared service template now calls ShopFAQ with localized service copy and unique IDs. S-Corp, tax planning and Spanish bookkeeping inspected at the target widths; no overflow. Keyboard Enter/Space toggle correctly, focus has a visible 2px gold outline, observed question height is 88px and the smallest contact/question target is 80px. Shop's original copy and five questions remain. Evidence is in `.omx/state/service-detail-shop-faq/`. Formal checks were not run.
