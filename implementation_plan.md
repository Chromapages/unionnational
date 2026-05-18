# Profit Blueprint Page — Design System Alignment

## Summary

The `profit-blueprint/page.tsx` page is functionally complete with solid copy and sections, but it deviates from the established "Digital Vault" design system and the layout patterns used by every other main page (`tax-planning`, `fractional-cfo`, `profitability-assessment`). This plan identifies every deviation and proposes precise fixes.

---

## Wireframes & Visual Audit

### Target Page Architecture

![Full-page wireframe with annotated sections](/Users/mimac/.gemini/antigravity/brain/784ffcc7-935f-4253-a130-b2cbe22fdfb4/profit_blueprint_wireframe_1779039035402.png)

### Before vs After Design Audit

![Before/after design system compliance comparison](/Users/mimac/.gemini/antigravity/brain/784ffcc7-935f-4253-a130-b2cbe22fdfb4/design_audit_comparison_1779039046083.png)

### Hero Section Target Design

![Hero section target design with book mockup and form](/Users/mimac/.gemini/antigravity/brain/784ffcc7-935f-4253-a130-b2cbe22fdfb4/hero_section_redesign_1779039076570.png)

---

## Critical Issues Found (Blocking Design System Compliance)

> [!CAUTION]
> These issues break the site's unified design language and must be fixed.

| # | Severity | Issue | Current | Expected |
|---|----------|-------|---------|----------|
| 1 | 🔴 Critical | **Missing `<HeaderWrapper />`** | No nav bar at all | All main pages include `<HeaderWrapper />` |
| 2 | 🔴 Critical | **Missing `<Footer />`** | No footer at all | All main pages include `<Footer />` |
| 3 | 🔴 Critical | **Root wrapper `bg-white`** | `bg-white` | Should be `bg-surface flex flex-col font-sans text-brand-900 antialiased selection:bg-gold-500 selection:text-white overflow-x-hidden` |
| 4 | 🟠 Major | **No `id="main-content"`** | No skip-link target | Layout provides `focus:...` skip-link pointing to `#main-content` |
| 5 | 🟠 Major | **Hero form: `absolute -bottom-8`** | Form overflows card boundaries and causes layout collision on resize | Use normal flow positioning: book above, form below, OR a side-by-side clean card |
| 6 | 🟠 Major | **Missing breadcrumb / page context** | No construction section context | Add eyebrow or breadcrumb "Construction → Profit Blueprint" |
| 7 | 🟡 Medium | **Section background rhythm broken** | MarginFadeTable → `bg-surface` ✅, BlueprintPainPoints → `bg-white` ✅, ContractorChecklist → `bg-brand-900` ✅, ControlSystemSection → `bg-surface` ✅, Assessment CTA → `bg-white` ✅, BlueprintFAQ → unknown, Final CTA → `bg-brand-900` ✅ | All correct, just need to verify BlueprintFAQ |
| 8 | 🟡 Medium | **Mobile form section `bg-surface`** | Uses `bg-surface` class | Fine but needs `<main id="main-content">` wrapper |
| 9 | 🟡 Medium | **Hero right-column form: `absolute` layout** | Works on desktop, hidden on mobile — form is only shown via a separate mobile section. The absolute positioning makes the desktop layout fragile | Normalize: use `static` relative layout for the form card |
| 10 | 🟢 Minor | **`font-heading` not on H1** | Has `font-heading` ✅ | Good — keep |
| 11 | 🟢 Minor | **Gold button styling** | Assessment CTA button: `bg-brand-900 hover:bg-brand-800` | Design system "Gold Standard Button" = `bg-gold-500 text-brand-900 hover:bg-gold-600` |
| 12 | 🟢 Minor | **Missing `<main>` semantic wrapper** | Content sits directly in root `<div>` | Wrap content in `<main id="main-content">` |

---

## Proposed Changes

### `page.tsx` — The Core Fix

This is the **primary change**: wrap the entire page in the correct shell.

#### [MODIFY] [page.tsx](file:///Users/mimac/WORK/tax%20websites/build/unionnational/src/app/%5Blocale%5D/construction/profit-blueprint/page.tsx)

**Changes:**
1. Import and add `<HeaderWrapper />` and `<Footer />`
2. Change root `<div>` from `bg-white` → `bg-surface flex flex-col font-sans text-brand-900 antialiased selection:bg-gold-500 selection:text-white overflow-x-hidden`
3. Add `<main id="main-content" className="flex-1">` wrapping all page sections
4. Fix the hero's form positioning (remove `absolute -bottom-8`, use a stacked layout)
5. Fix the Assessment CTA primary button to use `bg-gold-500 text-brand-900` Gold Standard Button
6. Add breadcrumb/back-link to `/construction` above the hero

---

### `ControlSystemSection.tsx` — Subcomponent Fix

#### [MODIFY] [ControlSystemSection.tsx](file:///Users/mimac/WORK/tax%20websites/build/unionnational/src/components/construction/profit-blueprint/ControlSystemSection.tsx)

**Change:** The icon containers use `bg-brand-900/10` (10% opacity) which is too faint. Update to `bg-brand-900 text-gold-500` consistent with `BlueprintPainPoints` icon styling (solid brand-900 background with gold icon).

---

### `BlueprintFAQ.tsx` — Verify section bg

#### [MODIFY] [BlueprintFAQ.tsx](file:///Users/mimac/WORK/tax%20websites/build/unionnational/src/components/construction/profit-blueprint/BlueprintFAQ.tsx)

**Review:** Ensure BlueprintFAQ uses `bg-white` to maintain the alternating light/dark section rhythm:
`dark hero → bg-surface → bg-white → bg-brand-900 → bg-surface → bg-white → bg-white(FAQ) → bg-brand-900`

---

## Target Section Rhythm (After Fix)

```
┌─────────────────────────────────────────────┐
│  HeaderWrapper (sticky nav)                  │
├─────────────────────────────────────────────┤
│  Hero (bg-brand-900)                        │  ← dark anchor
├─────────────────────────────────────────────┤
│  MarginFadeTable (bg-surface)               │  ← light
├─────────────────────────────────────────────┤
│  BlueprintPainPoints (bg-white)             │  ← white cards
├─────────────────────────────────────────────┤
│  ContractorChecklist (bg-brand-900)         │  ← dark break
├─────────────────────────────────────────────┤
│  ControlSystemSection (bg-surface)          │  ← light
├─────────────────────────────────────────────┤
│  Assessment CTA (bg-white)                  │  ← white CTA
├─────────────────────────────────────────────┤
│  BlueprintFAQ (bg-surface)                  │  ← light
├─────────────────────────────────────────────┤
│  Final CTA (bg-brand-900)                   │  ← dark close
├─────────────────────────────────────────────┤
│  Footer                                      │
└─────────────────────────────────────────────┘
```

---

## Design System Token Alignment

| Token | Current Usage | Correct Usage |
|-------|--------------|---------------|
| `bg-surface` | Root → `bg-white` ❌ | Root wrapper → `bg-surface` ✅ |
| `bg-gold-500 text-brand-900` | CTA btn: `bg-brand-900` ❌ | Primary action button ✅ |
| `font-heading` | H1, H2, H3 ✅ | Keep |
| `tracking-tighter` | H1 ✅ | Keep |
| `text-[10px] uppercase tracking-widest` | Eyebrows ✅ | Keep |
| `border border-slate-200 rounded-lg shadow-sm` | Cards ✅ | Keep "Vault Card" pattern |
| `selection:bg-gold-500 selection:text-white` | Missing from root | Add to root div |

---

## Accessibility Fixes

> [!IMPORTANT]
> The layout provides a skip-link `<a href="#main-content">` in the root layout. Without `id="main-content"`, keyboard users skip to nothing.

- Add `id="main-content"` to the `<main>` element
- All interactive elements already have proper Lucide icons with `aria-label` support
- `ConstructionBookForm` should be verified to have `<label>` elements for inputs

---

## Verification Plan

### After Implementation
- [ ] Dev server: verify `HeaderWrapper` renders correctly with the construction funnel nav context
- [ ] Inspect root div — confirm `bg-surface` (not `bg-white`) is applied
- [ ] Inspect desktop hero — confirm form is **not** using `absolute -bottom-8`; form card flows naturally below book visual
- [ ] Check Assessment CTA button color is gold (#D4AF37 bg, brand-900 text)
- [ ] Verify `<Footer />` renders at the bottom of the page
- [ ] Skip-link keyboard test: Tab → Enter on "Skip to content" → focus jumps to `#main-content`
- [ ] Mobile (375px): no horizontal scroll, form shows correctly
- [ ] Lighthouse accessibility score ≥ 95

---

## Skills & Workflows Utilized

- **`/relevant`** → Applied `ui-ux-designer`, `frontend-developer`, `tailwind-design-system` skills
- **`/research`** → Cross-referenced all main pages (`tax-planning`, `fractional-cfo`, `profitability-assessment`) and the root `layout.tsx` to establish the true site-wide pattern
- **`/ui-ux-pro-max`** → Applied "Digital Vault" design system tokens, section rhythm principles, and Pre-Delivery Checklist
- **Design System** → "Union National Tax Design System.md" fully referenced for color tokens, typography scale, button specs, and card specs
