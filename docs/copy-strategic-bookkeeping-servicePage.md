# /strategic-bookkeeping — servicePage field values

Paste-ready. Every `localizedString` / `localizedText` shows **EN** then **ES**.
Written against the real render constraints in `ServicePageTemplate.tsx` / `ServiceHero.tsx`, not in a vacuum.

---

## Top-level

| Field | Value |
|---|---|
| **Catalog Service** | reference → existing `service` doc with slug `strategic-bookkeeping` |
| **Page Title** — EN | `Strategic Bookkeeping` |
| **Page Title** — ES | `Contabilidad Estratégica` |
| **Public Slug** | `strategic-bookkeeping` |
| **Canonical Path** | `/strategic-bookkeeping` |
| **Accent Color** | `#0B3B2E` (Deep Green) |

---

## Hero

**Eyebrow** — capped at ~28 chars; the span is `whitespace-nowrap` on mobile.
- EN: `Strategic Bookkeeping`
- ES: `Contabilidad Estratégica`

**Headline** — 39 chars, two lines at 375px.
- EN: `You can't cut a tax bill you can't see.`
- ES: `No puede reducir un impuesto que no puede ver.`

**Highlighted Headline Text** — must be an *exact, case-sensitive substring* of the headline. Verified against `renderHeroHeadline()`.
- EN: `you can't see.`
- ES: `que no puede ver.`

**Subheadline**
- EN: `Reconciled every month, categorized for tax, and delivered as reports you can actually use — while there's still time to act on them.`
- ES: `Conciliados cada mes, categorizados para impuestos y entregados como reportes que sí puede usar — mientras todavía hay tiempo de actuar.`

**Primary CTA**
- Label EN: `Get a Books Review`
- Label ES: `Solicite una Revisión`
- Destination: `/contact`

**Secondary CTA**
- Label EN: `See what's included`
- Label ES: `Vea qué incluye`
- Destination: `#included`

**Trust Statistics** (exactly 3 — `value` ≤10 chars, `label` ≤16, or they wrap inside a 114px cell)

| # | value EN | label EN | value ES | label ES |
|---|---|---|---|---|
| 1 | `QuickBooks` | `Pro Advisors` | `QuickBooks` | `Pro Advisors` |
| 2 | `EA-led` | `tax oversight` | `Con EA` | `supervisión fiscal` |
| 3 | `Monthly` | `not once a year` | `Mensual` | `no una vez al año` |

**CTA Reassurance** (desktop only — hidden below `md`)
- EN: `No commitment. We look at your current books and tell you what's actually broken.`
- ES: `Sin compromiso. Revisamos sus libros actuales y le decimos qué está realmente mal.`

**Visual**
- Type: `dashboard-mockup` (desktop-only; renders nothing below `lg`)
- Dashboard Eyebrow — EN `Monthly close` / ES `Cierre mensual`
- Dashboard Title — EN `March financials` / ES `Estados de marzo`
- Dashboard Status — EN `Reconciled` / ES `Conciliado`

Dashboard Metrics (max 4):

| # | label EN | value EN | label ES | value ES | emphasized |
|---|---|---|---|---|---|
| 1 | `Accounts reconciled` | `Complete` | `Cuentas conciliadas` | `Completo` | false |
| 2 | `Uncategorized items` | `0` | `Sin categorizar` | `0` | false |
| 3 | `Financial statements` | `Delivered` | `Estados financieros` | `Entregados` | false |
| 4 | `Tax-ready categories` | `Current` | `Categorías fiscales` | `Al día` | **true** |

---

## Eligibility

**Eyebrow** — EN `Who this fits` / ES `Para quién es`

**Heading**
- EN: `This is for you if the books are the bottleneck`
- ES: `Esto es para usted si los libros son el cuello de botella`

**Description**
- EN: `A short fit review confirms whether monthly strategic bookkeeping matches where your business actually is right now.`
- ES: `Una revisión breve confirma si la contabilidad estratégica mensual encaja con la etapa real de su negocio hoy.`

**Fit Criteria** (6 items — fills the `sm:grid-cols-2` grid as a clean 2×3)

1. EN `You're a contractor, trades, or service business doing $250K+ a year`
   ES `Es contratista, oficio o empresa de servicios facturando más de $250K al año`
2. EN `Your books are behind, or they close so late the numbers are already stale`
   ES `Sus libros están atrasados, o cierran tan tarde que los números ya no sirven`
3. EN `You find out what you owe at tax time instead of planning for it`
   ES `Se entera de lo que debe en temporada de impuestos en vez de planificarlo`
4. EN `You're making hiring, pricing, or equipment calls without current numbers`
   ES `Toma decisiones de contratación, precios o equipo sin números actualizados`
5. EN `You've outgrown a spouse, an office manager, or a shoebox of receipts`
   ES `Ya superó a un familiar, un gerente de oficina o una caja de recibos`
6. EN `You want your bookkeeping feeding your tax strategy, not sitting in a separate file`
   ES `Quiere que su contabilidad alimente su estrategia fiscal, no que viva en un archivo aparte`

---

## Comparison

**Eyebrow** — EN `The cost of waiting` / ES `El costo de esperar`

**Heading**
- EN: `Why once-a-year bookkeeping costs you money`
- ES: `Por qué la contabilidad anual le cuesta dinero`

**Description**
- EN: `Records cleaned up at tax time can tell you what happened. They can't change what you owe.`
- ES: `Los registros que se ordenan en temporada fiscal le dicen qué pasó. No pueden cambiar lo que debe.`

**Left Column Label** — EN `Basic bookkeeping` / ES `Contabilidad básica`
**Right Column Label** — EN `Strategic bookkeeping` / ES `Contabilidad estratégica`

**Rows** (5) — keep `problem` short; it renders with a strikethrough.

| # | problem EN | solution EN |
|---|---|---|
| 1 | `Books cleaned up at tax time` | `Accounts reconciled every month` |
| 2 | `Cash flow run on gut feel` | `Decisions run on current reports` |
| 3 | `Deductions found after the deadline` | `Tax-ready categories maintained all year` |
| 4 | `Audit records assembled in a panic` | `Documentation stays organized and review-ready` |
| 5 | `Bookkeeping and tax in separate silos` | `Books feed the tax plan in real time` |

| # | problem ES | solution ES |
|---|---|---|
| 1 | `Libros ordenados en temporada fiscal` | `Cuentas conciliadas cada mes` |
| 2 | `Flujo de caja manejado por instinto` | `Decisiones basadas en reportes actuales` |
| 3 | `Deducciones halladas tras la fecha límite` | `Categorías fiscales al día todo el año` |
| 4 | `Registros de auditoría armados a las prisas` | `Documentación organizada y lista para revisión` |
| 5 | `Contabilidad e impuestos en silos separados` | `Los libros alimentan el plan fiscal en tiempo real` |

---

## Process

Use **exactly 4 steps** — the grid is `md:grid-cols-4`. Three or five will leave a hole.

**Eyebrow** — EN `How it works` / ES `Cómo funciona`

**Heading**
- EN: `A close you can set your calendar by`
- ES: `Un cierre que puede marcar en su calendario`

**Description**
- EN: `A defined monthly rhythm so the numbers are ready before you need them, not after.`
- ES: `Un ritmo mensual definido para que los números estén listos antes de necesitarlos, no después.`

**Steps**

**1.** title EN `Books review` / ES `Revisión de libros` · duration EN `Step 1` / ES `Paso 1`
- EN: `We audit your current books, accounts, and reporting gaps — and tell you exactly what's broken.`
- ES: `Auditamos sus libros, cuentas y vacíos de reporte actuales — y le decimos exactamente qué está mal.`

**2.** title EN `Chart of accounts rebuild` / ES `Reconstrucción del catálogo` · duration EN `Step 2` / ES `Paso 2`
- EN: `We restructure categories around how you actually operate: jobs, crews, equipment, and tax reporting.`
- ES: `Reestructuramos las categorías según cómo opera realmente: obras, cuadrillas, equipo y reporte fiscal.`

**3.** title EN `Monthly close & reporting` / ES `Cierre y reportes mensuales` · duration EN `Monthly` / ES `Mensual`
- EN: `We reconcile every account and deliver a P&L, balance sheet, and cash flow you can read in five minutes.`
- ES: `Conciliamos cada cuenta y entregamos estado de resultados, balance y flujo de caja legibles en cinco minutos.`

**4.** title EN `Year-end handoff` / ES `Entrega de fin de año` · duration EN `Year-end` / ES `Fin de año`
- EN: `Books close clean and go straight to your return — no scramble, no reconstruction, no surprises.`
- ES: `Los libros cierran limpios y pasan directo a su declaración — sin prisas, sin reconstrucción, sin sorpresas.`

---

## What's Included

**Eyebrow** — EN `What's included` / ES `Qué incluye`

**Heading**
- EN: `The monthly bookkeeping system`
- ES: `El sistema de contabilidad mensual`

**Description**
- EN: `Everything below runs every month — not just at year-end.`
- ES: `Todo lo siguiente ocurre cada mes — no solo al cierre del año.`

**Included Items** (10 — even count fills the `md:grid-cols-2` grid cleanly)

1. EN `Monthly reconciliation of every bank, card, and loan account`
   ES `Conciliación mensual de cada cuenta bancaria, tarjeta y préstamo`
2. EN `Profit & loss, balance sheet, and cash flow statement each month`
   ES `Estado de resultados, balance general y flujo de caja cada mes`
3. EN `Chart of accounts built for your trade, not a generic template`
   ES `Catálogo de cuentas diseñado para su oficio, no una plantilla genérica`
4. EN `Job, crew, or department-level cost tracking where it applies`
   ES `Seguimiento de costos por obra, cuadrilla o departamento cuando aplica`
5. EN `Transactions categorized for tax deduction from day one`
   ES `Transacciones categorizadas para deducción fiscal desde el primer día`
6. EN `Payroll, loans, and owner draws reconciled to the books`
   ES `Nómina, préstamos y retiros del dueño conciliados con los libros`
7. EN `Flags raised the month they happen, not the April after`
   ES `Alertas en el mes en que ocurren, no en el abril siguiente`
8. EN `Year-end package delivered filing-ready to your preparer`
   ES `Paquete de fin de año listo para declarar, entregado a su preparador`
9. EN `Secure client portal for documents and statements`
   ES `Portal seguro para documentos y estados de cuenta`
10. EN `QuickBooks maintained by certified Pro Advisors on staff`
    ES `QuickBooks gestionado por Pro Advisors certificados en el equipo`

**Pricing Explanation**

Headline
- EN: `Priced on complexity, not on forms.`
- ES: `Precio según complejidad, no según formularios.`

Detail
- EN: `Your scope and monthly rate are confirmed after we review your current books. No hourly billing.`
- ES: `Su alcance y tarifa mensual se confirman después de revisar sus libros actuales. Sin facturación por hora.`

---

## Video Section

Leave **Video URL empty**. The whole section is gated on `video.url && video.heading`, so it stays hidden until real footage exists. Pre-fill the headers so it's ready:

- Eyebrow — EN `Service overview` / ES `Resumen del servicio`
- Heading — EN `See a real monthly close` / ES `Vea un cierre mensual real`
- Description — EN `Two minutes on what lands in your inbox every month and how to read it.` / ES `Dos minutos sobre lo que llega a su correo cada mes y cómo leerlo.`

---

## Proof

No client testimonial exists in the repo that's cleared for use — see flags at the bottom. This is a methodology statement, attributed honestly.

**Eyebrow** — EN `Our approach` / ES `Nuestro enfoque`

**Heading**
- EN: `Why we run books this way`
- ES: `Por qué llevamos los libros así`

**Quote**
- EN: `Every tax strategy we build runs on the books. If the books are late, the strategy is late — and late strategy is just paperwork.`
- ES: `Cada estrategia fiscal que construimos se apoya en los libros. Si los libros llegan tarde, la estrategia llega tarde — y una estrategia tardía es solo papeleo.`

**Attribution**
- EN: `Union National Tax — Strategic Bookkeeping methodology`
- ES: `Union National Tax — metodología de Contabilidad Estratégica`

**Link Label** — EN `Talk through your books` / ES `Hablemos de sus libros`
**Link Destination** — `/contact`

---

## FAQs

**Eyebrow** — EN `Questions answered` / ES `Preguntas respondidas`
**Heading** — EN `Strategic bookkeeping FAQs` / ES `Preguntas sobre contabilidad estratégica`

**1.**
- Q EN: `How is this different from a regular bookkeeper?`
- A EN: `A bookkeeper records what already happened. We categorize and close your books so a tax strategist can act on them while the year is still open. The bookkeeping and the tax planning are the same system, not two vendors emailing each other.`
- Q ES: `¿En qué se diferencia esto de un contador común?`
- A ES: `Un contador registra lo que ya pasó. Nosotros categorizamos y cerramos sus libros para que un estratega fiscal pueda actuar mientras el año sigue abierto. La contabilidad y la planificación fiscal son el mismo sistema, no dos proveedores enviándose correos.`

**2.**
- Q EN: `My books are months behind. Can you still take me on?`
- A EN: `Yes — that's most of the businesses that come to us. Cleanup is scoped separately from the monthly work, and we tell you the size of it before you commit to anything.`
- Q ES: `Mis libros están atrasados varios meses. ¿Aún así me pueden atender?`
- A ES: `Sí — así llega la mayoría de los negocios. La puesta al día se cotiza aparte del trabajo mensual, y le decimos su alcance antes de que se comprometa a nada.`

**3.**
- Q EN: `What does this cost?`
- A EN: `Pricing is based on complexity — transaction volume, number of accounts, and how far behind the books are — not on a form count. Your monthly rate is confirmed after the books review, before any work starts.`
- Q ES: `¿Cuánto cuesta?`
- A ES: `El precio se basa en la complejidad — volumen de transacciones, número de cuentas y qué tan atrasados están los libros — no en un conteo de formularios. Su tarifa mensual se confirma tras la revisión, antes de iniciar cualquier trabajo.`

**4.**
- Q EN: `Do I have to switch accounting software?`
- A EN: `Usually no. We have certified QuickBooks Pro Advisors on staff and work inside your existing file. If your setup genuinely can't support the reporting you need, we'll say so and show you why.`
- Q ES: `¿Tengo que cambiar de software contable?`
- A ES: `Normalmente no. Tenemos Pro Advisors certificados de QuickBooks en el equipo y trabajamos dentro de su archivo actual. Si su configuración realmente no soporta los reportes que necesita, se lo diremos y le mostraremos por qué.`

**5.**
- Q EN: `Do I still need a separate tax preparer?`
- A EN: `No. Your year-end package can go straight to our IRS Enrolled Agent for filing, which is the point — the books and the return are built by the same team. If you'd rather keep your current preparer, we deliver to them filing-ready.`
- Q ES: `¿Todavía necesito un preparador de impuestos aparte?`
- A ES: `No. Su paquete de fin de año puede ir directo a nuestro Agente Inscrito del IRS, que es justamente el punto — los libros y la declaración los construye el mismo equipo. Si prefiere mantener su preparador actual, se lo entregamos listo para declarar.`

**6.**
- Q EN: `How long until my books are current?`
- A EN: `It depends entirely on how far behind you are and how clean the source records are. We give you a specific timeline at the books review — before you sign anything, not after.`
- Q ES: `¿Cuánto tardan mis libros en estar al día?`
- A ES: `Depende completamente de qué tan atrasado esté y qué tan limpios estén los registros originales. Le damos un plazo específico en la revisión — antes de que firme nada, no después.`

---

## Closing CTA

**Heading**
- EN: `See what your books have been hiding.`
- ES: `Vea lo que sus libros le han estado ocultando.`

**Description**
- EN: `Start with a review of your current books. You'll get a straight answer on what's broken and what it takes to fix it.`
- ES: `Empiece con una revisión de sus libros actuales. Recibirá una respuesta directa sobre qué está mal y qué se necesita para arreglarlo.`

**Button Label** — EN `Get a Books Review` / ES `Solicite una Revisión`
**Button Destination** — `/contact`

---

## SEO

**Meta Title** (≤60)
- EN: `Strategic Bookkeeping Services | Union National Tax` (50)
- ES: `Contabilidad Estratégica | Union National Tax` (44)

**Meta Description** (≤160)
- EN: `Monthly reconciled books built to feed your tax strategy. Reports you can act on, tax-ready categories year-round, and a clean year-end close.` (141)
- ES: `Libros conciliados cada mes para alimentar su estrategia fiscal. Reportes accionables, categorías fiscales al día y un cierre anual limpio.` (138)

**Canonical URL** — `https://unionnationaltax.com/strategic-bookkeeping`
**No-Index** — `false`
**Structured Data Type** — `AccountingService`

**Keywords**
1. EN `strategic bookkeeping` / ES `contabilidad estratégica`
2. EN `monthly bookkeeping services` / ES `servicios de contabilidad mensual`
3. EN `bookkeeping for contractors` / ES `contabilidad para contratistas`
4. EN `construction bookkeeping services` / ES `contabilidad para construcción`
5. EN `bookkeeping and tax planning` / ES `contabilidad y planificación fiscal`
