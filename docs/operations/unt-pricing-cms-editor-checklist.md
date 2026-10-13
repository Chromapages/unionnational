# UNT pricing: proposed Sanity editor checklist

Local review only. October 12, 2026 PDF amounts are working draft content; Jason's commercial approval and separate CMS migration/publication authorization are pending. This checklist does not authorize writes.

## Inventory boundary

Read-only observation: `p1x9y3wz` / `production`, October 12 at `2026-10-12T16:05:28.950Z`. Source: `.omx/tmp/unt-pricing-preview/cms-inventory.json`. Observed published records: 14 `pricingTier`, 7 `service`, 7 `servicePage`, zero `pricingPage`. No authenticated draft access was available. Existing drafts, complete original documents, references outside the projection and current revisions must be inventoried again before migration. This projection is evidence, not a restoration backup.

`fixture:*` identifiers in `src/lib/pricing/fixtures.ts` are local test identifiers, never CMS IDs. Record every chosen real offer ID in a reviewed manifest. Do not repurpose documents by similar name or equal price.

## Ten-offer fields

For each selected real `pricingTier`, fill `name.en/es`, `price.en/es`, `category`, `billingPeriod`, `displayOrder`, `includes.en/es`, `priceNote.en/es`, and approved `bestFor.en/es`. Keep display strings, not numeric commerce amounts. Category is internal organization, not a commercial tier. Preserve other fields unless their specific change is approved. `features[]` and `tagline` must not retain contradictory old promises.

The table order is the proposed `pricingPage.offers[]` order; use corresponding `displayOrder` values 0-9. Copy below remains draft and needs EN/ES commercial review.

| Order | `name.en` / `name.es` | `price.en` / `price.es` | `category` | `billingPeriod` |
| --- | --- | --- | --- | --- |
| 0 | Construction Profit and Operations Blueprint / Plan de rentabilidad y operaciones de construcción | From $2,500 / Desde $2,500 | advisory | monthly |
| 1 | Bookkeeping / Contabilidad | From $595 / Desde $595 | optional | monthly |
| 2 | Payroll / Nómina | From $250 / Desde $250 | optional | monthly |
| 3 | Partnership returns / Declaraciones de sociedades | From $1,495 / Desde $1,495 | business | one-time |
| 4 | S-corporation returns / Declaraciones de corporaciones S | From $1,795 / Desde $1,795 | business | one-time |
| 5 | Personal tax returns / Declaraciones personales | From $595 / Desde $595 | individual | one-time |
| 6 | Tax planning / Planificación fiscal | From $3,500 / Desde $3,500 | advisory | annually |
| 7 | Introductory strategy session / Sesión estratégica introductoria | $495 / $495 | optional | one-time |
| 8 | IRS/back-tax case review / Revisión de caso del IRS e impuestos atrasados | $750 / $750 | optional | one-time |
| 9 | Cleanup/catch-up / Limpieza y actualización contable | Custom flat-fee quote / Cotización personalizada de tarifa fija | optional | unset |

Do not put `/month`, `/year`, `/mes` or `/año` into the `price` display string when cadence is set separately. One-time and custom quotes receive no recurring suffix. Keep every `From` / `Desde` qualifier.

The local fixture preview substitutes ledger scope/FAQs on affected non-IRS details, holds unapproved quarterly process steps, and replaces the filing hero's unsupported audit-protection claim. This does not edit CMS documents. Before future migration, audit `hero.subheadline`, `process.steps`, `comparison`, `included`, `faqSection` and SEO together; current filing hero still promises automated audit protection, and tax-planning/fractional-CFO process still advertises quarterly cadence. Keep the reviewed IRS narrative and disclaimers.

| Offer | `includes.en` / `includes.es` | `priceNote.en` / `priceNote.es` |
| --- | --- | --- |
| CPOB | Outsourced CFO, bookkeeping, project accounting and tax team. Job costing/WIP, cash-flow forecasts, year-round tax planning, owner compensation, business and owner returns. / Equipo externo de dirección financiera, contabilidad, contabilidad de proyectos e impuestos. Costos por obra y trabajo en curso, proyecciones de flujo de efectivo, planificación fiscal anual, remuneración del propietario y declaraciones del negocio y del propietario. | Revenue-tier prices are not approved. Payroll treatment, service cadence and owner/entity/state allowances require confirmation. / No hay precios aprobados por nivel de ingresos. La nómina, la frecuencia del servicio y los límites de propietarios, entidades y estados requieren confirmación. |
| Bookkeeping | Monthly reconciliations and financial statements. / Conciliaciones mensuales y estados financieros. | Revenue and volume affect the quote. Cleanup and onboarding scope must be confirmed separately. / Los ingresos y el volumen afectan la cotización. La limpieza contable y la incorporación se confirman por separado. |
| Payroll | Up to 10 employees; payroll filings and state registrations. / Hasta 10 empleados; declaraciones de nómina y registros estatales. | One-time setup fee applies; amount pending. Additional employees, states and pay runs require confirmation. CPOB payroll treatment is not approved. / Se aplica una tarifa inicial única; el importe está pendiente. Los empleados, estados y ciclos de pago adicionales requieren confirmación. La nómina dentro de CPOB no está aprobada. |
| Partnership returns | Federal and Utah returns included. / Incluye declaraciones federales y de Utah. | Additional states, entities and complexity require confirmation and a separate quote. / Los estados, entidades y complejidad adicionales requieren confirmación y una cotización separada. |
| S-corporation returns | Federal and Utah returns included. / Incluye declaraciones federales y de Utah. | Additional states, entities and complexity require confirmation and a separate quote. This is return filing, not S-corp election or advisory. / Los estados, entidades y complejidad adicionales requieren confirmación y una cotización separada. Este servicio es de presentación, no de elección ni asesoría de corporación S. |
| Personal returns | Federal and Utah returns, prepared by an Enrolled Agent. / Declaraciones federales y de Utah, preparadas por un agente inscrito. | Business income and rentals are priced separately. Included planning boundaries require approval and do not imply the full annual tax plan. / Los ingresos empresariales y alquileres se cotizan por separado. El alcance de la planificación incluida requiere aprobación y no implica el plan fiscal anual completo. |
| Tax planning | Written annual plan covering entity structure, owner pay, projections and a year-end strategy meeting. / Plan anual escrito con estructura de la entidad, remuneración del propietario, proyecciones y reunión estratégica al cierre del año. | Quarterly planning is available; cadence and pricing need approval. Return-filing inclusion is not confirmed. / Hay planificación trimestral disponible; la frecuencia y los precios requieren aprobación. No está confirmada la inclusión de declaraciones. |
| Strategy session | A paid introductory strategy session. / Una sesión estratégica introductoria de pago. | Credited toward a plan within 30 days. Credit trigger date and eligibility require confirmation. / Se acredita a un plan dentro de 30 días. La fecha de inicio del plazo y la elegibilidad requieren confirmación. |
| IRS review | Review IRS records and options, then quote resolution separately. / Revisión de registros y opciones del IRS; la resolución se cotiza por separado. | Review fee credited toward resolution. Does not purchase resolution or guarantee an IRS outcome. / La tarifa de revisión se acredita a la resolución. No compra la resolución ni garantiza un resultado ante el IRS. |
| Cleanup | Situation reviewed and fee agreed before work. / Se revisa la situación y se acuerda la tarifa antes de trabajar. | No numerical minimum or payment terms are approved. Work beyond the agreed scope is quoted separately. / No hay un mínimo numérico ni condiciones de pago aprobadas. El trabajo fuera del alcance acordado se cotiza por separado. |

CPOB `bestFor.en`: `Construction and trades businesses with $750K-$10M in revenue.` `bestFor.es`: `Empresas de construcción y oficios con ingresos de $750K-$10M.` Other audience descriptions require approval; leave blank rather than inventing qualifications. Do not add CPOB tiers, setup amounts, unlimited returns, audit protection, guarantees or contract/payment terms.

## Existing pricing records: ownership review before edits

These are observed records, not an approved mapping to the new ledger. Preserve every record and its existing identity until the owner confirms reuse versus a separately created draft. Exclude unrelated offers from the new page by explicit references; do not delete them. Equal `$595` or `$3,500` amounts do not establish identical scope.

| Observed offer | `_id` | Observed `_rev` |
| --- | --- | --- |
| BOI / FinCEN Filing | 06d1c30a-ebf8-4df7-881a-b621ee7d34ea | m9xoTPEcWR0sFF5eYdMipo |
| Complex & Enterprise | 102b8a5a-6711-4e7e-b0f3-1e87ed3938c0 | UkQBLj7l7r27M1hWARDTKS |
| Investor | 3d71aa08-d3cd-4b3e-8b67-ee12bdefc059 | TpOhUOMavJP0piqOdNVhF6 |
| Growth | 5fd48f0a-d700-4159-a461-fcbc2318dd22 | m9xoTPEcWR0sFF5eYdHcAg |
| IRS Notices & Resolution | 7d752ca2-1611-4a22-9749-e40f7c60b0f0 | TpOhUOMavJP0piqOdNYcKY |
| Mid-Size | ad14c3fb-555b-4748-9575-0a25c25712c3 | UkQBLj7l7r27M1hWARD7lz |
| Small Business | b119a572-ebd3-4b57-ab4e-754e134ebda2 | UkQBLj7l7r27M1hWARD7zr |
| Executive | b644edb7-1bf3-44ae-a49c-97db57fba835 | UkQBLj7l7r27M1hWARCTc9 |
| Basic | bab44e91-1390-4528-a195-a79c9bed6800 | TpOhUOMavJP0piqOdNZOAI |
| Multi-State Filings | c107e904-dc4f-4fda-bf7b-7e13adce9f4e | m9xoTPEcWR0sFF5eYdMT4y |
| Amended Returns | cf520b81-a3c4-48ea-886b-9cc877af7e62 | m9xoTPEcWR0sFF5eYdMHia |
| Prior-Year Returns | d946122d-353e-46f3-b3a0-15f413b6ccf1 | UkQBLj7l7r27M1hWARDXGa |
| Foundation | f2ca9032-8297-4e2d-8bff-b0724baa5f4b | m9xoTPEcWR0sFF5eYdI34c |
| Incomplete self-employed/rental record | ffbdf1ec-8121-492b-b89e-bfc635395140 | t2mOLTz0d65hnZv1Vvt2QR |

Some observed names and slugs disagree (Multi-State Filings uses `amended-returns`; Amended Returns uses `boi-fincen-filing`). Resolve ownership before mapping. Do not fix unrelated slugs as part of pricing migration.

## Service reference checklist

All seven observed `service` records had revision `CD9L37YSY0XMQhixkMxzSq`. For selected offers, set `pricingTier.relatedService` to the exact matching catalog record below, and populate both `service.pricingOffers[]` and `servicePage.included.pricingOffers[]` in the listed order. Refresh revisions first. Review legacy `service.startingPrice.en/es` and `servicePage.included.pricing.headline/detail.en/es` for parity; those fields are compatibility data and cannot become alternate prices.

| Public route | Real `service` ID (catalog slug) | Real `servicePage` ID | Observed page revision | Offer selection |
| --- | --- | --- | --- | --- |
| /fractional-cfo | 343d9342-3fac-4db2-9ac1-aeb71c34d021 (`fractional-cfo`) | servicePage-fractional-cfo | qbEK25xgV6gJbeKquncmyh | CPOB only, pending offer identity approval |
| /strategic-bookkeeping | 2f1ac481-3d6f-479c-975f-f6a7e9b355d6 (`strategic-bookkeeping`) | servicePage-strategic-bookkeeping | F5WxnMJNunQ8engDQeZiXu | Bookkeeping, cleanup |
| /payroll-services | 13c242a1-578f-4017-b269-a72526b7fed2 (`payroll-services`) | servicePage-payroll-services | qbEK25xgV6gJbeKquncmyh | Payroll |
| /tax-planning | b18b7b49-1b08-4e71-a327-e4c18f011bd0 (`tax-planning-consulting`) | servicePage-tax-planning | qbEK25xgV6gJbeKquncmyh | Annual tax planning, paid strategy session |
| /tax-preparation-and-filing | 22c20065-7eca-47c3-94a3-d4a445d8f9e4 (`tax-preparation-filing`) | servicePage-tax-preparation-and-filing | qbEK25xgV6gJbeKquncmyh | Personal, partnership, S-corporation returns |
| /back-taxes-irs-tax-resolution | No observed catalog service | No observed service page | Not applicable | Explicit `pricingPage.irsReviewOffer` |

Preserve unrelated catalog records `b2f7f14d-2acf-483f-a73e-78001d773956` (formation) and `f00389cd-eab4-4c88-b91f-5253af17ecbc` (S-corp advisory), plus `servicePage-new-business-formation` and `servicePage-s-corp-tax-advantage` (both observed page revision `qbEK25xgV6gJbeKquncmyh`). The S-corp return is not the election/advisory program.

IRS content intentionally remains the existing local route content. Do not fabricate a service reference or create a service page just to link pricing. Select the actual $750 review record in `pricingPage.irsReviewOffer` AND in `pricingPage.offers[]`. Its `relatedService` may remain unset. Absent/unselected references render neutral pricing, not old IRS amounts. This reference does not move IRS scope/disclaimers into Sanity.

## Pricing page and affected wording

- [ ] After authenticated inventory and authorization, select/create exactly one actual `pricingPage` record in Studio > Pages > Pricing Page. Record its generated ID/revision. Duplicate pages fail closed; Studio blocks publication when uniqueness cannot be verified.
- [ ] Populate `hero.heading.en/es`, `hero.description.en/es`, `offers[]` with the ten selected real records in ledger order, and `irsReviewOffer` with the same selected IRS record.
- [ ] Populate `faq.heading.en/es`, `faq.items[].question.en/es` and `.answer.en/es`. Explain federal plus Utah, starting prices, separately quoted additional scope and the distinct credits. Visible FAQ and JSON-LD use the same FAQ items.
- [ ] Populate `closing.heading.en/es`, `.description.en/es`, `.label.en/es` and `.href`. Draft discovery destination is `/book`; paid offer inquiries use `/contact`, not checkout. The existing contact form does not consume a `service` query parameter; no automatic service selection or form changes were added. Approve any future context handoff separately. Set `pricingTier.ctaText.en/es` and `.ctaUrl` consistently without implying free paid sessions.
- [ ] Populate `seo.metaTitle.en/es`, `.metaDescription.en/es`, and `noIndex: true` while draft. Preserve canonical/locale routes; changing draft indexing later requires release review.
- [ ] Review affected service `included.items[]`, pricing explanations and `faqSection.items[]` in both locales. Published filing copy currently claims 3-year audit protection and any one state; annual planning copy mentions quarterly sessions. These are not reaffirmed by this ledger and require an approved bounded edit before release. Do not silently retain them as inclusions.
- [ ] Keep existing service `closing` fields intact: the rendered service final CTA still uses the fixed booking journey and hero-derived label. Editing `closing.href`, heading or description alone does not change that final CTA. Offer-specific overrides require separate approval and implementation.
- [ ] Keep `/fractional-cfo` and its existing redirect; no CPOB route is approved. Preserve booking, books/commerce, industry forms and the separate `/health-check` and `/intake` journeys.

## Decisions before any release

Jason: exact offer version; CPOB identity and payroll/owners/entities/states/cadence; payroll setup amount and extra workload rules; return complexity/personal planning boundaries; quarterly planning price and filing inclusion; strategy credit trigger/eligibility; IRS credit scope; written-before-work practice and claims evidence. Eric: EN/ES copy, existing-record ownership, page scope, CTA context and local preview. Publication/deployment owner: authorize the coordinated code/content release separately.

No commercial approval, draft CMS access, migration, publication or production parity was verified during this local implementation.
